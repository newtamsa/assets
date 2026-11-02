(function () {
    var top = document.getElementById('ntcScrollTop');
    if (top) {
        var onScroll = function () { top.classList.toggle('is-on', window.scrollY > 300); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
    document.querySelectorAll('.dropdown [name="s"]').forEach(function (input) {
        var wrap = input.closest('.dropdown');
        wrap.addEventListener('shown.bs.dropdown', function () { input.focus(); });
    });
    var markTheme = function () {
        var mode = window.__ntTheme ? window.__ntTheme.get() : 'system';
        document.querySelectorAll('[data-nt-theme]').forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('data-nt-theme') === mode);
        });
    };
    markTheme();
    document.addEventListener('nt:themechange', markTheme);
    if (!window.bootstrap) { return; }
    var lg = window.matchMedia('(min-width: 992px)');
    document.querySelectorAll('.ntc-user-menu').forEach(function (wrap) {
        var toggle = wrap.querySelector('[data-bs-toggle="dropdown"]');
        if (!toggle) { return; }
        var dd = window.bootstrap.Dropdown.getOrCreateInstance(toggle);
        var timer = null;
        wrap.addEventListener('mouseenter', function () {
            if (!lg.matches) { return; }
            clearTimeout(timer);
            dd.show();
        });
        wrap.addEventListener('mouseleave', function () {
            if (!lg.matches) { return; }
            timer = setTimeout(function () { dd.hide(); }, 200);
        });
    });
})();
