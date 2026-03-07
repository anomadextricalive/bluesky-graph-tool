const ui = {
    loginPanel: document.getElementById('loginPanel'),
    inputHandle: document.getElementById('inputHandle'),
    inputPassword: document.getElementById('inputPassword'),
    chkRememberMe: document.getElementById('chkRememberMe'),
    btnLogin: document.getElementById('btnLogin'),
    btnLogout: document.getElementById('btnLogout'),
    loginMsg: document.getElementById('loginMsg'),
    connectedUser: document.getElementById('connectedUser'),
    connectedAvatar: document.getElementById('connectedAvatar'),
    connectedName: document.getElementById('connectedName'),
    connectedHandle: document.getElementById('connectedHandle'),
    connectedFollowers: document.getElementById('connectedFollowers'),
    connectedFollowing: document.getElementById('connectedFollowing'),
    connectedPosts: document.getElementById('connectedPosts'),
    headerStatus: document.getElementById('headerStatus'),
    headerStatusText: document.getElementById('headerStatusText'),

    // Analytics
    analyticsPanel: document.getElementById('analyticsPanel'),
    analyticsLimit: document.getElementById('analyticsLimit'),
    btnLoadAnalytics: document.getElementById('btnLoadAnalytics'),
    analyticsProgressWrap: document.getElementById('analyticsProgressWrap'),
    analyticsProgressBar: document.getElementById('analyticsProgressBar'),
    analyticsProgressText: document.getElementById('analyticsProgressText'),
    analyticsContent: document.getElementById('analyticsContent'),
    analyticsMsg: document.getElementById('analyticsMsg'),
    anTotalPosts: document.getElementById('anTotalPosts'),
    anTotalLikes: document.getElementById('anTotalLikes'),
    anTotalReposts: document.getElementById('anTotalReposts'),
    anTotalReplies: document.getElementById('anTotalReplies'),
    anAvgEngagement: document.getElementById('anAvgEngagement'),
    anEngagementRate: document.getElementById('anEngagementRate'),
    barLikes: document.getElementById('barLikes'),
    barReposts: document.getElementById('barReposts'),
    barReplies: document.getElementById('barReplies'),
    barLikesVal: document.getElementById('barLikesVal'),
    barRepostsVal: document.getElementById('barRepostsVal'),
    barRepliesVal: document.getElementById('barRepliesVal'),
    activitySummary: document.getElementById('activitySummary'),
    activityGrid: document.getElementById('activityGrid'),
    topPostsList: document.getElementById('topPostsList'),
    analyticsDesc: document.getElementById('analyticsDesc'),

    lookupPanel: document.getElementById('lookupPanel'),
    inputTarget: document.getElementById('inputTarget'),
    selectSource: document.getElementById('selectSource'),
    inputLimit: document.getElementById('inputLimit'),
    btnFetch: document.getElementById('btnFetch'),
    lookupMsg: document.getElementById('lookupMsg'),
    fetchProgressWrap: document.getElementById('fetchProgressWrap'),
    fetchProgressBar: document.getElementById('fetchProgressBar'),
    fetchProgressText: document.getElementById('fetchProgressText'),

    resultsPanel: document.getElementById('resultsPanel'),
    resultsDesc: document.getElementById('resultsDesc'),
    userGrid: document.getElementById('userGrid'),
    inputSearch: document.getElementById('inputSearch'),
    chkHideFollowing: document.getElementById('chkHideFollowing'),
    btnSelectAll: document.getElementById('btnSelectAll'),
    btnDeselectAll: document.getElementById('btnDeselectAll'),
    btnTopAutoFollow: document.getElementById('btnTopAutoFollow'),
    btnTopAutoUnfollow: document.getElementById('btnTopAutoUnfollow'),
    loadMoreWrap: document.getElementById('loadMoreWrap'),
    btnLoadMore: document.getElementById('btnLoadMore'),

    autoFollowPanel: document.getElementById('autoFollowPanel'),
    rangeDelay: document.getElementById('rangeDelay'),
    delayLabel: document.getElementById('delayLabel'),
    chkDryRun: document.getElementById('chkDryRun'),
    btnAutoFollow: document.getElementById('btnAutoFollow'),
    btnAutoUnfollow: document.getElementById('btnAutoUnfollow'),
    btnStopAction: document.getElementById('btnStopAction'),
    actionMsg: document.getElementById('actionMsg'),

    statSelected: document.getElementById('statSelected'),
    statActioned: document.getElementById('statActioned'),
    statSkipped: document.getElementById('statSkipped'),
    statErrors: document.getElementById('statErrors'),

    followProgressWrap: document.getElementById('followProgressWrap'),
    followProgressBar: document.getElementById('followProgressBar'),
    followProgressPct: document.getElementById('followProgressPct'),

    logSection: document.getElementById('logSection'),
    logConsole: document.getElementById('logConsole'),
    btnClearLog: document.getElementById('btnClearLog'),

    // Tab navigation
    tabNav: document.getElementById('tabNav'),
    viewDashboard: document.getElementById('viewDashboard'),
    viewProfile: document.getElementById('viewProfile'),
    viewScheduler: document.getElementById('viewScheduler'),

    // Profile Health
    btnScanHealth: document.getElementById('btnScanHealth'),
    healthProgressWrap: document.getElementById('healthProgressWrap'),
    healthProgressBar: document.getElementById('healthProgressBar'),
    healthProgressText: document.getElementById('healthProgressText'),
    healthContent: document.getElementById('healthContent'),
    healthMsg: document.getElementById('healthMsg'),
    healthFollowers: document.getElementById('healthFollowers'),
    healthFollowing: document.getElementById('healthFollowing'),
    healthMutuals: document.getElementById('healthMutuals'),
    healthNonMutuals: document.getElementById('healthNonMutuals'),
    healthGhosts: document.getElementById('healthGhosts'),
    healthBlocked: document.getElementById('healthBlocked'),
    profileNonMutualGrid: document.getElementById('profileNonMutualGrid'),
    btnProfileSelectAll: document.getElementById('btnProfileSelectAll'),
    btnProfileDeselectAll: document.getElementById('btnProfileDeselectAll'),
    btnProfileUnfollow: document.getElementById('btnProfileUnfollow'),
    profileSelectedCount: document.getElementById('profileSelectedCount'),
    profileLogSection: document.getElementById('profileLogSection'),
    profileLogConsole: document.getElementById('profileLogConsole'),
    btnProfileClearLog: document.getElementById('btnProfileClearLog'),

    // Scheduler
    schedMode: document.getElementById('schedMode'),
    schedFrequency: document.getElementById('schedFrequency'),
    schedTarget: document.getElementById('schedTarget'),
    schedFollowSource: document.getElementById('schedFollowSource'),
    schedFollowLimit: document.getElementById('schedFollowLimit'),
    schedUnfollowLimit: document.getElementById('schedUnfollowLimit'),
    schedDelay: document.getElementById('schedDelay'),
    schedDryRun: document.getElementById('schedDryRun'),
    btnStartScheduler: document.getElementById('btnStartScheduler'),
    btnStopScheduler: document.getElementById('btnStopScheduler'),
    schedulerStatus: document.getElementById('schedulerStatus'),
    schedNextRun: document.getElementById('schedNextRun'),
    schedTotalRuns: document.getElementById('schedTotalRuns'),
    schedTotalFollowed: document.getElementById('schedTotalFollowed'),
    schedTotalUnfollowed: document.getElementById('schedTotalUnfollowed'),
    schedMsg: document.getElementById('schedMsg'),
    schedLogSection: document.getElementById('schedLogSection'),
    schedLogConsole: document.getElementById('schedLogConsole'),
    btnSchedClearLog: document.getElementById('btnSchedClearLog'),
    schedulerConfig: document.getElementById('schedulerConfig'),

    // Rate Limit
    rateLimitBar: document.getElementById('rateLimitBar'),
    rateLimitRemaining: document.getElementById('rateLimitRemaining'),
    rateLimitTotal: document.getElementById('rateLimitTotal'),
    rateLimitReset: document.getElementById('rateLimitReset'),

    // Post Scheduler
    postComposerText: document.getElementById('postComposerText'),
    postCharCount: document.getElementById('postCharCount'),
    postComposerImages: document.getElementById('postComposerImages'),
    postImagePreview: document.getElementById('postImagePreview'),
    postComposerReply: document.getElementById('postComposerReply'),
    postScheduledTime: document.getElementById('postScheduledTime'),
    btnSchedulePost: document.getElementById('btnSchedulePost'),
    postQueueSection: document.getElementById('postQueueSection'),
    postQueueList: document.getElementById('postQueueList'),

    // Post Now
    postNowText: document.getElementById('postNowText'),
    postNowCharCount: document.getElementById('postNowCharCount'),
    postNowImages: document.getElementById('postNowImages'),
    postNowImagePreview: document.getElementById('postNowImagePreview'),
    postNowReply: document.getElementById('postNowReply'),
    btnPostNow: document.getElementById('btnPostNow'),
    postNowMsg: document.getElementById('postNowMsg'),

    // Sub-tabs
    schedulerSubTabs: document.getElementById('schedulerSubTabs'),
    subtabPostNow: document.getElementById('subtabPostNow'),
    subtabScheduleLater: document.getElementById('subtabScheduleLater'),
};

// ── State ──
const state = {
    session: null,
    users: [],              // all fetched users
    visibleUsers: [],       // filtered users available to UI
    selectedDids: new Set(),
    followRunning: false,
    followStop: false,
    PAGE_SIZE: 1000,          // cards per render batch
    renderOffset: 0,

    // Profile health
    profileSelectedDids: new Set(),
    profileNonMutuals: [],

    // Scheduler
    schedulerInterval: null,
    schedulerCountdownInterval: null,
    schedulerNextRunTime: null,
    schedulerTotalRuns: 0,
    schedulerTotalFollowed: 0,
    schedulerTotalUnfollowed: 0,
    schedulerRunning: false,

    // Post Scheduler
    scheduledPosts: [],
    postImageFiles: [],

    // Post Now
    postNowImageFiles: [],
};

// ──────────────────────────────────────────────
// 1. UTILS
// ──────────────────────────────────────────────
function showMsg(el, text, type = 'info') {
    el.textContent = text;
    el.className = `msg ${type}`;
    el.style.display = 'block';
}
function hideMsg(el) { el.style.display = 'none'; }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// ── Media Preparation ──
// Bluesky uploadBlob has a ~1MB limit for image blobs.
// GIFs: upload as-is (Canvas destroys animation). Bluesky handles GIFs up to ~1MB.
// Videos: use separate video upload service (up to 100MB).
// Static images (JPG/PNG/WebP): auto-compress via Canvas if over limit.
const MAX_BLOB_SIZE = 976 * 1024; // 976 KB

