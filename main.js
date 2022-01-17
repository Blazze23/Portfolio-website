"use-strict";

const nav = document.querySelector(".nav");
const navMenu = document.getElementById("nav-menu");
const navList = document.querySelector(".nav__list");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const allSections = document.querySelectorAll("section");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show__nav-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show__nav-menu");
  });
}

navList.addEventListener("click", (e) => {
  navLinks.forEach((link) => {
    link.classList.remove("nav__link-active");
  });
  console.log(e.target);

  //   When we click on links
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView();
    e.target.classList.add("nav__link-active");
  }
  navMenu.classList.remove("show__nav-menu");

  //   When we click on logo
  if (e.target.classList.contains("logo__img")) {
    navLinks[0].classList.add("nav__link-active");
  }
});

const sectionObserver = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  console.log(entry);

  navLinks.forEach((link) => {
    link.classList.remove("nav__link-active");
    const linkID = link.getAttribute("href").slice(1);
    if (linkID === entry.target.id) {
      link.classList.add("nav__link-active");
    }
  });
};

const observer = new IntersectionObserver(sectionObserver, {
  threshold: 0.5,
  rootMargin: "100px",
});

allSections.forEach((section) => {
  observer.observe(section);
});
