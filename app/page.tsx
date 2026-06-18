"use client"

import type { ReactNode } from "react"
import { useMemo, useState } from "react"

type View = "inicio" | "catalogo" | "elegir" | "entrega" | "detalle"
type Category = "Todas" | "Interior" | "Exterior" | "Fácil cuidado"
type Light = "baja" | "media" | "alta"
type Care = "facil" | "media"
type UseCase = "principiante" | "decorar" | "regalo" | "terraza"

type Plant = {
  id: string
  name: string
  price: string
  potSize: string
  category: Exclude<Category, "Todas">
  short: string
  description: string
  story: string
  growthMood: "compacta" | "colgante" | "vertical" | "roseta" | "cucharita"
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
    price: "$2.000",
    potSize: "Macetero: 8 cm",
    category: "Fácil cuidado",
    short: "Firme, compacta y resistente.",
    description: "Suculenta compacta y decorativa, ideal para escritorios, repisas o rincones con buena luz.",
    story: "Una planta pequeña con carácter fuerte: se ve ordenada, firme y muy limpia visualmente. Es ideal para quienes quieren empezar con algo resistente, pero que igual se sienta especial en una repisa o escritorio.",
    growthMood: "compacta",
    image: "/suculenta-haworthia-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["principiante", "decorar", "regalo"],
    tags: ["Bajo riego", "Fácil", "Interior"],
    badge: "Disponible",
  },
  {
    id: "orejitas",
    name: "Suculenta Orejitas",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Suave, curiosa y decorativa.",
    description: "Planta pequeña con hojas redondeadas. Muy linda para regalar o decorar espacios chicos.",
    story: "Sus hojas redondeadas le dan una personalidad tierna y suave. Queda muy bien en espacios pequeños, veladores o escritorios donde quieres sumar un detalle vivo sin sobrecargar el lugar.",
    growthMood: "compacta",
    image: "/suculenta-orejitas.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo", "principiante"],
    tags: ["Interior", "Regalo", "Decorativa"],
    badge: "Nueva",
  },
  {
    id: "rosada",
    name: "Suculenta Rosada",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Color suave y estilo delicado.",
    description: "Suculenta de tonos rosados, ideal para quienes buscan una planta diferente y decorativa.",
    story: "Tiene tonos cálidos y delicados que la hacen destacar sin ser exagerada. Es una buena opción para regalar o para darle un toque más dulce y decorativo a un rincón del hogar.",
    growthMood: "roseta",
    image: "/suculenta-rosada.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Decorativa", "Color suave", "Bajo riego"],
    badge: "Especial",
  },
  {
    id: "haworthia-clara",
    name: "Haworthia Clara",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Fácil cuidado",
    short: "Compacta y de bajo mantenimiento.",
    description: "Perfecta para comenzar con plantas. Requiere poco riego y se adapta bien a espacios luminosos.",
    story: "Compacta, simple y fácil de ubicar. Es de esas plantas que se adaptan bien a la rutina y ayudan a que un espacio se vea más cuidado sin exigir demasiada atención.",
    growthMood: "compacta",
    image: "/suculenta-haworthia-clara.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["principiante", "decorar"],
    tags: ["Fácil", "Bajo riego", "Compacta"],
    badge: "Fácil",
  },
  {
    id: "haworthia-cebra",
    name: "Suculenta Cebra",
    price: "$2.000",
    potSize: "Macetero: 8 cm",
    category: "Fácil cuidado",
    short: "Textura marcada y look moderno.",
    description: "Suculenta llamativa por sus líneas y textura. Buena opción para espacios modernos y luminosos.",
    story: "Su textura marcada y sus líneas naturales le dan un aspecto moderno. Funciona muy bien para personas que buscan una planta pequeña, resistente y con una forma distinta.",
    growthMood: "compacta",
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
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Exterior",
    short: "Tonos claros y presencia alegre.",
    description: "Ideal para lugares con buena luz. Sus tonos verdes y dorados aportan frescura y calidez.",
    story: "Sus tonos claros transmiten calidez y luz. Es una planta alegre, perfecta para espacios luminosos donde quieres sumar un detalle fresco y natural.",
    growthMood: "roseta",
    image: "/suculenta-dorada.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar", "regalo"],
    tags: ["Buena luz", "Exterior", "Color claro"],
    badge: "Exterior",
  },
  {
    id: "vertical",
    name: "Suculenta Vertical",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Exterior",
    short: "Forma alta y mucho carácter.",
    description: "Suculenta con silueta más alta, ideal para destacar en terraza, repisa o entrada luminosa.",
    story: "Tiene una silueta más alta y llamativa, por eso destaca más que otras suculentas. Es buena para entradas, terrazas protegidas o repisas donde quieres que la planta tenga presencia.",
    growthMood: "vertical",
    image: "/suculenta-vertical.webp",
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
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Fresca, delicada y decorativa.",
    description: "Opción mini para detalles decorativos, escritorios o regalos simples.",
    story: "Pequeña y delicada, pensada para detalles simples. Es ideal para regalos, escritorios o rincones chicos donde una planta grande no calza, pero igual quieres sumar vida.",
    growthMood: "vertical",
    image: "/suculenta-mini-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["regalo", "decorar", "principiante"],
    tags: ["Decorativa", "Regalo", "Interior"],
    badge: "Mini",
  },
  {
    id: "echeveria-clara",
    name: "Suculenta Echeveria",
    price: "$1.000",
    potSize: "Macetero: 5 cm",
    category: "Interior",
    short: "Clara, suave y elegante.",
    description: "Suculenta de tonos claros, perfecta para decorar con un estilo limpio y natural.",
    story: "Su forma ordenada y color suave la hacen sentir elegante. Queda muy bien en espacios limpios, minimalistas o donde buscas una planta decorativa pero tranquila.",
    growthMood: "roseta",
    image: "/suculenta-echeveria-clara.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Elegante", "Interior", "Bajo riego"],
    badge: "Favorita",
  },
  {
    id: "rosario",
    name: "Suculenta Rosario",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Colgante, delicada y muy llamativa.",
    description: "Suculenta tipo rosario, ideal para repisas, maceteros altos o espacios donde pueda caer con gracia.",
    story: "Su forma colgante la hace muy especial. Es perfecta para repisas o lugares donde pueda caer de forma natural, creando un efecto más vivo y orgánico.",
    growthMood: "colgante",
    image: "/suculenta-rosario.webp",
    light: "media",
    water: "Bajo",
    care: "media",
    bestFor: ["decorar", "regalo"],
    tags: ["Colgante", "Decorativa", "Luz indirecta"],
    badge: "Nueva",
  },
  {
    id: "jade",
    name: "Suculenta Jade",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Hojas brillantes y forma elegante.",
    description: "Planta de hojas verdes con borde sutil, ideal para decorar interiores luminosos.",
    story: "De hojas brillantes y forma amable, transmite frescura y buena energía. Es una planta muy decorativa para interiores luminosos y también funciona muy bien como regalo.",
    growthMood: "cucharita",
    image: "/suculenta-jade.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo", "principiante"],
    tags: ["Interior", "Decorativa", "Fácil"],
    badge: "Nueva",
  },
  {
    id: "roseta-gris",
    name: "Suculenta Roseta",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Forma de roseta y tono suave.",
    description: "Suculenta pequeña de aspecto delicado, perfecta para detalles decorativos o regalos simples.",
    story: "Tiene una forma de roseta muy delicada, como una pequeña flor verde. Es ideal para quienes buscan una planta sencilla, bonita y con un toque elegante.",
    growthMood: "roseta",
    image: "/suculenta-roseta-gris.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["regalo", "decorar"],
    tags: ["Roseta", "Decorativa", "Bajo riego"],
    badge: "Nueva",
  },
  {
    id: "cucharita",
    name: "Planta Cucharita",
    price: "$4.000",
    potSize: "Macetero: 11 cm",
    category: "Interior",
    short: "Hojas redondas, fresca y muy decorativa.",
    description: "Planta conocida por sus hojas redondas tipo cucharita. El tamaño indicado corresponde al macetero, no a la altura total de la planta.",
    story: "Sus hojas redondas tipo cucharita la hacen muy reconocible y entretenida visualmente. Es una planta con más presencia, ideal para convertir un rincón simple en un punto verde protagonista.",
    growthMood: "cucharita",
    image: "/planta-cucharita-11cm.webp",
    light: "media",
    water: "Medio",
    care: "media",
    bestFor: ["decorar", "regalo"],
    tags: ["Macetero 11 cm", "Interior", "Decorativa"],
    badge: "11 cm",
  },
  {
    id: "echeveria-verde",
    name: "Echeveria Verde",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Interior",
    short: "Verde clara, fresca y elegante.",
    description: "Suculenta de forma armónica y color verde suave, ideal para dar un toque natural al hogar.",
    story: "De forma armónica y color verde claro, tiene una presencia fresca y luminosa. Es una buena opción para decorar con un estilo natural y limpio.",
    growthMood: "roseta",
    image: "/suculenta-echeveria-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Echeveria", "Decorativa", "Bajo riego"],
    badge: "Nueva",
  },
  {
    id: "sedum-verde",
    name: "Suculenta Sedum",
    price: "$2.000",
    potSize: "Macetero: 7 cm",
    category: "Exterior",
    short: "Vertical, fresca y de bajo riego.",
    description: "Suculenta de hojas alargadas y tonos verdes claros, ideal para espacios luminosos.",
    story: "Sus hojas alargadas y crecimiento vertical le dan movimiento. Es una planta alegre para espacios luminosos, perfecta para sumar altura y textura.",
    growthMood: "vertical",
    image: "/suculenta-sedum-verde.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar"],
    tags: ["Buena luz", "Bajo riego", "Exterior"],
    badge: "Nueva",
  },
]