function isVideoFile(file) {
    return file.type.startsWith('video/');
}

function isGifFile(file) {
    return file.type === 'image/gif';
}

function compressImage(file, maxSize = MAX_BLOB_SIZE) {
    return new Promise((resolve) => {
        // Videos — never compress, handled separately
        if (isVideoFile(file)) {
            return resolve(file);
        }

        // GIFs — pass through as-is to preserve animation
        // If too large for uploadBlob, it'll be handled at upload time
        if (isGifFile(file)) {
            console.log(`[MEDIA] GIF detected: ${file.name} (${(file.size / 1024).toFixed(0)}KB) — skipping compression to preserve animation`);
            return resolve(file);
        }

        // Already small enough, return as-is
        if (file.size <= maxSize) {
            return resolve(file);
        }

        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            // Scale down if needed — reduce dimensions proportionally
            const scaleFactor = Math.min(1, Math.sqrt(maxSize / file.size) * 1.1);
            width = Math.round(width * scaleFactor);
            height = Math.round(height * scaleFactor);

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Try progressively lower quality JPEG
            let quality = 0.85;
            const tryCompress = () => {
                canvas.toBlob((blob) => {
                    if (blob.size <= maxSize || quality <= 0.3) {
                        const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        console.log(`[COMPRESS] ${file.name}: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB (q=${quality.toFixed(2)})`);
                        resolve(compressedFile);
                    } else {
                        quality -= 0.1;
                        tryCompress();
                    }
                }, 'image/jpeg', quality);
            };
            tryCompress();
        };
        img.src = url;
    });
}

// Upload a video via Bluesky's video service (supports up to 100MB, 3 min)
async function uploadVideoBlob(file, session) {
    console.log(`[VIDEO] Uploading video: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)}MB)`);

    // Step 1: Get the video service auth token
    const tokenRes = await fetch(`${PDS_URL}/xrpc/com.atproto.server.getServiceAuth`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${session.accessJwt}` }
    });

    // Step 2: Upload the video via uploadBlob (Bluesky handles large videos)
    const uploadRes = await fetch(`${PDS_URL}/xrpc/com.atproto.repo.uploadBlob`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${session.accessJwt}`,
            'Content-Type': file.type
        },
        body: file
    });

    if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Video upload failed: ${errText}`);
    }

    const data = await uploadRes.json();
    return data.blob;
}


// ── Rich Text Facets Parser ──
// Bluesky requires explicit "facets" for hashtags, mentions, and URLs.
// Facets use UTF-8 BYTE offsets, not JS character indices.
// This is ASYNC because mentions need DID resolution via API.
// Wrapped in try-catch so facet errors can NEVER crash the post flow.
async function parseFacets(text) {
    try {
        const encoder = new TextEncoder();
        const facets = [];

        // Helper: convert JS char index to UTF-8 byte index
        function byteIndex(str, charIndex) {
            return encoder.encode(str.substring(0, charIndex)).length;
        }

        // 1. Hashtags: #tag (word chars, no leading digit)
        const hashtagRegex = /#([a-zA-Z][a-zA-Z0-9_]*)/g;
        let match;
        while ((match = hashtagRegex.exec(text)) !== null) {
            const start = byteIndex(text, match.index);
            const end = byteIndex(text, match.index + match[0].length);
            facets.push({
                index: { byteStart: start, byteEnd: end },
                features: [{
                    $type: 'app.bsky.richtext.facet#tag',
                    tag: match[1] // tag without #
                }]
            });
        }

        // 2. Mentions: @handle.bsky.social — requires DID resolution
        //    Only match if preceded by whitespace or start of string (avoid matching inside URLs)
        const mentionRegex = /(?:^|\s)@([a-zA-Z0-9._-]+\.[a-zA-Z]+)/g;
        while ((match = mentionRegex.exec(text)) !== null) {
            const handle = match[1];
            try {
                if (state.session) {
                    const profile = await apiGet('app.bsky.actor.getProfile', { actor: handle }, true);
                    if (profile && profile.did) {
                        // Calculate offset for the @ symbol (skip leading whitespace from regex)
                        const atIndex = text.indexOf('@' + handle, match.index);
                        const start = byteIndex(text, atIndex);
                        const end = byteIndex(text, atIndex + handle.length + 1); // +1 for @
                        facets.push({
                            index: { byteStart: start, byteEnd: end },
                            features: [{
                                $type: 'app.bsky.richtext.facet#mention',
                                did: profile.did
                            }]
                        });
                    }
                }
            } catch (e) {
                console.warn(`[FACETS] Could not resolve mention @${handle}: ${e.message}`);
            }
        }

        // 3. URLs: https://... or http://...
        const urlRegex = /https?:\/\/[^\s<>)"']+/g;
        while ((match = urlRegex.exec(text)) !== null) {
            const start = byteIndex(text, match.index);
            const end = byteIndex(text, match.index + match[0].length);
            facets.push({
                index: { byteStart: start, byteEnd: end },
                features: [{
                    $type: 'app.bsky.richtext.facet#link',
                    uri: match[0]
                }]
            });
        }

        console.log(`[FACETS] Parsed ${facets.length} facet(s) from text`);
        return facets.length > 0 ? facets : undefined;
    } catch (err) {
        console.error(`[FACETS] Error parsing facets (post will proceed without them): ${err.message}`);
        return undefined;
    }
}

function appendLog(text, isError = false) {
    ui.logSection.style.display = 'block';
    const span = document.createElement('span');
    span.textContent = text + '\n';
    if (isError) span.style.color = 'var(--red)';
    ui.logConsole.appendChild(span);
    ui.logConsole.scrollTop = ui.logConsole.scrollHeight;
}

// ──────────────────────────────────────────────
// 2. AT PROTOCOL API WRAPPERS & RATE LIMITS
// ──────────────────────────────────────────────
const PDS_URL = 'https://bsky.social';

function updateRateLimitUI(res) {
    const remaining = res.headers.get('ratelimit-remaining');
    const limit = res.headers.get('ratelimit-limit');
    const reset = res.headers.get('ratelimit-reset');

    if (remaining) {
        ui.rateLimitBar.style.display = 'flex';
        ui.rateLimitRemaining.textContent = remaining;
        if (limit) ui.rateLimitTotal.textContent = limit;
        if (reset) {
            const d = new Date(parseInt(reset) * 1000);
            ui.rateLimitReset.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
}

async function apiPost(endpoint, body, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && state.session) headers['Authorization'] = `Bearer ${state.session.accessJwt}`;
    const res = await fetch(`${PDS_URL}/xrpc/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    });
    updateRateLimitUI(res);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `API Error: ${res.status}`);
    return data;
}

async function apiGet(endpoint, params = {}, auth = false) {
    const url = new URL(`${PDS_URL}/xrpc/${endpoint}`);
    Object.keys(params).forEach(k => {
        if (params[k] !== undefined && params[k] !== null) {
            url.searchParams.append(k, params[k]);
        }
    });

    const headers = {};
    if (auth && state.session) headers['Authorization'] = `Bearer ${state.session.accessJwt}`;

    const res = await fetch(url, { headers });
    updateRateLimitUI(res);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `API Error: ${res.status}`);
    return data;
}

// ──────────────────────────────────────────────
// 3. AUTHENTICATION & PROFILE
// ──────────────────────────────────────────────
ui.btnLogin.addEventListener('click', async () => {
    const handle = ui.inputHandle.value.trim().replace(/^@/, '');
    const password = ui.inputPassword.value.trim();

    if (!handle || !password) {
        showMsg(ui.loginMsg, 'Please enter both handle and App Password.', 'error');
        return;
    }

    ui.btnLogin.disabled = true;
    showMsg(ui.loginMsg, 'Connecting...', 'info');
    setStatus('loading');

    try {
        const session = await apiPost('com.atproto.server.createSession', { identifier: handle, password });
        state.session = session;

        const profile = await apiGet('app.bsky.actor.getProfile', { actor: session.did }, true);

        // Remember me — save credentials
        if (ui.chkRememberMe.checked) {
            localStorage.setItem('bsky_remember', JSON.stringify({ handle, password }));
        } else {
            localStorage.removeItem('bsky_remember');
        }

        // Update UI
        hideMsg(ui.loginMsg);
        ui.inputHandle.disabled = true;
        ui.inputPassword.disabled = true;
        ui.btnLogin.style.display = 'none';
        ui.btnLogout.style.display = '';
        ui.chkRememberMe.disabled = true;

        ui.connectedUser.style.display = 'flex';
        ui.connectedAvatar.src = profile.avatar || generateAvatar(profile.handle);
        ui.connectedName.textContent = profile.displayName || profile.handle;
        ui.connectedHandle.textContent = `@${profile.handle}`;
        ui.connectedFollowers.textContent = formatNum(profile.followersCount);
        ui.connectedFollowing.textContent = formatNum(profile.followsCount);
        ui.connectedPosts.textContent = formatNum(profile.postsCount);

        // Show analytics panel
        ui.analyticsPanel.style.display = 'block';

        setStatus('online');
    } catch (e) {
        showMsg(ui.loginMsg, e.message, 'error');
        setStatus('offline');
    } finally {
        ui.btnLogin.disabled = false;
    }
});

ui.btnLogout.addEventListener('click', () => {
    state.session = null;
    ui.inputHandle.disabled = false;
    ui.inputPassword.disabled = false;
    ui.inputPassword.value = '';
    ui.btnLogin.style.display = '';
    ui.btnLogout.style.display = 'none';
    ui.connectedUser.style.display = 'none';
    ui.resultsPanel.style.display = 'none';
    ui.autoFollowPanel.style.display = 'none';
    ui.chkRememberMe.disabled = false;
    // Hide analytics
    ui.analyticsPanel.style.display = 'none';
    ui.analyticsContent.style.display = 'none';
    // Clear remember me
    localStorage.removeItem('bsky_remember');
    ui.chkRememberMe.checked = false;
    setStatus('offline');
});

function setStatus(s) {
    const dot = ui.headerStatus.querySelector('.status-dot');
    dot.className = `status-dot ${s}`;
    if (s === 'offline') ui.headerStatusText.textContent = 'Not connected';
    if (s === 'loading') ui.headerStatusText.textContent = 'Connecting...';
    if (s === 'online') ui.headerStatusText.textContent = 'Connected securely';
}

