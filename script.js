// PC에서는 큰 SILUA 로고에 커서를 올리고, 모바일에서는 로고나 햄버거를 눌러 메뉴를 엽니다.
const menu = document.querySelector(".gnb-menu");
const gnb = document.querySelector(".gnb");
const logoToggle = document.querySelector(".logo-menu-button");
const menuButton = document.querySelector(".menu-button");
const toggles = document.querySelectorAll(".menu-button");
const desktopHover = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");

if (menu && toggles.length) {
  const setMenuState = (isOpen) => {
    menu.classList.toggle("open", isOpen);
    const isEnglish = document.documentElement.lang === "en";
    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen
        ? (isEnglish ? "Close main menu" : "주요 메뉴 닫기")
        : (isEnglish ? "Open main menu" : "주요 메뉴 열기"));
    });
  };

  logoToggle?.addEventListener("click", () => {
    location.href = "index.html";
  });

  menuButton?.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("open"));
  });

  logoToggle?.addEventListener("pointerenter", () => {
    if (desktopHover.matches) setMenuState(true);
  });

  gnb?.addEventListener("pointerleave", () => {
    if (desktopHover.matches) setMenuState(false);
  });

  gnb?.addEventListener("focusout", (event) => {
    if (desktopHover.matches && !gnb.contains(event.relatedTarget)) setMenuState(false);
  });

  logoToggle?.addEventListener("focus", () => {
    if (desktopHover.matches) setMenuState(true);
  });

  // 영문 상위 메뉴는 페이지 이동 없이 하위 메뉴를 보여주는 역할만 합니다.
  menu.querySelectorAll(":scope > li > a").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
  }));

  menu.querySelectorAll(".gnb-submenu a").forEach((link) => link.addEventListener("click", () => {
    setMenuState(false);
  }));
}

// 메인 이미지가 일정 간격으로 부드럽게 사라지고 다음 이미지로 교체됩니다.
const hero = document.querySelector(".hero");
const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroIndicators = [...document.querySelectorAll(".hero-indicator")];

if (hero && heroSlides.length && heroSlides.length === heroIndicators.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentSlide = 0;
  let slideTimer = 0;

  const showSlide = (index) => {
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });
    heroIndicators.forEach((indicator, indicatorIndex) => {
      const isCurrent = indicatorIndex === currentSlide;
      indicator.classList.toggle("is-active", isCurrent);
      indicator.setAttribute("aria-current", String(isCurrent));
    });
  };

  const stopSlideshow = () => {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = 0;
  };

  const startSlideshow = () => {
    stopSlideshow();
    if (!reducedMotion.matches && !document.hidden) {
      slideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
    }
  };

  heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      startSlideshow();
    });
  });

  hero.addEventListener("focusin", stopSlideshow);
  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) startSlideshow();
  });
  document.addEventListener("visibilitychange", startSlideshow);
  reducedMotion.addEventListener?.("change", startSlideshow);
  showSlide(0);
  startSlideshow();
}

