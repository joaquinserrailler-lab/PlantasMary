"use client"

import type { ReactNode } from "react"
import { useMemo, useState, useRef, useEffect } from "react"

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
  image: string
  light: Light
  water: "Bajo" | "Medio"
  care: Care
  bestFor: UseCase[]
  tags: string[]
  badge: string
  available?: boolean
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
    image: "/suculenta-haworthia-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["principiante", "decorar", "regalo"],
    tags: ["Bajo riego", "Fácil", "Interior"],
    badge: "Disponible",
    available: true,
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
    image: "/suculenta-orejitas.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo", "principiante"],
    tags: ["Interior", "Regalo", "Decorativa"],
    badge: "Nueva",
    available: true,
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
    image: "/suculenta-rosada.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Decorativa", "Color suave", "Bajo riego"],
    badge: "Especial",
    available: true,
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
    image: "/suculenta-haworthia-clara.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["principiante", "decorar"],
    tags: ["Fácil", "Bajo riego", "Compacta"],
    badge: "Fácil",
    available: true,
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
    image: "/suculenta-haworthia-cebra.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "principiante"],
    tags: ["Moderna", "Resistente", "Bajo riego"],
    badge: "Top",
    available: true,
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
    image: "/suculenta-dorada.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar", "regalo"],
    tags: ["Buena luz", "Exterior", "Color claro"],
    badge: "Exterior",
    available: true,
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
    image: "/suculenta-vertical.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar"],
    tags: ["Vertical", "Luminosa", "Bajo riego"],
    badge: "Destacada",
    available: true,
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
    image: "/suculenta-mini-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["regalo", "decorar", "principiante"],
    tags: ["Decorativa", "Regalo", "Interior"],
    badge: "Mini",
    available: true,
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
    image: "/suculenta-echeveria-clara.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Elegante", "Interior", "Bajo riego"],
    badge: "Favorita",
    available: true,
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
    image: "/suculenta-rosario.webp",
    light: "media",
    water: "Bajo",
    care: "media",
    bestFor: ["decorar", "regalo"],
    tags: ["Colgante", "Decorativa", "Luz indirecta"],
    badge: "Nueva",
    available: false,
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
    image: "/suculenta-jade.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo", "principiante"],
    tags: ["Interior", "Decorativa", "Fácil"],
    badge: "Nueva",
    available: true,
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
    image: "/suculenta-roseta-gris.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["regalo", "decorar"],
    tags: ["Roseta", "Decorativa", "Bajo riego"],
    badge: "Nueva",
    available: true,
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
    image: "/planta-cucharita-11cm.webp",
    light: "media",
    water: "Medio",
    care: "media",
    bestFor: ["decorar", "regalo"],
    tags: ["Macetero 11 cm", "Interior", "Decorativa"],
    badge: "11 cm",
    available: true,
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
    image: "/suculenta-echeveria-verde.webp",
    light: "media",
    water: "Bajo",
    care: "facil",
    bestFor: ["decorar", "regalo"],
    tags: ["Echeveria", "Decorativa", "Bajo riego"],
    badge: "Nueva",
    available: true,
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
    image: "/suculenta-sedum-verde.webp",
    light: "alta",
    water: "Bajo",
    care: "facil",
    bestFor: ["terraza", "decorar"],
    tags: ["Buena luz", "Bajo riego", "Exterior"],
    badge: "Nueva",
    available: true,
  },
]

const categories: Category[] = ["Todas", "Interior", "Exterior", "Fácil cuidado"]

