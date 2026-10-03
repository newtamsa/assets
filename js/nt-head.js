(function () {
    window.__esc = function (s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };
    var el = document.querySelector('meta[name="csrf-token"]');
    var token = el ? el.getAttribute('content') : '';
    if (!token) return;
    function sameOrigin(u) {
        try { return new URL(u, location.href).origin === location.origin; } catch (e) { return false; }
    }
    function needs(m, u) {
        m = (m || 'GET').toUpperCase();
        return m !== 'GET' && m !== 'HEAD' && m !== 'OPTIONS' && sameOrigin(u);
    }
    var of = window.fetch;
    window.fetch = function (input, init) {
        init = init || {};
        var url = typeof input === 'string' ? input : (input && input.url) || '';
        var m = init.method || (input && input.method) || 'GET';
        if (needs(m, url)) {
            var h = new Headers(init.headers || (input && input.headers) || {});
            if (!h.has('X-CSRF-Token')) h.set('X-CSRF-Token', token);
            init = Object.assign({}, init, { headers: h });
        }
        return of.call(this, input, init);
    };
    var oo = XMLHttpRequest.prototype.open, os = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (m, u) { this.__csrf = needs(m, u); return oo.apply(this, arguments); };
    XMLHttpRequest.prototype.send = function () {
        if (this.__csrf) { try { this.setRequestHeader('X-CSRF-Token', token); } catch (e) {} }
        return os.apply(this, arguments);
    };
})();

var defaultThemeMode = "system";
(function () {
    var MODE_KEY = 'data-bs-theme-mode';
    var THEME_KEY = 'data-bs-theme';
    var root = document.documentElement;

    function systemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    function resolve(mode) {
        if (mode === 'system') { return systemTheme(); }
        return mode === 'dark' ? 'dark' : 'light';
    }
    function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

    function readMode() {
        if (root.hasAttribute('data-bs-theme-mode')) { return root.getAttribute('data-bs-theme-mode'); }
        var m = ls(MODE_KEY);
        if (m === 'light' || m === 'dark' || m === 'system') { return m; }
        return defaultThemeMode;
    }

    function apply(mode) {
        var theme = resolve(mode);
        root.setAttribute('data-bs-theme-mode', mode);
        root.setAttribute('data-bs-theme', theme);
        return theme;
    }
    var initialMode = readMode();
    var initialTheme = apply(initialMode);
    try {
        localStorage.setItem(MODE_KEY, initialMode);
        localStorage.setItem(THEME_KEY, initialTheme);
    } catch (e) {}

    window.__ntTheme = {
        get: function () { return root.getAttribute('data-bs-theme-mode') || defaultThemeMode; },
        resolved: function () { return root.getAttribute('data-bs-theme') || 'light'; },
        set: function (mode) {
            if (mode !== 'light' && mode !== 'dark' && mode !== 'system') { mode = 'system'; }
            var theme = apply(mode);
            try {
                localStorage.setItem(MODE_KEY, mode);
                localStorage.setItem(THEME_KEY, theme);
            } catch (e) {}
            try {
                document.dispatchEvent(new CustomEvent('nt:themechange', {
                    detail: { mode: mode, theme: theme }
                }));
            } catch (e) {}
        },
        cycle: function () {
            var m = window.__ntTheme.get();
            window.__ntTheme.set(m === 'system' ? 'light' : (m === 'light' ? 'dark' : 'system'));
        }
    };

    function refresh() {
        var mode = window.__ntTheme.get();
        apply(mode);
        try {
            document.dispatchEvent(new CustomEvent('nt:themechange', {
                detail: { mode: mode, theme: resolve(mode) }
            }));
        } catch (e) {}
    }

    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function () { if (window.__ntTheme.get() === 'system') { refresh(); } };
    if (mq.addEventListener) { mq.addEventListener('change', onSystemChange); }
    else if (mq.addListener) { mq.addListener(onSystemChange); }

    window.addEventListener('storage', function (ev) {
        if (ev.key === MODE_KEY || ev.key === THEME_KEY) { refresh(); }
    });

    document.addEventListener('kt.thememode.change', refresh);

    var LABEL = {
        system: '화면 테마: 시스템 설정',
        light: '화면 테마: 밝게',
        dark: '화면 테마: 어둡게'
    };
    function labelButtons() {
        var t = LABEL[window.__ntTheme.get()] || LABEL.system;
        var nodes = document.querySelectorAll('.ntThemeToggle');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('title', t);
            nodes[i].setAttribute('aria-label', t);
        }
    }
    document.addEventListener('nt:themechange', labelButtons);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', labelButtons);
    } else { labelButtons(); }
})();
