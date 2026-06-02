"use client"

import type { ReactNode } from "react"
import { useMemo, useState } from "react"

type View = "inicio" | "catalogo" | "recomendador" | "entrega" | "comprar"
type Category = "Todas" | "Interior" | "Fácil cuidado" | "Regalo"
type Light = "baja" | "media" | "alta"
type Care = "facil" | "media"
type UseCase = "principiante" | "decorar" | "regalo"

type Plant = {
  id: string
  name: string
  price: string
  category: Exclude<Category, "Todas">
  short: string
  description: string
  image: string
  light: Light
  water: "Bajo" | "Medio"
  care: Care
  petNote: string
  bestFor: UseCase[]
  tags: string[]
}

const BRAND = {
  name: "Plantas Mary",
  instagramUser: "@plantasmary",
  instagramUrl: "https://instagram.com/plantasmary",
  whatsappNumber: "56912345678",
  delivery: "Entregamos en nuestro domicilio en Maipú y también en Metro Plaza Maipú.",
}

const categories: Category[] = ["Todas", "Interior", "Fácil cuidado", "Regalo"]

const plants: Plant[] = [
  {
    id: "chiflera",
    name: "Chiflera",
    price: "$12.990",
    category: "Interior",
    short: "Frondosa, brillante y decorativa.",
    description:
      "Ideal para living, entrada o comedor con buena luz indirecta. Sus hojas verdes dan una sensación fresca y elegante.",
    image: "/plantas/chiflera.webp",
    light: "media",
    water: "Medio",
    care: "media",
    petNote: "Mejor mantener fuera del alcance de mascotas curiosas.",
    bestFor: ["decorar", "regalo"],
    tags: ["Luz indirecta", "Decorativa", "Interior"],
  },
  {
    id: "peperomia",
    name: "Peperomia",
    price: "$7.990",
    category: "Fácil cuidado",
    short: "Compacta, linda y fácil de mantener.",
    description:
      "Perfecta para escritorios, repisas y espacios pequeños. Buena opción para quienes buscan una planta simple y bonita.",
    image: "/plantas/peperomia.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    petNote: "Buena opción para hogares tranquilos. Igual recomendamos evitar que mascotas muerdan plantas.",
    bestFor: ["principiante", "decorar", "regalo"],
    tags: ["Fácil", "Compacta", "Regalo"],
  },
  {
    id: "sansevieria",
    name: "Sansevieria",
    price: "$9.990",
    category: "Fácil cuidado",
    short: "Resistente, moderna y de bajo riego.",
    description:
      "Una de las mejores plantas para empezar. Tolera más descuidos y se ve muy bien en espacios modernos.",
    image: "/plantas/sansevieria.webp",
    light: "baja",
    water: "Bajo",
    care: "facil",
    petNote: "No ideal si tu mascota suele morder plantas. Mantener en altura o zona segura.",
    bestFor: ["principiante", "decorar", "regalo"],
    tags: ["Muy resistente", "Poca luz", "Bajo riego"],
  },
]