const categories: Category[] = ["Todas", "Interior", "Exterior", "Fácil cuidado"]

function whatsappLink(plant?: Plant) {
  const message = plant
    ? `Hola, quiero consultar por ${plant.name} (${plant.potSize}) de Plantas Mary. ¿Hay stock disponible? También me interesa el instructivo de cuidado.`
    : "Hola, quiero consultar por las plantas disponibles de Plantas Mary. También vi que entregan un instructivo de cuidado."
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
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-emerald-700 backdrop-blur">
          {plant.badge}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-emerald-950">{plant.name}</h3>
            <p className="mt-1 text-xs text-zinc-500">{plant.potSize}</p>
          </div>
          <p className="text-sm font-bold text-emerald-700">{plant.price}</p>
        </div>
      </div>
    </button>
  )
}

function PlantCard({
  plant,
  compact = false,
  onOpen,
}: {
  plant: Plant
  compact?: boolean
  onOpen?: (plant: Plant) => void
}) {
  return (
    <article
      onClick={() => onOpen?.(plant)}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && onOpen) {
          event.preventDefault()
          onOpen(plant)
        }
      }}
      tabIndex={onOpen ? 0 : undefined}
      role={onOpen ? "button" : undefined}
      className={[
        "overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-200/60",
        onOpen ? "cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-100" : "",
      ].join(" ")}
    >
      <div className={compact ? "relative h-64 overflow-hidden bg-emerald-50" : "relative h-80 overflow-hidden bg-emerald-50"}>
        <img src={plant.image} alt={plant.name} className="h-full w-full object-contain p-2" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
          {plant.category}
        </div>
        {onOpen && (
          <div className="absolute bottom-4 right-4 rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Ver detalle
          </div>
        )}
      </div>

      <div className={compact ? "p-5" : "p-6"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-zinc-950">{plant.name}</h3>
            <p className="mt-1 text-sm text-zinc-500">{plant.short}</p>
            <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {plant.potSize}
            </p>
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
              <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-800 ring-1 ring-emerald-100">
          <span className="font-semibold">Incluye guía de cuidado:</span> ubicación, riego y consejos simples para mantenerla bonita.
        </div>

        {onOpen && (
          <button
            onClick={(event) => {
              event.stopPropagation()
              onOpen(plant)
            }}
            className="mt-4 w-full rounded-full bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100 transition hover:bg-emerald-100"
          >
            Ver fotos y detalles
          </button>
        )}

        <div
          onClick={(event) => event.stopPropagation()}
          className="mt-5 grid gap-2 sm:grid-cols-2"
        >
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
        "rounded-2xl border px-3 py-3 text-left transition",
        active
          ? "border-emerald-800 bg-emerald-950 text-white shadow-md shadow-emerald-200"
          : "border-emerald-100 bg-white text-zinc-950 hover:bg-emerald-50",
      ].join(" ")}
    >
      <p className="text-sm font-semibold leading-tight">{title}</p>
      <p className={["mt-1 text-[11px] leading-4", active ? "text-emerald-100" : "text-zinc-500"].join(" ")}>{subtitle}</p>
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