function whatsappLink(plant?: Plant) {
  const message = plant
    ? `Hola, quiero consultar por ${plant.name} (${plant.potSize}) a ${plant.price} de Plantas Mary. ¿Hay stock disponible? También me interesa el instructivo de cuidado.`
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
        {plant.available === false && (
          <div className="absolute inset-0 flex items-end justify-center bg-white/60 pb-4 backdrop-blur-[2px]">
            <span className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white shadow">Sin stock</span>
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
          {plant.available !== false ? (
            <Button href={whatsappLink(plant)} variant="green" className="w-full">Consultar</Button>
          ) : (
            <Button href={whatsappLink(plant)} variant="light" className="w-full">Consultar stock</Button>
          )}
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


function PlantViewer({ plant, isAvailable }: { plant: Plant; isAvailable: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const infoPanelRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ mx: 0, my: 0, lx: 0, ly: 0 })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    function onMove(e: MouseEvent) {
      const r = stage!.getBoundingClientRect()
      mouseRef.current.mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      mouseRef.current.my = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (cursorRef.current) {
        cursorRef.current.style.left = (e.clientX - r.left) + "px"
        cursorRef.current.style.top = (e.clientY - r.top) + "px"
        cursorRef.current.style.opacity = "1"
      }
      if (hintRef.current) hintRef.current.style.opacity = "0"
    }

    function onLeave() {
      mouseRef.current.mx = 0
      mouseRef.current.my = 0
      if (cursorRef.current) cursorRef.current.style.opacity = "0"
    }

    function tick() {
      const m = mouseRef.current
      m.lx += (m.mx - m.lx) * 0.07
      m.ly += (m.my - m.ly) * 0.07
      const lx = m.lx, ly = m.ly

      if (bgRef.current) bgRef.current.style.transform = `translate(${lx * -14}px, ${ly * -10}px)`
      if (shadowRef.current) shadowRef.current.style.transform = `translate(${lx * 9}px, ${ly * 6}px)`
      if (imgRef.current) imgRef.current.style.transform = `perspective(900px) rotateY(${lx * 7}deg) rotateX(${-ly * 5}deg) scale(1.04) translate(${lx * 16}px, ${ly * 10}px)`
      if (infoPanelRef.current) infoPanelRef.current.style.transform = `translate(${lx * -7}px, ${ly * -5}px)`
      if (badgeRef.current) badgeRef.current.style.transform = `translate(${lx * -10}px, ${ly * -7}px)`

      rafRef.current = requestAnimationFrame(tick)
    }

    stage.addEventListener("mousemove", onMove)
    stage.addEventListener("mouseleave", onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      stage.removeEventListener("mousemove", onMove)
      stage.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative overflow-hidden rounded-[2.5rem]"
      style={{
        minHeight: "520px",
        background: "radial-gradient(ellipse 85% 65% at 50% 65%, #1a3d20 0%, #0a1a0e 100%)",
        cursor: "none",
      }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 rounded-[2.5rem]"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 55%, #1e4a25 0%, transparent 70%)",
          transition: "transform 0.12s ease-out",
        }}
      />

      <div
        ref={shadowRef}
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "50%",
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(0,0,0,0.65) 0%, transparent 100%)",
          transition: "transform 0.1s ease-out",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          ref={imgRef}
          src={plant.image}
          alt={plant.name}
          className={isAvailable ? "" : "opacity-40 grayscale"}
          style={{
            maxHeight: "82%",
            maxWidth: "70%",
            objectFit: "contain",
            display: "block",
            filter: isAvailable
              ? "drop-shadow(0 16px 40px rgba(0,0,0,0.6)) drop-shadow(0 3px 10px rgba(0,0,0,0.45))"
              : "grayscale(1) drop-shadow(0 8px 20px rgba(0,0,0,0.4))",
            willChange: "transform",
            transition: "transform 0.07s ease-out",
          }}
        />
      </div>

      <div ref={badgeRef} className="absolute left-5 top-5" style={{ transition: "transform 0.08s ease-out" }}>
        <span
          className="rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.9)",
            border: "0.5px solid rgba(255,255,255,0.18)",
          }}
        >
          {plant.category}
        </span>
      </div>

      {!isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-white/90 px-6 py-4 text-center shadow-xl backdrop-blur-sm">
            <p className="text-lg font-semibold text-zinc-700">Sin stock</p>
            <p className="mt-1 text-sm text-zinc-500">Consulta disponibilidad futura</p>
          </div>
        </div>
      )}

      <div
        ref={infoPanelRef}
        className="absolute bottom-5 left-5 right-5 flex gap-2"
        style={{ transition: "transform 0.08s ease-out" }}
      >
        {[
          { label: "Luz", value: plant.light === "baja" ? "Poca luz" : plant.light === "media" ? "Luz indirecta" : "Mucha luz" },
          { label: "Riego", value: plant.water },
          { label: "Cuidado", value: plant.care === "facil" ? "Muy fácil" : "Media" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 rounded-2xl px-3 py-2 text-center backdrop-blur-md"
            style={{ background: "rgba(0,0,0,0.45)", border: "0.5px solid rgba(255,255,255,0.1)" }}
          >
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginBottom: "2px" }}>{label}</p>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>{value}</p>
          </div>
        ))}
        <div
          className="rounded-2xl px-4 py-2 text-center backdrop-blur-md"
          style={{ background: "rgba(20,90,35,0.7)", border: "0.5px solid rgba(80,180,100,0.25)" }}
        >
          <p style={{ fontSize: "10px", color: "rgba(167,240,184,0.7)", marginBottom: "2px" }}>Precio</p>
          <p style={{ fontSize: "16px", fontWeight: 500, color: "#7df09a", whiteSpace: "nowrap" }}>{plant.price}</p>
        </div>
      </div>

      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: "28px",
          height: "28px",
          border: "1.5px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.2s",
        }}
      >
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
      </div>

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          bottom: "60px",
          right: "18px",
          fontSize: "10px",
          color: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
          transition: "opacity 0.4s",
        }}
      >
        mueve el cursor
      </div>
    </div>
  )
}

