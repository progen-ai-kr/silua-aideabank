// PC에서는 큰 SILUA 로고에 커서를 올리고, 모바일에서는 로고나 햄버거를 눌러 메뉴를 엽니다.
const menu = document.querySelector(".gnb-menu");
const gnb = document.querySelector(".gnb");
const logoToggle = document.querySelector(".logo-menu-button");
const menuButton = document.querySelector(".menu-button");
const toggles = document.querySelectorAll(".menu-button");
const desktopLayout = window.matchMedia("(min-width: 901px), (min-width: 720px) and (hover: hover) and (pointer: fine)");
const deviceUserAgent = navigator.userAgent || "";
const isIPadDevice = /iPad/i.test(deviceUserAgent) || (/Macintosh/i.test(deviceUserAgent) && navigator.maxTouchPoints > 1);
const isMobileDevice = isIPadDevice || /Android|iPhone|iPod|Mobile/i.test(deviceUserAgent);
const isDesktopDevice = !isMobileDevice;
const usesDesktopHeader = () => desktopLayout.matches || isDesktopDevice;
document.documentElement.classList.toggle("desktop-device", isDesktopDevice);
// PC로 확인된 환경에서는 CSS 화면 폭 판정과 별개로 삼선 아이콘을 확실히 숨깁니다.
if (isDesktopDevice && menuButton) menuButton.style.display = "none";
const currentPageName = location.pathname.split("/").pop() || "index.html";
const naverStoreUrl = "https://smartstore.naver.com/silua?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQMxMDAAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnv1MFuXjtQTcyL1PA4nfN-EuYGHiJiQA5nOwWwHYXm5M75KVDRZ5vL_VDS7k_aem_1hpZ7Qv7sLsdz2Af72ynQQ";

// 공개 메뉴는 드레스 선택에서 상담까지의 흐름이 한눈에 보이도록 단순화합니다.
if (menu) {
  menu.innerHTML = `
    <li><a href="products.html">COLLECTION</a></li>
    <li><a href="about.html">STORY</a></li>
    <li><a href="reservation.html#personal-color">PERSONAL FIT</a></li>
    <li><a href="reservation.html#workshop">ATELIER</a></li>
    <li><a href="portfolio.html">PORTFOLIO</a></li>
    <li><a href="contact.html">CONTACT</a></li>`;
  menu.querySelectorAll("a").forEach((link) => {
    const destination = link.getAttribute("href")?.split("#")[0];
    if (destination === currentPageName) link.setAttribute("aria-current", "page");
  });
}

