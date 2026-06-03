"use client"

import type { ReactNode } from "react"
import { useMemo, useState } from "react"

type View = "inicio" | "catalogo" | "elegir" | "entrega"
type Category = "Todas" | "Interior" | "Exterior" | "Fácil cuidado"
type Light = "baja" | "media" | "alta"
type Care = "facil" | "media"
type UseCase = "principiante" | "decorar" | "regalo" | "terraza"

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
  bestFor: UseCase[]
  tags: string[]
  badge: string
}

const BRAND = {
  name: "Plantas Mary",
  instagramUser: "@plantasmary.cl",
  instagramUrl: "https://www.instagram.com/plantasmary.cl/",
  whatsappNumber: "56984560468",
  logo: "/logo-plantas-mary.webp",
  delivery: "Entregamos en nuestro domicilio en Maipú y también en Metro Plaza Maipú.",
}

const plants: Plant[] = [
  {
    id: "haworthia-verde",
    name: "Suculenta Haworthia",
    price: "Consultar",
    category: "Fácil cuidado",
    short: "Pequeña, firme y resistente.",
    description: "Suculenta compacta y decorativa, ideal para escritorios, repisas o rincones con buena luz.",
    image: "/suculenta-haworthia-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["principiante", "decorar", "regalo"],
    tags: ["Suculenta", "Bajo riego", "Fácil"],
    badge: "Disponible",
  },
  {
    id: "orejitas",
    name: "Suculenta Orejitas",
    price: "Consultar",
    category: "Interior",
    short: "Suave, curiosa y decorativa.",
    description: "Planta pequeña con hojas redondeadas. Muy linda para regalar o decorar espacios chicos.",
    image: "/suculenta-orejitas.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo", "principiante"],
    tags: ["Interior", "Regalo", "Compacta"],
    badge: "Nueva",
  },
  {
    id: "rosada",
    name: "Suculenta Rosada",
    price: "Consultar",
    category: "Interior",
    short: "Color suave y estilo delicado.",
    description: "Suculenta de tonos rosados, ideal para quienes buscan una planta diferente y decorativa.",
    image: "/suculenta-rosada.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Rosada", "Decorativa", "Bajo riego"],
    badge: "Especial",
  },
  {
    id: "haworthia-clara",
    name: "Haworthia Clara",
    price: "Consultar",
    category: "Fácil cuidado",
    short: "Compacta y de bajo mantenimiento.",
    description: "Perfecta para comenzar con plantas. Requiere poco riego y se adapta bien a espacios luminosos.",
    image: "/suculenta-haworthia-clara.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["principiante", "decorar"],
    tags: ["Fácil", "Compacta", "Bajo riego"],
    badge: "Fácil",
  },
  {
    id: "haworthia-cebra",
    name: "Suculenta Cebra",
    price: "Consultar",
    category: "Fácil cuidado",
    short: "Textura marcada y look moderno.",
    description: "Suculenta llamativa por sus líneas y textura. Buena opción para espacios modernos y luminosos.",
    image: "/suculenta-haworthia-cebra.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "principiante"],
    tags: ["Moderna", "Resistente", "Bajo riego"],
    badge: "Top",
  },
  {
    id: "dorada",
    name: "Suculenta Dorada",
    price: "Consultar",
    category: "Exterior",
    short: "Tonos claros y presencia alegre.",
    description: "Ideal para lugares con buena luz. Sus tonos verdes y dorados aportan frescura y calidez.",
    image: "/suculenta-dorada.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar", "regalo"],
    tags: ["Buena luz", "Exterior", "Color claro"],
    badge: "Exterior",
  },
  {
    id: "colgante",
    name: "Suculenta Vertical",
    price: "Consultar",
    category: "Exterior",
    short: "Forma alta y mucho carácter.",
    description: "Suculenta con silueta más alta, ideal para destacar en terraza, repisa o entrada luminosa.",
    image: "/suculenta-colgante.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar"],
    tags: ["Vertical", "Luminosa", "Bajo riego"],
    badge: "Destacada",
  },
  {
    id: "mini-verde",
    name: "Suculenta Mini Verde",
    price: "Consultar",
    category: "Interior",
    short: "Pequeña, fresca y delicada.",
    description: "Opción mini para detalles decorativos, escritorios o regalos simples.",
    image: "/suculenta-mini-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["regalo", "decorar", "principiante"],
    tags: ["Mini", "Regalo", "Decorativa"],
    badge: "Mini",
  },
  {
    id: "echeveria-clara",
    name: "Suculenta Echeveria",
    price: "Consultar",
    category: "Interior",
    short: "Clara, suave y elegante.",
    description: "Suculenta de tonos claros, perfecta para decorar con un estilo limpio y natural.",
    image: "/suculenta-echeveria-clara.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Elegante", "Interior", "Bajo riego"],
    badge: "Favorita",
  },
]