const growthStages = [
  {
    id: "1m",
    label: "1 mes",
    title: "Adaptación",
    note: "La planta aún se está acomodando a su nuevo espacio.",
    focus: "Ubicación correcta y riego medido.",
  },
  {
    id: "6m",
    label: "6 meses",
    title: "Desarrollo",
    note: "Empieza a verse más firme, con mejor volumen o nuevos brotes.",
    focus: "Buena luz y rutina constante.",
  },
  {
    id: "1y",
    label: "1 año",
    title: "Más presencia",
    note: "Puede verse más grande, con más personalidad y mejor forma.",
    focus: "Posible cambio de sustrato o macetero según evolución.",
  },
] as const

type GrowthStageId = (typeof growthStages)[number]["id"]

function growthText(plant: Plant, stage: GrowthStageId) {
  if (stage === "1m") {
    return `${plant.name} podría verse muy parecida a como la recibes, enfocando su energía en adaptarse al lugar. La clave aquí es evitar exceso de riego y darle la luz adecuada.`
  }

  if (stage === "6m") {
    return `Con buenos cuidados, ${plant.name} podría mostrar una forma más definida, hojas nuevas o una apariencia más firme. En esta etapa ya se empieza a notar mejor su carácter.`
  }

  return `En un año, ${plant.name} podría verse con más presencia y mejor estructura. Dependiendo del ambiente, incluso podría agradecer una revisión de sustrato o un macetero más cómodo.`
}