function formatNum(n) {
    if (!n) return '0';
    if (n > 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n > 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
}

function generateAvatar(str) {
    const letter = str.charAt(0).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c5cfc"/><stop offset="100%" stop-color="#00d4ff"/></linearGradient></defs>
    <rect width="44" height="44" rx="22" fill="url(#g)"/>
    <text x="22" y="29" text-anchor="middle" font-family="Inter,sans-serif" font-size="18" font-weight="700" fill="white">${letter}</text>
  </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// ──────────────────────────────────────────────
// 4. GRAPH FETCHING
// ──────────────────────────────────────────────
async function resolveDid(handleOrDid) {
    if (handleOrDid.startsWith('did:')) return handleOrDid;
    const data = await apiGet('com.atproto.identity.resolveHandle', { handle: handleOrDid.replace(/^@/, '') });
    return data.did;
}

// ── Fetch all followers (paginated) ──
async function fetchAllFollowers(actor, max, onPage, filterFn = null) {
    const results = [];
    let cursor = undefined;
    let fetchedCount = 0;
    while (results.length < max) {
        const limit = filterFn ? 100 : Math.min(100, max - results.length);
        const data = await apiGet('app.bsky.graph.getFollowers', { actor, limit, cursor }, true);
        fetchedCount += data.followers.length;

        let batch = data.followers;
        if (filterFn) {
            batch = batch.filter(filterFn);
        }

        results.push(...batch);
        onPage(results.length, batch.length, fetchedCount);

        cursor = data.cursor;
        if (!cursor || data.followers.length === 0) break;
        if (fetchedCount > 100000) break; // hard limits safety
        await sleep(80); // polite delay
    }
    return results.slice(0, max);
}

// ── Fetch all following (paginated) ──
async function fetchAllFollowing(actor, max, onPage, filterFn = null) {
    const results = [];
    let cursor = undefined;
    let fetchedCount = 0;
    while (results.length < max) {
        const limit = filterFn ? 100 : Math.min(100, max - results.length);
        const data = await apiGet('app.bsky.graph.getFollows', { actor, limit, cursor }, true);
        fetchedCount += data.follows.length;

        let batch = data.follows;
        if (filterFn) {
            batch = batch.filter(filterFn);
        }

        results.push(...batch);
        onPage(results.length, batch.length, fetchedCount);

        cursor = data.cursor;
        if (!cursor || data.follows.length === 0) break;
        if (fetchedCount > 100000) break; // hard limits safety
        await sleep(80);
    }
    return results.slice(0, max);
}

// ──────────────────────────────────────────────
// 5. GRAPH ACTIONS (Follows)
// ──────────────────────────────────────────────
async function followUser(subjectDid) {
    const now = new Date().toISOString();
    return apiPost('com.atproto.repo.createRecord', {
        repo: state.session.did,
        collection: 'app.bsky.graph.follow',
        record: {
            $type: 'app.bsky.graph.follow',
            subject: subjectDid,
            createdAt: now
        }
    }, true);
}

async function unfollowUser(rkey) {
    return apiPost('com.atproto.repo.deleteRecord', {
        repo: state.session.did,
        collection: 'app.bsky.graph.follow',
        rkey: rkey
    }, true);
}


// ──────────────────────────────────────────────
// 6. UI — FETCH GRAPH
// ──────────────────────────────────────────────
ui.selectSource.addEventListener('change', () => {
    if (ui.selectSource.value === 'my_non_mutuals') {
        ui.inputTarget.disabled = true;
        ui.inputTarget.value = '';
        ui.inputTarget.placeholder = 'Fetching your own profile...';
    } else {
        ui.inputTarget.disabled = false;
        ui.inputTarget.placeholder = 'handle.bsky.social  or  did:plc:...';
    }
});

ui.btnFetch.addEventListener('click', async () => {
    if (!state.session) {
        showMsg(ui.lookupMsg, 'Please connect to Bluesky first.', 'error');
        return;
    }

    const source = ui.selectSource.value;
    let targetRaw = ui.inputTarget.value.trim();
    if (source === 'my_non_mutuals') {
        targetRaw = state.session.did;
    }

    if (!targetRaw) {
        showMsg(ui.lookupMsg, 'Please enter a handle or DID.', 'error');
        return;
    }

    const max = parseInt(ui.inputLimit.value, 10);

    ui.btnFetch.disabled = true;
    hideMsg(ui.lookupMsg);
    ui.fetchProgressWrap.style.display = 'flex';
    ui.fetchProgressBar.style.width = '0%';
    ui.fetchProgressText.textContent = 'Resolving DID...';
    ui.resultsPanel.style.display = 'none';
    ui.autoFollowPanel.style.display = 'none';

    // Toggle Follow/Unfollow buttons based on source
    if (source === 'my_non_mutuals') {
        ui.btnAutoFollow.style.display = 'none';
        ui.btnAutoUnfollow.style.display = '';
        ui.btnTopAutoFollow.style.display = 'none';
        ui.btnTopAutoUnfollow.style.display = '';
    } else {
        ui.btnAutoFollow.style.display = '';
        ui.btnAutoUnfollow.style.display = 'none';
        ui.btnTopAutoFollow.style.display = '';
        ui.btnTopAutoUnfollow.style.display = 'none';
    }

    try {
        // 1. Resolve
        const actorDid = await resolveDid(targetRaw);

        // 2. Fetch
        const onPage = (soFar, _newItems, fetchedTotal = soFar) => {
            const pct = Math.min(95, Math.round((soFar / max) * 100));
            ui.fetchProgressBar.style.width = pct + '%';
            if (source.includes('non_mutuals')) {
                ui.fetchProgressText.textContent = `Scanned ${fetchedTotal}… Found ${soFar} targets`;
            } else {
                ui.fetchProgressText.textContent = `Fetched ${soFar} accounts…`;
            }
        };

        ui.fetchProgressText.textContent = `Fetching…`;
        let users;
        const filterNotFollowingMe = u => !(u.viewer && u.viewer.followedBy);

        if (source === 'followers') {
            users = await fetchAllFollowers(actorDid, max, onPage);
        } else if (source === 'followers_non_mutuals') {
            users = await fetchAllFollowers(actorDid, max, onPage, filterNotFollowingMe);
        } else if (source === 'following') {
            users = await fetchAllFollowing(actorDid, max, onPage);
        } else if (source === 'following_non_mutuals') {
            users = await fetchAllFollowing(actorDid, max, onPage, filterNotFollowingMe);
        } else if (source === 'my_non_mutuals') {
            users = await fetchAllFollowing(actorDid, max, onPage, filterNotFollowingMe);
        }

        ui.fetchProgressBar.style.width = '100%';
        ui.fetchProgressText.textContent = `Done! Loaded ${users.length} accounts.`;

        state.users = users;
        state.selectedDids.clear();
        applyFilters();

    } catch (e) {
        showMsg(ui.lookupMsg, e.message, 'error');
        ui.fetchProgressWrap.style.display = 'none';
    } finally {
        ui.btnFetch.disabled = false;
        setTimeout(() => { ui.fetchProgressWrap.style.display = 'none'; }, 2000);
    }
});


// ──────────────────────────────────────────────
// 7. UI — RENDER GRID
// ──────────────────────────────────────────────
function renderGridBatch() {
    const end = Math.min(state.renderOffset + state.PAGE_SIZE, state.visibleUsers.length);
    const batch = state.visibleUsers.slice(state.renderOffset, end);

    batch.forEach(u => {
        const isFollowing = u.viewer && u.viewer.following;
        const isSelected = state.selectedDids.has(u.did);

        const card = document.createElement('div');
        card.className = `user-card ${isSelected ? 'selected' : ''} ${isFollowing ? 'already-following' : ''}`;
        card.dataset.did = u.did;

        const avatar = u.avatar || generateAvatar(u.handle);
        const name = u.displayName || u.handle;
        const desc = u.description || '';

        card.innerHTML = `
            <div class="card-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="user-card-top">
                <img class="card-avatar" src="${avatar}" alt="${name}" loading="lazy" />
                <div class="card-info">
                    <div class="card-name" title="${name}">${name}</div>
                    <div class="card-handle" title="@${u.handle}">@${u.handle}</div>
                </div>
            </div>
            <div class="card-bio" title="${desc.replace(/"/g, '&quot;')}">${desc}</div>
            <div class="card-stats">
                <span class="card-stat"><strong>${formatNum(u.followersCount)}</strong> flw</span>
                ${isFollowing ? '<span class="card-badge">Following</span>' : ''}
            </div>
        `;

        card.addEventListener('click', () => toggleSelection(card, u.did));
        ui.userGrid.appendChild(card);
    });

    state.renderOffset = end;
    ui.loadMoreWrap.style.display = state.renderOffset < state.visibleUsers.length ? 'block' : 'none';
}

function toggleSelection(cardEl, did) {
    if (state.selectedDids.has(did)) {
        state.selectedDids.delete(did);
        cardEl.classList.remove('selected');
    } else {
        state.selectedDids.add(did);
        cardEl.classList.add('selected');
    }
    updateSelectedStats();
}

ui.btnLoadMore.addEventListener('click', renderGridBatch);

function updateSelectedStats() {
    const size = state.selectedDids.size;
    ui.statSelected.textContent = size;

    // Update top buttons text
    const folText = ui.btnTopAutoFollow.querySelector('.btn-text') || ui.btnTopAutoFollow.childNodes[2];
    folText.textContent = ` Follow (${size})`;
    ui.btnTopAutoFollow.disabled = size === 0;

    const unfolText = ui.btnTopAutoUnfollow.querySelector('.btn-text') || ui.btnTopAutoUnfollow.childNodes[2];
    unfolText.textContent = ` Unfollow (${size})`;
    ui.btnTopAutoUnfollow.disabled = size === 0;
}

// ── Filters ──
function applyFilters() {
    const query = ui.inputSearch.value.toLowerCase();
    const hideFollowing = ui.chkHideFollowing.checked;

    state.visibleUsers = state.users.filter(u => {
        if (hideFollowing && u.viewer && u.viewer.following) return false;
        if (query) {
            const n = (u.displayName || '').toLowerCase();
            const h = (u.handle || '').toLowerCase();
            if (!n.includes(query) && !h.includes(query)) return false;
        }
        return true;
    });

    // Reset view
    ui.userGrid.innerHTML = '';
    state.renderOffset = 0;
    ui.resultsDesc.textContent = `${state.visibleUsers.length} accounts listed`;
    ui.resultsPanel.style.display = 'block';
    ui.autoFollowPanel.style.display = 'block';

    // Purge selectedDids that are no longer visible
    const visibleSet = new Set(state.visibleUsers.map(u => u.did));
    let changed = false;
    for (const did of state.selectedDids) {
        if (!visibleSet.has(did)) {
            state.selectedDids.delete(did);
            changed = true;
        }
    }
    if (changed) updateSelectedStats();

    renderGridBatch();
}

ui.inputSearch.addEventListener('input', applyFilters);
ui.chkHideFollowing.addEventListener('change', applyFilters);

// ── Bulk select ──
ui.btnSelectAll.addEventListener('click', () => {
    state.visibleUsers.forEach(u => state.selectedDids.add(u.did));
    document.querySelectorAll('.user-card').forEach(c => c.classList.add('selected'));
    updateSelectedStats();
});

ui.btnDeselectAll.addEventListener('click', () => {
    state.selectedDids.clear();
    document.querySelectorAll('.user-card').forEach(c => c.classList.remove('selected'));
    updateSelectedStats();
});

// ──────────────────────────────────────────────
// 8. AUTO-FOLLOW PARAMS
// ──────────────────────────────────────────────
ui.rangeDelay.addEventListener('input', (e) => {
    ui.delayLabel.textContent = `${e.target.value} ms`;
});

// ──────────────────────────────────────────────
// 9. AUTO-FOLLOW ENGINE
// ──────────────────────────────────────────────
ui.btnAutoFollow.addEventListener('click', startAutoFollow);
ui.btnTopAutoFollow.addEventListener('click', startAutoFollow);
ui.btnAutoUnfollow.addEventListener('click', startAutoUnfollow);
ui.btnTopAutoUnfollow.addEventListener('click', startAutoUnfollow);
ui.btnStopAction.addEventListener('click', () => { state.followStop = true; });
ui.btnClearLog.addEventListener('click', () => { ui.logConsole.textContent = ''; });

async function startAutoFollow() {
    if (state.selectedDids.size === 0) {
        showMsg(ui.actionMsg, 'Select at least one account to follow.', 'warning');
        return;
    }

    state.followRunning = true;
    state.followStop = false;
    ui.btnAutoFollow.style.display = 'none';
    ui.btnAutoUnfollow.style.display = 'none';
    ui.btnTopAutoFollow.style.display = 'none';
    ui.btnTopAutoUnfollow.style.display = 'none';
    ui.btnStopAction.style.display = '';
    ui.followProgressWrap.style.display = '';
    hideMsg(ui.actionMsg);

    const isDryRun = ui.chkDryRun.checked;
    const delayMs = parseInt(ui.rangeDelay.value, 10);
    const dids = Array.from(state.selectedDids);
    const total = dids.length;

    let success = 0;
    let errors = 0;
    let skipped = 0;

    ui.statActioned.textContent = '0';
    ui.statSkipped.textContent = '0';
    ui.statErrors.textContent = '0';
    ui.followProgressBar.style.width = '0%';
    ui.followProgressPct.textContent = `0 / ${total}`;

    appendLog(`=== Starting Queue (${total} accounts) - Dry Run: ${isDryRun ? 'ON' : 'OFF'} ===`);

    for (let i = 0; i < total; i++) {
        if (state.followStop) {
            appendLog('⚠️ Process aborted by user.', true);
            showMsg(ui.actionMsg, 'Action stopped early.', 'warning');
            break;
        }

        const targetDid = dids[i];
        const userObj = state.users.find(u => u.did === targetDid);
        const handle = userObj ? userObj.handle : targetDid;

        // Check if already following (safety check)
        if (userObj && userObj.viewer && userObj.viewer.following) {
            skipped++;
            ui.statSkipped.textContent = skipped;
            appendLog(`⏭️ Skipped @${handle} (already following)`);
        } else {
            try {
                if (!isDryRun) {
                    await followUser(targetDid);
                }
                success++;
                ui.statActioned.textContent = success;
                appendLog(`✅ Followed @${handle}`);

                // Keep UI card in sync
                const card = document.querySelector(`.user-card[data-did="${targetDid}"]`);
                if (card && !isDryRun) {
                    card.classList.add('already-following');
                    if (userObj) {
                        if (!userObj.viewer) userObj.viewer = {};
                        userObj.viewer.following = true;
                    }
                }

            } catch (err) {
                errors++;
                ui.statErrors.textContent = errors;
                appendLog(`❌ Failed @${handle}: ${err.message}`, true);

                // simple rate limit backoff
                if (err.message.includes('429')) {
                    appendLog('⚠️ Rate limited! Pausing for 5 seconds...', true);
                    await sleep(5000);
                }
            }
        }

        const pct = Math.round(((i + 1) / total) * 100);
        ui.followProgressBar.style.width = `${pct}%`;
        ui.followProgressPct.textContent = `${i + 1} / ${total}`;

        if (i < total - 1) {
            await sleep(delayMs);
        }
    }

    appendLog('=== Queue Finished ===');

    if (!state.followStop) {
        showMsg(ui.actionMsg, `Completed. ${success} followed, ${skipped} skipped, ${errors} errors.`, 'success');
    }

    state.followRunning = false;
    // Restore button visibility based on generic context
    const source = ui.selectSource.value;
    if (source === 'my_non_mutuals') {
        ui.btnAutoUnfollow.style.display = '';
        ui.btnTopAutoUnfollow.style.display = '';
    } else {
        ui.btnAutoFollow.style.display = '';
        ui.btnTopAutoFollow.style.display = '';
    }
    ui.btnStopAction.style.display = 'none';
}


async function startAutoUnfollow() {
    if (state.selectedDids.size === 0) {
        showMsg(ui.actionMsg, 'Select at least one account to unfollow.', 'warning');
        return;
    }

    state.followRunning = true;
    state.followStop = false;
    ui.btnAutoFollow.style.display = 'none';
    ui.btnAutoUnfollow.style.display = 'none';
    ui.btnTopAutoFollow.style.display = 'none';
    ui.btnTopAutoUnfollow.style.display = 'none';
    ui.btnStopAction.style.display = '';
    ui.followProgressWrap.style.display = '';
    hideMsg(ui.actionMsg);

    const isDryRun = ui.chkDryRun.checked;
    const delayMs = parseInt(ui.rangeDelay.value, 10);
    const dids = Array.from(state.selectedDids);
    const total = dids.length;

    let success = 0;
    let errors = 0;
    let skipped = 0;

    ui.statActioned.textContent = '0';
    ui.statSkipped.textContent = '0';
    ui.statErrors.textContent = '0';
    ui.followProgressBar.style.width = '0%';
    ui.followProgressPct.textContent = `0 / ${total}`;

    appendLog(`=== Starting Unfollow Queue (${total} accounts) - Dry Run: ${isDryRun ? 'ON' : 'OFF'} ===`);

    for (let i = 0; i < total; i++) {
        if (state.followStop) {
            appendLog('⚠️ Process aborted by user.', true);
            showMsg(ui.actionMsg, 'Action stopped early.', 'warning');
            break;
        }

        const targetDid = dids[i];
        const userObj = state.users.find(u => u.did === targetDid);
        const handle = userObj ? userObj.handle : targetDid;

        // Check if we are actually following them and have the rkey
        if (!userObj || !userObj.viewer || !userObj.viewer.following) {
            skipped++;
            ui.statSkipped.textContent = skipped;
            appendLog(`⏭️ Skipped @${handle} (not following)`);
        } else {
            try {
                if (!isDryRun) {
                    // Extract rkey from the following URI
                    // Example URI: at://did:plc:.../app.bsky.graph.follow/3k...
                    const parts = userObj.viewer.following.split('/');
                    const rkey = parts[parts.length - 1];
                    await unfollowUser(rkey);
                }
                success++;
                ui.statActioned.textContent = success;
                appendLog(`✅ Unfollowed @${handle}`);

                // Keep UI card in sync
                const card = document.querySelector(`.user-card[data-did="${targetDid}"]`);
                if (card && !isDryRun) {
                    card.classList.remove('already-following');
                    if (userObj && userObj.viewer) {
                        userObj.viewer.following = null;

                        // If we are in the "my_non_mutuals" view, automatically hide the card 
                        // since they were unfollowed and no longer belong in the list.
                        if (ui.selectSource.value === 'my_non_mutuals') {
                            card.style.display = 'none';
                            state.selectedDids.delete(targetDid);
                        }
                    }
                }

            } catch (err) {
                errors++;
                ui.statErrors.textContent = errors;
                appendLog(`❌ Failed @${handle}: ${err.message}`, true);

                // simple rate limit backoff
                if (err.message.includes('429')) {
                    appendLog('⚠️ Rate limited! Pausing for 5 seconds...', true);
                    await sleep(5000);
                }
            }
        }

        const pct = Math.round(((i + 1) / total) * 100);
        ui.followProgressBar.style.width = `${pct}%`;
        ui.followProgressPct.textContent = `${i + 1} / ${total}`;

        if (i < total - 1) {
            await sleep(delayMs);
        }
    }

    appendLog('=== Unfollow Queue Finished ===');

    if (!state.followStop) {
        showMsg(ui.actionMsg, `Completed. ${success} unfollowed, ${skipped} skipped, ${errors} errors.`, 'success');
        updateSelectedStats();
    }

    state.followRunning = false;
    if (ui.selectSource.value === 'my_non_mutuals') {
        ui.btnAutoUnfollow.style.display = '';
        ui.btnTopAutoUnfollow.style.display = '';
    } else {
        ui.btnAutoFollow.style.display = '';
        ui.btnTopAutoFollow.style.display = '';
    }
    ui.btnStopAction.style.display = 'none';
}

// ──────────────────────────────────────────────
// 10. REMEMBER ME — AUTO-LOGIN ON PAGE LOAD
// ──────────────────────────────────────────────
(async function autoLogin() {
    const saved = localStorage.getItem('bsky_remember');
    if (!saved) return;
    try {
        const { handle, password } = JSON.parse(saved);
        if (!handle || !password) return;
        ui.inputHandle.value = handle;
        ui.inputPassword.value = password;
        ui.chkRememberMe.checked = true;
        // Trigger login
        ui.btnLogin.click();
    } catch (_) { /* ignore parse errors */ }
})();

// ──────────────────────────────────────────────
// 11. POST ANALYTICS ENGINE
// ──────────────────────────────────────────────
ui.btnLoadAnalytics.addEventListener('click', loadAnalytics);

async function loadAnalytics() {
    if (!state.session) {
        showMsg(ui.analyticsMsg, 'Please connect first.', 'error');
        return;
    }

    const max = parseInt(ui.analyticsLimit.value, 10);
    ui.btnLoadAnalytics.disabled = true;
    ui.analyticsProgressWrap.style.display = 'flex';
    ui.analyticsProgressBar.style.width = '0%';
    ui.analyticsProgressText.textContent = 'Fetching posts…';
    ui.analyticsContent.style.display = 'none';
    hideMsg(ui.analyticsMsg);

    try {
        const posts = await fetchAuthorFeed(state.session.did, max);

        if (posts.length === 0) {
            showMsg(ui.analyticsMsg, 'No posts found for this account.', 'warning');
            ui.analyticsProgressWrap.style.display = 'none';
            ui.btnLoadAnalytics.disabled = false;
            return;
        }

        ui.analyticsProgressBar.style.width = '100%';
        ui.analyticsProgressText.textContent = `Analyzed ${posts.length} posts.`;

        const data = computeAnalytics(posts);
        renderAnalytics(data);

        ui.analyticsContent.style.display = 'block';
        ui.analyticsDesc.textContent = `Insights from your last ${posts.length} posts.`;

        setTimeout(() => { ui.analyticsProgressWrap.style.display = 'none'; }, 2000);
    } catch (e) {
        showMsg(ui.analyticsMsg, e.message, 'error');
        ui.analyticsProgressWrap.style.display = 'none';
    } finally {
        ui.btnLoadAnalytics.disabled = false;
    }
}

async function fetchAuthorFeed(actor, max) {
    const results = [];
    let cursor = undefined;
    while (results.length < max) {
        const limit = Math.min(100, max - results.length);
        const params = { actor, limit };
        if (cursor) params.cursor = cursor;
        const data = await apiGet('app.bsky.feed.getAuthorFeed', params, true);

        const feedItems = data.feed || [];
        if (feedItems.length === 0) break;

        // Only count the user's own posts (not reposts of others)
        for (const item of feedItems) {
            if (item.post && item.post.author && item.post.author.did === actor) {
                results.push(item.post);
            }
        }

        const pct = Math.min(95, Math.round((results.length / max) * 100));
        ui.analyticsProgressBar.style.width = pct + '%';
        ui.analyticsProgressText.textContent = `Fetched ${results.length} posts…`;

        cursor = data.cursor;
        if (!cursor) break;
        await sleep(80);
    }
    return results.slice(0, max);
}

function computeAnalytics(posts) {
    let totalLikes = 0, totalReposts = 0, totalReplies = 0;
    const postsWithEngagement = [];
    const dateCount = {}; // YYYY-MM-DD → count

    for (const p of posts) {
        const likes = p.likeCount || 0;
        const reposts = p.repostCount || 0;
        const replies = p.replyCount || 0;
        const engagement = likes + reposts + replies;

        totalLikes += likes;
        totalReposts += reposts;
        totalReplies += replies;

        const text = (p.record && p.record.text) || '';
        const date = p.indexedAt ? p.indexedAt.slice(0, 10) : 'unknown';

        postsWithEngagement.push({ text, likes, reposts, replies, engagement, date, uri: p.uri });

        if (date !== 'unknown') {
            dateCount[date] = (dateCount[date] || 0) + 1;
        }
    }

    // Sort top posts by engagement
    postsWithEngagement.sort((a, b) => b.engagement - a.engagement);

    const totalEngagement = totalLikes + totalReposts + totalReplies;
    const avgEngagement = posts.length > 0 ? (totalEngagement / posts.length).toFixed(1) : 0;

    // Engagement rate: avg engagement as percentage (using follower count as base if available)
    const followerText = ui.connectedFollowers.textContent;
    let followerCount = parseFollowerCount(followerText);
    const engagementRate = followerCount > 0 && posts.length > 0
        ? ((totalEngagement / posts.length / followerCount) * 100).toFixed(2) + '%'
        : 'N/A';

    return {
        totalPosts: posts.length,
        totalLikes,
        totalReposts,
        totalReplies,
        totalEngagement,
        avgEngagement,
        engagementRate,
        topPosts: postsWithEngagement.slice(0, 10),
        dateCount
    };
}

function parseFollowerCount(text) {
    if (!text || text === '—') return 0;
    const cleaned = text.trim().toLowerCase();
    if (cleaned.endsWith('k')) return parseFloat(cleaned) * 1000;
    if (cleaned.endsWith('m')) return parseFloat(cleaned) * 1000000;
    return parseInt(cleaned, 10) || 0;
}

function renderAnalytics(data) {
    // Aggregate stats
    ui.anTotalPosts.textContent = data.totalPosts.toLocaleString();
    ui.anTotalLikes.textContent = data.totalLikes.toLocaleString();
    ui.anTotalReposts.textContent = data.totalReposts.toLocaleString();
    ui.anTotalReplies.textContent = data.totalReplies.toLocaleString();
    ui.anAvgEngagement.textContent = data.avgEngagement;
    ui.anEngagementRate.textContent = data.engagementRate;

    // Engagement bars
    const maxBar = Math.max(data.totalLikes, data.totalReposts, data.totalReplies, 1);
    ui.barLikes.style.width = `${(data.totalLikes / maxBar) * 100}%`;
    ui.barReposts.style.width = `${(data.totalReposts / maxBar) * 100}%`;
    ui.barReplies.style.width = `${(data.totalReplies / maxBar) * 100}%`;
    ui.barLikesVal.textContent = data.totalLikes.toLocaleString();
    ui.barRepostsVal.textContent = data.totalReposts.toLocaleString();
    ui.barRepliesVal.textContent = data.totalReplies.toLocaleString();

    // Activity grid (last 90 days)
    renderActivityGrid(data.dateCount);

    // Top posts
    renderTopPosts(data.topPosts);
}

function renderActivityGrid(dateCount) {
    ui.activityGrid.innerHTML = '';
    const today = new Date();
    const days = 90;
    const allCounts = [];

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const count = dateCount[key] || 0;
        allCounts.push({ key, count });
    }

    const maxCount = Math.max(...allCounts.map(c => c.count), 1);

    // Activity summary
    const totalDaysActive = allCounts.filter(c => c.count > 0).length;
    const totalPostsInRange = allCounts.reduce((s, c) => s + c.count, 0);
    ui.activitySummary.innerHTML = `<strong>${totalPostsInRange}</strong> posts in the last ${days} days · <strong>${totalDaysActive}</strong> active days · Avg <strong>${(totalPostsInRange / days).toFixed(1)}</strong> posts/day`;

    for (const { key, count } of allCounts) {
        const cell = document.createElement('div');
        cell.className = 'activity-cell';
        const ratio = count / maxCount;
        if (count === 0) cell.classList.add('level-0');
        else if (ratio <= 0.25) cell.classList.add('level-1');
        else if (ratio <= 0.5) cell.classList.add('level-2');
        else if (ratio <= 0.75) cell.classList.add('level-3');
        else cell.classList.add('level-4');
        cell.title = `${key}: ${count} post${count !== 1 ? 's' : ''}`;
        ui.activityGrid.appendChild(cell);
    }
}

function renderTopPosts(topPosts) {
    ui.topPostsList.innerHTML = '';
    topPosts.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'top-post-card';
        card.innerHTML = `
            <div class="top-post-rank">#${i + 1}</div>
            <div class="top-post-body">
                <div class="top-post-text">${escapeHtml(p.text || '(no text)')}</div>
                <div class="top-post-meta">
                    <span>♥ ${p.likes}</span>
                    <span>↻ ${p.reposts}</span>
                    <span>💬 ${p.replies}</span>
                    <span>Σ ${p.engagement}</span>
                </div>
                <div class="top-post-date">${p.date}</div>
            </div>
        `;
        ui.topPostsList.appendChild(card);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ──────────────────────────────────────────────
// 12. TAB NAVIGATION
// ──────────────────────────────────────────────
const views = {
    dashboard: ui.viewDashboard,
    profile: ui.viewProfile,
    scheduler: ui.viewScheduler
};

ui.tabNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const viewName = btn.dataset.view;
    switchView(viewName);
});

