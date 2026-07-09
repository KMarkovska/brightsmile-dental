const backTop = document.querySelector(".back-top");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

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

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveNav(link.getAttribute("href"));
  });
});

backTop.addEventListener("click", () => {
  setActiveNav("#top");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();