function growthCareHint(plant: Plant, stage: GrowthStageId) {
  if (stage === "1m") {
    return `Durante el primer mes, prioriza ${lightLabel(plant.light).toLowerCase()} y riego ${plant.water.toLowerCase()}.`
  }

  if (stage === "6m") {
    return `A los seis meses, mantener la rutina suele marcar la diferencia: luz estable, riego ${plant.water.toLowerCase()} y observación.`
  }

  return `Al año, revisa raíces, sustrato y espacio disponible para que siga creciendo de forma sana.`
}

function growthSceneConfig(mood: Plant["growthMood"], stage: GrowthStageId) {
  const byMood: Record<Plant["growthMood"], Record<GrowthStageId, {
    mainScale: number
    frontY: number
    frontRotate: number
    back1Scale: number
    back2Scale: number
    orbitScale: number
    pedestalScale: number
    glow: string
  }>> = {
    compacta: {
      "1m": { mainScale: 0.92, frontY: 12, frontRotate: -4, back1Scale: 0.82, back2Scale: 0.72, orbitScale: 0.9, pedestalScale: 0.92, glow: "from-emerald-100 via-lime-50 to-white" },
      "6m": { mainScale: 1.02, frontY: 2, frontRotate: -1, back1Scale: 0.9, back2Scale: 0.8, orbitScale: 1.0, pedestalScale: 1.0, glow: "from-emerald-100 via-lime-50 to-white" },
      "1y": { mainScale: 1.12, frontY: -8, frontRotate: 2, back1Scale: 0.98, back2Scale: 0.88, orbitScale: 1.08, pedestalScale: 1.08, glow: "from-emerald-100 via-teal-50 to-white" },
    },
    colgante: {
      "1m": { mainScale: 0.9, frontY: 0, frontRotate: -6, back1Scale: 0.82, back2Scale: 0.74, orbitScale: 0.92, pedestalScale: 0.92, glow: "from-lime-100 via-emerald-50 to-white" },
      "6m": { mainScale: 1.0, frontY: 12, frontRotate: -2, back1Scale: 0.9, back2Scale: 0.82, orbitScale: 1.02, pedestalScale: 1.0, glow: "from-lime-100 via-emerald-50 to-white" },
      "1y": { mainScale: 1.14, frontY: 24, frontRotate: 3, back1Scale: 1.0, back2Scale: 0.9, orbitScale: 1.12, pedestalScale: 1.04, glow: "from-emerald-100 via-lime-50 to-white" },
    },
    vertical: {
      "1m": { mainScale: 0.9, frontY: 18, frontRotate: -4, back1Scale: 0.82, back2Scale: 0.72, orbitScale: 0.9, pedestalScale: 0.9, glow: "from-teal-100 via-emerald-50 to-white" },
      "6m": { mainScale: 1.02, frontY: 6, frontRotate: -1, back1Scale: 0.9, back2Scale: 0.8, orbitScale: 1.0, pedestalScale: 1.0, glow: "from-teal-100 via-emerald-50 to-white" },
      "1y": { mainScale: 1.16, frontY: -8, frontRotate: 2, back1Scale: 1.0, back2Scale: 0.9, orbitScale: 1.08, pedestalScale: 1.08, glow: "from-teal-100 via-lime-50 to-white" },
    },
    roseta: {
      "1m": { mainScale: 0.9, frontY: 14, frontRotate: -8, back1Scale: 0.8, back2Scale: 0.72, orbitScale: 0.9, pedestalScale: 0.9, glow: "from-emerald-100 via-white to-lime-50" },
      "6m": { mainScale: 1.03, frontY: 2, frontRotate: -2, back1Scale: 0.9, back2Scale: 0.8, orbitScale: 1.0, pedestalScale: 1.0, glow: "from-emerald-100 via-white to-lime-50" },
      "1y": { mainScale: 1.18, frontY: -6, frontRotate: 4, back1Scale: 1.02, back2Scale: 0.92, orbitScale: 1.1, pedestalScale: 1.08, glow: "from-emerald-100 via-teal-50 to-white" },
    },
    cucharita: {
      "1m": { mainScale: 0.88, frontY: 10, frontRotate: -5, back1Scale: 0.8, back2Scale: 0.72, orbitScale: 0.9, pedestalScale: 0.9, glow: "from-lime-100 via-white to-emerald-50" },
      "6m": { mainScale: 1.0, frontY: 0, frontRotate: -1, back1Scale: 0.9, back2Scale: 0.8, orbitScale: 1.0, pedestalScale: 1.0, glow: "from-lime-100 via-white to-emerald-50" },
      "1y": { mainScale: 1.12, frontY: -6, frontRotate: 2, back1Scale: 0.98, back2Scale: 0.88, orbitScale: 1.08, pedestalScale: 1.08, glow: "from-emerald-100 via-lime-50 to-white" },
    },
  }

  return byMood[mood][stage]
}