const categories: Category[] = ["Todas", "Interior", "Exterior", "Fácil cuidado"]

function whatsappLink(plant?: Plant) {
  const message = plant
    ? `Hola, quiero consultar por ${plant.name} de Plantas Mary. ¿Hay stock disponible?`
    : "Hola, quiero consultar por las plantas disponibles de Plantas Mary."
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function scorePlant(plant: Plant, light: Light, care: Care, useCase: UseCase) {
  let score = 0
  if (plant.light === light) score += 5
  if (plant.care === care) score += 4
  if (plant.bestFor.includes(useCase)) score += 5
  if (light === "baja" && plant.light === "media") score += 1
  if (care === "facil" && plant.care === "media") score -= 2
  return score
}

function lightLabel(light: Light) {
  if (light === "baja") return "Poca luz"
  if (light === "media") return "Luz indirecta"
  return "Mucha luz"
}

function careLabel(care: Care) {
  return care === "facil" ? "Fácil" : "Media"
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
    light: "bg-white text-emerald-950 hover:bg-emerald-50 ring-1 ring-emerald-100",
    green: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20",
  }
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.98] ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className={classes}>
        {children}
      </a>
    )
  }

  return <button onClick={onClick} className={classes}>{children}</button>
}

function NavButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
        active ? "bg-emerald-950 text-white shadow-sm" : "text-zinc-600 hover:bg-white hover:text-emerald-950",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function ProductTile({ plant, onClick, large = false }: { plant: Plant; onClick: () => void; large?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={[
        "group overflow-hidden rounded-[1.55rem] border border-emerald-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-200/60",
        large ? "col-span-2 sm:col-span-1" : "",
      ].join(" ")}
    >
      <div className={large ? "relative h-52 overflow-hidden bg-emerald-50 sm:h-52" : "relative h-44 overflow-hidden bg-emerald-50 sm:h-52"}>
        <img src={plant.image} alt={plant.name} className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-emerald-800 backdrop-blur">
          {plant.badge}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-emerald-950">{plant.name}</h3>
            <p className="mt-1 text-xs text-zinc-500">{plant.category}</p>
          </div>
          <p className="text-sm font-bold text-emerald-700">{plant.price}</p>
        </div>
      </div>
    </button>
  )
}

function PlantCard({ plant, compact = false }: { plant: Plant; compact?: boolean }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-200/60">
      <div className={compact ? "relative h-64 overflow-hidden bg-emerald-50" : "relative h-80 overflow-hidden bg-emerald-50"}>
        <img src={plant.image} alt={plant.name} className="h-full w-full object-contain p-2" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
          {plant.category}
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm">
          {plant.badge}
        </div>
      </div>

      <div className={compact ? "p-5" : "p-6"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-zinc-950">{plant.name}</h3>
            <p className="mt-1 text-sm text-zinc-500">{plant.short}</p>
          </div>
          <p className="rounded-full bg-emerald-950 px-3 py-1 text-sm font-semibold text-white">{plant.price}</p>
        </div>

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
          <div className="mt-4 flex flex-wrap gap-2">
            {plant.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-lime-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-lime-100">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href={whatsappLink(plant)} variant="green" className="w-full">Consultar</Button>
          <Button href={BRAND.instagramUrl} variant="light" className="w-full">Instagram</Button>
        </div>
      </div>
    </article>
  )
}

function SelectCard({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-[1.4rem] border p-4 text-left transition",
        active ? "border-emerald-800 bg-emerald-950 text-white shadow-xl shadow-emerald-200" : "border-emerald-100 bg-white text-zinc-950 hover:bg-emerald-50",
      ].join(" ")}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className={["mt-1 text-xs leading-5", active ? "text-emerald-100" : "text-zinc-500"].join(" ")}>{subtitle}</p>
    </button>
  )
}

