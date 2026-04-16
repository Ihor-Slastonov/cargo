const openBtn = document.querySelectorAll("[data-open]");
const closeBtn = document.querySelector("[data-close]");
const backdrop = document.querySelector("[data-backdrop]");
const serviceInput = document.getElementById("modal-service-input");
const openBurger = document.querySelector("[data-openBurger]");
const closeBurger = document.querySelector("[data-closeBurger]");
const burgerBackdrop = document.querySelector("[data-burgerBackdrop]");
const burgerLinks = document.querySelectorAll("[data-bur-links]");
const headerMenu = document.querySelector(".header__menu");

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

// --------------------------------------------/

// 1. Функция отправки
async function sendToTelegram(data) {
  try {
    const response = await fetch("/.netlify/functions/send-tg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Ошибка сети:", error);
    return false;
  }
}

// 2. Инициализация всех форм
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // --- ПРОВЕРКА НА БОТА ---
    const honeypot = form.querySelector('input[name="company"]');
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Bot detected 🐛");
      return;
    }

    // --- ГЕНЕРАЦИЯ ДАННЫХ ЗАКАЗА ---
    const baseNumber = 5100;
    const startDate = new Date("2026-01-01").getTime();
    const now = Date.now();
    const minutesPassed = Math.floor((now - startDate) / 60000);
    const orderId = `OD-${baseNumber + minutesPassed}`;

    const formattedDate = new Date().toLocaleString("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // --- СБОР ДАННЫХ ИЗ ПОЛЕЙ ---
    const fd = new FormData(form);
    const formData = {
      orderId: orderId, // Отправляем уже готовый ID
      date: formattedDate, // Отправляем готовую дату
      name: fd.get("name"),
      phone: fd.get("phone"),
      service: fd.get("service"),
      comment: fd.get("comment"),
    };

    // --- ОТПРАВКА ---
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const success = await sendToTelegram(formData);

    if (success) {
      form.reset();
      // Выводим красивое подтверждение (можно заменить на замену HTML блока)
      alert(`Дякуємо! Ваша заявка ${orderId} прийнята. Ми зателефонуємо вам.`);
    } else {
      alert("Помилка при відправці. Спробуйте пізніше.");
    }

    if (submitBtn) submitBtn.disabled = false;
  });
});

// // Функция отправки в телегу
// async function formSubmit(formData, form) {
//   try {
//     const res = await fetch("/.netlify/functions/send-tg", {
//       method: "POST",
//       body: JSON.stringify(formData),
//     });
//     if (res.ok) {
//       form.reset();
//     }
//   } catch (error) {}
// }

// // Делаем для каждой формы
// forms.forEach((form) => {
//   // Добавляем слушетеля на отправку, если словили жука то шмяк
//   form.addEventListener("submit", function (e) {
//     const honeypot = form.querySelector('input[name="company"]');
//     if (honeypot && honeypot.value.trim() !== "") {
//       e.preventDefault();
//       console.log("Bot detected 🐛");
//       return false;
//     }
//     e.preventDefault();

//     const formData = {
//       name: form[0].value,
//       phone: form[1].value,
//       service: form[2].value,
//       comment: form[3].value,
//     };
//     console.log(formData);
//   });
// });