// 고정 문구용 한·영 번역입니다. 관리자에서 작성한 제품·포트폴리오 본문은 원문을 유지합니다.
const translations = {
  ko: {
    common: {
      notice: "문의",
      home: "홈으로 이동",
      menuOpen: "주요 메뉴 열기",
      menuClose: "주요 메뉴 닫기",
      admin: "관리자 로그인",
      search: "제품 검색",
      footer: "상호: ○○○ · 대표자: ○○○<br>사업자등록번호: 000-00-00000 · 주소: ○○○"
    },
    pages: {
      "index.html": { title: "SILUA", heroTitle: "메인 카피 (20자 내)", heroSub: "서브 카피 (40자 내) — 브랜드를 소개하는 짧은 문장을 적으세요.", action: "컬렉션 보기", categories: ["인생의 주인공이 되는 날", "화려하게 빛나는 순간", "특별한 날의 레디투웨어"], categoryMore: "자세히 보기 >", strengths: "우리 브랜드의 강점", strengthTitle: "강점 제목", strengthBody: "강점 설명을 적으세요.", looks: "지금 인기 있는 상품이에요" },
      "about.html": { title: "브랜드 소개 — SILUA", head: "브랜드 소개", intro: "브랜드 한 줄 소개를 여기에 적으세요.", story: "브랜드 스토리", storyText: "브랜드 스토리를 여기에 붙여넣으세요. 문단이 여러 개면 <p> 태그를 복사해서 나눠 넣으면 됩니다.", storySecond: "두 번째 문단 예시입니다.", keywords: "브랜드 키워드", keywordItems: ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"], philosophy: "브랜드 철학", philosophyText: "브랜드 철학 문구를 여기에 적으세요.", people: "만드는 사람들", photo: "사진 설명" },
      "products.html": { title: "제품 — SILUA", head: "제품", intro: "취급 품목을 여기에 적으세요. (예: Dress / Jacket / Shirt / Skirt)" },
      "product.html": { title: "제품 상세 — SILUA", loading: "제품 정보를 불러오는 중…", purchase: "구매 안내", close: "구매 안내 닫기", confirm: "확인", back: "← 제품 목록으로" },
      "portfolio.html": { title: "포트폴리오 — SILUA", head: "포트폴리오", intro: "브랜드의 작업·프로젝트 사례를 소개합니다.", loading: "포트폴리오를 불러오는 중입니다." },
      "contact.html": { title: "문의 — SILUA", head: "문의", intro: "편한 방법으로 연락 주세요.", kakao: "카카오채널 바로가기", hours: "운영 시간", hoursValue: "평일 10:00 – 18:00" }
    }
  },
  en: {
    common: {
      notice: "NOTICE",
      home: "Go to home",
      menuOpen: "Open main menu",
      menuClose: "Close main menu",
      admin: "Administrator login",
      search: "Search products",
      footer: "Company: ○○○ · Representative: ○○○<br>Business Registration No.: 000-00-00000 · Address: ○○○"
    },
    pages: {
      "index.html": { title: "SILUA", heroTitle: "MAIN COPY (UP TO 20 CHARACTERS)", heroSub: "Write a short sentence introducing the brand here.", action: "VIEW COLLECTION", categories: ["The day you become the main character", "A moment to shine brilliantly", "Ready-to-wear for your special day"], categoryMore: "VIEW MORE >", strengths: "WHY CHOOSE SILUA", strengthTitle: "STRENGTH TITLE", strengthBody: "Describe this strength here.", looks: "POPULAR RIGHT NOW" },
      "about.html": { title: "About — SILUA", head: "ABOUT SILUA", intro: "Write a one-line introduction to the brand here.", story: "BRAND STORY", storyText: "Paste the brand story here. Divide longer stories into separate paragraphs.", storySecond: "This is an example of a second paragraph.", keywords: "BRAND KEYWORDS", keywordItems: ["KEYWORD 1", "KEYWORD 2", "KEYWORD 3", "KEYWORD 4", "KEYWORD 5"], philosophy: "BRAND PHILOSOPHY", philosophyText: "Write the brand philosophy here.", people: "OUR PEOPLE", photo: "Photo description" },
      "products.html": { title: "Products — SILUA", head: "PRODUCTS", intro: "Introduce the available categories here. (e.g. Dress / Jacket / Shirt / Skirt)" },
      "product.html": { title: "Product Details — SILUA", loading: "Loading product information…", purchase: "PURCHASE INFORMATION", close: "Close purchase information", confirm: "OK", back: "← BACK TO PRODUCTS" },
      "portfolio.html": { title: "Portfolio — SILUA", head: "PORTFOLIO", intro: "Explore the brand’s work and projects.", loading: "Loading the portfolio…" },
      "contact.html": { title: "Contact — SILUA", head: "CONTACT", intro: "Contact us in whichever way is most convenient.", kakao: "Open KakaoTalk channel", hours: "HOURS", hoursValue: "Weekdays 10:00 – 18:00" }
    }
  }
};

function setText(selector, value, root = document) {
  const element = root.querySelector(selector);
  if (element && value !== undefined) element.textContent = value;
}

function applyPageTranslation(page, text) {
  if (!text) return;
  const sections = document.querySelectorAll("body > .section");
  document.title = text.title;

  if (page === "index.html") {
    setText(".hero h1", text.heroTitle);
    setText(".hero-copy > p:not(.eyebrow)", text.heroSub);
    setText(".hero .btn", text.action);
    document.querySelectorAll(".home-category").forEach((category, index) => {
      setText("p", text.categories[index], category);
      setText("span", text.categoryMore, category);
    });
    if (sections[0]) {
      setText("h2", text.strengths, sections[0]);
      sections[0].querySelectorAll(".feature").forEach((feature) => {
        setText("h3", text.strengthTitle, feature);
        setText("p:last-child", text.strengthBody, feature);
      });
    }
    setText(".popular-products h2", text.looks);
  } else if (page === "about.html") {
    setText(".page-head h1", text.head);
    setText(".page-head p", text.intro);
    if (sections[0]) {
      setText("h2", text.story, sections[0]);
      const leads = sections[0].querySelectorAll(".lead");
      if (leads[0]) leads[0].textContent = text.storyText;
      if (leads[1]) leads[1].textContent = text.storySecond;
    }
    if (sections[1]) {
      setText("h2", text.keywords, sections[1]);
      sections[1].querySelectorAll(".tags span").forEach((item, index) => { item.textContent = text.keywordItems[index]; });
    }
    if (sections[2]) { setText("h2", text.philosophy, sections[2]); setText(".lead", text.philosophyText, sections[2]); }
    if (sections[3]) {
      setText("h2", text.people, sections[3]);
      sections[3].querySelectorAll(".card > p").forEach((caption) => { caption.textContent = text.photo; });
    }
  } else if (page === "products.html") {
    setText(".page-head h1", text.head);
    setText(".page-head p", text.intro);
  } else if (page === "product.html") {
    const productName = document.querySelector(".product-info h1")?.textContent;
    document.title = productName ? `${productName} — ${document.documentElement.lang === "en" ? "Product Details" : "제품 상세"}` : text.title;
    setText("#product-detail .section p", text.loading);
    setText("#purchaseDialogTitle", text.purchase);
    setText(".purchase-dialog-close", "×");
    document.querySelector(".purchase-dialog-close")?.setAttribute("aria-label", text.close);
    setText(".purchase-dialog-actions .btn", text.confirm);
    setText(".product-back .btn", text.back);
  } else if (page === "portfolio.html") {
    setText(".page-head h1", text.head);
    setText(".page-head p", text.intro);
    setText(".portfolio-status", text.loading);
  } else if (page === "contact.html") {
    setText(".page-head h1", text.head);
    setText(".page-head p", text.intro);
    const items = document.querySelectorAll(".contact-item");
    if (items[2]) setText(".value a", text.kakao, items[2]);
    if (items[3]) { setText(".label", text.hours, items[3]); setText(".value", text.hoursValue, items[3]); }
  }
}

function applyLanguage(language, remember = true) {
  const selected = language === "en" ? "en" : "ko";
  const dictionary = translations[selected];
  const page = location.pathname.split("/").pop() || "index.html";
  document.documentElement.lang = selected;

  setText(".top-links a", dictionary.common.notice);
  document.querySelectorAll(".language-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === selected));
  });
  logoToggle?.setAttribute("aria-label", dictionary.common.home);
  logoToggle?.removeAttribute("aria-controls");
  logoToggle?.removeAttribute("aria-expanded");
  document.querySelectorAll(".menu-button").forEach((button) => {
    button.setAttribute("aria-label", menu?.classList.contains("open") ? dictionary.common.menuClose : dictionary.common.menuOpen);
  });
  document.querySelector(".user-button")?.setAttribute("aria-label", dictionary.common.admin);
  document.querySelector(".search-button")?.setAttribute("aria-label", dictionary.common.search);
  const footerBusiness = document.querySelector(".footer .biz");
  if (footerBusiness) footerBusiness.innerHTML = dictionary.common.footer;
  applyPageTranslation(page, dictionary.pages[page]);

  if (remember) {
    try { localStorage.setItem("silua-language", selected); } catch (_) { /* 저장이 막혀도 언어 전환은 유지합니다. */ }
  }
  document.dispatchEvent(new CustomEvent("silua:languagechange", { detail: { language: selected } }));
}

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

let initialLanguage = "ko";
try { initialLanguage = localStorage.getItem("silua-language") || "ko"; } catch (_) { /* 기본값은 한국어입니다. */ }
applyLanguage(initialLanguage, false);
