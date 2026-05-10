const pages = Array.from(document.querySelectorAll("[data-section]"));
const dots = Array.from(document.querySelectorAll(".scroll-indicator span"));
const projectNav = document.querySelector(".project-nav");
const navLinks = Array.from(document.querySelectorAll(".project-nav a"));
const scroller = document.querySelector(".snap-pages");
const usageStatus = document.querySelector(".usage-status");
const usagePage = document.querySelector("[data-usage-page]");
const usageFill = document.querySelector("[data-usage-fill]");
const usagePercent = document.querySelector("[data-usage-percent]");
let currentIndex = -1;

const navSectionForIndex = (index) => {
  if (index === 0) return "cover";
  if (index === 1) return "profile";
  return "product";
};

const setActivePage = (index) => {
  if (index < 0 || index >= pages.length || index === currentIndex) return;
  currentIndex = index;

  pages.forEach((page, pageIndex) => {
    page.classList.toggle("is-active", pageIndex === index);
    page.classList.toggle("is-before", pageIndex < index);
    page.classList.toggle("is-after", pageIndex > index);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });

  const navSection = navSectionForIndex(index);
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.navSection === navSection);
  });

  const activePage = pages[index];
  const isLightNav =
    index === 3 ||
    activePage?.classList.contains("page-knolly") ||
    activePage?.classList.contains("page-knolly-overview") ||
    activePage?.classList.contains("page-knolly-problem");

  if (projectNav) {
    projectNav.classList.toggle("is-light", isLightNav);
  }

  if (usageStatus) {
    usageStatus.classList.toggle("is-light", isLightNav);
  }

  updateUsageStatus();
};

const formatPageCount = (value) => String(value).padStart(2, "0");

const updateUsageStatus = () => {
  if (!scroller || !usageStatus) return;

  const maxScroll = scroller.scrollHeight - scroller.clientHeight;
  const progress = maxScroll > 0 ? scroller.scrollTop / maxScroll : 0;
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  const displayIndex = currentIndex >= 0 ? currentIndex + 1 : 1;

  if (usagePage) {
    usagePage.textContent = `${formatPageCount(displayIndex)}/${formatPageCount(pages.length)}`;
  }

  if (usageFill) {
    usageFill.style.width = `${percent}%`;
  }

  if (usagePercent) {
    usagePercent.textContent = `${percent}%`;
  }
};

if (scroller) {
  scroller.classList.add("scroll-animate");
  scroller.addEventListener("scroll", updateUsageStatus, { passive: true });
}

pages.forEach((page, pageIndex) => {
  page.classList.toggle("is-active", pageIndex === 0);
  page.classList.toggle("is-after", pageIndex > 0);
});
setActivePage(0);
updateUsageStatus();

const observer = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;

    const index = pages.indexOf(active.target);
    setActivePage(index);
  },
  {
    root: scroller,
    threshold: [0.42, 0.58, 0.74],
  },
);

pages.forEach((page) => observer.observe(page));
