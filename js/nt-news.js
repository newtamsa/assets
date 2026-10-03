(function () {
    function rgbParts(v) {
        if (!v) { return null; }
        var i = v.indexOf('(');
        if (i < 0) { return null; }
        var j = v.indexOf(')');
        var arr = v.slice(i + 1, j).split(',');
        if (arr.length < 3) { return null; }
        var out = [parseFloat(arr[0]), parseFloat(arr[1]), parseFloat(arr[2])];
        out.push(arr.length > 3 ? parseFloat(arr[3]) : 1);
        return out;
    }
    function luminance(p) {
        function ch(v) {
            v = v / 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * ch(p[0]) + 0.7152 * ch(p[1]) + 0.0722 * ch(p[2]);
    }
    var SIDES = ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];

    var CONTENT_ROOTS = '#contentWrap, .policyWrap, .noticeContent';

    function normalizeContent() {
        var roots = document.querySelectorAll(CONTENT_ROOTS);
        if (!roots.length) { return; }
        var dark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        var nodes = [];
        for (var r = 0; r < roots.length; r++) {
            var found = roots[r].querySelectorAll('[style]');
            for (var f = 0; f < found.length; f++) { nodes.push(found[f]); }
        }
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (el.getAttribute('data-nt-style0') === null) {
                el.setAttribute('data-nt-style0', el.getAttribute('style') || '');
            }
            el.setAttribute('style', el.getAttribute('data-nt-style0'));
            if (!dark) { continue; }

            var bg = rgbParts(el.style.backgroundColor);
            if (bg && bg[3] > 0.15) {
                var bl = luminance(bg);
                if (bl > 0.5) {
                    el.style.backgroundColor = bl > 0.82 ? '#20242c' : '#2a2f38';
                }
            }
            var fg = rgbParts(el.style.color);
            if (fg && fg[3] > 0.15) {
                var fl = luminance(fg);
                if (fl < 0.45) {
                    el.style.color = fl < 0.16 ? '#c3cad6' : '#9aa4b4';
                }
            }
            for (var k = 0; k < SIDES.length; k++) {
                var bc = rgbParts(el.style[SIDES[k]]);
                if (!bc || bc[3] <= 0.15) { continue; }
                var cl = luminance(bc);
                if (cl > 0.45 || cl < 0.18) { el.style[SIDES[k]] = '#3a404b'; }
            }
        }
    }
    document.addEventListener('nt:themechange', normalizeContent);

    window.addEventListener('beforeprint', function () {
        var roots = document.querySelectorAll(CONTENT_ROOTS);
        for (var r = 0; r < roots.length; r++) {
            var nodes = roots[r].querySelectorAll('[data-nt-style0]');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].setAttribute('style', nodes[i].getAttribute('data-nt-style0'));
            }
        }
    });
    window.addEventListener('afterprint', normalizeContent);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', normalizeContent);
    } else { normalizeContent(); }

})();
