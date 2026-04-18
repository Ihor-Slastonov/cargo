exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { orderId, date, name, phone, service, comment } = JSON.parse(
      event.body,
    );

    const TOKEN = process.env.TG_TOKEN;
    // Читаем строку из ENV и превращаем в массив ["123", "456"]
    const CHAT_IDS = process.env.TG_CHAT_ID
      ? process.env.TG_CHAT_ID.split(",")
      : [];

    const message = [
      `<b>📦 ЗАМОВЛЕННЯ: ${orderId}</b>`,
      `<b>📅 Дата:</b> ${date}`,
      `--------------------------`,
      `<b>👤 Клієнт:</b> ${name || "Не вказано"}`,
      `<b>📞 Тел:</b> <code>${phone || "Не вказано"}</code>`,
      `<b>🛠 Послуга:</b> ${service || "Загальна"}`,
      `<b>💬 Коментар:</b> ${comment || "-"}`,
    ].join("\n");

    // Массив для хранения результатов всех отправок
    const results = [];

    // Цикл по всем ID из массива
    for (const id of CHAT_IDS) {
      const trimmedId = id.trim(); // Убираем лишние пробелы, если они есть

      const response = await fetch(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: trimmedId,
            parse_mode: "HTML",
            text: message,
          }),
        },
      );
      results.push(response.ok);
    }

    // Если хотя бы одна отправка прошла успешно
    if (results.some((res) => res === true)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success" }),
      };
    } else {
      return { statusCode: 500, body: JSON.stringify({ status: "error" }) };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
