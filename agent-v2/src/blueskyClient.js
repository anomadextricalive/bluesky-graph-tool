function isSuccess(res) {
  return res.status >= 200 && res.status < 300;
}

export class BlueskyClient {
  constructor({ identifier, appPassword, serviceUrl }) {
    this.identifier = identifier;
    this.appPassword = appPassword;
    this.serviceUrl = serviceUrl || 'https://bsky.social';
    this.accessJwt = null;
    this.did = null;
    this.handle = null;
  }

  async _post(endpoint, body, auth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && this.accessJwt) headers.Authorization = `Bearer ${this.accessJwt}`;
    const res = await fetch(`${this.serviceUrl}/xrpc/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!isSuccess(res)) {
      throw new Error(`${endpoint} failed: ${res.status} ${data?.message || res.statusText}`);
    }
    return data;
  }

  async _get(endpoint, params = {}, auth = true) {
    const url = new URL(`${this.serviceUrl}/xrpc/${endpoint}`);
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined || v === '') continue;
      url.searchParams.set(k, String(v));
    }

    const headers = {};
    if (auth && this.accessJwt) headers.Authorization = `Bearer ${this.accessJwt}`;

    const res = await fetch(url, { headers });
    const data = await res.json().catch(() => ({}));
    if (!isSuccess(res)) {
      throw new Error(`${endpoint} failed: ${res.status} ${data?.message || res.statusText}`);
    }
    return data;
  }

  async login() {
    const session = await this._post('com.atproto.server.createSession', {
      identifier: this.identifier,
      password: this.appPassword
    }, false);
    this.accessJwt = session.accessJwt;
    this.did = session.did;
    this.handle = session.handle;
    return session;
  }

  async resolveHandle(handle) {
    const cleaned = String(handle || '').replace(/^@/, '').trim();
    if (!cleaned) throw new Error('Empty handle');
    const data = await this._get('com.atproto.identity.resolveHandle', { handle: cleaned }, false);
    return data.did;
  }

  async fetchAuthorPosts(actor, limit = 30) {
    const data = await this._get('app.bsky.feed.getAuthorFeed', { actor, limit }, true);
    const feed = data?.feed || [];
    const posts = [];

    for (const item of feed) {
      const p = item?.post;
      if (!p || !p.record) continue;
      if (p.author?.did !== actor && p.author?.handle !== actor) continue;
      const text = p.record.text || '';
      posts.push({
        uri: p.uri,
        cid: p.cid,
        authorDid: p.author?.did,
        authorHandle: p.author?.handle,
        text,
        createdAt: p.record.createdAt,
        likes: p.likeCount || 0,
        replies: p.replyCount || 0,
        reposts: p.repostCount || 0
      });
    }
    return posts;
  }

  async createPost(text, replyRef = null) {
    const now = new Date().toISOString();
    const record = {
      $type: 'app.bsky.feed.post',
      text,
      createdAt: now
    };

    if (replyRef?.root?.uri && replyRef?.parent?.uri) {
      record.reply = {
        root: { uri: replyRef.root.uri, cid: replyRef.root.cid },
        parent: { uri: replyRef.parent.uri, cid: replyRef.parent.cid }
      };
    }

    return this._post('com.atproto.repo.createRecord', {
      repo: this.did,
      collection: 'app.bsky.feed.post',
      record
    }, true);
  }

  async repost(subjectUri, subjectCid) {
    return this._post('com.atproto.repo.createRecord', {
      repo: this.did,
      collection: 'app.bsky.feed.repost',
      record: {
        $type: 'app.bsky.feed.repost',
        createdAt: new Date().toISOString(),
        subject: {
          uri: subjectUri,
          cid: subjectCid
        }
      }
    }, true);
  }

  async follow(subjectDid) {
    return this._post('com.atproto.repo.createRecord', {
      repo: this.did,
      collection: 'app.bsky.graph.follow',
      record: {
        $type: 'app.bsky.graph.follow',
        subject: subjectDid,
        createdAt: new Date().toISOString()
      }
    }, true);
  }

  async unfollow(rkey) {
    return this._post('com.atproto.repo.deleteRecord', {
      repo: this.did,
      collection: 'app.bsky.graph.follow',
      rkey
    }, true);
  }

  async like(subjectUri, subjectCid) {
    return this._post('com.atproto.repo.createRecord', {
      repo: this.did,
      collection: 'app.bsky.feed.like',
      record: {
        $type: 'app.bsky.feed.like',
        createdAt: new Date().toISOString(),
        subject: {
          uri: subjectUri,
          cid: subjectCid
        }
      }
    }, true);
  }

  async getProfile(actor) {
    return this._get('app.bsky.actor.getProfile', { actor }, true);
  }

  /**
   * Fetch followers of an actor, paginated.
   * @param {string} actor - DID or handle
   * @param {number} maxResults - Max followers to return
   * @returns {Promise<Array>}
   */
  async getFollowers(actor, maxResults = 200) {
    const results = [];
    let cursor = undefined;
    while (results.length < maxResults) {
      const limit = Math.min(100, maxResults - results.length);
      const params = { actor, limit };
      if (cursor) params.cursor = cursor;
      const data = await this._get('app.bsky.graph.getFollowers', params, true);
      const items = data.followers || [];
      results.push(...items);
      cursor = data.cursor;
      if (!cursor || items.length === 0) break;
    }
    return results.slice(0, maxResults);
  }

  /**
   * Fetch accounts that an actor follows, paginated.
   * @param {string} actor - DID or handle
   * @param {number} maxResults - Max results to return
   * @returns {Promise<Array>}
   */
  async getFollowing(actor, maxResults = 200) {
    const results = [];
    let cursor = undefined;
    while (results.length < maxResults) {
      const limit = Math.min(100, maxResults - results.length);
      const params = { actor, limit };
      if (cursor) params.cursor = cursor;
      const data = await this._get('app.bsky.graph.getFollows', params, true);
      const items = data.follows || [];
      results.push(...items);
      cursor = data.cursor;
      if (!cursor || items.length === 0) break;
    }
    return results.slice(0, maxResults);
  }

  /**
   * List follow records from the repo (to get rkeys for unfollowing).
   * @param {number} maxResults
   * @returns {Promise<Array<{uri: string, value: {subject: string}}>>}
   */
  async listFollowRecords(maxResults = 500) {
    const results = [];
    let cursor = undefined;
    while (results.length < maxResults) {
      const limit = Math.min(100, maxResults - results.length);
      const params = {
        repo: this.did,
        collection: 'app.bsky.graph.follow',
        limit
      };
      if (cursor) params.cursor = cursor;
      const data = await this._get('com.atproto.repo.listRecords', params, true);
      const items = data.records || [];
      results.push(...items);
      cursor = data.cursor;
      if (!cursor || items.length === 0) break;
    }
    return results.slice(0, maxResults);
  }
}