// 공통 헤더와 푸터 링크는 모든 공개 페이지에서 같은 주소와 디자인을 사용합니다.
document.querySelectorAll(".brand-links a").forEach((link) => {
  link.href = naverStoreUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll(".footer-socials").forEach((socials) => {
  socials.innerHTML = `
    <a href="https://www.instagram.com/siluadress_official/" target="_blank" rel="noopener noreferrer" aria-label="SILUA Instagram">
      <span class="footer-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.6" cy="6.6" r=".8" fill="currentColor" stroke="none"></circle></svg></span><span>Instagram</span>
    </a>
    <a href="${naverStoreUrl}" target="_blank" rel="noopener noreferrer" aria-label="SILUA Naver Store">
      <span class="footer-social-icon is-naver" aria-hidden="true">N</span><span>Naver Store</span>
    </a>
    <a href="contact.html" aria-label="SILUA KakaoTalk 문의">
      <span class="footer-social-icon is-kakao" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4C6.9 4 3 7.2 3 11.1c0 2.5 1.6 4.7 4.1 6l-.8 3 3.5-2.1c.7.1 1.4.2 2.2.2 5.1 0 9-3.2 9-7.1S17.1 4 12 4Z"></path></svg></span><span>KakaoTalk</span>
    </a>`;

  // SNS 채널을 브랜드 소개와 분리해 푸터 정보를 빠르게 찾을 수 있게 합니다.
  const footerMain = socials.closest(".footer-main");
  if (footerMain && !footerMain.querySelector(".footer-channels")) {
    const channels = document.createElement("section");
    channels.className = "footer-channels";
    channels.innerHTML = "<h2>SOCIAL</h2>";
    channels.append(socials);
    footerMain.insertBefore(channels, footerMain.querySelector(".footer-customer"));
  }
});

document.querySelectorAll(".footer-customer").forEach((customer) => {
  let links = customer.querySelector(".footer-customer-links");
  if (!links) {
    links = document.createElement("nav");
    links.className = "footer-customer-links";
    links.setAttribute("aria-label", "회원 및 고객지원");
    links.innerHTML = '<a href="contact.html">Notice</a><a href="mypage.html">My Page</a><a href="customer.html#faq">FAQ</a><a href="customer.html#qna">Q&amp;A</a>';
    customer.append(links);
  }
});

document.querySelectorAll(".footer .biz").forEach((business) => {
  business.innerHTML = '<span><strong>상호명</strong><span>실루아</span></span><span><strong>대표자</strong><span>안지혜</span></span><span><strong>사업자등록</strong><span>570-27-01072</span></span><span><strong>사업장주소</strong><span>대전시 중구 선화동 434번지 302호</span></span>';
});

// 브랜드 소개 다음에 회사 정보 → 소셜 채널 → 고객센터 순서로 배치합니다.
document.querySelectorAll(".footer-main").forEach((footerMain) => {
  const company = footerMain.querySelector(".footer-company");
  const channels = footerMain.querySelector(".footer-channels");
  const customer = footerMain.querySelector(".footer-customer");
  const footerBottom = footerMain.closest(".footer")?.querySelector(".footer-bottom");
  const customerLinks = customer?.querySelector(".footer-customer-links");
  if (company && channels && customer) footerMain.append(company, channels, customer);
  if (footerBottom && customerLinks) footerBottom.prepend(customerLinks);
});

document.querySelectorAll(".footer").forEach((footer) => {
  if (footer.querySelector(".footer-banners")) return;
  footer.insertAdjacentHTML("afterbegin", '<nav class="footer-banners" aria-label="빠른 안내"><a class="footer-banner" href="about.html"><span class="footer-banner-label">SILUA STORY</span><strong>브랜드 이야기</strong><span class="footer-banner-copy">한국의 미를 오늘의 드레스 실루엣으로</span></a><a class="footer-banner" href="reservation.html#personal-color"><span class="footer-banner-label">PERSONAL SERVICE</span><strong>1:1 퍼스널 진단</strong><span class="footer-banner-copy">나에게 어울리는 색과 선을 찾아보세요</span></a><a class="footer-banner" href="reservation.html#workshop"><span class="footer-banner-label">BESPOKE ATELIER</span><strong>공방 체험 예약</strong><span class="footer-banner-copy">구두와 소품을 나만의 디테일로</span></a></nav>');
});

// 메인을 제외한 모든 화면에서는 PC 카테고리를 계속 펼쳐 바로 이동할 수 있게 합니다.
if (currentPageName !== "index.html") {
  document.body.classList.add("catalog-header-visible");
}

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
      "reservation.html#personal-color",
      "reservation.html#body-shape"
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

// 푸터 배너를 브랜드 이야기 → 퍼스널 진단 → 공방 체험 순서로 연결합니다.
const footerBanners = document.querySelectorAll(".footer-banner");
if (footerBanners[0]) footerBanners[0].href = "about.html";
if (footerBanners[1]) footerBanners[1].href = "reservation.html#personal-color";
if (footerBanners[2]) footerBanners[2].href = "reservation.html#workshop";

if (menu && toggles.length) {
  const setMenuState = (isOpen) => {
    menu.classList.toggle("open", isOpen);
    gnb?.classList.toggle("is-menu-open", isOpen);
    const isEnglish = document.documentElement.lang === "en";
    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen
        ? (isEnglish ? "Close main menu" : "주요 메뉴 닫기")
        : (isEnglish ? "Open main menu" : "주요 메뉴 열기"));
    });
  };

  logoToggle?.addEventListener("click", () => {
    // 큰 SILUA는 모든 화면에서 브랜드 홈으로 돌아가는 링크 역할을 합니다.
    location.href = "index.html";
  });

  menuButton?.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("open"));
  });

  logoToggle?.addEventListener("pointerenter", () => {
    if (usesDesktopHeader()) setMenuState(true);
  });

  gnb?.addEventListener("pointerleave", () => {
    if (usesDesktopHeader()) setMenuState(false);
  });

  gnb?.addEventListener("focusout", (event) => {
    if (usesDesktopHeader() && !gnb.contains(event.relatedTarget)) setMenuState(false);
  });

  logoToggle?.addEventListener("focus", () => {
    if (usesDesktopHeader()) setMenuState(true);
  });

  // 터치 PC는 hover가 없으므로 헤더 밖을 누르면 메뉴를 닫을 수 있게 합니다.
  document.addEventListener("pointerdown", (event) => {
    if (usesDesktopHeader() && !gnb.contains(event.target)) setMenuState(false);
  });

  desktopLayout.addEventListener("change", (event) => {
    if (!usesDesktopHeader()) setMenuState(false);
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
  let memberSession = null;
  try { memberSession = JSON.parse(localStorage.getItem("silua-member-session") || "null"); } catch (_) {}
  if (memberSession?.email) {
    location.href = "mypage.html";
    return;
  }
  openMemberDialog("mypage.html");
});

