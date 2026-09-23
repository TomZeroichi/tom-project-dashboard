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
const PROJECT_LOGOS = {
  6: 'data:image/png;base64,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',
  7: 'data:image/png;base64,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cuRhO3r8k49wxsm7HX/MEXYctNX8/Mh43FSbekJBrQgxU4vqAAlFJLRqpmZipqgVRQyKkCLJaJTu37/g1jvuccXnb8jlV9/o6i/e3C/felfuvOte9993n317H23WrM/8mjXWrRll66b1jjj8YLuPOqQnHbfLU049zgm7j7Bx44YslI5bg5BSE0Eti0Fo1WPFICaCIgahBpXc+eD+vYgQkiiCGsQgJEHFoCZSBIlBBig33XKHD15wiX/6xGfceNu9WTM3svOgLd158DY7tm+zdfPGzI3ikUcedc+997ntrvvcfNvdvfHmW3Pfg3utW7fW7icd7DnPOM1LX3CWp512bLdu3mjc0pqomThAzNSimqoVMYikWisSlCahtVqtiEEiieDuex900eVfyD9+9DLnf+Izrrvpzj66n41rOGTHluw64rAedvBWWzat76ZNG7Nh/Xp79+/PPffc7/a77nbbnfe4574HNXNO2n2kr3/+mX3hc8505JMOMehAUYMiqBrUipYSi2pQEzVotSGkpdXc+eD+vYgwSlCLggYJQiyqidTMKDEK1994q3d98KJ84tKrbVg76jPOPDlPP+MExx11qC1bNpI5o1HMz43MJcathYUFCwtjex5+1K23352rr7vZRy++shd84jLX3XSnjevXOuv0E7z6lc/z9c8/045tm43HNW7FAYJaElo1iAPEKqVILIukWl9RYpS4854H/MP5l/qzt3/IZVdeb+/efQ7budnTzzjJM888yWkn7HLU4TuzY8fWbli3VpJKMpcQ9u0fe3jvfg8/us+D99/v2utv9bFPXeWiS6+gIy97ybN868ue49CdB3X/uNpaVDERtBWDVusAadVEB4kWQaXa3Png/r0JIkFIKYImxCDEKhVkNIo9ex72zvdd6PyPX96nnHZcXvycp3X3rsOsWbvWICMVOm4VoxASIaaCUWI0Yt++hdxy+9298NKr/c17PuqCT37W2Mjzzjnda7/j67zwmadbu2beeDwmqBUh1ZqKqJpKDBJapFVLImoigqolCa2J0Whkz8OPet8Fn/amv/xHn7jkSmvnee45T/WyFz7dM8882e4jD7F+3VrFuDWuQaXpWLUm0jAuEfOjSNi7UPff/6ArPned93z4ktx973191cue43nPfpq5uTkdWBIzpbSVUjNBWxNFDYoSldLc+dD+vSlGElNBDYKEoEhQEynmRnHjTbflbe/8Jxs3rveyFz/DMUcdLonOmEgIYlEIIhKDmgghilFkNBr1/gce8pFPfNZb/vpDLrj4ShvWzvnOb3qB133PN9p1xCHG49IioUXNRAhtSSxKzJRqLYlYUSsSE0lcc93Nfust7/K3/3Ch8cLYC845xfd924s99xmn27xpg5Z2HKLaoCiNaBm3ahCClqAmYpCM4tG9+3PZldd6zwc+3qOPONS3vfL53bhpo/G4lsVEW2pQakWpmqhBiUEraO56aP9eJLEkKDJoVFASKzK45os3+sAFn/bMM0929hnHZ5wRrTVzo45LjBvNuARzcyMJLR0XlVjSmEoRxExGI/fc96C/fs9H/f7/fpfrbrzdOU89yc/922/33GecKqJtUIuSdCAxiEWhiGoNUoqYSi0JaVQlFhYWvPtDn/Jrv/82n7v2y55y8pP98He/zDe+8Czbt240Hte4NQhKVEVaEzUI0VIxGqVzIzqucaVm9pfxuAYZjdK9jz7qk5+6orffeZ8XP/8sW7duSQdmalAzrYkYlBq0qoipErQldz60f1+QiJkahIgGQRFikMH1N9zi89fe4KlPPdkhB2/P/Egf2bvg3nvvd/Mtd7j2hlvdcec9HtzziEcfecTcXBxyyMGOPOxgu56009FPOsSOg7aYnxsZj6sqpoqYCWowGoVyxTU3+G9/+Pfe+f5P2Ll9k9f/m1f7V694nvn5OdWoGsQgJmoqoRbVgWJRa6IIMhqNev+De/zun7zb7/3Ju3Rhv+/6lhfndd/zck8+6tCOW2pQJaG1JKWpSBglFsZ13/0Puf7mO3zpy7e565773Xv/Ho888rC1a9fYefB2Rx6+0zFHHuaoww/OunVru1Dmotdef4ubbr3b004/zvp1aw1qlaIGlVIEbS2pQQla5M6H9u8LQkzERBNB4wAZeOD+B3PjTbc65YSjM1qzrvff/6BLLr/Guz90cS674jo33363hx58oOvWrbVhw3q6PwvjsYVxLDTWjNh12EGeeebJXvycpzn7KSfYsX2LDsatUMSiGCS0RqOR+x7Y4w/+7L1+9y3vNB7zUz/8rf71d36DdevWpONWIpa0ZhLLiqCmkqpFbU1kNBrl1jvu6S//zl/607d/yDFHHJKf/ZFX91u+/lnWrV1jYTxOTES1SGhNNaSJ4MGHHnbF52904SWf87lrb/DQw48apTK3xsK47rv3ntxx933ue/CRPvLwo7Zv3eIppxyb551zWp/3rKc65qhDu2Dk/gceMmds8+aNWrWoDpBxVRExaNVMa0Xuemj/PoNEDFpGUSGWxaKQRx7Za+3aeQv79uXdH/6Uv3jn+b308muMF/Y77aRjPf30JzvlhF2evOtw27duMjc3h3rooYfddue9rr7uZhd9+up85qov9qGH9zrthKP9q1c+z8teeLZDd27XlhZBCRrURBL7F8be9p6P5o2//Ze9594H/dvvf7kf+8FXZuP69R23YqIGNQixWlDLakXLaDRyw8135PW//pb+/Qc+7rnPOD2/+BOv6VlnHK+ttoqIiaqgViTxyKN7c8U1X+5V19xoYWGhRx95SI46/GA7d2yzYf0aEi379i944KFH3HHXva665nrnf/JKF1x0pVtvu8NxT97l1a94nld8/bPtOvJQabswronSoA7UUmJRqZoqLYLc9dD+fYmJtAQZaSyLA2VuNPKZq67L7/3h2/v+8z+Vubn5vujZZ/TVr3x+znnqibZt22xubq5RralRZGCirUcf3ev6L9+Wj3zis/2b937U575wo5OOO9r3verFvukl59i2dbOFhQVTSbRKYxCJtPjARy/Lz/7qH/WmW+7yYz/4TX7itd+U9evWtR2bCDUTMxEzNVFLkrQ6GsU1X7rFT//KHzr/k1f4pq99hv/w49/tmCMPMR6XDkxFDEJrEInWoPbt2+/aG2/rwv5xjj5yZ7ds2tiMoqWtiVaqSAkhiX379rnuhlv97Xs/lr9698fcfOudOfnJh/X/fe2rvOxrzzE2p9qYailFUoNSYkVbS1q0zJ378+edF1OJmSAxiEHMxKCVD5z/KT/7n97kYxd9Jicdd5Rf+PHX+Dff/8qceuIx1q9fW1PVcbVFo6rVjg2yZm7OoQdvy1lPOcHLXnS2E558lMuvvt6fvv2Drrj6hhxx2MGedNgOo7lRtCViKmgSUccfc3hOPeHoXPyZa7zv/E9bt3ats844NvNzc5EYxCDEarEkCCEyGsW119/ix9/4Zhd84vJ877e+yC//1PfmiEMPMm5NhSSmYpAIRUxE0MiObVscedhBWbd2jRK1ooSgpqpqXDIaOfigbZ599imee/Ypuee++330os/mnz55Vdo67cRjrF27xoFiECvi8WqVuZ99w3nnmYkgBIklMZNR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'
};

