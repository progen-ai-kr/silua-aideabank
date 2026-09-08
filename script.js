// PC에서는 큰 SILUA 로고에 커서를 올리고, 모바일에서는 로고나 햄버거를 눌러 메뉴를 엽니다.
const menu = document.querySelector(".gnb-menu");
const gnb = document.querySelector(".gnb");
const logoToggle = document.querySelector(".logo-menu-button");
const menuButton = document.querySelector(".menu-button");
const toggles = document.querySelectorAll(".menu-button");
const desktopHover = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");

// 메뉴마다 서로 다른 화면과 필터가 열리도록 링크를 한 곳에서 관리합니다.
const menuDestinations = {
  "SELF WEDDING": {
    main: "products.html?collection=self-wedding",
    children: ["products.html?collection=self-wedding&mode=rental", "products.html?collection=self-wedding&service=custom"]
  },
  "EVENING & PARTY": {
    main: "products.html?collection=evening-party",
    children: ["products.html?collection=evening-party&mode=rental", "products.html?collection=evening-party&service=custom"]
  },
  "WEDDING ATTIRE": {
    main: "products.html?collection=wedding-attire",
    children: [
      "products.html?collection=wedding-attire&type=one-piece",
      "products.html?collection=wedding-attire&type=two-piece",
      "products.html?collection=wedding-attire&type=suit"
    ]
  },
  "ACCESSORIES": {
    main: "accessories.html",
    children: ["accessories.html?type=shoes", "accessories.html?type=goods"]
  },
  "RESERVATION": {
    main: "reservation.html",
    children: [
      "reservation.html?activity=norigae#workshop",
      "reservation.html?activity=shoes#workshop",
      "reservation.html?activity=keyring#workshop",
      "reservation.html#personal-color"
    ]
  }
};

document.querySelectorAll(".gnb-category").forEach((category) => {
  const mainLink = category.querySelector(":scope > a");
  const destination = menuDestinations[mainLink?.textContent.trim().toUpperCase()];
  if (!destination) return;
  mainLink.href = destination.main;
  category.querySelectorAll(".gnb-submenu a").forEach((link, index) => {
    if (destination.children[index]) link.href = destination.children[index];
  });
});

// 푸터의 예약 배너도 새 예약 화면의 해당 위치로 연결합니다.
const footerBanners = document.querySelectorAll(".footer-banner");
if (footerBanners[0]) footerBanners[0].href = "reservation.html#workshop";
if (footerBanners[1]) footerBanners[1].href = "reservation.html#personal-color";

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

  menu.querySelectorAll(".gnb-submenu a").forEach((link) => link.addEventListener("click", () => {
    setMenuState(false);
  }));
}

// 검은 헤더의 작은 SILUA를 8초 안에 10번 눌렀을 때만 관리자 로그인으로 이동합니다.
const hiddenAdminTrigger = document.querySelector(".brand-links span");
if (hiddenAdminTrigger) {
  let adminClickCount = 0;
  let adminClickStartedAt = 0;
  let adminResetTimer = 0;
  const resetAdminClicks = () => {
    adminClickCount = 0;
    adminClickStartedAt = 0;
    window.clearTimeout(adminResetTimer);
  };

  hiddenAdminTrigger.setAttribute("role", "button");
  hiddenAdminTrigger.setAttribute("tabindex", "0");
  hiddenAdminTrigger.setAttribute("aria-label", "SILUA");
  const countAdminClick = () => {
    const now = Date.now();
    if (!adminClickStartedAt || now - adminClickStartedAt > 10000) {
      resetAdminClicks();
      adminClickStartedAt = now;
    }
    adminClickCount += 1;
    window.clearTimeout(adminResetTimer);
    adminResetTimer = window.setTimeout(resetAdminClicks, 10000 - (now - adminClickStartedAt));
    if (adminClickCount === 10) {
      resetAdminClicks();
      location.assign("admin.html");
    }
  };
  hiddenAdminTrigger.addEventListener("click", countAdminClick);
  hiddenAdminTrigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      countAdminClick();
    }
  });
}

// 사람 모양 아이콘은 더 이상 관리자 화면으로 바로 이동하지 않습니다.
const userButton = document.querySelector(".user-button");
userButton?.removeAttribute("href");
userButton?.setAttribute("role", "button");
userButton?.setAttribute("tabindex", "0");
userButton?.addEventListener("click", (event) => {
  event.preventDefault();
  openMemberDialog();
});