function switchView(viewName) {
    // Hide all views
    Object.values(views).forEach(v => v.style.display = 'none');
    // Remove active from all tabs
    ui.tabNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    // Show target view
    if (views[viewName]) views[viewName].style.display = '';
    // Activate tab
    const activeTab = ui.tabNav.querySelector(`[data-view="${viewName}"]`);
    if (activeTab) activeTab.classList.add('active');
}

// ──────────────────────────────────────────────
// 13. PROFILE / ACCOUNT HEALTH ENGINE
// ──────────────────────────────────────────────
ui.btnScanHealth.addEventListener('click', scanAccountHealth);

async function scanAccountHealth() {
    if (!state.session) {
        showMsg(ui.healthMsg, 'Please connect on the Dashboard tab first.', 'error');
        return;
    }

    ui.btnScanHealth.disabled = true;
    ui.healthProgressWrap.style.display = 'flex';
    ui.healthProgressBar.style.width = '0%';
    ui.healthProgressText.textContent = 'Fetching followers…';
    ui.healthContent.style.display = 'none';
    hideMsg(ui.healthMsg);

    try {
        // Fetch all followers
        const followers = await fetchAllPaginated('app.bsky.graph.getFollowers', 'followers', state.session.did, (count) => {
            ui.healthProgressBar.style.width = '25%';
            ui.healthProgressText.textContent = `Fetched ${count} followers…`;
        });

        ui.healthProgressBar.style.width = '33%';
        ui.healthProgressText.textContent = 'Fetching following…';

        // Fetch all following
        const following = await fetchAllPaginated('app.bsky.graph.getFollows', 'follows', state.session.did, (count) => {
            ui.healthProgressBar.style.width = '55%';
            ui.healthProgressText.textContent = `Fetched ${count} following…`;
        });

        ui.healthProgressBar.style.width = '75%';
        ui.healthProgressText.textContent = 'Fetching blocked accounts…';

        // Fetch blocks
        const blocked = await fetchAllBlocks();

        ui.healthProgressBar.style.width = '90%';
        ui.healthProgressText.textContent = 'Computing health metrics…';

        // Compute
        const followerDids = new Set(followers.map(f => f.did));
        const followingDids = new Set(following.map(f => f.did));

        const mutuals = following.filter(f => followerDids.has(f.did));
        const nonMutuals = following.filter(f => !followerDids.has(f.did));
        const ghosts = followers.filter(f => !followingDids.has(f.did));

        // Render
        ui.healthFollowers.textContent = followers.length.toLocaleString();
        ui.healthFollowing.textContent = following.length.toLocaleString();
        ui.healthMutuals.textContent = mutuals.length.toLocaleString();
        ui.healthNonMutuals.textContent = nonMutuals.length.toLocaleString();
        ui.healthGhosts.textContent = ghosts.length.toLocaleString();
        ui.healthBlocked.textContent = blocked.length.toLocaleString();

        // Render non-mutuals grid
        state.profileNonMutuals = nonMutuals;
        state.profileSelectedDids.clear();
        renderProfileNonMutuals(nonMutuals);
        updateProfileUnfollowBtn();

        ui.healthContent.style.display = 'block';
        ui.healthProgressBar.style.width = '100%';
        ui.healthProgressText.textContent = `Scan complete. ${followers.length} followers, ${following.length} following.`;
        setTimeout(() => { ui.healthProgressWrap.style.display = 'none'; }, 2000);

    } catch (e) {
        showMsg(ui.healthMsg, e.message, 'error');
        ui.healthProgressWrap.style.display = 'none';
    } finally {
        ui.btnScanHealth.disabled = false;
    }
}