function openMemberDialog(returnTo = "") {
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
      const data = new FormData(form);
      if (form.dataset.memberPanel === "join") {
        if (data.get("password") !== data.get("passwordConfirm")) {
          status.textContent = "비밀번호가 일치하지 않습니다.";
          return;
        }
      }
      const email = String(data.get("email") || "").trim();
      const savedName = form.dataset.memberPanel === "join"
        ? String(data.get("name") || "").trim()
        : email.split("@")[0];
      try {
        localStorage.setItem("silua-member-session", JSON.stringify({ name: savedName || "SILUA 회원", email }));
      } catch (_) { /* 저장이 막힌 환경에서도 안내 문구는 보여줍니다. */ }
      status.textContent = "로그인되었습니다.";
      window.setTimeout(() => {
        dialog.close();
        location.href = dialog.dataset.returnTo || "mypage.html";
      }, 350);
    }));
  }
  dialog.dataset.returnTo = returnTo;
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
const heroTitle = hero?.querySelector(".hero-copy h1");

// 현재 언어에 맞는 이미지별 문구를 줄바꿈 표시(|)까지 안전하게 렌더링합니다.
const updateHeroCopy = () => {
  const activeSlide = heroSlides.find((slide) => slide.classList.contains("is-active"));
  const title = document.documentElement.lang === "en" ? activeSlide?.dataset.titleEn : activeSlide?.dataset.titleKo;
  if (!heroTitle || !title) return;
  heroTitle.replaceChildren();
  title.split("|").forEach((line) => {
    const lineElement = document.createElement("span");
    lineElement.className = "hero-title-line";
    lineElement.textContent = line;
    heroTitle.append(lineElement);
  });
  heroTitle.classList.remove("is-changing");
  void heroTitle.offsetWidth;
  heroTitle.classList.add("is-changing");
};

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
    updateHeroCopy();
  };

  const stopSlideshow = () => {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = 0;
  };

  const startSlideshow = () => {
    stopSlideshow();
    if (!reducedMotion.matches && !document.hidden) {
      slideTimer = setInterval(() => showSlide(currentSlide + 1), 7000);
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
      footer: '<span><strong>상호명</strong><span>실루아</span></span><span><strong>대표자</strong><span>안지혜</span></span><span><strong>사업자등록</strong><span>570-27-01072</span></span><span><strong>사업장주소</strong><span>대전시 중구 선화동 434번지 302호</span></span>',
      footerTagline: ["한국의 미와 절제된 미감을", "현대적인 드레스 실루엣으로", "재해석합니다."],
      footerBanners: [
        { title: "브랜드 이야기", copy: "한국의 미를 오늘의 드레스 실루엣으로" },
        { title: "1:1 퍼스널 진단", copy: "나에게 어울리는 색과 선을 찾아보세요" },
        { title: "공방 체험 예약", copy: "구두와 소품을 나만의 디테일로" }
      ],
      customer: "고객센터",
      emailInquiry: "문의",
      footerHours: "운영 시간은 문의해 주세요"
    },
    pages: {
      "index.html": { title: "SILUA — Silhouette of Beauty", heroTitle: "특별한 날 빛나야 할 당신을 위한 단 하나의 우아함", heroSub: "전통의 결을 현대적 곡선으로 빚어내어, 가장 빛나는 순간을 완성합니다.", action: "컬렉션 보기", categoryTitles: ["Self Wedding", "Evening & Party", "Wedding Attire"], categories: ["나답게 기록하는 웨딩의 순간", "격식과 개성을 함께 담는 드레스", "특별한 날을 위한 현대적 예복"], categoryMore: "컬렉션 보기 ↗", strengths: "실루아의 맞춤 서비스", strengthTitle: "맞춤 서비스", strengthBody: "나의 색과 선에서 시작하는 드레스를 만나보세요.", looks: "Selected Looks", editorialTitle: "New Arrivals" },
      "about.html": { title: "브랜드 이야기 — SILUA", head: "SILUA", intro: "한국의 미와 절제된 미감을 현대적인 웨딩과 드레스의 선으로 재해석합니다.", story: "브랜드 스토리", storyParagraphs: [], keywords: "브랜드 키워드", keywordItems: [], philosophy: "브랜드 철학", philosophyText: "", people: "만드는 사람들", photo: "", strengths: "특별한 날을 완성하는 두 가지 방식", strengthItems: [{ title: "맞춤 컬러 & 핏", body: "퍼스널 컬러 및 체형 분석을 바탕으로 가장 잘 어울리는 드레스를 큐레이션합니다." }, { title: "Bespoke Atelier", body: "드레스와 조화를 이루는 구두, 헤어 장식, 파우치와 백을 나만의 디테일로 완성합니다." }], portfolio: "Portfolio", portfolioLoading: "포트폴리오를 불러오는 중입니다.", visit: "실루아와 이야기 나누기", hoursLabel: "운영 시간", hoursValue: "방문 전 문의", addressLabel: "주소", addressValue: "대전시 중구 선화동 434번지 302호", phoneLabel: "전화", emailLabel: "이메일" },
      "products.html": { title: "컬렉션 — SILUA", head: "Dress for Your Moment", intro: "셀프웨딩과 웨딩 스냅, 연주회와 파티를 위한 드레스·원피스·투피스를 만나보세요." },
      "product.html": { title: "제품 상세 — SILUA", loading: "제품 정보를 불러오는 중…", purchase: "구매 안내", close: "구매 안내 닫기", confirm: "확인", back: "← 제품 목록으로" },
      "portfolio.html": { title: "포트폴리오 — SILUA", head: "Portfolio", intro: "한 사람의 색과 선에서 시작해 완성한 실루아의 장면들을 소개합니다.", loading: "포트폴리오를 불러오는 중입니다." },
      "contact.html": { title: "문의 — SILUA", head: "Your Moment Starts Here", intro: "드레스와 진단, 공방 체험에 관해 편하게 이야기해 주세요.", kakao: "카카오채널 바로가기", hours: "운영 시간", hoursValue: "방문 전 문의" }
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
      footer: '<span><strong>Company</strong><span>SILUA</span></span><span><strong>Representative</strong><span>An Ji-hye</span></span><span><strong>Registration No.</strong><span>570-27-01072</span></span><span><strong>Address</strong><span>302, 434 Seonhwa-dong, Jung-gu, Daejeon</span></span>',
      footerTagline: ["Korean beauty and restraint,", "reimagined in modern dress silhouettes."],
      footerBanners: [
        { title: "OUR STORY", copy: "Tradition reimagined through new lines" },
        { title: "1:1 PERSONAL CONSULTATION", copy: "Discover the style that suits you" },
        { title: "WORKSHOP RESERVATION", copy: "Norigae · Shoe decoration · Keyring" }
      ],
      customer: "CUSTOMER CENTER",
      emailInquiry: "CONTACT",
      footerHours: "Hours available on request"
    },
    pages: {
      "index.html": { title: "SILUA — Silhouette of Beauty", heroTitle: "A singular elegance for your most radiant moment.", heroSub: "Shaping the texture of tradition into modern curves.", action: "VIEW COLLECTION", categoryTitles: ["Self Wedding", "Evening & Party", "Wedding Attire"], categories: ["A wedding moment that feels like you", "Elegance with a distinct point of view", "Contemporary attire for special days"], categoryMore: "VIEW COLLECTION ↗", strengths: "PERSONAL SERVICES", strengthTitle: "PERSONAL SERVICE", strengthBody: "A dress journey that begins with your color and line.", looks: "Selected Looks", editorialTitle: "New Arrivals" },
      "about.html": { title: "Our Story — SILUA", head: "SILUA", intro: "Korean beauty and restraint, reimagined in contemporary wedding and dress silhouettes.", story: "OUR STORY", storyParagraphs: [], keywords: "BRAND VALUES", keywordItems: [], philosophy: "OUR PHILOSOPHY", philosophyText: "", people: "OUR PEOPLE", photo: "", strengths: "TWO WAYS TO COMPLETE YOUR MOMENT", strengthItems: [{ title: "CUSTOM COLOR & FIT", body: "Personal color and body-shape analysis for a dress that feels naturally yours." }, { title: "Bespoke Atelier", body: "Custom shoes and accessories designed to complement your dress." }], portfolio: "Portfolio", portfolioLoading: "Loading the portfolio…", visit: "CONTACT SILUA", hoursLabel: "HOURS", hoursValue: "Please contact us before visiting", addressLabel: "ADDRESS", addressValue: "302, 434 Seonhwa-dong, Jung-gu, Daejeon", phoneLabel: "PHONE", emailLabel: "EMAIL" },
      "products.html": { title: "Collection — SILUA", head: "Dress for Your Moment", intro: "Discover dresses, one-pieces and two-pieces for weddings, recitals and parties." },
      "product.html": { title: "Product Details — SILUA", loading: "Loading product information…", purchase: "PURCHASE INFORMATION", close: "Close purchase information", confirm: "OK", back: "← BACK TO PRODUCTS" },
      "portfolio.html": { title: "Portfolio — SILUA", head: "PORTFOLIO", intro: "Explore the brand’s work and projects.", loading: "Loading the portfolio…" },
      "contact.html": { title: "Contact — SILUA", head: "CONTACT", intro: "Contact us in whichever way is most convenient.", kakao: "Open KakaoTalk channel", hours: "HOURS", hoursValue: "Please contact us before visiting" }
    }
  }
};

