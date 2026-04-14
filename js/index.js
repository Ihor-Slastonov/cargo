const openBtn = document.querySelectorAll("[data-open]");
const closeBtn = document.querySelector("[data-close]");
const backdrop = document.querySelector("[data-backdrop]");
const serviceInput = document.getElementById("modal-service-input");
const openBurger = document.querySelector("[data-openBurger]");
const closeBurger = document.querySelector("[data-closeBurger]");
const burgerBackdrop = document.querySelector("[data-burgerBackdrop]");
const burgerLinks = document.querySelectorAll("[data-bur-links]");
const headerMenu = document.querySelector(".header__menu");
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    const honeypot = form.querySelector('input[name="company"]');
    if (honeypot && honeypot.value.trim() !== "") {
      e.preventDefault();
      console.log("Bot detected 🐛");
      return false;
    }
  });
});

function handleScroll() {
  if (window.innerWidth >= 1200) {
    if (window.scrollY > 50) {
      headerMenu.classList.add("header__menu--small");
    } else {
      headerMenu.classList.remove("header__menu--small");
    }
  } else {
    headerMenu.classList.remove("header__menu--small");
  }
}

window.addEventListener("scroll", handleScroll);

burgerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burgerBackdrop.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
  });
});

openBurger.addEventListener("click", () => {
  burgerBackdrop.classList.remove("is-hidden");
  document.body.classList.add("no-scroll");
});

closeBurger.addEventListener("click", () => {
  burgerBackdrop.classList.add("is-hidden");
  document.body.classList.remove("no-scroll");
});

function toggle() {
  backdrop.classList.toggle("is-hidden");
  document.body.classList.toggle("no-scroll");
}

openBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const serviceName = btn.dataset.service;
    serviceInput.value = serviceName;

    backdrop.classList.remove("is-hidden");
    document.body.classList.add("no-scroll");
  });
});

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    toggle();
    serviceInput.value = "";
  }
});

closeBtn.addEventListener("click", (e) => {
  toggle();
  serviceInput.value = "";
});
