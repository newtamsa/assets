(function() {
  "use strict";
  var root = document.querySelector(".nth");
  if (!root) return;
  var today = root.querySelector("[data-nth-today]");
  if (today) {
    try {
      today.textContent = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timeZone: "Asia/Seoul"
      }).format(new Date());
    } catch (e) {
    }
  }
  var notice = root.querySelector("[data-nth-notice]");
  if (notice && window.fetch) {
    fetch("/ed9d8ea637711d0220d62966c4ea6a02", { method: "POST", redirect: "follow" }).then(function(r) {
      return r.json();
    }).then(function(res) {
      var n = res && res.status == true && res.noticeList && res.noticeList[0];
      if (!n) return;
      notice.href = "/notice/" + n.uniqueId;
      var t = notice.querySelector(".nth-strip__text");
      if (t) t.textContent = n.title;
    }).catch(function() {
    });
  }
  var tv = root.querySelector("[data-nth-tv]");
  if (!tv) return;
  var player = tv.querySelector("[data-nth-player]");
  var poster = player.querySelector(".nth-player__poster");
  var playBtn = player.querySelector(".nth-player__btn");
  var nowTitle = tv.querySelector("[data-nth-now-title]");
  var nowLink = tv.querySelector("[data-nth-now-link]");
  var copyBtn = tv.querySelector("[data-nth-copy]");
  function thumb(id, q) {
    return "https://i.ytimg.com/vi/" + id + "/" + q + ".jpg";
  }
  poster.addEventListener("load", function() {
    if (poster.naturalWidth > 0 && poster.naturalWidth <= 120) poster.src = thumb(player.dataset.vid, "hqdefault");
  });
  poster.addEventListener("error", function() {
    if (poster.src.indexOf("hqdefault") === -1) poster.src = thumb(player.dataset.vid, "hqdefault");
  });
  function embed(id) {
    var old = player.querySelector("iframe");
    if (old) old.remove();
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0&playsinline=1";
    f.title = nowTitle.textContent.trim();
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true;
    f.referrerPolicy = "strict-origin-when-cross-origin";
    player.appendChild(f);
    player.classList.add("is-playing");
  }
  function select(id, title, autoplay) {
    player.dataset.vid = id;
    var old = player.querySelector("iframe");
    if (old) old.remove();
    player.classList.remove("is-playing");
    poster.src = thumb(id, "maxresdefault");
    nowTitle.textContent = title;
    nowLink.href = "https://www.youtube.com/watch?v=" + id;
    tv.querySelectorAll(".nth-pitem").forEach(function(el) {
      var on = el.dataset.vid === id;
      el.classList.toggle("is-active", on);
      if (on) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
    if (autoplay) embed(id);
  }
  playBtn.addEventListener("click", function() {
    embed(player.dataset.vid);
  });
  tv.addEventListener("click", function(e) {
    var a = e.target.closest("a[data-vid]");
    if (!a || !tv.contains(a)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    var t = a.querySelector("[data-title]");
    select(a.dataset.vid, (t || a).textContent.trim(), true);
    var r = player.getBoundingClientRect();
    if (r.top < 60 || r.bottom > window.innerHeight) player.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  if (copyBtn) {
    var label = copyBtn.querySelector("span");
    var original = label ? label.textContent : "";
    copyBtn.addEventListener("click", function() {
      var url = "https://youtu.be/" + player.dataset.vid;
      var done = function() {
        copyBtn.classList.add("is-done");
        if (label) label.textContent = "\uBCF5\uC0AC\uB428";
        setTimeout(function() {
          copyBtn.classList.remove("is-done");
          if (label) label.textContent = original;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function() {
        window.prompt("\uB9C1\uD06C", url);
      });
      else window.prompt("\uB9C1\uD06C", url);
    });
  }
  var tabs = Array.prototype.slice.call(tv.querySelectorAll('[role="tab"]'));
  function activate(tab, focus) {
    tabs.forEach(function(t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) {
        panel.hidden = !on;
        if (on) panel.scrollTop = 0;
      }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function(t, i) {
    t.addEventListener("click", function() {
      activate(t);
    });
    t.addEventListener("keydown", function(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        activate(n, true);
      }
    });
  });
  var track = tv.querySelector("[data-nth-shelf]");
  var prev = tv.querySelector("[data-nth-shelf-prev]");
  var next = tv.querySelector("[data-nth-shelf-next]");
  if (track && prev && next) {
    var update = function() {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener("click", function() {
      track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" });
    });
    next.addEventListener("click", function() {
      track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" });
    });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