function whatsappLink(plant?: Plant) {
  const message = plant
    ? `Hola, quiero consultar por la planta ${plant.name} de Plantas Mary. ¿Hay stock disponible?`
    : "Hola, quiero consultar por las plantas disponibles de Plantas Mary."
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`
}

function lightLabel(light: Light) {
  if (light === "baja") return "Poca luz"
  if (light === "media") return "Luz indirecta"
  return "Mucha luz"
}

function careLabel(care: Care) {
  return care === "facil" ? "Fácil" : "Cuidado medio"
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

function scorePlant(plant: Plant, light: Light, care: Care, useCase: UseCase, hasPets: boolean) {
  let score = 0

  if (plant.light === light) score += 5
  if (plant.care === care) score += 4
  if (plant.bestFor.includes(useCase)) score += 5
  if (light === "baja" && plant.light === "media") score += 1
  if (care === "facil" && plant.care === "media") score -= 2
  if (hasPets && plant.petNote.toLowerCase().includes("no ideal")) score -= 2

  return score
}

function Button({
  children,
  onClick,
  href,
  variant = "dark",
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: "dark" | "light" | "green"
  className?: string
}) {
  const variants = {
    dark: "bg-emerald-950 text-white hover:bg-emerald-900 shadow-lg shadow-emerald-950/10",
    light: "bg-white text-emerald-950 hover:bg-emerald-50 ring-1 ring-emerald-100 shadow-sm",
    green: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20",
  }

  const classes = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.98] ${variants[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

function NavButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        active ? "bg-emerald-950 text-white" : "text-zinc-600 hover:bg-white hover:text-emerald-950",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function PlantCard({ plant, compact = false }: { plant: Plant; compact?: boolean }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-200/60">
      <div className={compact ? "relative h-52 overflow-hidden" : "relative h-64 overflow-hidden"}>
        <img src={plant.image} alt={plant.name} className="h-full w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
          {plant.category}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-emerald-950 px-3 py-1 text-sm font-semibold text-white shadow-sm">
          {plant.price}
        </div>
      </div>

      <div className={compact ? "p-5" : "p-6"}>
        <h3 className="text-xl font-semibold tracking-tight text-zinc-950">{plant.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{plant.short}</p>
        {!compact && <p className="mt-4 text-sm leading-6 text-zinc-600">{plant.description}</p>}

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Luz</p>
            <p className="mt-1 text-xs font-semibold text-emerald-950">{lightLabel(plant.light)}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Riego</p>
            <p className="mt-1 text-xs font-semibold text-emerald-950">{plant.water}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Cuidado</p>
            <p className="mt-1 text-xs font-semibold text-emerald-950">{careLabel(plant.care)}</p>
          </div>
        </div>

        {!compact && (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              {plant.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-lime-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-lime-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Mascotas</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">{plant.petNote}</p>
            </div>
          </>
        )}

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href={whatsappLink(plant)} variant="green" className="w-full">
            Consultar
          </Button>
          <Button href={BRAND.instagramUrl} variant="light" className="w-full">
            Instagram
          </Button>
        </div>
      </div>
    </article>
  )
}

function SelectCard({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-[1.4rem] border p-4 text-left transition",
        active
          ? "border-emerald-800 bg-emerald-950 text-white shadow-xl shadow-emerald-200"
          : "border-emerald-100 bg-white text-zinc-950 hover:bg-emerald-50",
      ].join(" ")}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className={["mt-1 text-xs leading-5", active ? "text-emerald-100" : "text-zinc-500"].join(" ")}>
        {subtitle}
      </p>
    </button>
  )
}

function DeliveryMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 via-lime-50 to-teal-50 p-6 ring-1 ring-emerald-100">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-10 top-12 h-[2px] w-64 rotate-12 bg-emerald-300" />
        <div className="absolute left-24 top-40 h-[2px] w-80 -rotate-6 bg-emerald-300" />
        <div className="absolute right-10 top-24 h-[2px] w-56 rotate-45 bg-emerald-300" />
        <div className="absolute bottom-20 left-12 h-[2px] w-72 -rotate-12 bg-emerald-300" />
        <div className="absolute bottom-32 right-8 h-[2px] w-64 rotate-12 bg-emerald-300" />
      </div>

      <div className="absolute left-[18%] top-[28%]">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-2xl text-white shadow-xl shadow-emerald-700/30">
            🏡
          </div>
        </div>
      </div>

      <div className="absolute right-[18%] bottom-[24%]">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/25" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-600 text-2xl text-white shadow-xl shadow-lime-700/25">
            🚇
          </div>
        </div>
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 360" fill="none">
        <path
          d="M145 130 C220 90, 310 110, 365 165 C400 200, 445 225, 495 255"
          stroke="#047857"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 12"
        />
      </svg>

      <div className="absolute left-6 top-6 rounded-3xl bg-white/85 p-4 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Zona de entrega</p>
        <p className="mt-1 text-lg font-semibold text-emerald-950">Maipú</p>
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <p className="text-sm font-semibold text-emerald-950">Domicilio en Maipú</p>
          <p className="mt-1 text-xs leading-5 text-zinc-600">Coordinamos horario por WhatsApp.</p>
        </div>
        <div className="rounded-3xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <p className="text-sm font-semibold text-emerald-950">Metro Plaza Maipú</p>
          <p className="mt-1 text-xs leading-5 text-zinc-600">Punto de encuentro disponible.</p>
        </div>
      </div>
    </div>
  )
}

function HomeView({ setView }: { setView: (view: View) => void }) {
  const featured = plants[0]

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm ring-1 ring-emerald-100">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Página oficial de ejemplo
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-emerald-950 sm:text-7xl">
          Plantas lindas para darle vida a tu espacio.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          En {BRAND.name} encuentras plantas de interior fáciles de cuidar, con información simple
          para elegir bien y comprar directo por Instagram o WhatsApp.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setView("catalogo")} variant="dark">
            Ver catálogo
          </Button>
          <Button onClick={() => setView("recomendador")} variant="light">
            Ayúdame a elegir
          </Button>
          <Button onClick={() => setView("entrega")} variant="light">
            Método de entrega
          </Button>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-2xl shadow-emerald-200/60 backdrop-blur-xl">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="relative h-[26rem] overflow-hidden">
            <img src={featured.image} alt={featured.name} className="h-full w-full object-cover" />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm backdrop-blur">
              Planta destacada
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/90 p-5 shadow-lg backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-emerald-950">{featured.name}</h2>
                  <p className="mt-1 text-sm text-zinc-600">{featured.short}</p>
                </div>
                <p className="rounded-full bg-emerald-950 px-3 py-1 text-sm font-semibold text-white">
                  {featured.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CatalogView() {
  const [category, setCategory] = useState<Category>("Todas")
  const [query, setQuery] = useState("")

  const filteredPlants = useMemo(() => {
    const search = normalize(query)

    return plants.filter((plant) => {
      const matchesCategory = category === "Todas" || plant.category === category
      const matchesSearch =
        !search ||
        normalize(plant.name).includes(search) ||
        normalize(plant.category).includes(search) ||
        plant.tags.some((tag) => normalize(tag).includes(search))

      return matchesCategory && matchesSearch
    })
  }, [category, query])

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Catálogo</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">
            Plantas disponibles
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
            Productos de ejemplo. Después editamos precios, stock, nombres y cuidados reales.
          </p>
        </div>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar planta..."
          className="w-full rounded-full border border-emerald-100 bg-white px-5 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 md:max-w-sm"
        />
      </div>

      <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={[
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
              category === item
                ? "bg-emerald-950 text-white"
                : "bg-white text-zinc-600 ring-1 ring-emerald-100 hover:text-emerald-950",
            ].join(" ")}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </section>
  )
}

function RecommenderView() {
  const [light, setLight] = useState<Light>("media")
  const [care, setCare] = useState<Care>("facil")
  const [useCase, setUseCase] = useState<UseCase>("principiante")
  const [hasPets, setHasPets] = useState(false)

  const recommended = useMemo(() => {
    return [...plants]
      .map((plant) => ({ plant, score: scorePlant(plant, light, care, useCase, hasPets) }))
      .sort((a, b) => b.score - a.score)
  }, [light, care, useCase, hasPets])

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-2xl shadow-emerald-200/60 backdrop-blur-xl sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Recomendador
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Te ayudamos a elegir.</h2>
            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Responde estas preguntas y te mostramos las plantas que podrían calzar mejor con tu espacio.
            </p>

            <div className="mt-8 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold">Tip rápido</p>
              <p className="mt-2 text-sm leading-7 text-emerald-50">
                Si es tu primera planta, elige una de bajo riego y cuidado fácil.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-5 sm:p-7">
            <div>
              <p className="text-sm font-semibold text-emerald-950">¿Cuánta luz tiene el lugar?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <SelectCard active={light === "baja"} title="Poca luz" subtitle="Pieza u oficina con luz suave." onClick={() => setLight("baja")} />
                <SelectCard active={light === "media"} title="Luz indirecta" subtitle="Claro, sin sol fuerte." onClick={() => setLight("media")} />
                <SelectCard active={light === "alta"} title="Mucha luz" subtitle="Balcón o sol suave." onClick={() => setLight("alta")} />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-emerald-950">¿Qué tan fácil la quieres?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <SelectCard active={care === "facil"} title="Muy fácil" subtitle="Ideal para principiantes." onClick={() => setCare("facil")} />
                <SelectCard active={care === "media"} title="Cuidado medio" subtitle="Puedo estar más pendiente." onClick={() => setCare("media")} />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-emerald-950">¿Para qué la quieres?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <SelectCard active={useCase === "principiante"} title="Empezar" subtitle="Algo resistente." onClick={() => setUseCase("principiante")} />
                <SelectCard active={useCase === "decorar"} title="Decorar" subtitle="Que se vea linda." onClick={() => setUseCase("decorar")} />
                <SelectCard active={useCase === "regalo"} title="Regalar" subtitle="Simple y bonita." onClick={() => setUseCase("regalo")} />
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-3xl bg-emerald-50 p-5">
              <input
                checked={hasPets}
                onChange={(event) => setHasPets(event.target.checked)}
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-300 accent-emerald-600"
              />
              <span>
                <span className="block text-sm font-semibold text-emerald-950">Tengo mascotas curiosas</span>
                <span className="mt-1 block text-sm leading-6 text-zinc-600">
                  Mostraremos con más cuidado las plantas que conviene dejar fuera de su alcance.
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-xl font-semibold tracking-tight text-emerald-950">Recomendadas para ti</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {recommended.map(({ plant }) => (
              <PlantCard key={plant.id} plant={plant} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DeliveryView() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-8 text-white shadow-2xl shadow-emerald-300/50 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
          Método de entrega
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Entregas simples dentro de Maipú.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50">
          Coordinamos por mensaje para que puedas retirar tu planta en un punto cómodo.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-lg font-semibold">🏡 Domicilio en Maipú</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">
              Coordinamos día y horario por WhatsApp según disponibilidad.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-lg font-semibold">🚇 Metro Plaza Maipú</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">
              También podemos coordinar entrega en Metro Plaza Maipú.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink()} variant="green">
            Coordinar entrega
          </Button>
          <Button href={BRAND.instagramUrl} variant="light">
            Ver Instagram
          </Button>
        </div>
      </div>

      <DeliveryMap />
    </section>
  )
}

function BuyView({ setView }: { setView: (view: View) => void }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-8 text-white shadow-2xl shadow-emerald-300/50 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Cómo comprar</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Compra simple por Instagram o WhatsApp.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50">
          Elige una planta, consulta stock y coordinamos la entrega.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-2xl font-semibold">1</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">Elige una planta del catálogo.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-2xl font-semibold">2</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">Consulta stock por WhatsApp o Instagram.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-2xl font-semibold">3</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">Coordinamos entrega en Maipú.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink()} variant="green">
            Escribir por WhatsApp
          </Button>
          <Button href={BRAND.instagramUrl} variant="light">
            Ver Instagram
          </Button>
          <Button onClick={() => setView("entrega")} variant="light">
            Ver entregas
          </Button>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-emerald-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Información</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-emerald-950">Datos de Plantas Mary</h3>

        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Instagram</p>
            <p className="mt-1 text-sm font-semibold text-emerald-950">{BRAND.instagramUser}</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Entrega</p>
            <p className="mt-1 text-sm font-semibold text-emerald-950">{BRAND.delivery}</p>
          </div>
          <div className="rounded-3xl bg-lime-50 p-5 ring-1 ring-lime-100">
            <p className="text-sm font-semibold text-emerald-950">Pendiente de editar</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Luego cambiamos número real de WhatsApp, usuario real de Instagram, precios y stock.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [view, setView] = useState<View>("inicio")

  return (
    <main
      className="min-h-screen bg-[#f3f8f4] text-zinc-950"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", sans-serif',
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute right-[-12rem] top-[20rem] h-[30rem] w-[30rem] rounded-full bg-lime-200/50 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/70 bg-[#f3f8f4]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button onClick={() => setView("inicio")} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              🌿
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-emerald-950">{BRAND.name}</p>
              <p className="-mt-1 text-xs text-zinc-500">Tienda de plantas</p>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            <NavButton active={view === "inicio"} onClick={() => setView("inicio")}>Inicio</NavButton>
            <NavButton active={view === "catalogo"} onClick={() => setView("catalogo")}>Catálogo</NavButton>
            <NavButton active={view === "recomendador"} onClick={() => setView("recomendador")}>Elegir</NavButton>
            <NavButton active={view === "entrega"} onClick={() => setView("entrega")}>Entrega</NavButton>
            <NavButton active={view === "comprar"} onClick={() => setView("comprar")}>Comprar</NavButton>
          </nav>

          <div className="hidden md:block">
            <Button href={BRAND.instagramUrl} variant="dark">Instagram</Button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3 sm:px-8 md:hidden">
          <NavButton active={view === "inicio"} onClick={() => setView("inicio")}>Inicio</NavButton>
          <NavButton active={view === "catalogo"} onClick={() => setView("catalogo")}>Catálogo</NavButton>
          <NavButton active={view === "recomendador"} onClick={() => setView("recomendador")}>Elegir</NavButton>
          <NavButton active={view === "entrega"} onClick={() => setView("entrega")}>Entrega</NavButton>
          <NavButton active={view === "comprar"} onClick={() => setView("comprar")}>Comprar</NavButton>
        </div>
      </header>

      <div className="relative">
        {view === "inicio" && <HomeView setView={setView} />}
        {view === "catalogo" && <CatalogView />}
        {view === "recomendador" && <RecommenderView />}
        {view === "entrega" && <DeliveryView />}
        {view === "comprar" && <BuyView setView={setView} />}
      </div>

      <footer className="relative border-t border-emerald-100 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {BRAND.name} — Página oficial de ejemplo.</p>
          <p>{BRAND.delivery}</p>
        </div>
      </footer>
    </main>
  )
}
