const openBtn = document.querySelectorAll("[data-open]");
const closeBtn = document.querySelector("[data-close]");
const backdrop = document.querySelector("[data-backdrop]");
const serviceInput = document.getElementById("service-input");
const openBurger = document.querySelector("[data-openBurger]");
const closeBurger = document.querySelector("[data-closeBurger]");
const burgerBackdrop = document.querySelector("[data-burgerBackdrop]");
const burgerLinks = document.querySelectorAll("[data-bur-links]");

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
