"use-strict";

const nav = document.querySelector(".nav");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");

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

nav.addEventListener("click", (e) => {
  navLinks.forEach((link) => {
    link.classList.remove("nav__link-active");
  });

  //   When we click on links
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView();
    e.target.classList.add("nav__link-active");
    navMenu.classList.remove("show__nav-menu");
  }

  //   When we click on logo
  if (e.target.classList.contains("logo__img")) {
    navLinks[0].classList.add("nav__link-active");
  }
});