async function fetchAllPaginated(endpoint, key, actor, progressCb) {
    const results = [];
    let cursor = undefined;
    while (true) {
        const params = { actor, limit: 100 };
        if (cursor) params.cursor = cursor;
        const data = await apiGet(endpoint, params, true);
        const items = data[key] || [];
        results.push(...items);
        if (progressCb) progressCb(results.length);
        cursor = data.cursor;
        if (!cursor || items.length === 0) break;
        await sleep(80);
    }
    return results;
}

async function fetchAllBlocks() {
    const results = [];
    let cursor = undefined;
    while (true) {
        const params = { limit: 100 };
        if (cursor) params.cursor = cursor;
        try {
            const data = await apiGet('app.bsky.graph.getBlocks', params, true);
            const items = data.blocks || [];
            results.push(...items);
            cursor = data.cursor;
            if (!cursor || items.length === 0) break;
            await sleep(80);
        } catch (_) {
            break; // API may not support blocks for some users
        }
    }
    return results;
}

function renderProfileNonMutuals(users) {
    ui.profileNonMutualGrid.innerHTML = '';
    users.forEach(u => {
        const card = document.createElement('div');
        card.className = 'user-card' + (state.profileSelectedDids.has(u.did) ? ' selected' : '');
        card.dataset.did = u.did;
        card.innerHTML = `
            <img class="user-avatar" src="${u.avatar || generateAvatar(u.handle)}" alt="" loading="lazy" />
            <div class="user-info">
                <span class="user-name">${escapeHtml(u.displayName || u.handle)}</span>
                <span class="user-handle">@${u.handle}</span>
            </div>
            <div class="user-select-indicator"></div>
        `;
        card.addEventListener('click', () => toggleProfileSelect(u.did, card));
        ui.profileNonMutualGrid.appendChild(card);
    });
}

