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
        "pm-organic-card group overflow-hidden rounded-[1.8rem] border border-emerald-100 bg-white text-left shadow-sm transition duration-500 hover:shadow-2xl hover:shadow-emerald-200/70",
        large ? "col-span-2 sm:col-span-1" : "",
      ].join(" ")}
    >
      <div className={large ? "relative h-64 overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-white sm:h-72" : "relative h-56 overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-white sm:h-64"}>
        <div className="absolute inset-4 rounded-[1.5rem] border border-white/80 opacity-0 transition duration-500 group-hover:opacity-100" />
        <img src={plant.image} alt={plant.name} className="h-full w-full object-contain p-3 transition duration-700 ease-out group-hover:scale-108" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
          {plant.category}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
          Ver detalle
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-emerald-950">{plant.name}</h3>
            <p className="mt-1 text-xs text-zinc-500">{plant.potSize}</p>
          </div>
          <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800 ring-1 ring-emerald-100">{plant.price}</p>
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
        "pm-organic-card group overflow-hidden rounded-[2.2rem] border border-emerald-100 bg-white shadow-sm transition duration-500 hover:shadow-2xl hover:shadow-emerald-200/70",
        onOpen ? "cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-100" : "",
      ].join(" ")}
    >
      <div className={compact ? "relative h-72 overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-white" : "relative h-96 overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-white"}>
        <div className="absolute inset-5 rounded-[1.7rem] border border-white/80 opacity-0 transition duration-500 group-hover:opacity-100" />
        <img src={plant.image} alt={plant.name} className="h-full w-full object-contain p-4 transition duration-700 ease-out group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
          {plant.category}
        </div>
        {onOpen && (
          <div className="absolute bottom-4 right-4 rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white shadow-sm transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:translate-x-2 sm:opacity-0">
            Ver detalle
          </div>
        )}
      </div>

      <div className={compact ? "p-5" : "p-6"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">{plant.name}</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-500">{plant.short}</p>
            <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {plant.potSize}
            </p>
          </div>
          <p className="shrink-0 rounded-full bg-emerald-950 px-3 py-1 text-sm font-semibold text-white">{plant.price}</p>
        </div>

        {!compact && <p className="mt-4 text-sm leading-7 text-zinc-600">{plant.description}</p>}

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500">Luz</p>
            <p className="mt-1 text-xs font-semibold text-emerald-950">{lightLabel(plant.light)}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500">Riego</p>
            <p className="mt-1 text-xs font-semibold text-emerald-950">{plant.water}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500">Cuidado</p>
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
            className="mt-4 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100 transition hover:bg-emerald-50"
          >
            Ver foto, historia y detalles
          </button>
        )}

        <div onClick={(event) => event.stopPropagation()} className="mt-5 grid gap-2 sm:grid-cols-2">
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




function BoutiqueStyles() {
  return (
    <style>{`
      @keyframes pmFloatLeaf {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(14px, -18px, 0) rotate(9deg); }
      }

      @keyframes pmFloatLeafReverse {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(-16px, 16px, 0) rotate(-10deg); }
      }

      @keyframes pmFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pmSoftPulse {
        0%, 100% { opacity: .55; transform: scale(1); }
        50% { opacity: .9; transform: scale(1.08); }
      }

      .pm-fade-up {
        animation: pmFadeUp .75s ease both;
      }

      .pm-fade-delay-1 { animation-delay: .08s; }
      .pm-fade-delay-2 { animation-delay: .16s; }
      .pm-fade-delay-3 { animation-delay: .24s; }

      .pm-leaf {
        position: absolute;
        width: 42px;
        height: 70px;
        border-radius: 70% 20% 70% 20%;
        background: linear-gradient(135deg, rgba(22, 101, 52, .16), rgba(132, 204, 22, .22));
        filter: blur(.1px);
        pointer-events: none;
      }

      .pm-organic-card {
        transform: translateZ(0);
      }

      .pm-organic-card:hover {
        transform: translateY(-6px) rotate(-.35deg);
      }

      @supports (animation-timeline: view()) {
        .pm-scroll-reveal {
          opacity: 0;
          transform: translateY(22px);
          animation: pmFadeUp linear both;
          animation-timeline: view();
          animation-range: entry 12% cover 28%;
        }
      }
    `}</style>
  )
}

function FloatingLeaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="pm-leaf left-[6%] top-[12%] opacity-70" style={{ animation: "pmFloatLeaf 8s ease-in-out infinite" }} />
      <span className="pm-leaf right-[12%] top-[18%] h-14 w-9 opacity-60" style={{ animation: "pmFloatLeafReverse 9s ease-in-out infinite" }} />
      <span className="pm-leaf bottom-[18%] left-[14%] h-16 w-10 opacity-50" style={{ animation: "pmFloatLeafReverse 11s ease-in-out infinite" }} />
      <span className="pm-leaf bottom-[10%] right-[8%] opacity-55" style={{ animation: "pmFloatLeaf 10s ease-in-out infinite" }} />
    </div>
  )
}

function StatsBar() {
  const stats = [
    { value: String(plants.length), label: "plantas disponibles" },
    { value: "Desde $1.000", label: "opciones para regalar" },
    { value: "2", label: "puntos de entrega en Maipú" },
    { value: "100%", label: "incluyen guía de cuidado" },
  ]

  return (
    <div className="pm-scroll-reveal grid overflow-hidden rounded-[2rem] border border-emerald-100 bg-white/85 shadow-sm backdrop-blur md:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={[
            "p-5",
            index !== stats.length - 1 ? "border-b border-emerald-100 md:border-b-0 md:border-r" : "",
          ].join(" ")}
        >
          <p className="text-3xl font-semibold tracking-tight text-emerald-950">{stat.value}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function EditorialDivider() {
  return (
    <div className="mx-auto my-10 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
      <div className="h-px flex-1 bg-emerald-100" />
      <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 ring-1 ring-emerald-100">
        Plantas Mary
      </div>
      <div className="h-px flex-1 bg-emerald-100" />
    </div>
  )
}