function openMemberDialog() {
  let dialog = document.getElementById("memberDialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "memberDialog";
    dialog.className = "member-dialog";
    dialog.innerHTML = `
      <section class="member-dialog-card" aria-labelledby="memberDialogTitle">
        <header class="member-dialog-header">
          <div><p>SILUA MEMBER</p><h2 id="memberDialogTitle">로그인</h2></div>
          <button class="member-dialog-close" type="button" aria-label="회원 창 닫기">×</button>
        </header>
        <div class="member-tabs" role="tablist" aria-label="회원 메뉴">
          <button type="button" role="tab" aria-selected="true" data-member-tab="login">로그인</button>
          <button type="button" role="tab" aria-selected="false" data-member-tab="join">회원가입</button>
        </div>
        <form class="member-form is-active" data-member-panel="login">
          <label><span>이메일</span><input type="email" name="email" autocomplete="email" required /></label>
          <label><span>비밀번호</span><input type="password" name="password" autocomplete="current-password" minlength="8" required /></label>
          <button class="btn" type="submit">로그인</button>
          <p class="member-form-status" aria-live="polite"></p>
        </form>
        <form class="member-form" data-member-panel="join" hidden>
          <label><span>이름</span><input type="text" name="name" autocomplete="name" required /></label>
          <label><span>이메일</span><input type="email" name="email" autocomplete="email" required /></label>
          <label><span>비밀번호</span><input type="password" name="password" autocomplete="new-password" minlength="8" required /></label>
          <label><span>비밀번호 확인</span><input type="password" name="passwordConfirm" autocomplete="new-password" minlength="8" required /></label>
          <button class="btn" type="submit">회원가입</button>
          <p class="member-form-status" aria-live="polite"></p>
        </form>
      </section>`;
    document.body.append(dialog);

    const title = dialog.querySelector("h2");
    const tabs = dialog.querySelectorAll("[data-member-tab]");
    const panels = dialog.querySelectorAll("[data-member-panel]");
    const selectTab = (name) => {
      tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.memberTab === name)));
      panels.forEach((panel) => {
        const active = panel.dataset.memberPanel === name;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
      title.textContent = name === "join" ? "회원가입" : "로그인";
      dialog.querySelector(`[data-member-panel="${name}"] input`)?.focus();
    };
    tabs.forEach((tab) => tab.addEventListener("click", () => selectTab(tab.dataset.memberTab)));
    dialog.querySelector(".member-dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    panels.forEach((form) => form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector(".member-form-status");
      if (form.dataset.memberPanel === "join") {
        const data = new FormData(form);
        if (data.get("password") !== data.get("passwordConfirm")) {
          status.textContent = "비밀번호가 일치하지 않습니다.";
          return;
        }
      }
      status.textContent = "화면 구성이 완료되었습니다. 실제 회원 처리는 회원 서버 연결 후 사용할 수 있습니다.";
    }));
  }
  if (!dialog.open) dialog.showModal();
  window.setTimeout(() => dialog.querySelector(".member-form.is-active input")?.focus(), 0);
}

// 돋보기를 누르면 현재 페이지 위에 제품 검색창을 엽니다.
const searchButton = document.querySelector(".search-button");
if (searchButton) {
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    openProductSearch();
  });
}