function DeliveryMap() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 via-lime-50 to-teal-50 p-6 ring-1 ring-emerald-100">
      <div className="absolute left-6 top-6 rounded-3xl bg-white/85 p-4 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Zona de entrega</p>
        <p className="mt-1 text-lg font-semibold text-emerald-950">Maipú</p>
      </div>
      <div className="absolute left-[18%] top-[35%] flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-2xl text-white shadow-xl">🏡</div>
      <div className="absolute right-[18%] bottom-[30%] flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-600 text-2xl text-white shadow-xl">🚇</div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 340" fill="none">
        <path d="M145 140 C230 90, 330 125, 405 190 C440 220, 470 235, 500 255" stroke="#047857" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 12" />
      </svg>
      <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <p className="text-sm font-semibold text-emerald-950">Domicilio en Maipú</p>
          <p className="mt-1 text-xs leading-5 text-zinc-600">Coordinamos por WhatsApp.</p>
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
  const featured = plants.slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
      <div className="grid items-start gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm ring-1 ring-emerald-100 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Plantas reales disponibles
          </div>

          <h1 className="max-w-2xl text-[2.65rem] font-semibold leading-[0.96] tracking-[-0.055em] text-emerald-950 sm:text-6xl">
            Dale vida a tu hogar.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Suculentas y plantas de fácil cuidado para hacer tu espacio más fresco, acogedor y vivo.
          </p>

          <div className="mt-5 grid gap-3 sm:flex">
            <Button onClick={() => setView("catalogo")} variant="dark" className="w-full sm:w-auto">Ver catálogo</Button>
            <Button onClick={() => setView("elegir")} variant="light" className="w-full sm:w-auto">Te ayudamos a elegir</Button>
          </div>

          <div className="mt-5 rounded-[1.7rem] border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-950">Entrega en Maipú</p>
                <p className="mt-1 text-sm text-zinc-500">Domicilio y Metro Plaza Maipú.</p>
              </div>
              <Button onClick={() => setView("entrega")} variant="light" className="px-4 py-2 text-xs">Ver más</Button>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Destacadas</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-emerald-950">Disponibles ahora</h2>
            </div>
            <button onClick={() => setView("catalogo")} className="shrink-0 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">
              Ver todas
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {featured.map((plant, index) => (
              <ProductTile key={plant.id} plant={plant} large={index === 0} onClick={() => setView("catalogo")} />
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.8rem] bg-emerald-950 p-5 text-white shadow-xl shadow-emerald-900/10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Nuevo stock</p>
              <p className="mt-2 text-xl font-semibold">Suculentas reales disponibles</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50">Elige entre modelos pequeños, decorativos y fáciles de cuidar.</p>
            </div>
            <div className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-emerald-100">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Fácil cuidado</p>
              <p className="mt-2 text-xl font-semibold text-emerald-950">Perfectas para empezar</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Bajo riego, buen tamaño y listas para decorar tu hogar.</p>
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
      const matchesSearch = !search || normalize(plant.name).includes(search) || normalize(plant.category).includes(search) || plant.tags.some((tag) => normalize(tag).includes(search))
      return matchesCategory && matchesSearch
    })
  }, [category, query])

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Catálogo</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">Plantas disponibles</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">Estas son las plantas reales disponibles. Las fotos se muestran completas y los nombres/precios se pueden editar cuando quieras.</p>
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
              category === item ? "bg-emerald-950 text-white" : "bg-white text-zinc-600 ring-1 ring-emerald-100 hover:text-emerald-950",
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

  const recommended = useMemo(() => {
    return [...plants].map((plant) => ({ plant, score: scorePlant(plant, light, care, useCase) })).sort((a, b) => b.score - a.score).slice(0, 6)
  }, [light, care, useCase])

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-2xl shadow-emerald-200/60 backdrop-blur-xl sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Te ayudamos a elegir</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Encuentra la ideal para ti.</h2>
            <p className="mt-4 text-sm leading-7 text-emerald-50">Elige tus preferencias y te mostramos las plantas que mejor pueden calzar con tu espacio.</p>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-5 sm:p-7">
            <p className="text-sm font-semibold text-emerald-950">¿Cuánta luz tiene el lugar?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <SelectCard active={light === "baja"} title="Poca luz" subtitle="Interior suave." onClick={() => setLight("baja")} />
              <SelectCard active={light === "media"} title="Luz indirecta" subtitle="Claro, sin sol fuerte." onClick={() => setLight("media")} />
              <SelectCard active={light === "alta"} title="Mucha luz" subtitle="Terraza o exterior." onClick={() => setLight("alta")} />
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-950">¿Qué tan fácil la quieres?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <SelectCard active={care === "facil"} title="Muy fácil" subtitle="Bajo riego." onClick={() => setCare("facil")} />
              <SelectCard active={care === "media"} title="Cuidado medio" subtitle="Puedo estar pendiente." onClick={() => setCare("media")} />
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-950">¿Para qué la quieres?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-4">
              <SelectCard active={useCase === "principiante"} title="Empezar" subtitle="Algo resistente." onClick={() => setUseCase("principiante")} />
              <SelectCard active={useCase === "decorar"} title="Decorar" subtitle="Que se vea linda." onClick={() => setUseCase("decorar")} />
              <SelectCard active={useCase === "terraza"} title="Exterior" subtitle="Terraza." onClick={() => setUseCase("terraza")} />
              <SelectCard active={useCase === "regalo"} title="Regalar" subtitle="Simple y bonita." onClick={() => setUseCase("regalo")} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-xl font-semibold tracking-tight text-emerald-950">Recomendadas para ti</h3>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map(({ plant }) => <PlantCard key={plant.id} plant={plant} compact />)}
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
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Método de entrega</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Entregas simples dentro de Maipú.</h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50">Coordinamos por mensaje para que puedas recibir o retirar tu planta de forma cómoda.</p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-lg font-semibold">🏡 Domicilio en Maipú</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">Coordinamos día y horario por WhatsApp según disponibilidad.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-lg font-semibold">🚇 Metro Plaza Maipú</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">También coordinamos entrega en Metro Plaza Maipú.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink()} variant="green">Coordinar entrega</Button>
          <Button href={BRAND.instagramUrl} variant="light">Ver Instagram</Button>
        </div>
      </div>

      <DeliveryMap />
    </section>
  )
}