function TrustStrip() {
  const items = [
    { title: "Entrega en Maipú", text: "Domicilio y Metro Plaza Maipú.", icon: "📍" },
    { title: "Guía incluida", text: "Te damos instrucciones simples de cuidado.", icon: "🌿" },
    { title: "Compra directa", text: "Consulta stock por WhatsApp o Instagram.", icon: "💬" },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-[1.5rem] border border-emerald-100 bg-white/85 p-4 shadow-sm backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-lg ring-1 ring-emerald-100">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-950">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text?: string
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{title}</h2>
      {text && <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">{text}</p>}
    </div>
  )
}

function CollectionCard({
  title,
  text,
  plant,
  onClick,
}: {
  title: string
  text: string
  plant: Plant
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-[2rem] border border-emerald-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-200/60"
    >
      <div className="relative h-48 overflow-hidden bg-emerald-50">
        <img src={plant.image} alt={plant.name} className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
          Explorar
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold tracking-tight text-emerald-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
      </div>
    </button>
  )
}

function HowToBuySection({ setView }: { setView: (view: View) => void }) {
  const steps = [
    {
      title: "Elige tu planta",
      text: "Revisa el catálogo o usa el recomendador para encontrar una opción que calce con tu espacio.",
    },
    {
      title: "Consulta stock",
      text: "Escríbenos por WhatsApp para confirmar disponibilidad, tamaño del macetero y forma de entrega.",
    },
    {
      title: "Recíbela con guía",
      text: "Con tu compra te entregamos un instructivo simple para cuidarla desde el primer día.",
    },
  ]

  return (
    <section className="mt-12 rounded-[2.5rem] border border-emerald-100 bg-white/80 p-5 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Comprar fácil"
          title="De la foto a tu hogar en pocos pasos"
          text="Queremos que comprar una planta sea simple, claro y sin vueltas."
        />
        <Button onClick={() => setView("catalogo")} variant="dark" className="w-full md:w-auto">Ver plantas</Button>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-[1.7rem] bg-emerald-50 p-5 ring-1 ring-emerald-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-950 text-sm font-bold text-white">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-emerald-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CarePromiseCard() {
  return (
    <div className="rounded-[2rem] bg-emerald-950 p-6 text-white shadow-xl shadow-emerald-900/10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Valor agregado</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">Tu planta no llega sola</h3>
      <p className="mt-3 text-sm leading-7 text-emerald-50">
        Cada compra incluye una guía simple de cuidado: ubicación recomendada, riego, señales de alerta y consejos para mantenerla bonita.
      </p>
      <div className="mt-5 grid gap-2 text-sm">
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">✓ Consejos de luz y riego</div>
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">✓ Recomendaciones para principiantes</div>
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">✓ Apoyo por WhatsApp si tienes dudas</div>
      </div>
    </div>
  )
}

function RelatedPlants({
  plant,
  openDetail,
}: {
  plant: Plant
  openDetail: (plant: Plant) => void
}) {
  const related = [...plants]
    .filter((item) => item.id !== plant.id)
    .sort((a, b) => {
      const score = (item: Plant) =>
        (item.category === plant.category ? 3 : 0) +
        (item.light === plant.light ? 2 : 0) +
        (item.care === plant.care ? 2 : 0)
      return score(b) - score(a)
    })
    .slice(0, 3)

  return (
    <section className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader eyebrow="También podría gustarte" title="Opciones parecidas" />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {related.map((item) => (
          <ProductTile key={item.id} plant={item} onClick={() => openDetail(item)} />
        ))}
      </div>
    </section>
  )
}

function DetailView({
  plant,
  setView,
  openDetail,
}: {
  plant: Plant
  setView: (view: View) => void
  openDetail: (plant: Plant) => void
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
          <div className="relative min-h-[560px] bg-gradient-to-br from-emerald-50 via-lime-50 to-white p-4">
            <img src={plant.image} alt={plant.name} className="h-full max-h-[720px] w-full object-contain" />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
              {plant.category}
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.6rem] bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold text-emerald-950">Foto real del producto</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">Puedes consultar por WhatsApp para confirmar stock antes de comprar.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/70 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {plant.potSize}
            </span>
            <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-lime-100">
              Guía de cuidado incluida
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

          <div className="mt-5 rounded-[1.6rem] border border-emerald-100 bg-white p-5">
            <p className="text-sm font-semibold text-emerald-950">Por qué puede gustarte</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {plant.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[1.6rem] bg-emerald-950 p-5 text-white">
            <p className="text-sm font-semibold">Con tu compra te entregamos</p>
            <p className="mt-2 text-sm leading-7 text-emerald-50">
              Un instructivo simple con ubicación recomendada, frecuencia de riego y consejos para mantener tu planta bonita desde el primer día.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button href={whatsappLink(plant)} variant="green" className="w-full">Consultar por WhatsApp</Button>
            <Button href={BRAND.instagramUrl} variant="light" className="w-full">Ver Instagram</Button>
          </div>
        </div>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Cuidado</p>
          <h3 className="mt-2 text-xl font-semibold text-emerald-950">Ubicación</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Busca un lugar con {lightLabel(plant.light).toLowerCase()} y evita cambios bruscos durante los primeros días.</p>
        </div>
        <div className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Riego</p>
          <h3 className="mt-2 text-xl font-semibold text-emerald-950">Menos es más</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Riego {plant.water.toLowerCase()}. Revisa que el sustrato esté seco antes de volver a regar.</p>
        </div>
        <div className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Compra</p>
          <h3 className="mt-2 text-xl font-semibold text-emerald-950">Confirma stock</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Escríbenos por WhatsApp y coordinamos stock, entrega y detalles de la planta.</p>
        </div>
      </section>

      <RelatedPlants plant={plant} openDetail={openDetail} />
    </section>
  )
}



function HomeView({ setView, openDetail }: { setView: (view: View) => void; openDetail: (plant: Plant) => void }) {
  const heroPlant = plants.find((plant) => plant.id === "cucharita") ?? plants[0]
  const featured = plants.slice(0, 6)
  const collections = [
    {
      title: "Interior luminoso",
      text: "Para escritorios, repisas y rincones con luz indirecta.",
      plant: plants.find((plant) => plant.id === "jade") ?? plants[1],
    },
    {
      title: "Fácil cuidado",
      text: "Para empezar con una planta resistente y bonita.",
      plant: plants.find((plant) => plant.id === "haworthia-cebra") ?? plants[0],
    },
    {
      title: "Para regalar",
      text: "Detalles vivos con guía de cuidado incluida.",
      plant: plants.find((plant) => plant.id === "roseta-gris") ?? plants[2],
    },
  ]

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
      <FloatingLeaves />

      <div className="relative grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="pm-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm ring-1 ring-emerald-100 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" style={{ animation: "pmSoftPulse 2.6s ease-in-out infinite" }} />
            Boutique de plantas en Maipú
          </div>

          <h1
            className="max-w-3xl text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.07em] text-emerald-950 sm:text-7xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Dale vida a lo cotidiano.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Plantas reales, seleccionadas con cariño, para transformar pequeños rincones en espacios más frescos, naturales y acogedores.
          </p>

          <div className="mt-7 grid gap-3 sm:flex">
            <Button onClick={() => setView("catalogo")} variant="dark" className="w-full sm:w-auto">Ver catálogo</Button>
            <Button onClick={() => setView("elegir")} variant="light" className="w-full sm:w-auto">Te ayudamos a elegir</Button>
          </div>
        </div>

        <div className="pm-fade-up pm-fade-delay-1 relative">
          <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full bg-emerald-200/60 blur-3xl" />
          <div className="absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-lime-200/60 blur-3xl" />

          <button
            onClick={() => openDetail(heroPlant)}
            className="group relative w-full overflow-hidden rounded-[3rem] border border-emerald-100 bg-white p-4 text-left shadow-2xl shadow-emerald-200/70 transition duration-500 hover:-translate-y-1 hover:shadow-emerald-300/70"
          >
            <div className="relative h-[460px] overflow-hidden rounded-[2.35rem] bg-gradient-to-br from-emerald-50 via-lime-50 to-white">
              <div className="absolute inset-6 rounded-[2rem] border border-white/80" />
              <img src={heroPlant.image} alt={heroPlant.name} className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-105" />
              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
                Destacada
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.7rem] bg-white/90 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-emerald-950">{heroPlant.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{heroPlant.short}</p>
                  </div>
                  <p className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white">{heroPlant.price}</p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="relative mt-10">
        <StatsBar />
      </div>

      <section className="pm-scroll-reveal mt-14">
        <SectionHeader
          eyebrow="Colecciones"
          title="Elige según tu espacio"
          text="Una forma más simple de partir: piensa dónde irá la planta y qué tan fácil quieres que sea cuidarla."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.title}
              title={collection.title}
              text={collection.text}
              plant={collection.plant}
              onClick={() => setView("catalogo")}
            />
          ))}
        </div>
      </section>

      <EditorialDivider />

      <section className="pm-scroll-reveal">
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Disponibles"
            title="Favoritas de la semana"
            text="Cards más visuales: toca una planta para ver su foto grande, historia, cuidados y opciones parecidas."
          />
          <button onClick={() => setView("catalogo")} className="hidden shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-50 sm:inline-flex">
            Ver todas
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((plant, index) => (
            <ProductTile key={plant.id} plant={plant} large={index === 0} onClick={() => openDetail(plant)} />
          ))}
        </div>
      </section>

      <div className="pm-scroll-reveal mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <CarePromiseCard />
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Entrega</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950">Retiro y entrega coordinada</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Coordinamos por WhatsApp para entrega en nuestro domicilio en Maipú o en Metro Plaza Maipú. Así confirmas stock, horario y detalles antes de comprar.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setView("entrega")} variant="dark">Ver método de entrega</Button>
            <Button href={whatsappLink()} variant="light">Consultar stock</Button>
          </div>
        </div>
      </div>

      <HowToBuySection setView={setView} />
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
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">Explora las plantas disponibles. Toca cualquier tarjeta para ver la foto grande, historia, cuidados, precio y opciones parecidas.</p>
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
      className="min-h-screen overflow-x-hidden bg-[#f6faf1] text-zinc-950"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", sans-serif' }}
    >
      <BoutiqueStyles />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute right-[-12rem] top-[20rem] h-[30rem] w-[30rem] rounded-full bg-lime-200/50 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/70 bg-[#f6faf1]/90 backdrop-blur-2xl">
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
        {view === "detalle" && selectedPlant && <DetailView plant={selectedPlant} setView={setView} openDetail={openDetail} />}
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