function openProductSearch() {
  let dialog = document.getElementById("siteSearchDialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "siteSearchDialog";
    dialog.className = "search-dialog";
    dialog.innerHTML = `
      <section class="search-dialog-card" aria-labelledby="siteSearchTitle">
        <header class="search-dialog-header">
          <div><p>SEARCH</p><h2 id="siteSearchTitle">제품 검색</h2></div>
          <button class="search-dialog-close" type="button" aria-label="검색 닫기">×</button>
        </header>
        <label class="search-field">
          <span class="sr-only">검색어</span>
          <input type="search" autocomplete="off" placeholder="제품명 또는 카테고리를 입력하세요" />
          <span aria-hidden="true"></span>
        </label>
        <p class="search-status" aria-live="polite">검색어를 입력하면 제품을 찾아드립니다.</p>
        <div class="search-results"></div>
      </section>`;
    document.body.append(dialog);

    const input = dialog.querySelector("input");
    const status = dialog.querySelector(".search-status");
    const results = dialog.querySelector(".search-results");
    let products = [];

    const renderResults = () => {
      const query = input.value.trim().toLocaleLowerCase();
      results.replaceChildren();
      if (!query) {
        status.textContent = "검색어를 입력하면 제품을 찾아드립니다.";
        return;
      }
      const matches = products.filter((product) => [
        product.name, product.label, product.category, product.summary,
        ...(Array.isArray(product.keywords) ? product.keywords : [])
      ].join(" ").toLocaleLowerCase().includes(query));
      status.textContent = matches.length ? `${matches.length}개의 제품을 찾았습니다.` : "검색 결과가 없습니다.";
      matches.forEach((product) => {
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = `product.html?id=${encodeURIComponent(product.id)}`;
        const image = document.createElement("span");
        image.className = "search-result-image";
        const source = String(product.images?.[0] || "");
        if (/^(?:\.\/)?images\/[a-z0-9_./%+~-]+$/i.test(source) || /^\/images\/[a-z0-9_./%+~-]+$/i.test(source)) {
          const img = document.createElement("img");
          img.src = source;
          img.alt = "";
          image.append(img);
        }
        const copy = document.createElement("span");
        copy.className = "search-result-copy";
        const name = document.createElement("strong");
        name.textContent = product.name || "이름 없는 제품";
        const meta = document.createElement("span");
        meta.textContent = product.price || product.label || product.category || "상세 보기";
        copy.append(name, meta);
        link.append(image, copy);
        results.append(link);
      });
    };

    input.addEventListener("input", renderResults);
    dialog.querySelector(".search-dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    fetch("products.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("제품 데이터를 불러오지 못했습니다.");
        return response.json();
      })
      .then((data) => {
        products = (Array.isArray(data) ? data : data.products || []).filter((product) => product && product.published !== false);
        renderResults();
      })
      .catch(() => { status.textContent = "제품 검색을 불러오지 못했습니다. 잠시 후 다시 시도해주세요."; });
  }
  if (!dialog.open) dialog.showModal();
  window.setTimeout(() => dialog.querySelector("input")?.focus(), 0);
}

// 메인 이미지가 일정 간격으로 부드럽게 사라지고 다음 이미지로 교체됩니다.
const hero = document.querySelector(".hero");
const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroPagination = document.querySelector(".hero-pagination");

