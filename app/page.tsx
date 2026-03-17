'use client'

import { useState } from 'react'

type OptionValue = string | number

type Option = {
  label: string
  value: OptionValue
  price?: number
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-stone-300">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}

function OptionChips({
  label,
  options,
  value,
  onChange,
  formatPrice,
}: {
  label: string
  options: Option[]
  value: OptionValue
  onChange: (value: OptionValue) => void
  formatPrice: (value: number) => string
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </p>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const active = option.value === value

          return (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                active
                  ? 'border-stone-900 bg-stone-900 text-white shadow-lg'
                  : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50'
              }`}
            >
              <span className="font-medium">{option.label}</span>

              {typeof option.price === 'number' && option.price > 0 ? (
                <span
                  className={`ml-2 text-xs ${
                    active ? 'text-stone-200' : 'text-stone-500'
                  }`}
                >
                  +{formatPrice(option.price)}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Page() {
  const config = {
    baseSession: 30,
    travelOutsideFerrol: 15,
    indoorLighting: 10,
    deliverables: {
      5: 0,
      10: 15,
      15: 30,
      20: 45,
    },
    duration: {
      30: 0,
      60: 20,
      90: 35,
      120: 50,
    },
    extraPhoto: 8,
  }

  const timeOptions = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ]

  const [location, setLocation] = useState('ferrol')
  const [environment, setEnvironment] = useState('exterior')
  const [deliverables, setDeliverables] = useState(10)
  const [preferredTime, setPreferredTime] = useState('17:00')
  const [duration, setDuration] = useState(60)
  const [extraPhoto, setExtraPhoto] = useState(false)

  const travelCost = location === 'outside' ? config.travelOutsideFerrol : 0
  const lightingCost = environment === 'interior' ? config.indoorLighting : 0
  const deliverablesCost =
    config.deliverables[deliverables as keyof typeof config.deliverables] ?? 0
  const durationCost =
    config.duration[duration as keyof typeof config.duration] ?? 0
  const extraPhotoCost = extraPhoto ? config.extraPhoto : 0

  const total =
    config.baseSession +
    travelCost +
    lightingCost +
    deliverablesCost +
    durationCost +
    extraPhotoCost

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <main className="min-h-screen bg-[#f6f1eb] px-4 py-10 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-200/70 sm:p-8">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-stone-600">
              Casty Coffee
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Calcula tu presupuesto de fotografía
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
              Selecciona las opciones de tu sesión y verás el presupuesto al
              instante.
            </p>
          </div>

          <div className="space-y-8">
            <OptionChips
              label="Ubicación"
              value={location}
              onChange={(value) => setLocation(String(value))}
              formatPrice={formatPrice}
              options={[
                { label: 'Ferrol', value: 'ferrol', price: 0 },
                {
                  label: 'Fuera de Ferrol',
                  value: 'outside',
                  price: config.travelOutsideFerrol,
                },
              ]}
            />

            <OptionChips
              label="Entorno"
              value={environment}
              onChange={(value) => setEnvironment(String(value))}
              formatPrice={formatPrice}
              options={[
                { label: 'Exterior', value: 'exterior', price: 0 },
                {
                  label: 'Interior',
                  value: 'interior',
                  price: config.indoorLighting,
                },
              ]}
            />

            <OptionChips
              label="Entregables"
              value={deliverables}
              onChange={(value) => setDeliverables(Number(value))}
              formatPrice={formatPrice}
              options={[
                { label: '5 fotos editadas', value: 5, price: config.deliverables[5] },
                { label: '10 fotos editadas', value: 10, price: config.deliverables[10] },
                { label: '15 fotos editadas', value: 15, price: config.deliverables[15] },
                { label: '20 fotos editadas', value: 20, price: config.deliverables[20] },
              ]}
            />

            <OptionChips
              label="Horario preferido"
              value={preferredTime}
              onChange={(value) => setPreferredTime(String(value))}
              formatPrice={formatPrice}
              options={timeOptions.map((time) => ({
                label: time,
                value: time,
              }))}
            />

            <OptionChips
              label="Duración de la sesión"
              value={duration}
              onChange={(value) => setDuration(Number(value))}
              formatPrice={formatPrice}
              options={[
                { label: '30 min', value: 30, price: config.duration[30] },
                { label: '60 min', value: 60, price: config.duration[60] },
                { label: '90 min', value: 90, price: config.duration[90] },
                { label: '120 min', value: 120, price: config.duration[120] },
              ]}
            />

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                Extra opcional
              </p>

              <button
                type="button"
                onClick={() => setExtraPhoto((prev) => !prev)}
                className={`w-full rounded-3xl border p-4 text-left transition-all ${
                  extraPhoto
                    ? 'border-stone-900 bg-stone-900 text-white shadow-lg'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">Foto extra destacada</span>
                  <span
                    className={`text-sm ${
                      extraPhoto ? 'text-stone-200' : 'text-stone-500'
                    }`}
                  >
                    +{formatPrice(config.extraPhoto)}
                  </span>
                </div>

                <p
                  className={`mt-2 text-sm ${
                    extraPhoto ? 'text-stone-200' : 'text-stone-500'
                  }`}
                >
                  Un extra sencillo para añadir una imagen especial editada con
                  más mimo.
                </p>
              </button>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] bg-stone-900 p-6 text-white shadow-xl shadow-stone-300/40 sm:p-8 lg:sticky lg:top-8 lg:h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-300">
            Resumen
          </p>

          <div className="mt-4 rounded-[1.75rem] bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-stone-300">Precio estimado</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">
              {formatPrice(total)}
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-300">
              Horario seleccionado:{' '}
              <span className="font-medium text-white">{preferredTime}</span>
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <Row label="Sesión base" value={formatPrice(config.baseSession)} />
            <Row
              label="Ubicación"
              value={travelCost ? `+${formatPrice(travelCost)}` : 'Incluido'}
            />
            <Row
              label="Entorno"
              value={lightingCost ? `+${formatPrice(lightingCost)}` : 'Incluido'}
            />
            <Row
              label="Entregables"
              value={
                deliverablesCost
                  ? `+${formatPrice(deliverablesCost)}`
                  : 'Incluido'
              }
            />
            <Row
              label="Duración"
              value={durationCost ? `+${formatPrice(durationCost)}` : 'Incluido'}
            />
            <Row
              label="Extra"
              value={extraPhotoCost ? `+${formatPrice(extraPhotoCost)}` : 'No'}
            />
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium">Selección actual</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-300">
              <li>• {location === 'ferrol' ? 'Ferrol' : 'Fuera de Ferrol'}</li>
              <li>• {environment === 'exterior' ? 'Exterior' : 'Interior'}</li>
              <li>• {deliverables} fotos editadas</li>
              <li>• {duration} minutos</li>
            </ul>
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:scale-[1.01]"
          >
            Solicitar esta sesión
          </button>
        </aside>
      </div>
    </main>
  )
}