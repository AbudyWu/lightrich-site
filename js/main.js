/* =========================================================
   main.js (C1) - Full features + no-jitter showcase + IO pause
   Based on your original copy:  [oai_citation:1‡main copy.js](sediment://file_000000002de87208aaf4b5e5ba8381c2)
   ========================================================= */

/* -------------------------
   Small helpers
   ------------------------- */
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* =========================
   Mobile nav toggle
   ========================= */
function initMobileNav() {
  const navToggle = qs("#navToggle");
  const nav = qs("#nav");
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // close menu when clicking a link (mobile)
  qsa("a", nav).forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   Tabs (.tab -> #tab-xxx)
   ========================= */
function initSectionTabs() {
  const tabs = qsa(".tab");
  if (!tabs.length) return;

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const key = btn.getAttribute("data-tab");
      qsa(".panel").forEach((p) => p.classList.remove("is-active"));
      const panel = qs(`#tab-${key}`);
      if (panel) panel.classList.add("is-active");
    });
  });
}

/* =========================
   Footer year
   ========================= */
function initFooterYear() {
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/* =========================
   Partners marquee: clone for seamless looping
   (如果你改成靜態 grid，#partnersTrack 不存在就會自動略過)
   ========================= */
function initPartnersMarquee() {
  const track = qs("#partnersTrack");
  if (!track) return;
  if (track.dataset.cloned === "1") return;

  const items = Array.from(track.children);
  items.forEach((node) => track.appendChild(node.cloneNode(true)));
  track.dataset.cloned = "1";
}

/* =========================
   Process flow tabs (diagram switch)
   ========================= */
function initProcessTabs() {
  const tabs = qsa(".process-tab");
  if (!tabs.length) return;

  const panels = qsa(".process-panel");
  const zhEl = qs(".process-current__zh");
  const enEl = qs(".process-current__en");

  const labelMap = {
    smt: { zh: "SMT 生產製造流程", en: "SMT Production Process Flow" },
    dip: { zh: "DIP 生產製造流程", en: "DIP Production Process Flow" },
    assy: { zh: "組裝 / 測試 / 包裝流程", en: "Build / Test / Pack Process Flow" },
  };

  function setActive(key) {
    tabs.forEach((t) => {
      const active = t.getAttribute("data-flow") === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach((p) =>
      p.classList.toggle("is-active", p.getAttribute("data-flow") === key)
    );

    const label = labelMap[key];
    if (label && zhEl && enEl) {
      zhEl.textContent = label.zh;
      enEl.textContent = label.en;
    }
  }

  tabs.forEach((t) => {
    t.addEventListener("click", () => setActive(t.getAttribute("data-flow")));
  });

  const current =
    qs(".process-tab.is-active")?.getAttribute("data-flow") || "smt";
  setActive(current);
}

/* =========================
   Equipment Showcase data (unchanged)
   ========================= */
const EQUIP_SHOWCASE_DATA = {
  printer: {
    title: "自動印錫機",
    img: "assets/equipment/自動印錫機.png",
    specs: [
      "最大基板尺寸 Max PCB Size：510 × 510 mm",
      "最小基板尺寸 Min PCB Size：50 × 50 mm",
      "基板厚度範圍 PCB Thickness Range：0.4 – 6 mm",
      "最大基板重量 Max PCB Weight：5 kg",
      "基板邊緣間隙 PCB Edge Clearance：2.5 mm",
      "過板高度 PCB Clearance Height：23 mm",
      "傳輸高度 Conveyor Height：900 ± 40 mm",
      "傳輸速度 Conveyor Speed：分段控制，最高 1500 mm/s",
      "傳輸方式 Conveyor Type：一段式運輸軌道",
      "基板夾持方式 PCB Clamping Method：自動伸縮式上壓片",
      "基板支撐方式 PCB Support Method：磁性頂針／等高塊",
      "平台調整方式 Platform Adjustment：自動調節頂升平台",
    ],
  },
  spi: {
    title: "3D錫膏檢查機",
    img: "assets/equipment/3D錫膏檢查機.png",
    specs: [
      "基板尺寸 PCB Size Range：Min. 50 × 50 mm – Max. 510 × 460 mm",
      "檢測高度範圍 Inspection Height Range：0 – 2 mm",
      "量測能力 Measurement Capability：提供全 3D 檢測，可分析 15 μm 錫膏高度",
      "量測方式 Inspection Method：高精度綠光雷射量測平台",
      "檢測模式 Detection Mode：可立即檢查錫膏漏印、短路等缺陷",
      "無陰影檢測 Shadow-Free Inspection：100% 雙光源數位影像投影檢測",
      "基板固定方式 PCB Handling：智能板彎補償設計，避免 PCB 變形",
      "影像解析度 Imaging Resolution：6 μm / 10 μm / 15 μm（Factory Setting）",
    ],
  },
  mounter: {
    title: "貼片機",
    img: "assets/equipment/貼片機.png",
    specs: [
      "基板尺寸（最小）Min PCB Size：50 × 50 mm",
      "基板尺寸（最大，1 緩衝）Max PCB Size (Single Clamp)：650 × 370 mm（一次夾板）",
      "基板尺寸（最大，2 夾板）Max PCB Size (Dual Clamp)：950 × 370 mm",
      "延長型（150 mm）Extended In/Out 150 mm：1,100 × 370 mm",
      "延長型（250 mm）Extended In/Out 250 mm：1,200 × 370 mm",
      "基板尺寸（最大，3 緩衝）Max PCB Size (Triple Buffer)：360 × 370 mm",
      "延長型（150 mm）：500 × 370 mm",
      "延長型（250 mm）：600 × 370 mm",
      "元件最大高度 Max Component Height：25 mm",
      "元件尺寸範圍 Component Size Range：0201（公制 08004）– 74 mm / 50 × 150 mm",
      "貼裝速度 Placement Speed：47,000 CPH",
      "貼裝精度 Placement Accuracy：± 35 μm（Cpk ≥ 1）",
      "影像識別精度 Vision Recognition Accuracy：± 30 μm",
      "元件種類 Component Capacity：最多 112 種",
    ],
  },
  reflow: {
    title: "迴焊爐",
    img: "assets/equipment/SMT4.jpg",
    specs: [
      "PCB 最大寬度 Max PCB Width：270 mm（單通道 50 – 490 mm）",
      "元件高度 Component Clearance：上板 30 mm / 下板 25 mm（含板厚）",
      "加熱區數 Heating Zones：上 8 區加熱區，下 2 區冷卻區",
      "溫控方式 Temperature Control：PID 閉環控制＋SSR 驅動",
      "溫度均勻性 Temperature Uniformity：± 4 %",
      "運輸系統 Conveyor System：變頻軌道鋼帶運輸",
      "鏈條結構 Chain Structure：不鏽鋼爪式輸送鏈條（防卡板設計）",
      "導軌結構 Rail Structure：整體升降式",
      "導軌調整 Rail Adjustment：導軌電動調整",
      "上蓋設計 Top Cover Design：上蓋電動開啟，便於內部清潔",
      "UPS 電源 UPS Backup Power：備用電源",
      "冷卻方式 Cooling System：強制空冷",
    ],
  },
  aoi: {
    title: "3D光學檢查機",
    img: "assets/equipment/3D光學檢查機.png",
    specs: [
      "電路板尺寸 PCB Size：500 × 500 mm",
      "最小元件尺寸 Min Component Size：1005",
      "板邊寬度限制 Board Edge Clearance：上方 3.5 mm／下方 4.5 mm",
      "可量測缺陷類型 Detectable Defects：",
      "缺件、偏移、旋轉、反件、極反、立碑、浮高",
      "Missing, Misalignment, Rotation, Polarity Error, Tombstone, Lifted Lead",
      "可量測項目 Inspection Coverage：",
      "翹腳、焊錫不足、短路、OCV、多件、損件",
      "Lead Lift, Insufficient Solder, Short Circuit, OCV, Extra Component, Damage",
      "高度重現性 Height Repeatability：± 3 μm",
      "XY 影像解析度 XY Resolution：10 μm",
      "高度解析度 Height Resolution：2.3 μm",
      "可量測高度 Measurement Height Range：12 mm",
    ],
  },
  xray: {
    title: "X-RAY",
    img: "assets/equipment/X-RAY.png",
    specs: [
      "Ergonomic Operation Design",
      "60° Tilt & Rotation Imaging",
      "CNC Programmable Precision Positioning",
      "Automatic Solder Void Ratio Measurement",
      "Secure Data & Access Control System",
      "Real-time Radiation Energy Monitoring",
    ],
  },
};

/* =========================
   Equipment Showcase (C improvements)
   - preload + cache
   - auto cycle: no scrollIntoView
   - user click: scrollIntoView + stop forever
   - intersection observer: out of view stop, in view start (unless user clicked)
   ========================= */
function initEquipShowcase() {
  const stepsWrap = qs(".equip-steps");
  const imgEl = qs("#equipShowcaseImg");
  const titleEl = qs("#equipShowcaseTitle");
  const specsEl = qs("#equipShowcaseSpecs");
  if (!stepsWrap || !imgEl || !titleEl || !specsEl) return;

  const buttons = qsa(".equip-step", stepsWrap);
  if (!buttons.length) return;

  let idx = Math.max(0, buttons.findIndex((b) => b.classList.contains("is-active")));
  let timer = null;
  let userPauseTimer = null;   // ✅ 新增：點擊後延遲恢復用
  let pausedByUser = false;
  const INTERVAL_MS = 3500;
  const USER_PAUSE_MS = 30000;

  // preload cache (避免每次 new Image)
  const cache = new Map(); // url -> Promise<void>
  function preload(url) {
    if (cache.has(url)) return cache.get(url);
    const p = new Promise((resolve) => {
      const im = new Image();
      im.onload = () => resolve();
      im.onerror = () => resolve();
      im.src = url;
    });
    cache.set(url, p);
    return p;
  }

  async function render(stepKey, fromUser = false) {
    const d = EQUIP_SHOWCASE_DATA[stepKey];
    if (!d) return;

    buttons.forEach((b) => {
      const active = b.dataset.step === stepKey;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    titleEl.textContent = d.title;
    imgEl.alt = d.title;

    // ✅ 圖片載好再換，減少微跳
    await preload(d.img);
    imgEl.src = d.img;

    specsEl.innerHTML = "";
    (d.specs || []).forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      specsEl.appendChild(li);
    });

    // ✅ 只在使用者點擊時才捲動 steps bar
    if (fromUser) {
      const activeBtn = buttons.find((b) => b.dataset.step === stepKey);
      activeBtn?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
    }
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
  // ✅ 點擊暫停期間，不要自動啟動
  if (pausedByUser) return;
  if (userPauseTimer) return;
  if (timer) return;

  timer = window.setInterval(() => {
    idx = (idx + 1) % buttons.length;
    render(buttons[idx].dataset.step, false);
  }, INTERVAL_MS);
}

  // click -> set idx, render + stop forever
  buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    idx = i;

    // ✅ 先停掉輪播
    stop();

    // ✅ 顯示使用者點到的項目（並且會 scrollIntoView）
    render(btn.dataset.step, true);

    // ✅ 重設 30 秒延遲
    pausedByUser = true;
    if (userPauseTimer) window.clearTimeout(userPauseTimer);

    userPauseTimer = window.setTimeout(() => {
      userPauseTimer = null;
      pausedByUser = false;
      start(); // ✅ 30 秒後繼續播放
    }, USER_PAUSE_MS);
  });
});

  // hover/focus pause/resume (but if user clicked, won’t resume)
  stepsWrap.addEventListener("mouseenter", stop);
  stepsWrap.addEventListener("mouseleave", start);
  stepsWrap.addEventListener("focusin", stop);
  stepsWrap.addEventListener("focusout", start);

  // IO: out of view stop, in view start
  const rootBlock = stepsWrap.closest(".equip-showcase") || stepsWrap;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        if (!inView) stop();
        else start();
      },
      { threshold: 0.1 }
    );
    io.observe(rootBlock);
  }

  // init
  render(buttons[idx]?.dataset.step || buttons[0].dataset.step, false);
  start();
}

/* =========================
   Boot
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSectionTabs();
  initFooterYear();
  initPartnersMarquee();
  initProcessTabs();
  initEquipShowcase();
});