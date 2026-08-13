(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // Year + cover letter date
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // One-link application pack URL
  const SHARE_URL = "https://timesnapx.github.io/ai-skills-showcase/";
  const shareDisplay = $("#shareUrlDisplay");
  if (shareDisplay) shareDisplay.textContent = SHARE_URL;

  const shareToast = $("#shareToast");
  const showShareToast = (msg) => {
    const el = shareToast || $("#copyToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showShareToast._t);
    showShareToast._t = setTimeout(() => {
      el.hidden = true;
    }, 2000);
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      showShareToast("Application link copied");
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = SHARE_URL;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showShareToast("Application link copied");
      } catch {
        showShareToast("Copy failed — select the URL manually");
      }
      document.body.removeChild(ta);
    }
  };

  ["copyShareUrl", "copyShareUrlBanner", "copyShareUrlFooter"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", copyShareUrl);
  });

  const letterDate = $("#letterDate");
  if (letterDate) {
    letterDate.textContent = new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Sticky header
  const header = $("#header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const toggle = $("#mobileToggle");
  const nav = $("#nav");

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = !document.body.classList.contains("nav-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (nav) {
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeNav();
    });
  }

  // Platform tabs
  const platformTabs = $$(".platform-tab");
  const platformPanels = $$(".platform-panel");

  platformTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.platform;
      platformTabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      platformPanels.forEach((panel) => {
        const active = panel.id === `panel-${id}`;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });

  // Document tabs
  const docTabs = $$(".doc-tab");
  const docs = $$(".document");

  const setActiveDoc = (key) => {
    docTabs.forEach((t) => {
      const active = t.dataset.doc === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    docs.forEach((doc) => {
      const active = doc.id === `doc-${key}`;
      doc.classList.toggle("is-active", active);
      doc.hidden = !active;
    });
  };

  docTabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveDoc(tab.dataset.doc));
  });

  // Print active document
  const printBtn = $("#printDoc");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  // Copy active document text
  const copyBtn = $("#copyDoc");
  const toast = $("#copyToast");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.hidden = true;
    }, 2000);
  };

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const active = $(".document.is-active");
      if (!active) return;
      const text = active.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard");
      } catch {
        showToast("Copy failed — select text manually");
      }
    });
  }

})();
