const pages = Array.from(document.querySelectorAll("[data-section]"));
const dots = Array.from(document.querySelectorAll(".scroll-indicator span"));
const navLinks = Array.from(document.querySelectorAll(".project-nav a"));
const scroller = document.querySelector(".snap-pages");
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
};

if (scroller) {
  scroller.classList.add("scroll-animate");
}

pages.forEach((page, pageIndex) => {
  page.classList.toggle("is-active", pageIndex === 0);
  page.classList.toggle("is-after", pageIndex > 0);
});
setActivePage(0);

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
