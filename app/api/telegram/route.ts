import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      phone,
      price,
      downPayment,
      loanAmount,
      years,
      rate,
      monthlyPayment,
    } = body;

    // Защита от undefined/null
    const carPrice = Number(price ?? 0);
    const initialPayment = Number(downPayment ?? 0);
    const creditAmount = Number(loanAmount ?? 0);
    const loanYears = Number(years ?? 0);
    const loanRate = Number(rate ?? 0);
    const payment = Number(monthlyPayment ?? 0);

    // =====================================================
    // ТЕКСТ ЗАЯВКИ
    // =====================================================

    const message = `
🚗 <b>Новая заявка на автокредит</b>

👤 <b>Имя:</b> ${firstName ?? "-"}
👤 <b>Фамилия:</b> ${lastName ?? "-"}
📞 <b>Телефон:</b> ${phone ?? "-"}

💰 <b>Стоимость автомобиля:</b> ${carPrice.toLocaleString("ru-RU")} ₽
💳 <b>Первоначальный взнос:</b> ${initialPayment.toLocaleString("ru-RU")} ₽
🏦 <b>Сумма кредита:</b> ${creditAmount.toLocaleString("ru-RU")} ₽

📅 <b>Срок:</b> ${loanYears} лет
📈 <b>Ставка:</b> ${loanRate}%

💵 <b>Ежемесячный платеж:</b> ${payment.toLocaleString("ru-RU")} ₽
`;

    // =====================================================
    // TELEGRAM
    // =====================================================

    const telegramPromise = fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    ).then(async (response) => {
      if (!response.ok) {
        const error = await response.text();

        throw new Error(
          `Telegram error: ${response.status} ${error}`
        );
      }

      return response;
    });

    // =====================================================
    // EMAIL
    // =====================================================

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT ?? 465),
      secure: Number(process.env.EMAIL_PORT ?? 465) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailPromise = transporter.sendMail({
      from: `"Автосалон" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,

      subject: "🚗 Новая заявка на автокредит",

      text: `
Новая заявка на автокредит

Имя: ${firstName ?? "-"}
Фамилия: ${lastName ?? "-"}
Телефон: ${phone ?? "-"}

Стоимость автомобиля: ${carPrice.toLocaleString("ru-RU")} ₽
Первоначальный взнос: ${initialPayment.toLocaleString("ru-RU")} ₽
Сумма кредита: ${creditAmount.toLocaleString("ru-RU")} ₽

Срок: ${loanYears} лет
Ставка: ${loanRate}%

Ежемесячный платеж: ${payment.toLocaleString("ru-RU")} ₽
      `.trim(),

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">

          <h2>🚗 Новая заявка на автокредит</h2>

          <h3>👤 Клиент</h3>

          <p>
            <b>Имя:</b> ${firstName ?? "-"}

            <b>Фамилия:</b> ${lastName ?? "-"}

            <b>Телефон:</b> ${phone ?? "-"}
          </p>

          <h3>💰 Кредит</h3>

          <p>
            <b>Стоимость автомобиля:</b>
            ${carPrice.toLocaleString("ru-RU")} ₽
            

            <b>Первоначальный взнос:</b>
            ${initialPayment.toLocaleString("ru-RU")} ₽
            

            <b>Сумма кредита:</b>
            ${creditAmount.toLocaleString("ru-RU")} ₽
            

            <b>Срок:</b>
            ${loanYears} лет
            

            <b>Ставка:</b>
            ${loanRate}%
            

            <b>Ежемесячный платеж:</b>
            ${payment.toLocaleString("ru-RU")} ₽
          </p>

        </div>
      `,
    });
    // =====================================================
    // ОТПРАВЛЯЕМ ОБА КАНАЛА НЕЗАВИСИМО
    // =====================================================

    const results = await Promise.allSettled([
      telegramPromise,
      emailPromise,
    ]);

    const telegramResult = results[0];
    const emailResult = results[1];

    // Telegram
    if (telegramResult.status === "fulfilled") {
      console.log("✅ Заявка отправлена в Telegram");
    } else {
      console.error(
        "❌ Telegram недоступен:",
        telegramResult.reason
      );
    }

    // Email
    if (emailResult.status === "fulfilled") {
      console.log("✅ Заявка отправлена на почту");
    } else {
      console.error(
        "❌ Email недоступен:",
        emailResult.reason
      );
    }

    // Хотя бы один канал должен сработать
    const telegramOk =
      telegramResult.status === "fulfilled";

    const emailOk =
      emailResult.status === "fulfilled";

    if (!telegramOk && !emailOk) {
      return NextResponse.json(
        {
          success: false,
          message: "Не удалось отправить заявку",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      telegram: telegramOk,
      email: emailOk,
    });

  } catch (error) {
    console.error("Ошибка отправки заявки:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Ошибка сервера",
      },
      { status: 500 }
    );
  }
}