function DetailView({
  plant,
  allPlants,
  setView,
  openDetail,
}: {
  plant: Plant
  allPlants: Plant[]
  setView: (view: View) => void
  openDetail: (plant: Plant) => void
}) {
  const currentIndex = allPlants.findIndex((p) => p.id === plant.id)
  const prevPlant = currentIndex > 0 ? allPlants[currentIndex - 1] : null
  const nextPlant = currentIndex < allPlants.length - 1 ? allPlants[currentIndex + 1] : null
  const isAvailable = plant.available !== false

  const [copied, setCopied] = useState(false)

  function copyLink() {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("planta", plant.id)
      navigator.clipboard.writeText(url.toString()).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          onClick={() => setView("catalogo")}
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50"
        >
          ← Volver al catálogo
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50"
          >
            {copied ? "✓ Link copiado" : "Compartir"}
          </button>
          <button
            onClick={() => prevPlant && openDetail(prevPlant)}
            disabled={!prevPlant}
            title={prevPlant ? `Anterior: ${prevPlant.name}` : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ←
          </button>
          <span className="text-xs text-zinc-400">{currentIndex + 1} / {allPlants.length}</span>
          <button
            onClick={() => nextPlant && openDetail(nextPlant)}
            disabled={!nextPlant}
            title={nextPlant ? `Siguiente: ${nextPlant.name}` : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={["overflow-hidden rounded-[2.5rem] border shadow-2xl", isAvailable ? "border-emerald-100 shadow-emerald-200/50" : "border-zinc-200 shadow-zinc-200/50"].join(" ")}>
          <PlantViewer plant={plant} isAvailable={isAvailable} />
        </div>

        <div className="rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/70 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {plant.potSize}
            </span>
            <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-lime-100">
              Incluye guía de cuidado
            </span>
            {!isAvailable && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200">
                Sin stock
              </span>
            )}
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
            {isAvailable ? (
              <Button href={whatsappLink(plant)} variant="green" className="w-full">Consultar por WhatsApp</Button>
            ) : (
              <Button href={whatsappLink(plant)} variant="light" className="w-full">Consultar disponibilidad futura</Button>
            )}
            <Button href={BRAND.instagramUrl} variant="light" className="w-full">Ver Instagram</Button>
          </div>

          {(prevPlant || nextPlant) && (
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-emerald-100 pt-5">
              {prevPlant ? (
                <button
                  onClick={() => openDetail(prevPlant)}
                  className="flex flex-col items-start rounded-2xl bg-emerald-50 p-3 text-left transition hover:bg-emerald-100 ring-1 ring-emerald-100"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">← Anterior</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-950 leading-tight">{prevPlant.name}</p>
                  <p className="text-xs text-zinc-500">{prevPlant.price}</p>
                </button>
              ) : <div />}
              {nextPlant ? (
                <button
                  onClick={() => openDetail(nextPlant)}
                  className="flex flex-col items-end rounded-2xl bg-emerald-50 p-3 text-right transition hover:bg-emerald-100 ring-1 ring-emerald-100"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">Siguiente →</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-950 leading-tight">{nextPlant.name}</p>
                  <p className="text-xs text-zinc-500">{nextPlant.price}</p>
                </button>
              ) : <div />}
            </div>
          )}
        </div>
      </div>
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

      <div className="mt-7 flex items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
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
        <p className="shrink-0 text-sm text-zinc-500">
          {filteredPlants.length} {filteredPlants.length === 1 ? "planta" : "plantas"}
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlants.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-[2rem] border border-emerald-100 bg-white py-20 text-center shadow-sm">
            <p className="text-4xl">🌿</p>
            <p className="mt-4 text-lg font-semibold text-emerald-950">Sin resultados</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
              No encontramos plantas que coincidan con <span className="font-semibold">"{query}"</span>. Prueba con otro nombre o borra el filtro.
            </p>
            <button
              onClick={() => { setQuery(""); setCategory("Todas") }}
              className="mt-5 rounded-full bg-emerald-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Ver todas las plantas
            </button>
          </div>
        ) : (
          filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onOpen={openDetail} />
          ))
        )}
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

  const resultKey = `${light}-${care}-${useCase}`

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

        <div key={resultKey} className="mt-6 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-5 transition-all duration-300">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Resultado</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950">
            Estas plantas calzan mejor con tus elecciones
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">Opciones ordenadas según tus elecciones. Para confirmar stock y entrega, escríbenos por WhatsApp.</p>
        </div>

        <div key={resultKey + "-results"} className="mt-6">
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
  const getInitialState = (): { view: View; plantId: string } => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const plantaParam = params.get("planta")
      if (plantaParam && plants.find((p) => p.id === plantaParam)) {
        return { view: "detalle", plantId: plantaParam }
      }
    }
    return { view: "inicio", plantId: plants[0]?.id ?? "" }
  }

  const initial = getInitialState()
  const [view, setView] = useState<View>(initial.view)
  const [selectedPlantId, setSelectedPlantId] = useState(initial.plantId)

  const selectedPlant = plants.find((plant) => plant.id === selectedPlantId) ?? plants[0]

  function openDetail(plant: Plant) {
    setSelectedPlantId(plant.id)
    setView("detalle")
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("planta", plant.id)
      window.history.pushState({}, "", url.toString())
    }
  }

  function handleSetView(v: View) {
    setView(v)
    if (v !== "detalle" && typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.delete("planta")
      window.history.pushState({}, "", url.toString())
    }
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
          <button onClick={() => handleSetView("inicio")} className="flex items-center gap-3 text-left">
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
          <NavButton active={view === "inicio"} onClick={() => handleSetView("inicio")}>Inicio</NavButton>
          <NavButton active={view === "catalogo" || view === "detalle"} onClick={() => handleSetView("catalogo")}>Catálogo</NavButton>
          <NavButton active={view === "elegir"} onClick={() => handleSetView("elegir")}>Elegir</NavButton>
          <NavButton active={view === "entrega"} onClick={() => handleSetView("entrega")}>Entrega</NavButton>
        </div>
      </header>

      <div className="relative">
        {view === "inicio" && <HomeView setView={handleSetView} openDetail={openDetail} />}
        {view === "catalogo" && <CatalogView openDetail={openDetail} />}
        {view === "elegir" && <RecommenderView openDetail={openDetail} />}
        {view === "detalle" && selectedPlant && <DetailView plant={selectedPlant} allPlants={plants} setView={handleSetView} openDetail={openDetail} />}
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
 