function toggleProfileSelect(did, card) {
    if (state.profileSelectedDids.has(did)) {
        state.profileSelectedDids.delete(did);
        card.classList.remove('selected');
    } else {
        state.profileSelectedDids.add(did);
        card.classList.add('selected');
    }
    updateProfileUnfollowBtn();
}

function updateProfileUnfollowBtn() {
    const count = state.profileSelectedDids.size;
    ui.profileSelectedCount.textContent = count;
    ui.btnProfileUnfollow.disabled = count === 0;
}

ui.btnProfileSelectAll.addEventListener('click', () => {
    state.profileNonMutuals.forEach(u => state.profileSelectedDids.add(u.did));
    ui.profileNonMutualGrid.querySelectorAll('.user-card').forEach(c => c.classList.add('selected'));
    updateProfileUnfollowBtn();
});

ui.btnProfileDeselectAll.addEventListener('click', () => {
    state.profileSelectedDids.clear();
    ui.profileNonMutualGrid.querySelectorAll('.user-card').forEach(c => c.classList.remove('selected'));
    updateProfileUnfollowBtn();
});

ui.btnProfileUnfollow.addEventListener('click', async () => {
    if (!state.session || state.profileSelectedDids.size === 0) return;
    ui.btnProfileUnfollow.disabled = true;
    ui.profileLogSection.style.display = 'block';
    const dids = Array.from(state.profileSelectedDids);
    let success = 0, errors = 0;

    for (const did of dids) {
        try {
            // Find the follow record
            const follows = await apiGet('app.bsky.graph.getFollows', { actor: state.session.did, limit: 100 }, true);
            let followUri = null;
            for (const f of (follows.follows || [])) {
                if (f.did === did) {
                    // We need to get the follow record URI from the repo
                    const records = await apiGet('com.atproto.repo.listRecords', {
                        repo: state.session.did,
                        collection: 'app.bsky.graph.follow',
                        limit: 100
                    }, true);
                    for (const r of (records.records || [])) {
                        if (r.value && r.value.subject === did) {
                            followUri = r.uri;
                            break;
                        }
                    }
                    break;
                }
            }

            if (followUri) {
                const rkey = followUri.split('/').pop();
                await apiPost('com.atproto.repo.deleteRecord', {
                    repo: state.session.did,
                    collection: 'app.bsky.graph.follow',
                    rkey
                }, true);
                success++;
                profileLog(`✓ Unfollowed ${did}`);
            } else {
                profileLog(`⚠ No follow record found for ${did}`);
            }
        } catch (e) {
            errors++;
            profileLog(`✗ Error unfollowing ${did}: ${e.message}`);
        }
        await sleep(800);
    }

    profileLog(`\n— Done: ${success} unfollowed, ${errors} errors —`);
    state.profileSelectedDids.clear();
    updateProfileUnfollowBtn();
    ui.btnProfileUnfollow.disabled = false;
    // Re-scan to refresh
    showMsg(ui.healthMsg, `Unfollowed ${success} accounts. Click "Scan Account" to refresh.`, 'info');
});

function profileLog(msg) {
    ui.profileLogConsole.textContent += msg + '\n';
    ui.profileLogConsole.scrollTop = ui.profileLogConsole.scrollHeight;
}

ui.btnProfileClearLog.addEventListener('click', () => {
    ui.profileLogConsole.textContent = '';
});

// ──────────────────────────────────────────────
// 14. AUTO-SCHEDULER ENGINE
// ──────────────────────────────────────────────
ui.btnStartScheduler.addEventListener('click', startScheduler);
ui.btnStopScheduler.addEventListener('click', stopScheduler);
ui.btnSchedClearLog.addEventListener('click', () => { ui.schedLogConsole.textContent = ''; });

function startScheduler() {
    if (!state.session) {
        showMsg(ui.schedMsg, 'Please connect on the Dashboard tab first.', 'error');
        return;
    }

    const mode = ui.schedMode.value;
    const frequency = parseInt(ui.schedFrequency.value, 10);
    const target = ui.schedTarget.value.trim().replace(/^@/, '');
    const followSource = ui.schedFollowSource.value;
    const followLimit = parseInt(ui.schedFollowLimit.value, 10);
    const unfollowLimit = parseInt(ui.schedUnfollowLimit.value, 10);
    const delay = parseInt(ui.schedDelay.value, 10);
    const dryRun = ui.schedDryRun.checked;

    if ((mode === 'follow' || mode === 'both') && !target) {
        showMsg(ui.schedMsg, 'Please enter a target handle for follow mode.', 'error');
        return;
    }

    hideMsg(ui.schedMsg);
    state.schedulerRunning = true;
    state.schedulerTotalRuns = 0;
    state.schedulerTotalFollowed = 0;
    state.schedulerTotalUnfollowed = 0;

    // UI toggles
    ui.btnStartScheduler.style.display = 'none';
    ui.btnStopScheduler.style.display = '';
    ui.schedulerStatus.style.display = 'block';
    ui.schedLogSection.style.display = 'block';
    setSchedulerConfigDisabled(true);

    updateSchedulerStats();

    const config = { mode, frequency, target, followSource, followLimit, unfollowLimit, delay, dryRun };

    // Run immediately
    schedLog(`▶ Scheduler started. Mode: ${mode}, Frequency: ${frequency / 3600000}h`);
    schedLog(`  Follow limit: ${followLimit}, Unfollow limit: ${unfollowLimit}, Delay: ${delay}ms, Dry run: ${dryRun}`);
    runScheduledTask(config);

    // Set interval for subsequent runs
    state.schedulerInterval = setInterval(() => {
        if (state.schedulerRunning) runScheduledTask(config);
    }, frequency);

    // Countdown timer
    state.schedulerNextRunTime = Date.now() + frequency;
    state.schedulerCountdownInterval = setInterval(updateCountdown, 1000);
}

function stopScheduler() {
    state.schedulerRunning = false;
    if (state.schedulerInterval) clearInterval(state.schedulerInterval);
    if (state.schedulerCountdownInterval) clearInterval(state.schedulerCountdownInterval);
    state.schedulerInterval = null;
    state.schedulerCountdownInterval = null;

    ui.btnStartScheduler.style.display = '';
    ui.btnStopScheduler.style.display = 'none';
    ui.schedNextRun.textContent = 'Stopped';
    setSchedulerConfigDisabled(false);

    schedLog('⏹ Scheduler stopped.');
}

function setSchedulerConfigDisabled(disabled) {
    const inputs = ui.schedulerConfig.querySelectorAll('input, select');
    inputs.forEach(el => el.disabled = disabled);
}