const fallbackProjects = [
  { id:1, sort_order:1, name:'TOM eBay Manager', subtitle:'eBay販売・実在庫・利益管理', category:'物販', progress:78, status:'開発中', priority:'高', owner_name:'Ryu', current_work:['出品・利益計算・保存・在庫監視・eBay API','ユーザー別連携・実在庫/QR/SKU/棚管理','KDC-20 読取対応'], next_work:['棚移動時のエラー修正','外注アカウント対応','VPS / 本番運用の最終調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:2, sort_order:2, name:'TOM Coupang Manager', subtitle:'韓国EC対応・Multi Channel構想', category:'物販', progress:20, status:'構想', priority:'中', owner_name:'Ryu', current_work:['eBay Managerをベースに韓国EC対応を計画','Coupang・11番街・NAVER・Bunjangを調査'], next_work:['各ECモールの仕様/API調査','基本機能の設計・開発着手','将来的にTOM Multi Channelへ統合'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:3, sort_order:3, name:'TOM買取サイト', subtitle:'eBay輸出向けオンライン買取', category:'物販', progress:68, status:'開発中', priority:'高', owner_name:'Ryu', project_url:'https://tom-kaitori-production.up.railway.app/member.html', admin_url:'https://railway.app/dashboard', external_services:[{name:'GitHub',url:'https://github.com/TomZeroichi/tom-kaitori'},{name:'Railway',url:'https://railway.app/dashboard'}], current_work:['GitHub / Railway本番環境','管理画面・商品管理・会員登録','eKYC導線まで進行'], next_work:['本人確認フロー・eKYC安定化','UI・フォント調整','申込フロー最終改善'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:4, sort_order:4, name:'TOM Amazon Monitor', subtitle:'在庫復活・価格監視・購入支援', category:'自動化', progress:82, status:'検証中', priority:'高', owner_name:'Ryu', current_work:['VPS高速監視・Chrome拡張・LINE通知','1分監視まで実装'], next_work:['通知→カート投入の自動化','購入アシスト・自動購入機能','安定運用・誤検知対策'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:5, sort_order:5, name:'ROLEX予約アシスト', subtitle:'ROLEX正規店予約支援アプリ', category:'自動化', progress:72, status:'開発中', priority:'高', owner_name:'Ryu', admin_url:'https://console.firebase.google.com/', external_services:[{name:'Firebase',url:'https://console.firebase.google.com/'},{name:'Square',url:'https://squareup.com/dashboard/'},{name:'Google Drive',url:'https://drive.google.com/'}], current_work:['Androidアプリ・Square課金','Firebase会員・Webhook連携','v0.6.9付近まで進行'], next_work:['ログイン画面・会員認証統合','安定性・通知精度向上','本番リリース準備'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:6, sort_order:6, name:'TOM FX ZERO', subtitle:'高機能FX自動売買・取引支援', category:'FX・EA', progress:80, status:'検証中', priority:'高', owner_name:'Ryu', current_work:['複数ポジ一括決済・BUY/SELL別決済','指標・ゴトー日・予約・ナンピン・TP/SL','複数ブローカー対応'], next_work:['iPhone秒指定対応','Realtime通信 HTTP 413対策','画面挙動の修正・最終調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:7, sort_order:7, name:'TOM Nexus EA', subtitle:'MT4 GOLD両建てリカバリーEA', category:'FX・EA', progress:67, status:'検証中', priority:'高', owner_name:'Ryu', current_work:['Stop配置・Recovery・ロット増加','時間制御・自動ロット','基本ロジックの検証'], next_work:['表示まわり改善','予約取消・一括決済機能調整','注文段数・間隔など不具合修正'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:8, sort_order:8, name:'HAMON / Fintokei検証版', subtitle:'Fintokei条件を想定した検証環境', category:'FX・EA', progress:45, status:'検証中', priority:'中', owner_name:'Ryu', current_work:['XMデモ環境で検証','DD・最大含み損・Recovery','滑り・スプレッド等の詳細ログ取得'], next_work:['ロジック最適化','検証データ蓄積・分析','実運用想定パラメータ調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:9, sort_order:9, name:'TOM MT4 Latency Optimizer / Route Scanner', subtitle:'通信品質・最適経路・RTT監視', category:'FX・EA', progress:62, status:'検証中', priority:'中', owner_name:'Ryu', current_work:['Remote Endpoint取得成功','TCP Avg約5ms台・Success 100%確認','EA側Ping表示を実装中'], next_work:['EA Bridge安定化','注文RTT計測','最適サーバー判定・安全Failover'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:10, sort_order:10, name:'ぼたん セルフ会計', subtitle:'焼肉店向け注文・会計補助PWA', category:'業務ツール', progress:92, status:'運用中', priority:'低', owner_name:'Ryu', project_url:'https://tomzeroichi.github.io/botan-order-counter/', external_services:[{name:'GitHub',url:'https://github.com/TomZeroichi/botan-order-counter'}], current_work:['注文履歴・未提供・会計','飲み放題タイマー・延長・クーポン','GitHub Pages公開済み'], next_work:['UI微調整','価格・タイマー挙動の最終確認','安定運用'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:11, sort_order:11, name:'TOM エントリーマネージャー', subtitle:'抽選・応募・受注・イベント管理', category:'業務ツール', progress:88, status:'運用中', priority:'中', owner_name:'Ryu', project_url:'https://tomzeroichi.github.io/chusenkanri-db/', external_services:[{name:'GitHub',url:'https://github.com/TomZeroichi/chusenkanri-db'}], current_work:['抽選・応募者全員サービス','期間限定受注・キャンペーン・イベント統合','公開V2.53'], next_work:['Safari互換性改善','安定化','運用データに基づく微調整'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:12, sort_order:12, name:'eBay利益計算・商品リサーチツール', subtitle:'利益計算＋商品リサーチ', category:'物販', progress:88, status:'運用中', priority:'中', owner_name:'Ryu', admin_url:'https://app.netlify.com/', external_services:[{name:'Netlify',url:'https://app.netlify.com/'}], current_work:['Netlify本番＋dev/Deploy Preview運用','既存機能を維持しながら拡張'], next_work:['商品リサーチ機能拡張','分析精度改善','実運用フィードバック反映'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:13, sort_order:13, name:'TOM購入証跡・仕入れ管理 Chrome拡張', subtitle:'購入履歴・台帳・仕入れ証跡管理', category:'物販', progress:75, status:'開発中', priority:'中', owner_name:'Ryu', admin_url:'https://drive.google.com/', external_services:[{name:'Google Drive',url:'https://drive.google.com/'}], current_work:['購入履歴取り込み','台帳バックアップ','テストモード実装'], next_work:['販路別取り込み拡張','eBay Manager連携検討','導入手順整備'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:14, sort_order:14, name:'TOM NEXT', subtitle:'商品分析・トレンドリサーチ基盤', category:'リサーチ', progress:40, status:'開発中', priority:'中', owner_name:'Ryu', current_work:['FastAPI環境構築','アプリ起動まで確認'], next_work:['SNS増加率データ取得','在庫変化率・販売数増加率取得','分析ロジック実装'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:15, sort_order:15, name:'iFOREX自動エントリーツール', subtitle:'iFOREX注文操作自動化', category:'自動化', progress:25, status:'構想', priority:'低', owner_name:'Ryu', current_work:['iFOREXデモ環境で操作確認','WTI等の注文画面・証拠金検証'], next_work:['自動操作方式決定','注文条件設計','デモで安全検証'], updated_at:'2026-09-18T10:00:00+09:00' },
  { id:16, sort_order:16, name:'仮想ナンピンEA', subtitle:'XM KIWAMI・GOLD#向けEA', category:'FX・EA', progress:18, status:'構想', priority:'中', owner_name:'Ryu', current_work:['仮想ポジション管理の仕様策定','実エントリーロジック検討'], next_work:['エントリーロジック確定','リスク制御設計','EA初期版実装'], updated_at:'2026-09-18T10:00:00+09:00' }
];

const els = Object.fromEntries([
  'liveState','loginBtn','logoutBtn','overallProgress','overallBar','projectCount','stale3Count','stale7Count','statusSummary',
  'categoryFilter','statusFilter','updateFilter','sortFilter','searchInput','projectGrid','lastSync','notice','loginDialog','loginForm',
  'loginEmail','loginPassword','loginMessage','editDialog','editForm','editId','editTitle','editProgress','editStatus',
  'editPriority','editOwner','editProjectUrl','editAdminUrl','editServices','editCurrent','editNext','editMessage','editCancel'
].map(id => [id, document.getElementById(id)]));

let projects = [];
let canEdit = false;
let currentUser = null;
let channel = null;

function escapeHtml(value='') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function safeProjectUrl(value='') {
  try {
    const url = new URL(String(value).trim());
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}
function serviceLogo(name='') {
  const known = { 'github':'github', 'supabase':'supabase', 'railway':'railway', 'netlify':'netlify', 'firebase':'firebase', 'square':'square', 'ebay':'ebay', 'chrome':'googlechrome', 'google drive':'googledrive' };
  return known[String(name).trim().toLowerCase()] || '';
}
function serviceShortName(name='') {
  const key = String(name).trim().toLowerCase();
  const known = { 'github':'GH', 'supabase':'SB', 'railway':'RW', 'netlify':'NL', 'firebase':'FB', 'square':'SQ', 'ebay':'EB', 'chrome':'CH', 'google drive':'GD' };
  if (known[key]) return known[key];
  return String(name).trim().slice(0, 2).toUpperCase() || '·';
}
function serviceLinks(value) {
  if (!Array.isArray(value)) return [];
  return value.map(item => {
    const name = typeof item === 'string' ? item : item?.name;
    const url = typeof item === 'string' ? '' : safeProjectUrl(item?.url);
    return name ? { name:String(name).trim(), url } : null;
  }).filter(Boolean);
}
function serviceText(value) {
  return serviceLinks(value).map(item => item.url ? `${item.name} | ${item.url}` : item.name).join('\n');
}
function parseServices(value='') {
  return String(value).split(/\r?\n/).map(line => {
    const [name, ...urlParts] = line.split('|');
    const cleanedName = name.trim();
    const url = safeProjectUrl(urlParts.join('|').trim());
    return cleanedName ? { name:cleanedName, ...(url ? { url } : {}) } : null;
  }).filter(Boolean);
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
const DAY_MS = 24 * 60 * 60 * 1000;

function daysSince(value) {
  if (!value) return Number.POSITIVE_INFINITY;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((Date.now() - d.getTime()) / DAY_MS));
}

function getFreshness(project) {
  const days = daysSince(project.updated_at);
  if (!Number.isFinite(days)) return { days, state:'stale', label:'更新日不明' };
  if (days <= 2) return { days, state:'fresh', label:days === 0 ? '今日更新' : `${days}日前更新` };
  if (days < 7) return { days, state:'aging', label:`${days}日更新なし` };
  return { days, state:'stale', label:`${days}日以上更新なし` };
}

function getProgressDelta(project) {
  const progress = Number(project.progress) || 0;
  const previous = Number.isFinite(Number(project.previous_progress)) ? Number(project.previous_progress) : progress;
  return progress - previous;
}

function deltaMeta(project) {
  const delta = getProgressDelta(project);
  if (delta > 0) return { delta, state:'up', arrow:'↑', text:`+${delta}pt` };
  if (delta < 0) return { delta, state:'down', arrow:'↓', text:`${delta}pt` };
  return { delta:0, state:'flat', arrow:'→', text:'±0pt' };
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
  const update = els.updateFilter.value;
  const q = els.searchInput.value.trim().toLowerCase();
  let list = projects.filter(p => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (status !== 'all' && p.status !== status) return false;
    const freshness = getFreshness(p);
    if (update === 'recent' && freshness.days > 2) return false;
    if (update === '3plus' && freshness.days < 3) return false;
    if (update === '7plus' && freshness.days < 7) return false;
    if (q) {
      const hay = [p.name,p.subtitle,p.category,p.status,p.owner_name,...safeArray(p.current_work),...safeArray(p.next_work)].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  switch (els.sortFilter.value) {
    case 'delta_desc': list.sort((a,b)=>getProgressDelta(b)-getProgressDelta(a) || new Date(b.updated_at||0)-new Date(a.updated_at||0)); break;
    case 'progress_desc': list.sort((a,b)=>(b.progress||0)-(a.progress||0)); break;
    case 'updated_desc': list.sort((a,b)=>new Date(b.updated_at||0)-new Date(a.updated_at||0)); break;
    case 'updated_asc': list.sort((a,b)=>new Date(a.updated_at||0)-new Date(b.updated_at||0)); break;
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
  const stale3 = projects.filter(p => getFreshness(p).days >= 3).length;
  const stale7 = projects.filter(p => getFreshness(p).days >= 7).length;
  els.stale3Count.textContent = stale3;
  els.stale7Count.textContent = stale7;
  els.stale3Count.closest('.summary-card')?.classList.toggle('active-warning', stale3 > 0);
  els.stale7Count.closest('.summary-card')?.classList.toggle('active-critical', stale7 > 0);

  const preferredStatuses = ['構想','開発中','検証中','運用中','保留'];
  const actualStatuses = [...new Set(projects.map(p => p.status).filter(Boolean))];
  const statuses = [
    ...preferredStatuses.filter(status => actualStatuses.includes(status) || status === '保留'),
    ...actualStatuses.filter(status => !preferredStatuses.includes(status))
  ];
  els.statusSummary.innerHTML = statuses.map(status => {
    const count = projects.filter(p => p.status === status).length;
    return `<article class="summary-card status-card" data-status="${escapeHtml(status)}">
      <span class="summary-label">${escapeHtml(status)}</span>
      <strong>${count}</strong>
    </article>`;
  }).join('');
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
    const delta = deltaMeta(p);
    const freshness = getFreshness(p);
    const projectKey = Number(p.project_no || p.sort_order || p.id);
    const logoData = PROJECT_LOGOS[projectKey] || '';
    const numberMarkup = logoData
      ? `<div class="project-number project-logo-wrap"><img class="project-logo" src="${logoData}" alt="${escapeHtml(p.name)}のロゴ" /></div>`
      : `<div class="project-number">${Number(p.sort_order)||''}</div>`;
    const projectUrl = safeProjectUrl(p.project_url);
    const adminUrl = safeProjectUrl(p.admin_url);
    const services = serviceLinks(p.external_services);
    const serviceIcons = services.map(item => {
      const logo = serviceLogo(item.name);
      const shortName = serviceShortName(item.name);
      const contents = `<span class="service-fallback" aria-hidden="true">${escapeHtml(shortName)}</span>${logo ? `<img src="https://cdn.simpleicons.org/${logo}" alt="${escapeHtml(item.name)}" onload="this.previousElementSibling.style.display='none'" onerror="this.style.display='none'" />` : ''}`;
      const common = `class="service-logo${logo ? '' : ' fallback'}" title="${escapeHtml(item.name)}" data-service="${escapeHtml(item.name)}"`;
      return item.url ? `<a ${common} href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.name)}を開く">${contents}</a>` : `<span ${common} aria-label="使用サービス: ${escapeHtml(item.name)}">${contents}</span>`;
    }).join('');
    const title = projectUrl
      ? `<a class="project-title-link" href="${escapeHtml(projectUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.name)} <span aria-hidden="true">↗</span><span class="sr-only">（新しいタブで開く）</span></a>`
      : escapeHtml(p.name);
    return `<article class="project-card freshness-${freshness.state}" style="--category-color:${color}">
      ${numberMarkup}
      <div class="project-main">
        <div class="project-top">
          <div><h2 class="project-title">${title}</h2><p class="project-subtitle">${escapeHtml(p.subtitle||'')}</p></div>
          <div class="badges"><span class="badge category">${escapeHtml(p.category||'その他')}</span><span class="badge status-${escapeHtml(p.status||'開発中')}">${escapeHtml(p.status||'開発中')}</span><span class="badge">優先度 ${escapeHtml(p.priority||'中')}</span></div>
        </div>
        <div class="progress-row"><div class="progress-metric"><strong class="progress-value">${progress}%</strong><span class="delta-badge delta-${delta.state}">${delta.arrow} 前回比 ${delta.text}</span></div><div class="progress-mini" aria-label="進捗 ${progress}%"><span style="width:${progress}%"></span></div><span class="owner">担当: ${escapeHtml(p.owner_name||'未設定')}</span></div>
        <div class="work-grid">
          <section class="work-box"><h3>現在の作業</h3><ul>${current.map(v=>`<li>${escapeHtml(v)}</li>`).join('') || '<li>未登録</li>'}</ul></section>
          <section class="work-box"><h3>次の作業</h3><ul>${next.map(v=>`<li>${escapeHtml(v)}</li>`).join('') || '<li>未登録</li>'}</ul></section>
        </div>
        <div class="card-footer"><div class="footer-meta"><span class="freshness-badge freshness-${freshness.state}">● ${freshness.label}</span><span>最終更新 ${formatDate(p.updated_at)}</span></div><div class="card-actions"><div class="project-links">${projectUrl ? `<a class="link-icon public-link" href="${escapeHtml(projectUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(p.name)}の公開URLを開く" title="公開URL">◎</a>` : ''}${adminUrl ? `<a class="link-icon admin-link" href="${escapeHtml(adminUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(p.name)}の管理画面を開く" title="管理画面">⚙</a>` : ''}${serviceIcons}</div>${canEdit ? `<button type="button" class="edit-btn" data-edit-id="${p.id}">編集</button>` : ''}</div></div>
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
  els.editProjectUrl.value = p.project_url || '';
  els.editAdminUrl.value = p.admin_url || '';
  els.editServices.value = serviceText(p.external_services);
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
    project_url:safeProjectUrl(els.editProjectUrl.value),
    admin_url:safeProjectUrl(els.editAdminUrl.value),
    external_services:parseServices(els.editServices.value),
    current_work:safeArray(els.editCurrent.value),
    next_work:safeArray(els.editNext.value),
    updated_by:currentUser?.id || null
  };
  els.editMessage.textContent='保存中…';
  const { error } = await supabase.from('projects').update(payload).eq('id',els.editId.value);
  if (error) { els.editMessage.textContent=error.message; return; }
  els.editDialog.close();
});
['categoryFilter','statusFilter','updateFilter','sortFilter'].forEach(k=>els[k].addEventListener('change',renderProjects));
els.searchInput.addEventListener('input',renderProjects);

if (supabase) {
  supabase.auth.onAuthStateChange(()=>setTimeout(detectPermission,0));
  await loadProjects();
  await detectPermission();
  subscribeRealtime();
} else {
  await loadProjects();
}
