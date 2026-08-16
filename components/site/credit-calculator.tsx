'use client'

import { useMemo, useState } from 'react'
import Modal from '@/components/ui/modal'
import { IMaskInput } from 'react-imask'
import { motion } from "framer-motion"

export function CreditCalculator() {
  const [price, setPrice] = useState(2500000)
  const [downPayment, setDownPayment] = useState(300000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(19)
const [showForm, setShowForm] = useState(false)

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [phone, setPhone] = useState('')

const [loading, setLoading] = useState(false)
const [success, setSuccess] = useState(false)

  const loanAmount = Math.max(price - downPayment, 0)

 const sendApplication = async () => {
  if (!firstName.trim()) {
  alert('Введите имя')
  return
}

if (!lastName.trim()) {
  alert('Введите фамилию')
  return
}

if (phone.length < 18) {
  alert('Введите телефон полностью')
  return
}

  setLoading(true)

  const response = await fetch('/api/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      phone,
      price,
      downPayment,
      loanAmount,
      years,
      rate,
      monthlyPayment,
    }),
  })

  setLoading(false)

  if (response.ok) {
    setSuccess(true)

    setTimeout(() => {
      setShowForm(false)
      setSuccess(false)

      setFirstName('')
      setLastName('')
      setPhone('')
    }, 2500)
  } else {
    alert('Ошибка отправки')
  }
}
 const monthlyPayment = useMemo(() => {
    const months = years * 12
    const monthlyRate = rate / 100 / 12

    if (loanAmount <= 0) return 0

    return Math.round(
      (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months))
    )
  }, [loanAmount, years, rate])

  return (
    <>
    <motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="relative mx-auto max-w-7xl px-6 py-24"
>

      <div className="mb-10">

        <span className="text-accent uppercase tracking-[0.3em] text-sm">
          Автокредит
        </span>

        <h2 className="mt-4 text-5xl font-bold">
          Рассчитайте платеж
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl">
          Предварительный расчет. Итоговая ставка определяется банком
          после рассмотрения заявки.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Левая часть */}

        <motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="rounded-3xl bg-zinc-900 border border-white/10 p-8"
>

          {/* Стоимость */}

          <label className="block mb-2">
            Стоимость автомобиля
          </label>

          <input
            type="range"
            min="300000"
            max="10000000"
            step="50000"
            value={price}
            onChange={(e)=>setPrice(Number(e.target.value))}
            className="w-full"
          />

          <div className="mt-2 text-2xl font-bold">
            {price.toLocaleString()} ₽
          </div>

          {/* Первый взнос */}

          <div className="mt-8">

            <label className="block mb-2">
              Первоначальный взнос
            </label>

            <input
              type="range"
              min="0"
              max={price}
              step="50000"
              value={downPayment}
              onChange={(e)=>setDownPayment(Number(e.target.value))}
              className="w-full"
            />

            <div className="mt-2 text-xl">
              {downPayment.toLocaleString()} ₽
            </div>

          </div>

          {/* Срок */}

          <div className="mt-8">

            <label className="block mb-2">
              Срок кредита
            </label>

            <input
              type="range"
              min="1"
              max="8"
              value={years}
              onChange={(e)=>setYears(Number(e.target.value))}
              className="w-full"
            />

            <div className="mt-2 text-xl">
              {years} лет
            </div>

          </div>

          {/* Ставка */}

          <div className="mt-8">

            <label className="block mb-2">
              Процентная ставка
            </label>

            <input
              type="range"
              min="17"
              max="25"
              step="0.5"
              value={rate}
              onChange={(e)=>setRate(Number(e.target.value))}
              className="w-full"
            />

            <div className="mt-2 text-xl">
              {rate} %
            </div>

          </div>

        </motion.div>

        {/* Правая часть */}

        <motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="rounded-3xl bg-accent text-black p-10 flex flex-col justify-center"
>

          <div className="text-lg">
            Ежемесячный платеж
          </div>

          <div className="text-6xl font-bold mt-4">
            {monthlyPayment.toLocaleString()} ₽
          </div>

          <div className="mt-10 space-y-4">

            <div>
              Сумма кредита:
              <strong> {loanAmount.toLocaleString()} ₽</strong>
            </div>

            <div>
              Срок:
              <strong> {years} лет</strong>
            </div>

            <div>
              Ставка:
              <strong> {rate}%</strong>
            </div>

          </div>

          <button
          onClick={() => setShowForm(true)}
  className="mt-10 rounded-2xl bg-black text-white py-4 text-lg font-semibold hover:bg-zinc-800 transition"
>
  Получить одобрение

          </button>

        </motion.div>

        </div>

</motion.section>

   <Modal
  open={showForm}
  onClose={() => setShowForm(false)}
>

{success ? (

<div className="py-10 text-center">

<div className="text-6xl mb-5">
✅
</div>

<h3 className="text-3xl font-bold">
Спасибо!
</h3>

<p className="mt-4 text-zinc-300">
Ваша заявка успешно отправлена.
</p>

<p className="mt-2 text-zinc-500">
Наш кредитный специалист свяжется
с вами в ближайшее время.
</p>

</div>

) : (

<>

<h3 className="mb-6 text-2xl font-bold">
Заявка на автокредит
</h3>

<input
type="text"
placeholder="Имя"
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
className="mb-4 w-full rounded-xl border border-white/10 bg-zinc-800 p-4"
/>

<input
type="text"
placeholder="Фамилия"
value={lastName}
onChange={(e)=>setLastName(e.target.value)}
className="mb-4 w-full rounded-xl border border-white/10 bg-zinc-800 p-4"
/>

<IMaskInput
  mask="+7 (000) 000-00-00"
  value={phone}
  onAccept={(value) => setPhone(String(value))}
  placeholder="Телефон"
  className="mb-6 w-full rounded-xl border border-white/10 bg-zinc-800 p-4"
/>

<div className="flex gap-4">

<button
onClick={sendApplication}
disabled={loading}
className="flex-1 rounded-xl bg-accent py-3 font-bold text-black disabled:opacity-50"
>
{loading ? 'Отправка...' : 'Отправить'}
</button>

<button
onClick={()=>setShowForm(false)}
className="flex-1 rounded-xl border border-white/20 py-3"
>
Закрыть
</button>

</div>

</>

)}

</Modal>

</>
  )
  }