function updateCountdown() {
    if (state.schedulerNextRunTime) {
        const remaining = Math.max(0, state.schedulerNextRunTime - Date.now());
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        ui.schedNextRun.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
}

function updateSchedulerStats() {
    ui.schedTotalRuns.textContent = state.schedulerTotalRuns;
    ui.schedTotalFollowed.textContent = state.schedulerTotalFollowed;
    ui.schedTotalUnfollowed.textContent = state.schedulerTotalUnfollowed;
}

async function runScheduledTask(config) {
    if (!state.schedulerRunning || !state.session) return;

    state.schedulerTotalRuns++;
    updateSchedulerStats();
    const runNum = state.schedulerTotalRuns;
    schedLog(`\n═══ Run #${runNum} started at ${new Date().toLocaleTimeString()} ═══`);

    try {
        // FOLLOW phase
        if ((config.mode === 'follow' || config.mode === 'both') && config.target) {
            schedLog(`  Fetching ${config.followSource} of @${config.target}…`);

            const endpoint = config.followSource === 'followers'
                ? 'app.bsky.graph.getFollowers'
                : 'app.bsky.graph.getFollows';
            const key = config.followSource === 'followers' ? 'followers' : 'follows';

            // Resolve target DID
            const profile = await apiGet('app.bsky.actor.getProfile', { actor: config.target }, true);
            const targetDid = profile.did;

            // Fetch users
            const users = [];
            let cursor = undefined;
            while (users.length < config.followLimit) {
                const limit = Math.min(100, config.followLimit - users.length);
                const params = { actor: targetDid, limit };
                if (cursor) params.cursor = cursor;
                const data = await apiGet(endpoint, params, true);
                const items = data[key] || [];
                if (items.length === 0) break;

                for (const u of items) {
                    // Skip if already following
                    if (u.viewer && u.viewer.following) continue;
                    // Skip self
                    if (u.did === state.session.did) continue;
                    users.push(u);
                    if (users.length >= config.followLimit) break;
                }

                cursor = data.cursor;
                if (!cursor) break;
                await sleep(80);
            }

            schedLog(`  Found ${users.length} users to follow.`);

            let followed = 0;
            for (const u of users) {
                if (!state.schedulerRunning) break;
                try {
                    if (!config.dryRun) {
                        await apiPost('com.atproto.repo.createRecord', {
                            repo: state.session.did,
                            collection: 'app.bsky.graph.follow',
                            record: {
                                subject: u.did,
                                createdAt: new Date().toISOString(),
                                '$type': 'app.bsky.graph.follow'
                            }
                        }, true);
                    }
                    followed++;
                    schedLog(`    ${config.dryRun ? '[DRY]' : '✓'} Follow @${u.handle}`);
                } catch (e) {
                    schedLog(`    ✗ Error following @${u.handle}: ${e.message}`);
                }
                await sleep(config.delay);
            }
            state.schedulerTotalFollowed += followed;
            schedLog(`  Followed: ${followed}`);
        }

        // UNFOLLOW phase
        if ((config.mode === 'unfollow' || config.mode === 'both') && state.schedulerRunning) {
            schedLog('  Scanning non-mutuals for unfollow…');

            // Fetch following
            const following = await fetchAllPaginated('app.bsky.graph.getFollows', 'follows', state.session.did, () => { });
            // Fetch followers
            const followers = await fetchAllPaginated('app.bsky.graph.getFollowers', 'followers', state.session.did, () => { });

            const followerDids = new Set(followers.map(f => f.did));
            const nonMutuals = following.filter(f => !followerDids.has(f.did));

            const toUnfollow = nonMutuals.slice(0, config.unfollowLimit);
            schedLog(`  Found ${nonMutuals.length} non-mutuals, unfollowing up to ${toUnfollow.length}.`);

            let unfollowed = 0;
            for (const u of toUnfollow) {
                if (!state.schedulerRunning) break;
                try {
                    // Find follow record
                    const records = await apiGet('com.atproto.repo.listRecords', {
                        repo: state.session.did,
                        collection: 'app.bsky.graph.follow',
                        limit: 100
                    }, true);
                    let rkey = null;
                    for (const r of (records.records || [])) {
                        if (r.value && r.value.subject === u.did) {
                            rkey = r.uri.split('/').pop();
                            break;
                        }
                    }
                    if (rkey) {
                        if (!config.dryRun) {
                            await apiPost('com.atproto.repo.deleteRecord', {
                                repo: state.session.did,
                                collection: 'app.bsky.graph.follow',
                                rkey
                            }, true);
                        }
                        unfollowed++;
                        schedLog(`    ${config.dryRun ? '[DRY]' : '✓'} Unfollow @${u.handle}`);
                    }
                } catch (e) {
                    schedLog(`    ✗ Error unfollowing @${u.handle}: ${e.message}`);
                }
                await sleep(config.delay);
            }
            state.schedulerTotalUnfollowed += unfollowed;
            schedLog(`  Unfollowed: ${unfollowed}`);
        }

    } catch (e) {
        schedLog(`  ✗ Run error: ${e.message}`);
    }

    updateSchedulerStats();
    const freq = parseInt(ui.schedFrequency.value, 10);
    state.schedulerNextRunTime = Date.now() + freq;
    schedLog(`═══ Run #${runNum} complete. Next run in ${freq / 3600000}h ═══`);
}

function schedLog(msg) {
    ui.schedLogConsole.textContent += msg + '\n';
    ui.schedLogConsole.scrollTop = ui.schedLogConsole.scrollHeight;
}

// ──────────────────────────────────────────────
// 10. POST COMPOSER & SCHEDULER ENGINE
// ──────────────────────────────────────────────
ui.postComposerText.addEventListener('input', () => {
    const len = ui.postComposerText.value.length;
    ui.postCharCount.textContent = `${len} / 300`;
    ui.postCharCount.style.color = len > 300 ? 'var(--red)' : 'var(--text-light)';
});

ui.postComposerImages.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (state.postImageFiles.length + files.length > 4) {
        alert('Maximum 4 images allowed per post.');
        ui.postComposerImages.value = '';
        return;
    }

    files.forEach(file => {
        state.postImageFiles.push(file);

        const container = document.createElement('div');
        container.className = 'image-preview-container';

        const img = document.createElement('img');
        img.className = 'image-preview-thumb';
        img.src = URL.createObjectURL(file);

        const removeBtn = document.createElement('div');
        removeBtn.className = 'image-preview-remove';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => {
            container.remove();
            state.postImageFiles = state.postImageFiles.filter(f => f !== file);
        };

        container.appendChild(img);
        container.appendChild(removeBtn);
        ui.postImagePreview.appendChild(container);
    });

    ui.postComposerImages.value = ''; // Reset input to allow adding same file again if removed
});

function renderPostQueue() {
    ui.postQueueList.innerHTML = '';
    if (state.scheduledPosts.length === 0) {
        ui.postQueueSection.style.display = 'none';
        return;
    }

    ui.postQueueSection.style.display = 'block';

    // Sort array by time ascending
    state.scheduledPosts.sort((a, b) => a.scheduledTime - b.scheduledTime);

    state.scheduledPosts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'queue-item';
        div.id = 'queue-item-' + post.id;

        const timeStr = new Date(post.scheduledTime).toLocaleString();

        let statusClass = 'badge-pending';
        let statusText = 'PENDING';
        let statusMsgHtml = '';
        let btnHtml = '';

        if (post.status === 'publishing') {
            statusClass = 'badge-publishing';
            statusText = 'PUBLISHING';
            statusMsgHtml = `<div class="queue-item-status-msg" id="status-msg-${post.id}">${post.publishMessage || 'Working...'}</div>`;
        } else if (post.status === 'done' || post.status === 'published') {
            statusClass = 'badge-published';
            statusText = 'PUBLISHED';
            btnHtml = `<button class="btn btn-primary btn-sm" onclick="fetchSinglePostAnalytics('${post.uri}', '${post.id}')">View Analytics</button>`;
        } else if (post.status === 'error') {
            statusClass = 'badge-error';
            statusText = 'ERROR';
            statusMsgHtml = `<div class="queue-item-error">${escapeHtml(post.error || 'Unknown error')}</div>`;
            btnHtml = `<button class="btn btn-danger btn-sm" onclick="cancelScheduledPost('${post.id}')">✕</button>`;
        } else {
            // default pending
            btnHtml = `<button class="btn btn-danger btn-sm" onclick="cancelScheduledPost('${post.id}')">✕</button>`;
        }

        div.innerHTML = `
            <div class="queue-item-header">
                <div class="queue-item-content">
                    <div class="queue-item-text">${escapeHtml(post.text)}</div>
                    <div class="queue-item-meta">
                        <span class="badge ${statusClass}">${statusText}</span>
                        <span>${timeStr}</span>
                        ${post.images && post.images.length > 0 ? `<span>📷 ${post.images.length}</span>` : ''}
                        ${post.replyText ? `<span>💬 +Reply</span>` : ''}
                    </div>
                    ${statusMsgHtml}
                </div>
                ${btnHtml}
            </div>
            
            <div class="queue-item-analytics" id="analytics-${post.id}">
                <div class="queue-analytics-grid">
                    <div class="queue-stat"><span id="stat-likes-${post.id}">-</span><small>Likes</small></div>
                    <div class="queue-stat"><span id="stat-reposts-${post.id}">-</span><small>Reposts</small></div>
                    <div class="queue-stat"><span id="stat-replies-${post.id}">-</span><small>Replies</small></div>
                    <div class="queue-stat"><span id="stat-quotes-${post.id}">-</span><small>Quotes</small></div>
                </div>
            </div>
        `;
        ui.postQueueList.appendChild(div);
    });
}

window.cancelScheduledPost = (id) => {
    state.scheduledPosts = state.scheduledPosts.filter(p => p.id !== id);
    renderPostQueue();
};

window.fetchSinglePostAnalytics = async (uri, id) => {
    const analyticsDiv = document.getElementById(`analytics-${id}`);
    if (!analyticsDiv) return;

    // Toggle visibility
    if (analyticsDiv.style.display === 'block') {
        analyticsDiv.style.display = 'none';
        return;
    }

    analyticsDiv.style.display = 'block';

    // Set loading state
    document.getElementById(`stat-likes-${id}`).textContent = '...';
    document.getElementById(`stat-reposts-${id}`).textContent = '...';
    document.getElementById(`stat-replies-${id}`).textContent = '...';
    document.getElementById(`stat-quotes-${id}`).textContent = '...';

    try {
        const data = await apiGet('app.bsky.feed.getPosts', { uris: [uri] }, true);
        const post = data.posts && data.posts[0];

        if (post) {
            document.getElementById(`stat-likes-${id}`).textContent = post.likeCount || 0;
            document.getElementById(`stat-reposts-${id}`).textContent = post.repostCount || 0;
            document.getElementById(`stat-replies-${id}`).textContent = post.replyCount || 0;
            document.getElementById(`stat-quotes-${id}`).textContent = post.quoteCount || 0;
        } else {
            throw new Error("Post not found");
        }
    } catch (e) {
        console.error("Failed to fetch analytics", e);
        document.getElementById(`stat-likes-${id}`).textContent = 'Err';
        document.getElementById(`stat-reposts-${id}`).textContent = 'Err';
        document.getElementById(`stat-replies-${id}`).textContent = 'Err';
        document.getElementById(`stat-quotes-${id}`).textContent = 'Err';
    }
};

ui.btnSchedulePost.addEventListener('click', () => {
    if (!state.session) {
        alert('Please connect your account first.');
        return;
    }

    const text = ui.postComposerText.value.trim();
    if (!text) {
        alert('Main post cannot be empty.');
        return;
    }

    const timeStr = ui.postScheduledTime.value;
    if (!timeStr) {
        alert('Please select a scheduled time.');
        return;
    }

    const scheduledTime = new Date(timeStr).getTime();
    if (scheduledTime <= Date.now()) {
        alert('Scheduled time must be in the future.');
        return;
    }

    const postObj = {
        id: 'post_' + Date.now() + Math.random().toString(36).substr(2, 5),
        text: text,
        replyText: ui.postComposerReply.value.trim(),
        images: [...state.postImageFiles], // Store references to the File objects
        scheduledTime: scheduledTime,
        status: 'pending' // pending -> publishing -> done
    };

    state.scheduledPosts.push(postObj);

    // Reset UI
    ui.postComposerText.value = '';
    ui.postComposerReply.value = '';
    ui.postScheduledTime.value = '';
    ui.postCharCount.textContent = '0 / 300';
    ui.postCharCount.style.color = 'var(--text-light)';

    state.postImageFiles = [];
    ui.postImagePreview.innerHTML = '';
    ui.postComposerImages.value = '';

    renderPostQueue();
    schedLog(`📝 Post scheduled for ${new Date(scheduledTime).toLocaleString()}`);
});

