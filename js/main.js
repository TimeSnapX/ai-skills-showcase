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

  // ---------- Market research board ----------
  const marketBoard = $("#marketBoard");
  if (marketBoard) {
    const crypto = [
      { rank: 1, name: "Bitcoin", sym: "BTC", price: 97420, chg24: 1.8, chg7: 4.2, mcap: 1.92e12, vol: 38.4e9, spark: [42, 48, 45, 52, 50, 58, 61] },
      { rank: 2, name: "Ethereum", sym: "ETH", price: 3420, chg24: 2.4, chg7: 6.1, mcap: 411e9, vol: 18.2e9, spark: [38, 40, 44, 42, 48, 51, 55] },
      { rank: 3, name: "Tether", sym: "USDT", price: 1.0, chg24: 0.01, chg7: 0.02, mcap: 142e9, vol: 72e9, spark: [50, 50, 50, 50, 50, 50, 50] },
      { rank: 4, name: "BNB", sym: "BNB", price: 612, chg24: -0.8, chg7: 2.1, mcap: 88e9, vol: 1.9e9, spark: [55, 52, 48, 50, 47, 49, 46] },
      { rank: 5, name: "Solana", sym: "SOL", price: 178, chg24: 3.6, chg7: 9.4, mcap: 86e9, vol: 4.1e9, spark: [30, 35, 40, 38, 48, 55, 62] },
      { rank: 6, name: "USDC", sym: "USDC", price: 1.0, chg24: 0.0, chg7: 0.01, mcap: 52e9, vol: 8.4e9, spark: [50, 50, 50, 50, 50, 50, 50] },
      { rank: 7, name: "XRP", sym: "XRP", price: 2.48, chg24: -1.2, chg7: 3.5, mcap: 141e9, vol: 5.6e9, spark: [48, 52, 49, 46, 44, 47, 45] },
      { rank: 8, name: "Dogecoin", sym: "DOGE", price: 0.28, chg24: 4.1, chg7: -2.3, mcap: 41e9, vol: 2.8e9, spark: [40, 55, 50, 62, 58, 48, 44] },
      { rank: 9, name: "Cardano", sym: "ADA", price: 0.78, chg24: 1.1, chg7: 5.0, mcap: 27e9, vol: 0.9e9, spark: [35, 38, 42, 40, 46, 48, 52] },
      { rank: 10, name: "Avalanche", sym: "AVAX", price: 32.4, chg24: -2.5, chg7: 1.8, mcap: 13e9, vol: 0.7e9, spark: [60, 55, 50, 48, 45, 47, 44] },
    ];

    const stocks = [
      { rank: 1, name: "NVIDIA", sym: "NVDA", price: 128.4, chg24: 2.1, chg7: 5.8, mcap: 3.15e12, vol: 42e9, spark: [40, 45, 48, 50, 55, 58, 62] },
      { rank: 2, name: "Apple", sym: "AAPL", price: 228.9, chg24: 0.4, chg7: 1.2, mcap: 3.42e12, vol: 18e9, spark: [48, 49, 50, 51, 50, 52, 53] },
      { rank: 3, name: "Microsoft", sym: "MSFT", price: 418.2, chg24: 0.9, chg7: 2.4, mcap: 3.11e12, vol: 14e9, spark: [46, 48, 47, 50, 52, 51, 54] },
      { rank: 4, name: "Alphabet", sym: "GOOGL", price: 176.5, chg24: -0.3, chg7: 1.8, mcap: 2.16e12, vol: 11e9, spark: [50, 52, 49, 48, 50, 49, 51] },
      { rank: 5, name: "Amazon", sym: "AMZN", price: 198.7, chg24: 1.5, chg7: 3.2, mcap: 2.08e12, vol: 12e9, spark: [42, 44, 48, 47, 52, 54, 56] },
      { rank: 6, name: "Meta", sym: "META", price: 562.1, chg24: 1.8, chg7: 4.0, mcap: 1.42e12, vol: 9e9, spark: [40, 43, 46, 50, 52, 55, 58] },
      { rank: 7, name: "Broadcom", sym: "AVGO", price: 174.3, chg24: -1.1, chg7: 2.6, mcap: 820e9, vol: 6e9, spark: [55, 52, 50, 48, 49, 47, 46] },
      { rank: 8, name: "Tesla", sym: "TSLA", price: 248.6, chg24: 3.2, chg7: -1.4, mcap: 790e9, vol: 22e9, spark: [45, 55, 50, 60, 52, 48, 44] },
      { rank: 9, name: "Berkshire", sym: "BRK.B", price: 452.0, chg24: 0.2, chg7: 0.8, mcap: 980e9, vol: 3e9, spark: [49, 50, 50, 51, 51, 52, 52] },
      { rank: 10, name: "Eli Lilly", sym: "LLY", price: 812.4, chg24: -0.6, chg7: 1.5, mcap: 730e9, vol: 4e9, spark: [52, 50, 51, 49, 50, 51, 52] },
    ];

    const commodities = [
      { rank: 1, name: "Gold", sym: "XAU", price: 2648, chg24: 0.5, chg7: 1.4, unit: "USD / oz", note: "Safe-haven bid", spark: [48, 49, 50, 51, 52, 53, 54] },
      { rank: 2, name: "Crude Oil (WTI)", sym: "CL", price: 72.8, chg24: -1.3, chg7: -2.8, unit: "USD / bbl", note: "Energy complex", spark: [58, 55, 52, 50, 48, 46, 44] },
      { rank: 3, name: "Brent Crude", sym: "BZ", price: 76.4, chg24: -1.1, chg7: -2.4, unit: "USD / bbl", note: "Global benchmark", spark: [56, 54, 51, 49, 48, 47, 45] },
      { rank: 4, name: "Silver", sym: "XAG", price: 31.2, chg24: 1.1, chg7: 2.6, unit: "USD / oz", note: "Industrial + monetary", spark: [44, 46, 48, 47, 50, 52, 55] },
      { rank: 5, name: "Copper", sym: "HG", price: 4.28, chg24: 0.8, chg7: 1.9, unit: "USD / lb", note: "Growth metal", spark: [45, 47, 48, 50, 51, 52, 54] },
      { rank: 6, name: "Natural Gas", sym: "NG", price: 2.64, chg24: 2.8, chg7: -3.5, unit: "USD / MMBtu", note: "Weather-sensitive", spark: [40, 50, 55, 48, 42, 45, 38] },
      { rank: 7, name: "Wheat", sym: "ZW", price: 548, chg24: -0.4, chg7: 0.9, unit: "USc / bu", note: "Agriculture", spark: [50, 49, 48, 50, 51, 50, 51] },
      { rank: 8, name: "Corn", sym: "ZC", price: 412, chg24: 0.3, chg7: -0.7, unit: "USc / bu", note: "Feed grains", spark: [51, 50, 49, 50, 48, 49, 48] },
      { rank: 9, name: "Soybeans", sym: "ZS", price: 1028, chg24: 0.6, chg7: 1.2, unit: "USc / bu", note: "Oilseeds", spark: [46, 47, 48, 49, 50, 51, 52] },
      { rank: 10, name: "Platinum", sym: "XPT", price: 982, chg24: -0.9, chg7: 0.4, unit: "USD / oz", note: "PGM complex", spark: [52, 50, 49, 48, 50, 49, 50] },
    ];

    const fmtPrice = (n) => {
      if (n >= 1000) return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
      if (n >= 1) return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
      return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 4 });
    };

    const fmtCompact = (n) => {
      if (n == null) return "—";
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(n);
    };

    const chgClass = (v) => (v > 0.05 ? "up" : v < -0.05 ? "down" : "flat");
    const chgText = (v) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

    const sparkHtml = (arr, cls) => {
      const max = Math.max(...arr, 1);
      return `<span class="spark ${cls}" aria-hidden="true">${arr
        .map((v) => `<i style="height:${Math.max(12, Math.round((v / max) * 100))}%"></i>`)
        .join("")}</span>`;
    };

    const avg = (rows, key) =>
      rows.reduce((s, r) => s + (Number(r[key]) || 0), 0) / (rows.length || 1);

    const renderSummary = () => {
      const c24 = avg(crypto, "chg24");
      const s24 = avg(stocks, "chg24");
      const m24 = avg(commodities, "chg24");
      const leaders = [
        ...crypto.map((r) => ({ ...r, cls: "Crypto" })),
        ...stocks.map((r) => ({ ...r, cls: "Stock" })),
        ...commodities.map((r) => ({ ...r, cls: "Commodity" })),
      ].sort((a, b) => b.chg24 - a.chg24);
      const best = leaders[0];
      const worst = leaders[leaders.length - 1];

      const el = $("#marketSummary");
      if (!el) return;
      el.innerHTML = `
        <div class="market-stat">
          <span class="label">Crypto (avg 24h)</span>
          <span class="value ${chgClass(c24)}">${chgText(c24)}</span>
          <span class="note">Top 10 basket</span>
        </div>
        <div class="market-stat">
          <span class="label">Stocks (avg 1d)</span>
          <span class="value ${chgClass(s24)}">${chgText(s24)}</span>
          <span class="note">Blue-chip basket</span>
        </div>
        <div class="market-stat">
          <span class="label">Commodities (avg 1d)</span>
          <span class="value ${chgClass(m24)}">${chgText(m24)}</span>
          <span class="note">Energy · metals · ag</span>
        </div>
        <div class="market-stat">
          <span class="label">Session leaders</span>
          <span class="value up" style="font-size:1rem">${best.sym} ${chgText(best.chg24)}</span>
          <span class="note">Laggard: ${worst.sym} ${chgText(worst.chg24)}</span>
        </div>`;

      const insight = $("#marketInsightText");
      if (insight) {
        insight.textContent = `Demo narrative: crypto basket ${chgText(c24)}, equities ${chgText(s24)}, commodities ${chgText(m24)}. Strongest tape: ${best.name} (${best.cls}). Softest: ${worst.name}. Use this board pattern for client research briefings — clear ranks, colour-coded performance, and a plain-English takeaway.`;
      }
    };

    const renderTable = (tbodyId, rows, mode) => {
      const body = document.getElementById(tbodyId);
      if (!body) return;
      body.innerHTML = rows
        .map((r) => {
          const cls = chgClass(r.chg24);
          if (mode === "commodities") {
            return `<tr>
              <td class="mkt-rank">${r.rank}</td>
              <td><span class="mkt-name">${r.name}</span><span class="mkt-sym">${r.sym}</span></td>
              <td class="mkt-price">${fmtPrice(r.price)}</td>
              <td class="mkt-chg ${cls}">${chgText(r.chg24)}</td>
              <td class="mkt-chg ${chgClass(r.chg7)}">${chgText(r.chg7)}</td>
              <td class="mkt-vol">${r.unit}</td>
              <td class="mkt-cap">${r.note}</td>
              <td>${sparkHtml(r.spark, cls)}</td>
            </tr>`;
          }
          return `<tr>
            <td class="mkt-rank">${r.rank}</td>
            <td><span class="mkt-name">${r.name}</span><span class="mkt-sym">${r.sym}</span></td>
            <td class="mkt-price">${fmtPrice(r.price)}</td>
            <td class="mkt-chg ${cls}">${chgText(r.chg24)}</td>
            <td class="mkt-chg ${chgClass(r.chg7)}">${chgText(r.chg7)}</td>
            <td class="mkt-cap">${fmtCompact(r.mcap)}</td>
            <td class="mkt-vol">${fmtCompact(r.vol)}</td>
            <td>${sparkHtml(r.spark, cls)}</td>
          </tr>`;
        })
        .join("");
    };

    renderSummary();
    renderTable("marketCryptoBody", crypto, "crypto");
    renderTable("marketStocksBody", stocks, "stocks");
    renderTable("marketCommoditiesBody", commodities, "commodities");

    const asOf = $("#marketAsOf");
    if (asOf) {
      asOf.textContent =
        "Illustrative snapshot · " +
        new Date().toLocaleString("en-AU", {
          dateStyle: "medium",
          timeStyle: "short",
        });
    }

    $$(".market-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const key = tab.dataset.market;
        $$(".market-tab").forEach((t) => {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", String(t === tab));
        });
        $$(".market-panel").forEach((panel) => {
          const active = panel.id === `market-panel-${key}`;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      });
    });
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