function GrowthPreview({ plant }: { plant: Plant }) {
  const [stage, setStage] = useState<GrowthStageId>("1m")
  const selected = growthStages.find((item) => item.id === stage) ?? growthStages[0]
  const scene = growthSceneConfig(plant.growthMood, stage)

  return (
    <div className="mt-6 rounded-[1.8rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Simulación 3D de crecimiento
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950">
            Mira cómo podría evolucionar
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Vista referencial. El crecimiento puede variar según luz, riego, clima y cuidado.
          </p>
        </div>

        <div className="flex shrink-0 gap-2 rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-100">
          {growthStages.map((item) => (
            <button
              key={item.id}
              onClick={() => setStage(item.id)}
              className={[
                "rounded-full px-3 py-2 text-xs font-semibold transition",
                stage === item.id
                  ? "bg-emerald-950 text-white shadow-sm"
                  : "text-emerald-800 hover:bg-white",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br p-5 ring-1 ring-white/60 [perspective:1400px] sm:p-6">
          <div className={["absolute inset-0 bg-gradient-to-br opacity-90", scene.glow].join(" ")} />
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
            {selected.label}
          </div>
          <div className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm ring-1 ring-emerald-100">
            Vista 3D
          </div>

          <div className="relative z-10 flex h-[360px] items-center justify-center [transform-style:preserve-3d]">
            <div
              className="absolute h-52 w-52 rounded-full bg-white/60 blur-3xl"
              style={{ transform: `translate3d(0, -30px, -80px) scale(${scene.orbitScale})` }}
            />
            <div
              className="absolute h-64 w-64 rounded-full border border-white/70"
              style={{ transform: `rotateX(72deg) rotateZ(-8deg) scale(${scene.orbitScale}) translate3d(0, 115px, -10px)` }}
            />
            <div
              className="absolute h-72 w-72 rounded-full border border-emerald-200/80"
              style={{ transform: `rotateX(72deg) rotateZ(10deg) scale(${scene.orbitScale * 1.08}) translate3d(0, 105px, -30px)` }}
            />
            <div
              className="absolute h-14 w-56 rounded-full bg-emerald-950/12 blur-2xl"
              style={{ transform: `translate3d(0, 130px, -20px) scale(${scene.pedestalScale})` }}
            />
            <div
              className="absolute h-10 w-44 rounded-[999px] bg-white/70 ring-1 ring-emerald-100"
              style={{ transform: `rotateX(72deg) translate3d(0, 80px, 0) scale(${scene.pedestalScale})` }}
            />
            <img
              src={plant.image}
              alt=""
              aria-hidden="true"
              className="absolute max-h-[270px] max-w-[250px] object-contain opacity-15 blur-[6px]"
              style={{ transform: `translate3d(-44px, ${scene.frontY + 6}px, -110px) rotateY(30deg) scale(${scene.back2Scale})` }}
            />
            <img
              src={plant.image}
              alt=""
              aria-hidden="true"
              className="absolute max-h-[290px] max-w-[270px] object-contain opacity-25 blur-[3px]"
              style={{ transform: `translate3d(-20px, ${scene.frontY + 2}px, -60px) rotateY(18deg) scale(${scene.back1Scale})` }}
            />
            <img
              src={plant.image}
              alt={`${plant.name} crecimiento ${selected.label}`}
              className="relative max-h-[320px] max-w-[290px] object-contain drop-shadow-[0_18px_40px_rgba(5,46,22,0.24)] transition duration-500 ease-out"
              style={{
                transform: `translate3d(0, ${scene.frontY}px, 30px) rotateY(-14deg) rotateX(6deg) rotateZ(${scene.frontRotate}deg) scale(${scene.mainScale})`,
                transformStyle: "preserve-3d",
              }}
            />
          </div>

          <div className="relative z-10 mt-2 grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/85 p-3 ring-1 ring-emerald-100 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">Etapa</p>
              <p className="mt-1 text-sm font-semibold text-emerald-950">{selected.title}</p>
            </div>
            <div className="rounded-2xl bg-white/85 p-3 ring-1 ring-emerald-100 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">Enfoque</p>
              <p className="mt-1 text-sm font-semibold text-emerald-950">{selected.focus}</p>
            </div>
            <div className="rounded-2xl bg-white/85 p-3 ring-1 ring-emerald-100 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">Macetero</p>
              <p className="mt-1 text-sm font-semibold text-emerald-950">{plant.potSize}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-emerald-50 p-5 ring-1 ring-emerald-100 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {selected.label}
          </p>
          <h4 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950">
            {selected.note}
          </h4>
          <p className="mt-4 text-sm leading-7 text-zinc-700">
            {growthText(plant, stage)}
          </p>

          <div className="mt-5 rounded-[1.4rem] bg-white p-4 ring-1 ring-emerald-100">
            <p className="text-sm font-semibold text-emerald-950">Qué mirar en esta etapa</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              {growthCareHint(plant, stage)}
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-100">
              <span className="font-semibold text-emerald-900">Luz recomendada:</span>{" "}
              <span className="text-zinc-600">{lightLabel(plant.light)}</span>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-100">
              <span className="font-semibold text-emerald-900">Riego:</span>{" "}
              <span className="text-zinc-600">{plant.water}</span>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-100">
              <span className="font-semibold text-emerald-900">Cuidado:</span>{" "}
              <span className="text-zinc-600">{careLabel(plant.care)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function DetailView({
  plant,
  setView,
}: {
  plant: Plant
  setView: (view: View) => void
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <button
        onClick={() => setView("catalogo")}
        className="mb-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50"
      >
        ← Volver al catálogo
      </button>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white shadow-2xl shadow-emerald-200/50">
          <div className="relative min-h-[520px] bg-emerald-50 p-4">
            <img src={plant.image} alt={plant.name} className="h-full max-h-[680px] w-full object-contain" />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
              {plant.category}
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/70 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {plant.potSize}
            </span>
            <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-lime-100">
              Incluye guía de cuidado
            </span>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Detalle de planta</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">
                {plant.name}
              </h1>
              <p className="mt-3 text-base leading-7 text-zinc-600">{plant.short}</p>
            </div>
            <p className="shrink-0 rounded-full bg-emerald-950 px-4 py-2 text-base font-semibold text-white">
              {plant.price}
            </p>
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-emerald-50 p-5 ring-1 ring-emerald-100">
            <p className="text-sm font-semibold text-emerald-950">Historia de esta planta</p>
            <p className="mt-2 text-sm leading-7 text-zinc-700">{plant.story}</p>
          </div>

          <p className="mt-5 text-sm leading-7 text-zinc-600">{plant.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Luz</p>
              <p className="mt-1 text-xs font-semibold text-emerald-950">{lightLabel(plant.light)}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Riego</p>
              <p className="mt-1 text-xs font-semibold text-emerald-950">{plant.water}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Cuidado</p>
              <p className="mt-1 text-xs font-semibold text-emerald-950">{careLabel(plant.care)}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {plant.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-emerald-100 bg-white p-5">
            <p className="text-sm font-semibold text-emerald-950">Con tu compra te entregamos</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              Un instructivo simple con ubicación recomendada, frecuencia de riego y consejos para mantener tu planta bonita desde el primer día.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button href={whatsappLink(plant)} variant="green" className="w-full">Consultar por WhatsApp</Button>
            <Button href={BRAND.instagramUrl} variant="light" className="w-full">Ver Instagram</Button>
          </div>
        </div>
      </div>


      <GrowthPreview plant={plant} />
    </section>
  )
}

function HomeView({ setView, openDetail }: { setView: (view: View) => void; openDetail: (plant: Plant) => void }) {
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

          <div className="mt-5 rounded-[1.7rem] border border-emerald-100 bg-white/85 p-4 shadow-sm">
            <p className="text-sm font-semibold text-emerald-950">Elige tu próxima planta</p>
            <p className="mt-1 text-sm leading-6 text-zinc-600">Suculentas y plantas seleccionadas para decorar, regalar o darle vida a tu hogar.</p>
          </div>

          <div className="mt-4 rounded-[1.7rem] border border-emerald-100 bg-emerald-950 p-4 text-white shadow-lg shadow-emerald-900/10">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg">🌿</div>
              <div>
                <p className="text-sm font-semibold">Incluye instructivo de cuidado</p>
                <p className="mt-1 text-sm leading-6 text-emerald-50">
                  Con tu compra te entregamos una guía simple para saber dónde ponerla, cada cuánto regarla y cómo mantenerla bonita.
                </p>
              </div>
            </div>
          </div>

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
              <ProductTile key={plant.id} plant={plant} large={index === 0} onClick={() => openDetail(plant)} />
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.8rem] bg-emerald-950 p-5 text-white shadow-xl shadow-emerald-900/10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Nuevo stock</p>
              <p className="mt-2 text-xl font-semibold">Suculentas reales disponibles</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50">Elige entre modelos pequeños, decorativos y fáciles de cuidar.</p>
            </div>
            <div className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-emerald-100">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Cuidado incluido</p>
              <p className="mt-2 text-xl font-semibold text-emerald-950">Te llevas tu planta + guía</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Cada compra incluye un instructivo simple para cuidar mejor tu planta desde el primer día.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CatalogView({ openDetail }: { openDetail: (plant: Plant) => void }) {
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
        normalize(plant.potSize).includes(search) ||
        plant.tags.some((tag) => normalize(tag).includes(search))
      return matchesCategory && matchesSearch
    })
  }, [category, query])

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Catálogo</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">Plantas disponibles</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">Explora las plantas disponibles. Puedes abrir cada planta para ver su foto más grande, historia, cuidados y precio.</p>
        </div>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar planta o macetero..."
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
          <PlantCard key={plant.id} plant={plant} onOpen={openDetail} />
        ))}
      </div>
    </section>
  )
}

function RecommenderView({ openDetail }: { openDetail: (plant: Plant) => void }) {
  const [light, setLight] = useState<Light>("media")
  const [care, setCare] = useState<Care>("facil")
  const [useCase, setUseCase] = useState<UseCase>("principiante")

  const recommended = useMemo(() => {
    return [...plants]
      .map((plant) => ({ plant, score: scorePlant(plant, light, care, useCase) }))
      .sort((a, b) => b.score - a.score)
  }, [light, care, useCase])

  const topScore = recommended[0]?.score ?? 0
  const bestMatches = recommended.filter((item) => item.score >= topScore - 1).slice(0, 3)
  const otherOptions = recommended.filter((item) => item.score < topScore - 1).slice(0, 6)

  const lightText = light === "baja" ? "poca luz" : light === "media" ? "luz indirecta" : "mucha luz"
  const careText = care === "facil" ? "muy fácil cuidado" : "cuidado medio"
  const useText =
    useCase === "principiante"
      ? "empezar"
      : useCase === "decorar"
        ? "decorar"
        : useCase === "terraza"
          ? "terraza o exterior"
          : "regalar"

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-2xl shadow-emerald-200/60 backdrop-blur-xl sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Te ayudamos a elegir</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Elige según tu espacio.</h2>
            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Elige lo que más se parece a tu espacio y te mostramos opciones recomendadas.
            </p>

          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-5 sm:p-7">
            <p className="text-sm font-semibold text-emerald-950">Luz del lugar</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <SelectCard active={light === "baja"} title="Poca luz" subtitle="Interior suave." onClick={() => setLight("baja")} />
              <SelectCard active={light === "media"} title="Luz indirecta" subtitle="Claro, sin sol fuerte." onClick={() => setLight("media")} />
              <SelectCard active={light === "alta"} title="Mucha luz" subtitle="Terraza o exterior." onClick={() => setLight("alta")} />
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-950">Cuidado</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <SelectCard active={care === "facil"} title="Muy fácil" subtitle="Bajo riego." onClick={() => setCare("facil")} />
              <SelectCard active={care === "media"} title="Cuidado medio" subtitle="Puedo estar pendiente." onClick={() => setCare("media")} />
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-950">Uso</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <SelectCard active={useCase === "principiante"} title="Empezar" subtitle="Algo resistente." onClick={() => setUseCase("principiante")} />
              <SelectCard active={useCase === "decorar"} title="Decorar" subtitle="Que se vea linda." onClick={() => setUseCase("decorar")} />
              <SelectCard active={useCase === "terraza"} title="Exterior" subtitle="Terraza." onClick={() => setUseCase("terraza")} />
              <SelectCard active={useCase === "regalo"} title="Regalar" subtitle="Simple y bonita." onClick={() => setUseCase("regalo")} />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Resultado</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950">
            Estas plantas calzan mejor con tus elecciones
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">Opciones ordenadas según tus elecciones. Para confirmar stock y entrega, escríbenos por WhatsApp.</p>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-xl font-semibold tracking-tight text-emerald-950">Mejor calce</h3>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bestMatches.map(({ plant }) => <PlantCard key={plant.id} plant={plant} compact onOpen={openDetail} />)}
          </div>
        </div>

        {otherOptions.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-emerald-950">También podrían servirte</h3>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {otherOptions.map(({ plant }) => <PlantCard key={plant.id} plant={plant} compact onOpen={openDetail} />)}
            </div>
          </div>
        )}
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
  const [selectedPlantId, setSelectedPlantId] = useState(plants[0]?.id ?? "")

  const selectedPlant = plants.find((plant) => plant.id === selectedPlantId) ?? plants[0]

  function openDetail(plant: Plant) {
    setSelectedPlantId(plant.id)
    setView("detalle")
  }

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
              <img src={BRAND.logo} alt="Logo Plantas Mary" className="h-full w-full object-cover" />
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
          <NavButton active={view === "catalogo" || view === "detalle"} onClick={() => setView("catalogo")}>Catálogo</NavButton>
          <NavButton active={view === "elegir"} onClick={() => setView("elegir")}>Elegir</NavButton>
          <NavButton active={view === "entrega"} onClick={() => setView("entrega")}>Entrega</NavButton>
        </div>
      </header>

      <div className="relative">
        {view === "inicio" && <HomeView setView={setView} openDetail={openDetail} />}
        {view === "catalogo" && <CatalogView openDetail={openDetail} />}
        {view === "elegir" && <RecommenderView openDetail={openDetail} />}
        {view === "detalle" && selectedPlant && <DetailView plant={selectedPlant} setView={setView} />}
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
