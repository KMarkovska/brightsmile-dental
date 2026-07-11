const backTop = document.querySelector(".back-top");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const topLinks = Array.from(document.querySelectorAll('a[href="#top"]'));

const navTargets = navLinks.map((link) => {
  const id = link.getAttribute("href");
  const section = id === "#top" ? document.querySelector(".hero") : document.querySelector(id);

  return { id, link, section };
});

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === id);
  });
}

function updateActiveNav() {
  const headerOffset = document.querySelector(".site-header").offsetHeight + 90;
  const scrollPosition = window.scrollY + headerOffset;
  const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  let activeId = "#top";

  navTargets.forEach(({ id, section }) => {
    if (section && section.offsetTop <= scrollPosition) {
      activeId = id;
    }
  });

  if (pageBottom) {
    activeId = "#contact";
  }

  setActiveNav(activeId);
}

function scrollToTop() {
  setActiveNav("#top");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    scrollToTop();
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");

    if (id === "#top") {
      event.preventDefault();
      scrollToTop();
      return;
    }

    setActiveNav(id);
  });
});

backTop.addEventListener("click", () => {
  scrollToTop();
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();
