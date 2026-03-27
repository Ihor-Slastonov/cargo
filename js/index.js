const openBtn = document.querySelectorAll("[data-open]");
const closeBtn = document.querySelector("[data-close]");
const backdrop = document.querySelector("[data-backdrop]");
const serviceInput = document.getElementById("service-input");

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
