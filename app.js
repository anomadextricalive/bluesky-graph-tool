const ui = {
    loginPanel: document.getElementById('loginPanel'),
    inputHandle: document.getElementById('inputHandle'),
    inputPassword: document.getElementById('inputPassword'),
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
    btnClearLog: document.getElementById('btnClearLog')
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

function appendLog(text, isError = false) {
    ui.logSection.style.display = 'block';
    const span = document.createElement('span');
    span.textContent = text + '\n';
    if (isError) span.style.color = 'var(--red)';
    ui.logConsole.appendChild(span);
    ui.logConsole.scrollTop = ui.logConsole.scrollHeight;
}

// ──────────────────────────────────────────────
// 2. AT PROTOCOL API WRAPPERS
// ──────────────────────────────────────────────
const PDS_URL = 'https://bsky.social';

async function apiPost(endpoint, body, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && state.session) headers['Authorization'] = `Bearer ${state.session.accessJwt}`;
    const res = await fetch(`${PDS_URL}/xrpc/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    });
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

        // Update UI
        hideMsg(ui.loginMsg);
        ui.inputHandle.disabled = true;
        ui.inputPassword.disabled = true;
        ui.btnLogin.style.display = 'none';
        ui.btnLogout.style.display = '';

        ui.connectedUser.style.display = 'flex';
        ui.connectedAvatar.src = profile.avatar || generateAvatar(profile.handle);
        ui.connectedName.textContent = profile.displayName || profile.handle;
        ui.connectedHandle.textContent = `@${profile.handle}`;
        ui.connectedFollowers.textContent = formatNum(profile.followersCount);
        ui.connectedFollowing.textContent = formatNum(profile.followsCount);
        ui.connectedPosts.textContent = formatNum(profile.postsCount);

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
