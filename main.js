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

// Form Validation
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.querySelector(".message__area");

// Setting Error message and class
const setErrorFor = function (input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error__message");

  errorMessage.innerText = message;
  formGroup.classList.remove("success");
  formGroup.classList.add("error");
};

// Setting Success class
const setSuccessFor = function (input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("error");
  formGroup.classList.add("success");
};

// Check if email is valid
const isEmail = function (email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

// Check input fields
const inputChecker = function () {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const subjectValue = subjectInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue === "" || nameValue == null) {
    setErrorFor(nameInput, "Please enter your name");
    console.log(messageValue);
  } else {
    setSuccessFor(nameInput);
  }

  if (emailValue === "" || emailValue == null) {
    setErrorFor(emailInput, "Please enter your email");
  } else if (!isEmail(emailValue)) {
    setErrorFor(emailInput, "Email is not valid");
  } else {
    setSuccessFor(emailInput);
  }

  if (subjectValue === "" || subjectValue == null) {
    setErrorFor(subjectInput, "Please enter subject");
  } else {
    setSuccessFor(subjectInput);
  }

  if (messageValue === "" || messageValue == null) {
    setErrorFor(messageInput, "Please enter your message");
  } else {
    setSuccessFor(messageInput);
  }
};

// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  inputChecker();
});