if (hero && heroSlides.length && heroPagination) {
  heroPagination.innerHTML = heroSlides.map((_, index) => (
    `<button class="hero-indicator${index === 0 ? " is-active" : ""}" type="button" ` +
    `aria-label="${index + 1}번째 이미지 보기" aria-current="${index === 0}"></button>`
  )).join("");
  const heroIndicators = [...heroPagination.querySelectorAll(".hero-indicator")];
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
      admin: "마이페이지",
      search: "제품 검색",
      footer: "상호: ○○○ · 대표자: ○○○<br>사업자등록번호: 000-00-00000 · 주소: ○○○",
      footerTagline: "전통을 다시 입는 것이 아니라, 오늘의 나를 위한 새로운 선으로 입는다.",
      footerBanners: [
        { title: "공방 체험 예약", copy: "노리개 · 구두 꾸미기 · 키링 만들기" },
        { title: "1:1 퍼스널진단", copy: "나에게 어울리는 스타일을 만나보세요" },
        { title: "브랜드 이야기", copy: "전통을 오늘의 새로운 선으로 풀어냅니다" }
      ],
      customer: "고객센터",
      emailInquiry: "이메일 문의",
      footerHours: "평일 10:00 – 18:00"
    },
    pages: {
      "index.html": { title: "SILUA", heroTitle: "전통을 다시 입는 것이 아니라, 오늘의 나를 위한 새로운 선으로 입는다.", heroSub: "한복이 드레스가 되는 순간, 당신의 가장 빛나는 하루.", action: "컬렉션 보기", categoryTitles: ["Self Weading", "Evening & Party", "Wedding Attire"], categories: ["인생의 주인공이 되는 날", "화려하게 빛나는 순간", "특별한 날의 레디투웨어"], categoryMore: "자세히 보기 >", strengths: "우리 브랜드의 강점", strengthTitle: "강점 제목", strengthBody: "강점 설명을 적으세요.", looks: "인기 상품", editorialTitle: "신 제품" },
      "about.html": { title: "브랜드 소개 — SILUA", head: "SILUA", intro: "한국의 자연과 전통 한복의 실루엣에서 영감을 받아 현대적인 웨딩드레스로 재해석하는 K-Wedding 브랜드.", story: "브랜드 스토리", storyText: "브랜드 스토리를 여기에 붙여넣으세요. 문단이 여러 개면 <p> 태그를 복사해서 나눠 넣으면 됩니다.", storySecond: "두 번째 문단 예시입니다.", keywords: "브랜드 키워드", keywordItems: ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"], philosophy: "브랜드 철학", philosophyText: "브랜드 철학 문구를 여기에 적으세요.", people: "만드는 사람들", photo: "사진 설명", strengths: "우리 브랜드의 강점", strengthTitle: "강점 제목", strengthBody: "강점 설명을 적으세요.", portfolio: "포트폴리오", portfolioLoading: "포트폴리오를 불러오는 중입니다.", visit: "매장 안내", hoursLabel: "영업시간", hoursValue: "평일 10:00 – 18:00", addressLabel: "주소", addressValue: "주소를 입력해주세요", emailLabel: "이메일" },
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
      admin: "My page",
      search: "Search products",
      footer: "Company: ○○○ · Representative: ○○○<br>Business Registration No.: 000-00-00000 · Address: ○○○",
      footerTagline: "Not tradition reworn, but new lines made for who I am today.",
      footerBanners: [
        { title: "WORKSHOP RESERVATION", copy: "Norigae · Shoe decoration · Keyring" },
        { title: "1:1 PERSONAL CONSULTATION", copy: "Discover the style that suits you" },
        { title: "OUR STORY", copy: "Tradition reimagined through new lines" }
      ],
      customer: "CUSTOMER CENTER",
      emailInquiry: "EMAIL INQUIRY",
      footerHours: "Weekdays 10:00 – 18:00"
    },
    pages: {
      "index.html": { title: "SILUA", heroTitle: "Not tradition reworn, but new lines made for who I am today.", heroSub: "Write a short sentence introducing the brand here.", action: "VIEW COLLECTION", categoryTitles: ["Self Weading", "Evening & Party", "Wedding Attire"], categories: ["The day you become the main character", "A moment to shine brilliantly", "Ready-to-wear for your special day"], categoryMore: "VIEW MORE >", strengths: "WHY CHOOSE SILUA", strengthTitle: "STRENGTH TITLE", strengthBody: "Describe this strength here.", looks: "POPULAR PRODUCTS", editorialTitle: "NEW PRODUCTS" },
      "about.html": { title: "About — SILUA", head: "SILUA", intro: "Write a one-line introduction to the brand here.", story: "BRAND STORY", storyText: "Paste the brand story here. Divide longer stories into separate paragraphs.", storySecond: "This is an example of a second paragraph.", keywords: "BRAND KEYWORDS", keywordItems: ["KEYWORD 1", "KEYWORD 2", "KEYWORD 3", "KEYWORD 4", "KEYWORD 5"], philosophy: "BRAND PHILOSOPHY", philosophyText: "Write the brand philosophy here.", people: "OUR PEOPLE", photo: "Photo description", strengths: "WHY CHOOSE SILUA", strengthTitle: "STRENGTH TITLE", strengthBody: "Describe this strength here.", portfolio: "PORTFOLIO", portfolioLoading: "Loading the portfolio…", visit: "VISIT & CONTACT", hoursLabel: "HOURS", hoursValue: "Weekdays 10:00 – 18:00", addressLabel: "ADDRESS", addressValue: "Enter the store address", emailLabel: "EMAIL" },
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
      setText("h2", text.categoryTitles[index], category);
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
    setText(".editorial-products h2", text.editorialTitle);
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
    setText(".story-strengths h2", text.strengths);
    document.querySelectorAll(".story-strengths .feature").forEach((feature) => {
      setText("h3", text.strengthTitle, feature);
      setText("p:last-child", text.strengthBody, feature);
    });
    setText(".story-portfolio h2", text.portfolio);
    setText(".story-portfolio .portfolio-status", text.portfolioLoading);
    setText(".story-contact h2", text.visit);
    setText(".story-hours .label", text.hoursLabel);
    setText(".story-hours .value", text.hoursValue);
    setText(".story-address .label", text.addressLabel);
    setText(".story-address .value", text.addressValue);
    setText(".story-email .label", text.emailLabel);
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
  setText(".footer-tagline", dictionary.common.footerTagline);
  document.querySelectorAll(".footer-banner").forEach((banner, index) => {
    const bannerText = dictionary.common.footerBanners[index];
    if (!bannerText) return;
    setText("strong", bannerText.title, banner);
    setText(".footer-banner-copy", bannerText.copy, banner);
  });
  setText(".footer-customer h2", dictionary.common.customer);
  setText(".footer-customer-title", dictionary.common.emailInquiry);
  setText(".footer-hours", dictionary.common.footerHours);
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