function checkPostQueue() {
    const now = Date.now();
    for (const post of state.scheduledPosts) {
        if (post.status === 'pending' && now >= post.scheduledTime) {
            post.status = 'publishing';
            executeScheduledPost(post);
        }
    }
}

async function executeScheduledPost(post) {
    schedLog(`[POST SCHEDULER] Starting to publish scheduled post: "${post.text.substring(0, 30)}..."`);
    post.status = 'publishing';
    post.publishMessage = 'Starting...';
    renderPostQueue();

    try {
        let embed = null;

        // 1. Upload media (images/GIFs/video)
        if (post.images.length > 0) {
            const videoFiles = post.images.filter(f => isVideoFile(f));
            const imageFiles = post.images.filter(f => !isVideoFile(f));

            if (videoFiles.length > 0) {
                // Video embed
                schedLog(`[POST SCHEDULER] Uploading video...`);
                post.publishMessage = 'Uploading video...';
                renderPostQueue();
                const videoBlob = await uploadVideoBlob(videoFiles[0], state.session);
                embed = {
                    $type: 'app.bsky.embed.video',
                    video: videoBlob
                };
            } else if (imageFiles.length > 0) {
                // Image/GIF embed
                schedLog(`[POST SCHEDULER] Uploading ${imageFiles.length} image(s)...`);
                post.publishMessage = `Uploading ${imageFiles.length} image(s)...`;
                renderPostQueue();
                const uploadedBlobs = [];

                for (const file of imageFiles) {
                    const compressed = await compressImage(file);
                    const res = await fetch(`${PDS_URL}/xrpc/com.atproto.repo.uploadBlob`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${state.session.accessJwt}`,
                            'Content-Type': compressed.type
                        },
                        body: compressed
                    });

                    if (!res.ok) throw new Error(`Failed to upload image`);
                    const data = await res.json();
                    uploadedBlobs.push({
                        alt: '',
                        image: data.blob
                    });
                }

                embed = {
                    $type: 'app.bsky.embed.images',
                    images: uploadedBlobs
                };
            }
        }

        // 2. Create the main post record
        schedLog(`[POST SCHEDULER] Creating main post record...`);
        post.publishMessage = 'Creating post...';
        renderPostQueue();

        let mainFacets;
        try { mainFacets = await parseFacets(post.text); } catch (e) { console.warn('[FACETS] skipped:', e); }
        const rootPostData = {
            repo: state.session.did,
            collection: 'app.bsky.feed.post',
            record: {
                $type: 'app.bsky.feed.post',
                text: post.text,
                createdAt: new Date().toISOString(),
                ...(mainFacets ? { facets: mainFacets } : {}),
                ...(embed ? { embed } : {})
            }
        };

        const rootPostRes = await apiPost('com.atproto.repo.createRecord', rootPostData, true);
        schedLog(`[POST SCHEDULER] Main post published! URI: ${rootPostRes.uri}`);

        // Save URI for analytics
        post.uri = rootPostRes.uri;

        // 3. Create follow-up reply if any
        if (post.replyText) {
            schedLog(`[POST SCHEDULER] Creating follow-up threaded reply...`);
            post.publishMessage = 'Adding reply...';
            renderPostQueue();

            let replyFacets;
            try { replyFacets = await parseFacets(post.replyText); } catch (e) { console.warn('[FACETS] skipped:', e); }
            const replyData = {
                repo: state.session.did,
                collection: 'app.bsky.feed.post',
                record: {
                    $type: 'app.bsky.feed.post',
                    text: post.replyText,
                    createdAt: new Date().toISOString(),
                    ...(replyFacets ? { facets: replyFacets } : {}),
                    reply: {
                        root: { uri: rootPostRes.uri, cid: rootPostRes.cid },
                        parent: { uri: rootPostRes.uri, cid: rootPostRes.cid }
                    }
                }
            };
            await apiPost('com.atproto.repo.createRecord', replyData, true);
            schedLog(`[POST SCHEDULER] Follow-up reply published!`);
        }

        // 4. Update status and UI
        post.status = 'published';
        post.publishMessage = '';
        renderPostQueue();

    } catch (err) {
        post.status = 'error';
        post.error = err.message || 'Error occurred';
        renderPostQueue();
        schedLog(`[POST SCHEDULER] Error publishing post: ${err.message}`);
    }
}

// ──────────────────────────────────────────────
// INDEPENDENT POST QUEUE TIMER (fixes scheduling bug)
// checkPostQueue was previously only called from updateCountdown
// which only runs when the auto-scheduler is active. This ensures
// scheduled posts fire regardless.
// ──────────────────────────────────────────────
setInterval(checkPostQueue, 1000);

// ──────────────────────────────────────────────
// SUB-TAB SWITCHING (Post Now / Schedule)
// ──────────────────────────────────────────────
const subtabViews = {
    postNow: ui.subtabPostNow,
    scheduleLater: ui.subtabScheduleLater
};

ui.schedulerSubTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.sub-tab-btn');
    if (!btn) return;
    const target = btn.dataset.subtab;

    // Hide all subtab content
    Object.values(subtabViews).forEach(v => { if (v) v.style.display = 'none'; });
    // Remove active from all sub-tabs
    ui.schedulerSubTabs.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));

    // Show target
    if (subtabViews[target]) subtabViews[target].style.display = '';
    btn.classList.add('active');
});

// ──────────────────────────────────────────────
// POST NOW — Char count, images, immediate publish
// ──────────────────────────────────────────────
ui.postNowText.addEventListener('input', () => {
    const len = ui.postNowText.value.length;
    ui.postNowCharCount.textContent = `${len} / 300`;
    ui.postNowCharCount.style.color = len > 300 ? 'var(--red)' : 'var(--text-light)';
});

ui.postNowImages.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (state.postNowImageFiles.length + files.length > 4) {
        alert('Maximum 4 images allowed per post.');
        ui.postNowImages.value = '';
        return;
    }

    files.forEach(file => {
        state.postNowImageFiles.push(file);

        const container = document.createElement('div');
        container.className = 'image-preview-container';

        const img = document.createElement('img');
        img.className = 'image-preview-thumb';
        img.src = URL.createObjectURL(file);

        const removeBtn = document.createElement('div');
        removeBtn.className = 'image-preview-remove';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => {
            container.remove();
            state.postNowImageFiles = state.postNowImageFiles.filter(f => f !== file);
        };

        container.appendChild(img);
        container.appendChild(removeBtn);
        ui.postNowImagePreview.appendChild(container);
    });

    ui.postNowImages.value = '';
});

ui.btnPostNow.addEventListener('click', async () => {
    if (!state.session) {
        showMsg(ui.postNowMsg, 'Please connect your account on the Dashboard tab first.', 'error');
        return;
    }

    const text = ui.postNowText.value.trim();
    if (!text) {
        showMsg(ui.postNowMsg, 'Post text cannot be empty.', 'error');
        return;
    }

    if (text.length > 300) {
        showMsg(ui.postNowMsg, 'Post exceeds 300 character limit.', 'error');
        return;
    }

    hideMsg(ui.postNowMsg);
    ui.btnPostNow.disabled = true;
    ui.btnPostNow.querySelector('.btn-text').textContent = 'PUBLISHING...';

    try {
        let embed = null;

        // 1. Upload media (images/GIFs/video)
        if (state.postNowImageFiles.length > 0) {
            const videoFiles = state.postNowImageFiles.filter(f => isVideoFile(f));
            const imageFiles = state.postNowImageFiles.filter(f => !isVideoFile(f));

            if (videoFiles.length > 0) {
                // Video embed
                showMsg(ui.postNowMsg, 'Uploading video...', 'info');
                const videoBlob = await uploadVideoBlob(videoFiles[0], state.session);
                embed = {
                    $type: 'app.bsky.embed.video',
                    video: videoBlob
                };
            } else if (imageFiles.length > 0) {
                // Image/GIF embed  
                showMsg(ui.postNowMsg, `Uploading ${imageFiles.length} image(s)...`, 'info');
                const uploadedBlobs = [];

                for (const file of imageFiles) {
                    const compressed = await compressImage(file);
                    const res = await fetch(`${PDS_URL}/xrpc/com.atproto.repo.uploadBlob`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${state.session.accessJwt}`,
                            'Content-Type': compressed.type
                        },
                        body: compressed
                    });

                    if (!res.ok) throw new Error('Failed to upload image');
                    const data = await res.json();
                    uploadedBlobs.push({
                        alt: '',
                        image: data.blob
                    });
                }

                embed = {
                    $type: 'app.bsky.embed.images',
                    images: uploadedBlobs
                };
            }
        }

        // 2. Create the main post record
        showMsg(ui.postNowMsg, 'Creating post...', 'info');
        let mainFacets;
        try { mainFacets = await parseFacets(text); } catch (e) { console.warn('[FACETS] skipped:', e); }
        const rootPostData = {
            repo: state.session.did,
            collection: 'app.bsky.feed.post',
            record: {
                $type: 'app.bsky.feed.post',
                text: text,
                createdAt: new Date().toISOString(),
                ...(mainFacets ? { facets: mainFacets } : {}),
                ...(embed ? { embed } : {})
            }
        };

        const rootPostRes = await apiPost('com.atproto.repo.createRecord', rootPostData, true);

        // 3. Create follow-up reply if any
        const replyText = ui.postNowReply.value.trim();
        if (replyText) {
            showMsg(ui.postNowMsg, 'Adding reply...', 'info');
            let replyFacets;
            try { replyFacets = await parseFacets(replyText); } catch (e) { console.warn('[FACETS] skipped:', e); }
            const replyData = {
                repo: state.session.did,
                collection: 'app.bsky.feed.post',
                record: {
                    $type: 'app.bsky.feed.post',
                    text: replyText,
                    createdAt: new Date().toISOString(),
                    ...(replyFacets ? { facets: replyFacets } : {}),
                    reply: {
                        root: { uri: rootPostRes.uri, cid: rootPostRes.cid },
                        parent: { uri: rootPostRes.uri, cid: rootPostRes.cid }
                    }
                }
            };
            await apiPost('com.atproto.repo.createRecord', replyData, true);
        }

        // 4. Success! Reset the form
        showMsg(ui.postNowMsg, '✓ Post published successfully!', 'success');
        ui.postNowText.value = '';
        ui.postNowReply.value = '';
        ui.postNowCharCount.textContent = '0 / 300';
        ui.postNowCharCount.style.color = 'var(--text-light)';
        state.postNowImageFiles = [];
        ui.postNowImagePreview.innerHTML = '';
        ui.postNowImages.value = '';

    } catch (err) {
        showMsg(ui.postNowMsg, `Error: ${err.message}`, 'error');
    } finally {
        ui.btnPostNow.disabled = false;
        ui.btnPostNow.querySelector('.btn-text').textContent = 'PUBLISH NOW';
    }
});