export default function Home() {
  const [view, setView] = useState<View>("inicio")

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#f3f8f4] text-zinc-950"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", sans-serif' }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute right-[-12rem] top-[20rem] h-[30rem] w-[30rem] rounded-full bg-lime-200/50 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/70 bg-[#f3f8f4]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button onClick={() => setView("inicio")} className="flex items-center gap-3 text-left">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-emerald-600/20 ring-1 ring-emerald-100">
              <img src={BRAND.logo} alt="Logo Plantas Mary" className="h-full w-full object-contain p-2" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-emerald-950 sm:text-xl">{BRAND.name}</p>
              <p className="-mt-1 text-xs text-zinc-500 sm:text-sm">Tienda de plantas</p>
            </div>
          </button>

          <div className="hidden md:block">
            <Button href={BRAND.instagramUrl} variant="dark">Instagram</Button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3 sm:px-8">
          <NavButton active={view === "inicio"} onClick={() => setView("inicio")}>Inicio</NavButton>
          <NavButton active={view === "catalogo"} onClick={() => setView("catalogo")}>Catálogo</NavButton>
          <NavButton active={view === "elegir"} onClick={() => setView("elegir")}>Elegir</NavButton>
          <NavButton active={view === "entrega"} onClick={() => setView("entrega")}>Entrega</NavButton>
        </div>
      </header>

      <div className="relative">
        {view === "inicio" && <HomeView setView={setView} />}
        {view === "catalogo" && <CatalogView />}
        {view === "elegir" && <RecommenderView />}
        {view === "entrega" && <DeliveryView />}
      </div>

      <footer className="relative border-t border-emerald-100 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {BRAND.name} — Plantas para tu hogar.</p>
          <p>{BRAND.delivery}</p>
        </div>
      </footer>
    </main>
  )
}
