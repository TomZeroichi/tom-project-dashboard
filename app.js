import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.116.0/+esm';

const CONFIG = window.TOM_DASHBOARD_CONFIG || {};
const hasRemote = Boolean(CONFIG.supabaseUrl && CONFIG.supabasePublishableKey);
const supabase = hasRemote ? createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
}) : null;

const CATEGORY_COLORS = {
  '物販': '#0d73e8',
  '自動化': '#ff8b22',
  'FX・EA': '#ed4b58',
  '業務ツール': '#7656e8',
  'リサーチ': '#0aa7c7'
};
const PRIORITY_SCORE = { '高': 3, '中': 2, '低': 1 };

const fallbackProjects = [
  { id:1, sort_order:1, name:'TOM eBay Manager', subtitle:'eBay販売・実在庫・利益管理', category:'物販', progress:78, status:'開発中', priority:'高', owner_name:'Ryu', current_work:['出品・利益計算・保存・在庫監視・eBay API','ユーザー別連携・実在庫/QR/SKU/棚管理','KDC-20 読取対応'], next_work:['棚移動時のエラー修正','外注アカウント対応','VPS / 本番運用の最終調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:2, sort_order:2, name:'TOM Coupang Manager', subtitle:'韓国EC対応・Multi Channel構想', category:'物販', progress:20, status:'構想', priority:'中', owner_name:'Ryu', current_work:['eBay Managerをベースに韓国EC対応を計画','Coupang・11番街・NAVER・Bunjangを調査'], next_work:['各ECモールの仕様/API調査','基本機能の設計・開発着手','将来的にTOM Multi Channelへ統合'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:3, sort_order:3, name:'TOM買取サイト', subtitle:'eBay輸出向けオンライン買取', category:'物販', progress:68, status:'開発中', priority:'高', owner_name:'Ryu', current_work:['GitHub / Railway本番環境','管理画面・商品管理・会員登録','eKYC導線まで進行'], next_work:['本人確認フロー・eKYC安定化','UI・フォント調整','申込フロー最終改善'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:4, sort_order:4, name:'TOM Amazon Monitor', subtitle:'在庫復活・価格監視・購入支援', category:'自動化', progress:82, status:'検証中', priority:'高', owner_name:'Ryu', current_work:['VPS高速監視・Chrome拡張・LINE通知','1分監視まで実装'], next_work:['通知→カート投入の自動化','購入アシスト・自動購入機能','安定運用・誤検知対策'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:5, sort_order:5, name:'ROLEX予約アシスト', subtitle:'ROLEX正規店予約支援アプリ', category:'自動化', progress:72, status:'開発中', priority:'高', owner_name:'Ryu', current_work:['Androidアプリ・Square課金','Firebase会員・Webhook連携','v0.6.9付近まで進行'], next_work:['ログイン画面・会員認証統合','安定性・通知精度向上','本番リリース準備'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:6, sort_order:6, name:'TOM FX ZERO', subtitle:'高機能FX自動売買・取引支援', category:'FX・EA', progress:80, status:'検証中', priority:'高', owner_name:'Ryu', current_work:['複数ポジ一括決済・BUY/SELL別決済','指標・ゴトー日・予約・ナンピン・TP/SL','複数ブローカー対応'], next_work:['iPhone秒指定対応','Realtime通信 HTTP 413対策','画面挙動の修正・最終調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:7, sort_order:7, name:'TOM HAMON EA', subtitle:'MT4 GOLD両建てリカバリーEA', category:'FX・EA', progress:67, status:'検証中', priority:'高', owner_name:'Ryu', current_work:['Stop配置・Recovery・ロット増加','時間制御・自動ロット','基本ロジックの検証'], next_work:['表示まわり改善','予約取消・一括決済機能調整','注文段数・間隔など不具合修正'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:8, sort_order:8, name:'HAMON / Fintokei検証版', subtitle:'Fintokei条件を想定した検証環境', category:'FX・EA', progress:45, status:'検証中', priority:'中', owner_name:'Ryu', current_work:['XMデモ環境で検証','DD・最大含み損・Recovery','滑り・スプレッド等の詳細ログ取得'], next_work:['ロジック最適化','検証データ蓄積・分析','実運用想定パラメータ調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:9, sort_order:9, name:'TOM MT4 Latency Optimizer / Route Scanner', subtitle:'通信品質・最適経路・RTT監視', category:'FX・EA', progress:62, status:'検証中', priority:'中', owner_name:'Ryu', current_work:['Remote Endpoint取得成功','TCP Avg約5ms台・Success 100%確認','EA側Ping表示を実装中'], next_work:['EA Bridge安定化','注文RTT計測','最適サーバー判定・安全Failover'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:10, sort_order:10, name:'ぼたん セルフ会計', subtitle:'焼肉店向け注文・会計補助PWA', category:'業務ツール', progress:92, status:'運用中', priority:'低', owner_name:'Ryu', current_work:['注文履歴・未提供・会計','飲み放題タイマー・延長・クーポン','GitHub Pages公開済み'], next_work:['UI微調整','価格・タイマー挙動の最終確認','安定運用'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:11, sort_order:11, name:'TOM エントリーマネージャー', subtitle:'抽選・応募・受注・イベント管理', category:'業務ツール', progress:88, status:'運用中', priority:'中', owner_name:'Ryu', current_work:['抽選・応募者全員サービス','期間限定受注・キャンペーン・イベント統合','公開V2.53'], next_work:['Safari互換性改善','安定化','運用データに基づく微調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:12, sort_order:12, name:'eBay利益計算・商品リサーチツール', subtitle:'利益計算＋商品リサーチ', category:'物販', progress:88, status:'運用中', priority:'中', owner_name:'Ryu', current_work:['Netlify本番＋dev/Deploy Preview運用','既存機能を維持しながら拡張'], next_work:['商品リサーチ機能拡張','分析精度改善','実運用フィードバック反映'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:13, sort_order:13, name:'TOM購入証跡・仕入れ管理 Chrome拡張', subtitle:'購入履歴・台帳・仕入れ証跡管理', category:'物販', progress:75, status:'開発中', priority:'中', owner_name:'Ryu', current_work:['購入履歴取り込み','台帳バックアップ','テストモード実装'], next_work:['販路別取り込み拡張','eBay Manager連携検討','導入手順整備'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:14, sort_order:14, name:'TOM NEXT', subtitle:'商品分析・トレンドリサーチ基盤', category:'リサーチ', progress:40, status:'開発中', priority:'中', owner_name:'Ryu', current_work:['FastAPI環境構築','アプリ起動まで確認'], next_work:['SNS増加率データ取得','在庫変化率・販売数増加率取得','分析ロジック実装'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:15, sort_order:15, name:'iFOREX自動エントリーツール', subtitle:'iFOREX注文操作自動化', category:'自動化', progress:25, status:'構想', priority:'低', owner_name:'Ryu', current_work:['iFOREXデモ環境で操作確認','WTI等の注文画面・証拠金検証'], next_work:['自動操作方式決定','注文条件設計','デモで安全検証'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:16, sort_order:16, name:'仮想ナンピンEA', subtitle:'XM KIWAMI・GOLD#向けEA', category:'FX・EA', progress:18, status:'構想', priority:'中', owner_name:'Ryu', current_work:['仮想ポジション管理の仕様策定','実エントリーロジック検討'], next_work:['エントリーロジック確定','リスク制御設計','EA初期版実装'], updated_at:'2026-09-18T10:00:00+09:00' }
];

const els = Object.fromEntries([
  'liveState','loginBtn','logoutBtn','overallProgress','overallBar','projectCount','devCount','testCount','liveCount',
  'categoryFilter','statusFilter','sortFilter','searchInput','projectGrid','lastSync','notice','loginDialog','loginForm',
  'loginEmail','loginPassword','loginMessage','editDialog','editForm','editId','editTitle','editProgress','editStatus',
  'editPriority','editOwner','editCurrent','editNext','editMessage','editCancel'
].map(id => [id, document.getElementById(id)]));

let projects = [];
let canEdit = false;
let currentUser = null;
let channel = null;

function escapeHtml(value='') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function safeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === 'string') return value.split(/\r?\n/).map(v=>v.trim()).filter(Boolean);
  return [];
}
function formatDate(value) {
  if (!value) return '--';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '--';
  return new Intl.DateTimeFormat('ja-JP',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(d);
}
function showNotice(message, type='info') {
  els.notice.textContent = message;
  els.notice.classList.remove('hidden');
  els.notice.style.background = type === 'error' ? '#ffecef' : '#fff6d8';
  els.notice.style.borderColor = type === 'error' ? '#f4b5bf' : '#f0db8a';
  els.notice.style.color = type === 'error' ? '#9d2637' : '#6c5612';
}
function hideNotice(){ els.notice.classList.add('hidden'); }

function populateCategories() {
  const previous = els.categoryFilter.value;
  const values = [...new Set(projects.map(p=>p.category).filter(Boolean))].sort();
  els.categoryFilter.innerHTML = '<option value="all">すべて</option>' + values.map(v=>`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('');
  if (values.includes(previous)) els.categoryFilter.value = previous;
}
function getFilteredProjects() {
  const cat = els.categoryFilter.value;
  const status = els.statusFilter.value;
  const q = els.searchInput.value.trim().toLowerCase();
  let list = projects.filter(p => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (status !== 'all' && p.status !== status) return false;
    if (q) {
      const hay = [p.name,p.subtitle,p.category,p.status,p.owner_name,...safeArray(p.current_work),...safeArray(p.next_work)].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  switch (els.sortFilter.value) {
    case 'progress_desc': list.sort((a,b)=>(b.progress||0)-(a.progress||0)); break;
    case 'updated_desc': list.sort((a,b)=>new Date(b.updated_at||0)-new Date(a.updated_at||0)); break;
    case 'priority': list.sort((a,b)=>(PRIORITY_SCORE[b.priority]||0)-(PRIORITY_SCORE[a.priority]||0) || (a.sort_order||0)-(b.sort_order||0)); break;
    default: list.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
  }
  return list;
}
function renderSummary() {
  const count = projects.length || 1;
  const overall = Math.round(projects.reduce((s,p)=>s+(Number(p.progress)||0),0)/count);
  els.overallProgress.textContent = `${projects.length ? overall : 0}%`;
  els.overallBar.style.width = `${projects.length ? overall : 0}%`;
  els.projectCount.textContent = projects.length;
  els.devCount.textContent = projects.filter(p=>p.status==='開発中').length;
  els.testCount.textContent = projects.filter(p=>p.status==='検証中').length;
  els.liveCount.textContent = projects.filter(p=>p.status==='運用中').length;
}
function renderProjects() {
  renderSummary();
  populateCategories();
  const list = getFilteredProjects();
  if (!list.length) {
    els.projectGrid.innerHTML = '<div class="empty">条件に一致するプロジェクトがありません。</div>';
    return;
  }
  els.projectGrid.innerHTML = list.map(p=>{
    const color = CATEGORY_COLORS[p.category] || '#0d73e8';
    const current = safeArray(p.current_work);
    const next = safeArray(p.next_work);
    const progress = Math.max(0,Math.min(100,Number(p.progress)||0));
    return `<article class="project-card" style="--category-color:${color}">
      <div class="project-number">${Number(p.sort_order)||''}</div>
      <div class="project-main">
        <div class="project-top">
          <div><h2 class="project-title">${escapeHtml(p.name)}</h2><p class="project-subtitle">${escapeHtml(p.subtitle||'')}</p></div>
          <div class="badges"><span class="badge category">${escapeHtml(p.category||'その他')}</span><span class="badge status-${escapeHtml(p.status||'開発中')}">${escapeHtml(p.status||'開発中')}</span><span class="badge">優先度 ${escapeHtml(p.priority||'中')}</span></div>
        </div>
        <div class="progress-row"><strong class="progress-value">${progress}%</strong><div class="progress-mini" aria-label="進捗 ${progress}%"><span style="width:${progress}%"></span></div><span class="owner">担当: ${escapeHtml(p.owner_name||'未設定')}</span></div>
        <div class="work-grid">
          <section class="work-box"><h3>現在の作業</h3><ul>${current.map(v=>`<li>${escapeHtml(v)}</li>`).join('') || '<li>未登録</li>'}</ul></section>
          <section class="work-box"><h3>次の作業</h3><ul>${next.map(v=>`<li>${escapeHtml(v)}</li>`).join('') || '<li>未登録</li>'}</ul></section>
        </div>
        <div class="card-footer"><span>最終更新 ${formatDate(p.updated_at)}</span>${canEdit ? `<button type="button" class="edit-btn" data-edit-id="${p.id}">編集</button>` : ''}</div>
      </div>
    </article>`;
  }).join('');
  els.projectGrid.querySelectorAll('[data-edit-id]').forEach(btn=>btn.addEventListener('click',()=>openEditor(btn.dataset.editId)));
}

async function loadProjects() {
  if (!supabase) {
    projects = fallbackProjects.map(p=>({...p}));
    els.liveState.textContent = '● デモデータ表示';
    els.liveState.className = 'live-pill demo';
    els.lastSync.textContent = 'Supabase接続後にリアルタイム同期';
    showNotice('現在は初期データのプレビューです。Supabase接続後、自動的にリアルタイムダッシュボードへ切り替わります。');
    renderProjects();
    return;
  }
  hideNotice();
  const { data, error } = await supabase.from('projects').select('*').order('sort_order',{ascending:true});
  if (error) {
    showNotice(`データ取得エラー: ${error.message}`, 'error');
    return;
  }
  projects = data || [];
  els.lastSync.textContent = `最終同期: ${formatDate(new Date().toISOString())}`;
  renderProjects();
}

async function detectPermission() {
  if (!supabase) return;
  const { data:{ session } } = await supabase.auth.getSession();
  currentUser = session?.user || null;
  canEdit = false;
  if (currentUser) {
    const { data } = await supabase.from('project_members').select('role,active').eq('user_id',currentUser.id).maybeSingle();
    canEdit = Boolean(data?.active && ['admin','editor'].includes(data.role));
  }
  els.loginBtn.classList.toggle('hidden',Boolean(currentUser));
  els.logoutBtn.classList.toggle('hidden',!currentUser);
  renderProjects();
}

function subscribeRealtime() {
  if (!supabase) return;
  if (channel) supabase.removeChannel(channel);
  channel = supabase.channel('tom-projects-public')
    .on('postgres_changes',{event:'*',schema:'public',table:'projects'},async()=>{ await loadProjects(); })
    .subscribe(status=>{
      if (status === 'SUBSCRIBED') {
        els.liveState.textContent = '● リアルタイム接続';
        els.liveState.className = 'live-pill connected';
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        els.liveState.textContent = '● 再接続中';
        els.liveState.className = 'live-pill';
      }
    });
}

function openEditor(id) {
  if (!canEdit) return;
  const p = projects.find(x=>String(x.id)===String(id));
  if (!p) return;
  els.editId.value = p.id;
  els.editTitle.textContent = p.name;
  els.editProgress.value = p.progress ?? 0;
  els.editStatus.value = p.status || '開発中';
  els.editPriority.value = p.priority || '中';
  els.editOwner.value = p.owner_name || '';
  els.editCurrent.value = safeArray(p.current_work).join('\n');
  els.editNext.value = safeArray(p.next_work).join('\n');
  els.editMessage.textContent = '';
  els.editDialog.showModal();
}

els.loginBtn.addEventListener('click',()=>{ els.loginMessage.textContent=''; els.loginDialog.showModal(); });
els.logoutBtn.addEventListener('click',async()=>{ if(supabase){ await supabase.auth.signOut(); await detectPermission(); } });
els.loginForm.addEventListener('submit',async e=>{
  e.preventDefault();
  if (!supabase) { els.loginMessage.textContent='Supabase接続後にログインできます。'; return; }
  els.loginMessage.textContent='ログイン中…';
  const { error } = await supabase.auth.signInWithPassword({ email:els.loginEmail.value.trim(), password:els.loginPassword.value });
  if (error) { els.loginMessage.textContent=error.message; return; }
  els.loginDialog.close();
  els.loginPassword.value='';
  await detectPermission();
});
els.editCancel.addEventListener('click',()=>els.editDialog.close());
els.editForm.addEventListener('submit',async e=>{
  e.preventDefault();
  if (!supabase || !canEdit) { els.editMessage.textContent='編集権限がありません。'; return; }
  const progress = Math.max(0,Math.min(100,Number(els.editProgress.value)||0));
  const payload = {
    progress,
    status:els.editStatus.value,
    priority:els.editPriority.value,
    owner_name:els.editOwner.value.trim(),
    current_work:safeArray(els.editCurrent.value),
    next_work:safeArray(els.editNext.value),
    updated_by:currentUser?.id || null
  };
  els.editMessage.textContent='保存中…';
  const { error } = await supabase.from('projects').update(payload).eq('id',els.editId.value);
  if (error) { els.editMessage.textContent=error.message; return; }
  els.editDialog.close();
});
['categoryFilter','statusFilter','sortFilter'].forEach(k=>els[k].addEventListener('change',renderProjects));
els.searchInput.addEventListener('input',renderProjects);

if (supabase) {
  supabase.auth.onAuthStateChange(()=>setTimeout(detectPermission,0));
  await loadProjects();
  await detectPermission();
  subscribeRealtime();
} else {
  await loadProjects();
}
