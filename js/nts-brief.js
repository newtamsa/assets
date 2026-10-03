(function () {
  'use strict';

  var CSS = `
.ntsb,.ntsb-tool{--ntsb-bg:#f6f8fb;--ntsb-card:#fff;--ntsb-line:#e3e7ee;--ntsb-text:#1e2022;--ntsb-sub:#677788;--ntsb-accent:#377dff;--ntsb-accent-soft:rgba(55,125,255,.1);--ntsb-track:#dfe4ec}
.ntsb{display:grid;gap:12px;margin:0 0 2rem;font-family:inherit;color:var(--ntsb-text)}
.ntsb[hidden],.ntsb-sec[hidden]{display:none}
.ntsb-sec{border:1px solid var(--ntsb-line);border-radius:16px;background:var(--ntsb-bg);overflow:hidden;animation:ntsb-open .22s ease}
.ntsb-sec-audio{background:var(--ntsb-card)}
@keyframes ntsb-open{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.ntsb-x{flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:var(--ntsb-sub)!important;transition:background .15s,color .15s}
.ntsb-x:hover{background:var(--ntsb-accent-soft);color:var(--ntsb-accent)!important}
.ntsb-x svg{width:16px;height:16px}
[data-bs-theme=dark] .ntsb,[data-bs-theme=dark] .ntsb-tool,[data-bs-theme=dark] .ntsb-mini{--ntsb-bg:#1b1e24;--ntsb-card:#22262e;--ntsb-line:#2f343d;--ntsb-text:#e9edf4;--ntsb-sub:#8b95a5;--ntsb-accent:#4d8dff;--ntsb-accent-soft:rgba(77,141,255,.14);--ntsb-track:#363c47}
.ntsb *{box-sizing:border-box}
.ntsb button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.ntsb button:focus-visible,.ntsb-mini button:focus-visible,.ntsb-range:focus-visible{outline:2px solid var(--ntsb-accent);outline-offset:2px}

.ntsb-player{display:flex;align-items:center;gap:14px;padding:16px 14px 16px 18px}
.ntsb-play{flex:none;width:48px;height:48px;border-radius:50%;background:var(--ntsb-accent)!important;color:#fff!important;display:grid;place-items:center;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 14px rgba(55,125,255,.35)}
.ntsb-play:hover{transform:scale(1.05)}
.ntsb-play:active{transform:scale(.96)}
.ntsb-play svg{width:20px;height:20px}
.ntsb-play[data-state=loading] svg{animation:ntsb-spin 1s linear infinite}
@keyframes ntsb-spin{to{transform:rotate(360deg)}}
.ntsb-pinfo{flex:1;min-width:0}
.ntsb-prow{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:8px}
.ntsb-ptitle{font-weight:600;font-size:15px;display:flex;align-items:center;gap:6px}
.ntsb-time{font-size:12px;color:var(--ntsb-sub);font-variant-numeric:tabular-nums;white-space:nowrap}
.ntsb-range{-webkit-appearance:none;appearance:none;width:100%;height:16px;background:transparent;margin:0;cursor:pointer;display:block}
.ntsb-range::-webkit-slider-runnable-track{height:4px;border-radius:4px;background:linear-gradient(to right,var(--ntsb-accent) var(--p,0%),var(--ntsb-track) var(--p,0%))}
.ntsb-range::-moz-range-track{height:4px;border-radius:4px;background:var(--ntsb-track)}
.ntsb-range::-moz-range-progress{height:4px;border-radius:4px;background:var(--ntsb-accent)}
.ntsb-range::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--ntsb-accent);margin-top:-5px;border:2px solid var(--ntsb-card);transition:transform .15s}
.ntsb-range::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background:var(--ntsb-accent);border:2px solid var(--ntsb-card)}
.ntsb-range:hover::-webkit-slider-thumb{transform:scale(1.2)}
.ntsb-ctrls{display:flex;align-items:center;gap:4px;flex:none}
.ntsb-icon{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:var(--ntsb-sub)!important;transition:background .15s,color .15s}
.ntsb-icon:hover{background:var(--ntsb-accent-soft);color:var(--ntsb-accent)!important}
.ntsb-icon svg{width:20px;height:20px}
.ntsb-speed{min-width:46px;height:30px;padding:0 8px;border-radius:15px;border:1px solid var(--ntsb-line)!important;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;color:var(--ntsb-sub)!important;transition:all .15s}
.ntsb-speed:hover,.ntsb-speed[data-on]{border-color:var(--ntsb-accent)!important;color:var(--ntsb-accent)!important}
.ntsb-player[data-error] .ntsb-range,.ntsb-player[data-error] .ntsb-ctrls{opacity:.4;pointer-events:none}

.ntsb-sum{padding:16px 20px 18px}
.ntsb-shead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}
.ntsb-tabs{display:inline-flex;padding:3px;border-radius:10px;background:var(--ntsb-card);border:1px solid var(--ntsb-line)}
.ntsb-tab{display:inline-flex;align-items:center;gap:6px;padding:6px 14px 6px 11px;border-radius:7px;font-size:14px;font-weight:500;line-height:20px;color:var(--ntsb-sub)!important;transition:all .15s}
.ntsb-tab svg{flex:none;width:17px;height:17px}
.ntsb-sumtitle{display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:600}
.ntsb-sumtitle svg{width:17px;height:17px;color:var(--ntsb-accent)}
.ntsb-hright{display:inline-flex;align-items:center;gap:6px;margin-right:-6px}
.ntsb-tab[aria-selected=true]{background:var(--ntsb-accent-soft);color:var(--ntsb-accent)!important;font-weight:600}
.ntsb-badge{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--ntsb-sub)}
.ntsb-badge svg{width:14px;height:14px;color:var(--ntsb-accent)}
.ntsb-panel[hidden]{display:none}
.ntsb-panel{animation:ntsb-fade .2s ease}
@keyframes ntsb-fade{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
.ntsb-lines{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.ntsb-lines li{display:flex;gap:12px;align-items:flex-start;font-size:16.5px;line-height:1.6;font-weight:500}
.ntsb-num{flex:none;width:24px;height:24px;margin-top:2px;border-radius:50%;background:var(--ntsb-accent-soft);color:var(--ntsb-accent);font-size:13px;font-weight:700;display:grid;place-items:center}
.ntsb-para{margin:0;font-size:16px;line-height:1.8;color:var(--ntsb-text);word-break:keep-all}
.ntsb-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;padding-top:12px;border-top:1px dashed var(--ntsb-line);font-size:12px;color:var(--ntsb-sub)}
.ntsb-copy{display:inline-flex;align-items:center;gap:4px;flex:none;white-space:nowrap;font-size:12px!important;color:var(--ntsb-sub)!important;padding:4px 8px!important;border-radius:6px}
.ntsb-copy:hover{background:var(--ntsb-accent-soft);color:var(--ntsb-accent)!important}
.ntsb-copy svg{width:14px;height:14px}

.ntsb-tool{position:relative;display:inline-flex!important;align-items:center;gap:5px;height:32px;padding:0 13px 0 11px!important;margin:0;border-radius:16px;border:1px solid var(--ntsb-line)!important;background:transparent!important;color:var(--ntsb-sub)!important;font:inherit;font-size:13px;font-weight:600;line-height:1;vertical-align:middle;cursor:pointer;white-space:nowrap;transition:background .15s,border-color .15s,color .15s}
.ntsb-tool svg{flex:none;width:16px;height:16px}
.ntsb-tool:hover{border-color:var(--ntsb-accent)!important;color:var(--ntsb-accent)!important}
.ntsb-tool[aria-expanded=true]{border-color:var(--ntsb-accent)!important;background:var(--ntsb-accent-soft)!important;color:var(--ntsb-accent)!important}
.ntsb-tool:focus-visible{outline:2px solid var(--ntsb-accent);outline-offset:2px}
.ntsb-tool[data-playing]::after{content:"";position:absolute;top:5px;right:6px;width:6px;height:6px;border-radius:50%;background:var(--ntsb-accent);animation:ntsb-pulse 1.2s ease-in-out infinite}
@keyframes ntsb-pulse{0%,100%{opacity:1}50%{opacity:.25}}

.ntsb-mini{--ntsb-card:#fff;--ntsb-line:#e3e7ee;--ntsb-text:#1e2022;--ntsb-sub:#677788;--ntsb-accent:#377dff;--ntsb-track:#dfe4ec;
  position:fixed;left:50%;bottom:20px;z-index:1050;width:min(560px,calc(100% - 24px));transform:translate(-50%,140%);opacity:0;transition:transform .3s cubic-bezier(.2,.8,.2,1),opacity .3s;
  background:var(--ntsb-card);border:1px solid var(--ntsb-line);border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,.25);overflow:hidden;color:var(--ntsb-text)}
.ntsb-mini[data-show]{transform:translate(-50%,0);opacity:1}
.ntsb-mini button{font:inherit;background:none;border:0;cursor:pointer;color:inherit}
.ntsb-mini-row{display:flex;align-items:center;gap:12px;padding:10px 10px 10px 12px}
.ntsb-mini .ntsb-play{width:38px;height:38px;box-shadow:none}
.ntsb-mini .ntsb-play svg{width:16px;height:16px}
.ntsb-mini-t{flex:1;min-width:0}
.ntsb-mini-t b{display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ntsb-mini-t span{font-size:12px;color:var(--ntsb-sub);font-variant-numeric:tabular-nums}
.ntsb-mini-bar{height:3px;background:var(--ntsb-track)}
.ntsb-mini-bar i{display:block;height:100%;width:0;background:var(--ntsb-accent);transition:width .25s linear}

@media (max-width:575.98px){
  .ntsb{margin-left:-4px;margin-right:-4px;gap:10px}
  .ntsb-sec{border-radius:12px}
  .ntsb-player{padding:14px;gap:12px;flex-wrap:wrap}
  .ntsb-pinfo{flex-basis:calc(100% - 60px)}
  .ntsb-ctrls{width:100%;justify-content:flex-end;margin-top:-4px}
  .ntsb-sum{padding:14px 16px 16px}
  .ntsb-lines li{font-size:15.5px}
  .ntsb-para{font-size:15.5px}
  .ntsb-badge span{display:none}
  .ntsb-mini{bottom:12px}
}
@media (prefers-reduced-motion:reduce){.ntsb,.ntsb *,.ntsb-mini,.ntsb-tool,.ntsb-tool::after{animation:none!important;transition:none!important}}
@media print{.ntsb,.ntsb-mini,.ntsb-tool{display:none!important}}
`;

  var I = {
	play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
	pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.2" height="16" rx="1.2"/><rect x="13.8" y="4" width="4.2" height="16" rx="1.2"/></svg>',
	load: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg>',
	back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><text x="12" y="15.5" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">10</text></svg>',
	fwd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/><text x="12" y="15.5" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">10</text></svg>',
	head: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
	spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>',
	copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
	check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
	lines: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
	para: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 10h16M4 14h16M4 18h10"/></svg>',
	close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  };
  var SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.8];

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(t) { if (!isFinite(t) || t < 0) return '--:--'; t = Math.floor(t); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function mount(opts) {
	var d = opts.data || {};
	var lines = (d.three_lines || []).filter(Boolean);
	var para = (d.paragraph || '').trim();
	var audio = d.audio || '';
	if (!lines.length && !para && !audio) return null;

	if (!document.getElementById('ntsb-css')) {
	  var st = document.createElement('style'); st.id = 'ntsb-css'; st.textContent = CSS; document.head.appendChild(st);
	}

	var target = typeof opts.target === 'string' ? document.querySelector(opts.target) : opts.target;
	if (!target) target = document.querySelector('.col-lg-9');
	if (!target) return null;
	var title = opts.title || (document.querySelector('h1') || {}).textContent || document.title;
	var key = 'ntsb:' + (opts.id || location.pathname);

	var root = document.createElement('section');
	root.className = 'ntsb';
	root.setAttribute('aria-label', '기사 듣기 및 요약');

	var hasTabs = lines.length && para;
	var pref = store('ntsb:tab') || opts.defaultTab;
	var savedTab = pref === 'para' && para ? 'para' : (lines.length ? 'lines' : 'para');

	var sumHTML = (lines.length || para) ?
		'<div class="ntsb-sec ntsb-sec-sum" id="ntsb-sum" hidden>' +
		'<div class="ntsb-sum">' +
		  '<div class="ntsb-shead">' +
			(hasTabs ?
			  '<div class="ntsb-tabs" role="tablist" aria-label="요약 보기 방식">' +
				'<button type="button" class="ntsb-tab" role="tab" data-tab="lines" id="ntsb-t-lines" aria-controls="ntsb-p-lines">' + I.lines + '<span>3줄 요약</span></button>' +
				'<button type="button" class="ntsb-tab" role="tab" data-tab="para" id="ntsb-t-para" aria-controls="ntsb-p-para">' + I.para + '<span>요약</span></button>' +
			  '</div>'
			  : '<strong class="ntsb-sumtitle">' + (lines.length ? I.lines + '<span>3줄 요약</span>' : I.para + '<span>요약</span>') + '</strong>') +
			'<span class="ntsb-hright"><span class="ntsb-badge">' + I.spark + '<span>AI 요약</span></span>' +
			'<button type="button" class="ntsb-x" data-close="sum" aria-label="요약 닫기">' + I.close + '</button></span>' +
		  '</div>' +
		  (lines.length ? '<ol class="ntsb-panel ntsb-lines" role="tabpanel" id="ntsb-p-lines" aria-labelledby="ntsb-t-lines">' +
			lines.map(function (l, i) { return '<li><span class="ntsb-num" aria-hidden="true">' + (i + 1) + '</span><span>' + esc(l) + '</span></li>'; }).join('') + '</ol>' : '') +
		  (para ? '<p class="ntsb-panel ntsb-para" role="tabpanel" id="ntsb-p-para" aria-labelledby="ntsb-t-para">' + esc(para) + '</p>' : '') +
		  '<div class="ntsb-foot"><span>AI가 기사를 바탕으로 작성한 요약입니다. 정확한 내용은 본문을 확인하세요.</span>' +
			'<button type="button" class="ntsb-copy" aria-label="요약 복사">' + I.copy + '<span>복사</span></button></div>' +
		'</div></div>' : '';
	var audioHTML = audio ?
		'<div class="ntsb-sec ntsb-sec-audio" id="ntsb-audio" hidden>' +
		'<div class="ntsb-player">' +
		  '<button type="button" class="ntsb-play" aria-label="기사 듣기 재생">' + I.play + '</button>' +
		  '<div class="ntsb-pinfo">' +
			'<div class="ntsb-prow"><span class="ntsb-ptitle">기사 듣기</span><span class="ntsb-time" aria-live="off">--:-- / --:--</span></div>' +
			'<input type="range" class="ntsb-range" min="0" max="1000" value="0" step="1" aria-label="재생 위치">' +
		  '</div>' +
		  '<div class="ntsb-ctrls">' +
			'<button type="button" class="ntsb-icon" data-skip="-10" aria-label="10초 뒤로">' + I.back + '</button>' +
			'<button type="button" class="ntsb-icon" data-skip="10" aria-label="10초 앞으로">' + I.fwd + '</button>' +
			'<button type="button" class="ntsb-speed" aria-label="재생 속도">1.0x</button>' +
			'<button type="button" class="ntsb-x" data-close="audio" aria-label="듣기 닫기">' + I.close + '</button>' +
		  '</div>' +
		'</div></div>' : '';
	root.hidden = true;
	root.innerHTML = sumHTML + audioHTML;

	target.insertBefore(root, target.firstChild);

	function setTab(t) {
	  root.querySelectorAll('.ntsb-tab').forEach(function (b) {
		var on = b.dataset.tab === t; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
	  });
	  var pl = root.querySelector('#ntsb-p-lines'), pp = root.querySelector('#ntsb-p-para');
	  if (pl) pl.hidden = t !== 'lines';
	  if (pp) pp.hidden = t !== 'para';
	  current = t;
	}
	var current;
	setTab(savedTab);
	root.querySelectorAll('.ntsb-tab').forEach(function (b) {
	  b.addEventListener('click', function () { setTab(b.dataset.tab); store('ntsb:tab', b.dataset.tab); });
	  b.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
		  var n = current === 'lines' ? 'para' : 'lines'; setTab(n); store('ntsb:tab', n);
		  root.querySelector('[data-tab=' + n + ']').focus(); e.preventDefault();
		}
	  });
	});

	var cp = root.querySelector('.ntsb-copy');
	if (cp) cp.addEventListener('click', function () {
	  var txt = current === 'para' ? para : lines.map(function (l, i) { return (i + 1) + '. ' + l; }).join('\n');
	  txt = title.trim() + '\n\n' + txt + '\n\n' + location.href.split('?')[0];
	  (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () {
		cp.innerHTML = I.check + '<span>복사됨</span>';
		setTimeout(function () { cp.innerHTML = I.copy + '<span>복사</span>'; }, 1600);
	  }).catch(function () {});
	});

	var secs = { sum: root.querySelector('#ntsb-sum'), audio: root.querySelector('#ntsb-audio') };
	var toolBtns = {};
	function setOpen(k, on) {
	  var sec = secs[k]; if (!sec) return;
	  sec.hidden = !on;
	  if (toolBtns[k]) toolBtns[k].setAttribute('aria-expanded', on ? 'true' : 'false');
	  root.hidden = !((secs.sum && !secs.sum.hidden) || (secs.audio && !secs.audio.hidden));
	}
	root.querySelectorAll('[data-close]').forEach(function (b) {
	  b.addEventListener('click', function () {
		var k = b.dataset.close; setOpen(k, false);
		if (toolBtns[k]) toolBtns[k].focus();
	  });
	});
	var tools = opts.toolbar === false ? null : (opts.toolbar ? document.querySelector(opts.toolbar) : (document.querySelector('.ntToolsRead') || document.querySelector('.news-single-controller-wrap-on-top')));
	if (tools && !tools.querySelector('.ntsb-tool')) {
	  var mk = function (k, icon, label) {
		var b = document.createElement('button');
		b.type = 'button'; b.className = 'ntsb-tool'; b.dataset.k = k;
		b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', secs[k].id);
		b.innerHTML = icon + '<span>' + label + '</span>';
		b.addEventListener('click', function () { setOpen(k, secs[k].hidden); });
		toolBtns[k] = b; return b;
	  };
	  var first = tools.firstChild;
	  if (secs.sum) tools.insertBefore(mk('sum', I.para, '요약'), first);
	  if (secs.audio) tools.insertBefore(mk('audio', I.head, '듣기'), first);
	} else {
	  setOpen('sum', true); setOpen('audio', true);
	}

	if (!audio) return root;

	var a = new Audio(); a.preload = 'metadata'; a.src = audio;
	var player = root.querySelector('.ntsb-player');
	var audioSec = secs.audio;
	var playBtn = player.querySelector('.ntsb-play');
	var range = player.querySelector('.ntsb-range');
	var timeEl = player.querySelector('.ntsb-time');
	var speedBtn = player.querySelector('.ntsb-speed');
	var seeking = false, started = false;

	var mini = document.createElement('div');
	mini.className = 'ntsb-mini'; mini.setAttribute('role', 'region'); mini.setAttribute('aria-label', '기사 듣기 미니 플레이어');
	mini.innerHTML = '<div class="ntsb-mini-row">' +
	  '<button type="button" class="ntsb-play" aria-label="재생">' + I.play + '</button>' +
	  '<div class="ntsb-mini-t"><b>' + esc(title.trim()) + '</b><span>--:-- / --:--</span></div>' +
	  '<button type="button" class="ntsb-icon" data-skip="-10" aria-label="10초 뒤로">' + I.back + '</button>' +
	  '<button type="button" class="ntsb-icon ntsb-mini-x" aria-label="미니 플레이어 닫기">' + I.close + '</button>' +
	  '</div><div class="ntsb-mini-bar"><i></i></div>';
	document.body.appendChild(mini);
	var miniPlay = mini.querySelector('.ntsb-play'), miniTime = mini.querySelector('.ntsb-mini-t span'), miniBar = mini.querySelector('.ntsb-mini-bar i');
	var miniDismissed = false, playerVisible = true;

	function setState(s) {
	  var icon = s === 'playing' ? I.pause : s === 'loading' ? I.load : I.play;
	  var label = s === 'playing' ? '일시정지' : '재생';
	  [playBtn, miniPlay].forEach(function (b) { b.innerHTML = icon; b.dataset.state = s; b.setAttribute('aria-label', '기사 듣기 ' + label); });
	  updateMini();
	}
	function updateMini() {
	  var show = started && !a.ended && !playerVisible && !miniDismissed;
	  if (show) mini.setAttribute('data-show', ''); else mini.removeAttribute('data-show');
	}
	function render() {
	  var p = a.duration ? a.currentTime / a.duration : 0;
	  if (!seeking) range.value = Math.round(p * 1000);
	  range.style.setProperty('--p', (p * 100) + '%');
	  var t = fmt(a.currentTime) + ' / ' + fmt(a.duration);
	  timeEl.textContent = t; miniTime.textContent = t; miniBar.style.width = (p * 100) + '%';
	  range.setAttribute('aria-valuetext', fmt(a.currentTime) + ' / ' + fmt(a.duration));
	}
	function toggle() {
	  if (a.paused) {
		started = true; miniDismissed = false;
		if (a.readyState < 3) setState('loading');
		var r = a.play(); if (r && r.catch) r.catch(function () { setState('paused'); });
		clearTimeout(stallTimer);
		stallTimer = setTimeout(function () { if (a.readyState < 3 && !a.paused) fail(); }, 15000);
		if (!a.dataset_resumed) {
		  var pos = parseFloat(store(key));
		  if (pos > 5 && a.duration && pos < a.duration - 5) a.currentTime = pos;
		  a.dataset_resumed = true;
		}
	  } else a.pause();
	}
	function skip(s) { if (!a.duration) return; a.currentTime = Math.max(0, Math.min(a.duration, a.currentTime + s)); render(); }

	playBtn.addEventListener('click', toggle);
	miniPlay.addEventListener('click', toggle);
	root.querySelectorAll('[data-skip]').forEach(function (b) { b.addEventListener('click', function () { skip(+b.dataset.skip); }); });
	mini.querySelector('[data-skip]').addEventListener('click', function () { skip(-10); });
	mini.querySelector('.ntsb-mini-x').addEventListener('click', function () { a.pause(); miniDismissed = true; updateMini(); });

	var sp = parseFloat(store('ntsb:speed')) || 1;
	function setSpeed(v) {
	  a.playbackRate = v; speedBtn.textContent = (v % 1 ? v : v.toFixed(1)) + 'x';
	  if (v !== 1) speedBtn.setAttribute('data-on', ''); else speedBtn.removeAttribute('data-on');
	  speedBtn.setAttribute('aria-label', '재생 속도 ' + v + '배');
	}
	setSpeed(sp);
	speedBtn.addEventListener('click', function () {
	  var i = SPEEDS.indexOf(a.playbackRate); var v = SPEEDS[(i + 1) % SPEEDS.length];
	  setSpeed(v); store('ntsb:speed', v);
	});

	range.addEventListener('input', function () {
	  seeking = true;
	  var p = range.value / 1000; range.style.setProperty('--p', (p * 100) + '%');
	  if (a.duration) timeEl.textContent = fmt(p * a.duration) + ' / ' + fmt(a.duration);
	});
	range.addEventListener('change', function () { seeking = false; if (a.duration) a.currentTime = (range.value / 1000) * a.duration; render(); });

	a.addEventListener('loadedmetadata', render);
	a.addEventListener('timeupdate', function () { render(); if (Math.floor(a.currentTime) % 5 === 0) store(key, a.currentTime); });
	a.addEventListener('playing', function () { setState('playing'); if (toolBtns.audio) toolBtns.audio.setAttribute('data-playing', ''); });
	a.addEventListener('pause', function () { if (toolBtns.audio) toolBtns.audio.removeAttribute('data-playing'); });
	a.addEventListener('waiting', function () { setState('loading'); });
	a.addEventListener('pause', function () { setState('paused'); store(key, a.currentTime); });
	a.addEventListener('ended', function () { started = false; setState('paused'); store(key, 0); a.currentTime = 0; render(); updateMini(); });
	a.addEventListener('ratechange', function () { if (a.playbackRate !== sp) { sp = a.playbackRate; } });
	var stallTimer;
	function fail() {
	  clearTimeout(stallTimer); try { a.pause(); } catch (e) {}
	  player.setAttribute('data-error', ''); setState('paused'); playBtn.disabled = true; playBtn.style.opacity = .5;
	  timeEl.textContent = '오디오를 불러올 수 없습니다'; started = false; updateMini();
	}
	a.addEventListener('error', fail);
	a.addEventListener('canplay', function () { clearTimeout(stallTimer); });

	if ('IntersectionObserver' in window) {
	  new IntersectionObserver(function (es) { playerVisible = es[0].isIntersecting; updateMini(); }, { rootMargin: '-60px 0px 0px 0px' }).observe(audioSec);
	}

	if ('mediaSession' in navigator) {
	  a.addEventListener('play', function () {
		try {
		  navigator.mediaSession.metadata = new MediaMetadata({ title: title.trim(), artist: opts.artist || '뉴탐사', artwork: opts.artwork ? [{ src: opts.artwork, sizes: '512x512' }] : [] });
		  navigator.mediaSession.setActionHandler('seekbackward', function () { skip(-10); });
		  navigator.mediaSession.setActionHandler('seekforward', function () { skip(10); });
		} catch (e) {}
	  });
	}

	render();
	return root;
  }

  window.NtsBrief = { mount: mount };

  function auto() {
	var el = document.getElementById('nts-brief-data');
	if (!el) return;
	try {
	  mount({ data: JSON.parse(el.textContent), defaultTab: el.dataset.defaultTab, id: el.dataset.id });
	} catch (e) { if (window.console) console.warn('[NtsBrief]', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
})();
