"use-strict";

const nav = document.querySelector(".nav");
const navMenu = document.getElementById("nav-menu");
const navList = document.querySelector(".nav__list");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const allSections = document.querySelectorAll("section");

// Toggling navigation on mobile
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show__nav-menu");
  });
}

// Closing navigation on mobile
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show__nav-menu");
  });
}

// Adding scrolling functionality to sections
navList.addEventListener("click", (e) => {
  navLinks.forEach((link) => {
    link.classList.remove("nav__link-active");
  });

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

// Setting sections observer for adding link active class on current section
const sectionObserver = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  navLinks.forEach((link) => {
    link.classList.remove("nav__link-active");
    const linkID = link.getAttribute("href").slice(1);
    if (linkID === entry.target.id) {
      link.classList.add("nav__link-active");
    }
  });
};

const observerSmallDevices = new IntersectionObserver(sectionObserver, {
  threshold: 0.3,
  rootMargin: "120px 0px -80px",
});

const observerLargeDevices = new IntersectionObserver(sectionObserver, {
  threshold: 0.8,
  rootMargin: "120px 0px -80px",
});

if (window.screen.width < 700) {
  allSections.forEach((section) => {
    observerSmallDevices.observe(section);
  });
} else {
  allSections.forEach((section) => {
    observerLargeDevices.observe(section);
  });
}

// TODO Form Validation