function setText(selector, value, root = document) {
  const element = root.querySelector(selector);
  if (element && value !== undefined) element.textContent = value;
}

// 푸터의 브랜드 문구는 지정한 위치에서만 줄을 바꿉니다.
function setFooterTagline(lines) {
  const tagline = document.querySelector(".footer-tagline");
  if (!tagline || !Array.isArray(lines)) return;
  tagline.replaceChildren();
  lines.forEach((line, index) => {
    if (index) tagline.append(document.createElement("br"));
    tagline.append(document.createTextNode(line));
  });
}

function applyPageTranslation(page, text) {
  if (!text) return;
  const sections = document.querySelectorAll("body > .section");
  document.title = text.title;

  if (page === "index.html") {
    updateHeroCopy();
    setText(".hero-copy > p:not(.eyebrow)", text.heroSub);
    setText(".hero .btn", text.action);
    document.querySelectorAll(".home-category").forEach((category, index) => {
      setText("h2", text.categoryTitles[index], category);
      setText(".home-category-copy > p:not(.category-index)", text.categories[index], category);
      setText(".home-category-copy > span", text.categoryMore, category);
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
      const storyCopy = sections[0].querySelector(".story-intro-copy");
      const leads = storyCopy?.querySelectorAll(".lead") || [];
      (text.storyParagraphs || []).forEach((paragraph, index) => {
        const lead = leads[index] || Object.assign(document.createElement("p"), { className: "lead" });
        lead.textContent = paragraph;
        if (!leads[index]) storyCopy.append(lead);
      });
      Array.from(leads).slice((text.storyParagraphs || []).length).forEach((lead) => lead.remove());
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
      const item = text.strengthItems?.[Number(feature.querySelector(".num")?.textContent) - 1];
      if (!item) return;
      setText("h3", item.title, feature);
      setText("p:last-child", item.body, feature);
    });
    setText(".story-portfolio h2", text.portfolio);
    setText(".story-portfolio .portfolio-status", text.portfolioLoading);
    setText(".story-contact h2", text.visit);
    setText(".story-hours .label", text.hoursLabel);
    setText(".story-hours .value", text.hoursValue);
    setText(".story-address .label", text.addressLabel);
    setText(".story-address .value", text.addressValue);
    setText(".story-phone .label", text.phoneLabel);
    setText(".story-email .label", text.emailLabel);
  } else if (page === "products.html") {
    setText(".page-head h1", text.head);
    setText(".page-head > p:not(.eyebrow)", text.intro);
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
    setText(".page-head > p:not(.eyebrow)", text.intro);
    setText(".portfolio-status", text.loading);
  } else if (page === "contact.html") {
    setText(".page-head h1", text.head);
    setText(".page-head p", text.intro);
    const hours = document.querySelector(".contact-hours");
    if (hours) { setText(".label", text.hours, hours); setText(".value", text.hoursValue, hours); }
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
  setFooterTagline(dictionary.common.footerTagline);
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
