import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      firstName,
      phone,
      car,
      budget,
      comment,
    } = body

    // Проверяем обязательные поля
    if (!firstName || !phone || !car || !budget || !comment) {
      return NextResponse.json(
        {
          success: false,
          error: 'Заполните все поля',
        },
        { status: 400 }
      )
    }

    // Проверяем российский номер
    const phoneDigits = String(phone).replace(/\D/g, '')

    if (
      phoneDigits.length !== 11 ||
      !phoneDigits.startsWith('7')
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Некорректный номер телефона',
        },
        { status: 400 }
      )
    }

    const message = `
🚗 НОВАЯ ЗАЯВКА НА ПОДБОР АВТОМОБИЛЯ

Имя: ${firstName}

Телефон: ${phone}

Какой автомобиль ищет:
${car}

Бюджет:
${budget}

Комментарий:
${comment}
`

    // =========================
    // ОТПРАВКА НА ПОЧТУ MAIL.RU
    // =========================

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 465),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Автосалон" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '🚗 Новая заявка на подбор автомобиля',
      text: message,
    })

    console.log('✅ Заявка на подбор отправлена на почту')

    // =========================
    // ОТПРАВКА В TELEGRAM
    // =========================

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      )

      if (!telegramResponse.ok) {
        console.error(
          '❌ Telegram недоступен:',
          telegramResponse.status
        )
      } else {
        console.log('✅ Заявка на подбор отправлена в Telegram')
      }
    } catch (telegramError) {
      console.error(
        '❌ Telegram недоступен:',
        telegramError
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('❌ Ошибка заявки на подбор:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Не удалось отправить заявку',
      },
      { status: 500 }
    )
  }
}