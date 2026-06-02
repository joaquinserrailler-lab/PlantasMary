"use client"

import { useMemo, useState } from "react"

type Goal = "energia" | "dormir" | "relajar" | "digestion" | "concentracion" | "muscular" | "estres" | "habitos"
type Risk = "menor" | "medicamentos" | "embarazo" | "alergias" | "cafeina" | "higado" | "rinon" | "tiroides" | "presion" | "digestivo" | "ninguna"
type Evidence = "Alta" | "Media-Alta" | "Media" | "Baja-Media" | "Limitada"

type Source = {
  label: string
  url: string
}

type NaturalOption = {
  id: string
  name: string
  category: string
  description: string
  evidence: Evidence
  goals: Partial<Record<Goal, number>>
  bestFor: string[]
  why: string
  commonUse: string
  safety: string
  foodFirst?: string
  alternatives: string[]
  avoidIf?: Risk[]
  cautionIf?: Risk[]
  sources: Source[]
}

const goals: Array<{ id: Goal; title: string; subtitle: string; icon: string }> = [
  { id: "energia", title: "Más energía", subtitle: "Cansancio, baja vitalidad o falta de ánimo.", icon: "⚡" },
  { id: "dormir", title: "Dormir mejor", subtitle: "Conciliar el sueño o regular horarios.", icon: "🌙" },
  { id: "relajar", title: "Relajarme", subtitle: "Bajar tensión o sentir más calma.", icon: "🍃" },
  { id: "digestion", title: "Mejor digestión", subtitle: "Regularidad, náuseas leves o malestar digestivo.", icon: "🌿" },
  { id: "concentracion", title: "Concentrarme", subtitle: "Foco, claridad mental y rutina.", icon: "🎯" },
  { id: "muscular", title: "Molestia muscular", subtitle: "Apoyo general para recuperación y función muscular.", icon: "💪" },
  { id: "estres", title: "Estrés", subtitle: "Apoyo suave para momentos de tensión.", icon: "🧘" },
  { id: "habitos", title: "Hábitos saludables", subtitle: "Opciones simples para mejorar la rutina.", icon: "✨" },
]

const risks: Array<{ id: Risk; label: string; description: string }> = [
  { id: "menor", label: "Soy menor de edad", description: "Suplementos y extractos requieren especial cuidado." },
  { id: "medicamentos", label: "Tomo medicamentos", description: "Puede haber interacciones." },
  { id: "embarazo", label: "Estoy embarazada o lactando", description: "Requiere orientación profesional." },
  { id: "alergias", label: "Tengo alergias alimentarias o a plantas", description: "Algunas hierbas pueden causar reacciones." },
  { id: "cafeina", label: "Evito cafeína", description: "Filtraremos opciones estimulantes." },
  { id: "higado", label: "Tengo problemas de hígado", description: "Evitar extractos concentrados sin supervisión." },
  { id: "rinon", label: "Tengo problemas de riñón", description: "Cuidado con minerales o suplementos." },
  { id: "tiroides", label: "Tengo problemas de tiroides", description: "Algunos suplementos pueden no ser adecuados." },
  { id: "presion", label: "Tengo presión alta", description: "Cuidado con estimulantes." },
  { id: "digestivo", label: "Tengo sensibilidad digestiva", description: "Algunas opciones pueden irritar." },
  { id: "ninguna", label: "Ninguna de las anteriores", description: "No tengo restricciones relevantes por ahora." },
]

const sources = {
  ginger: { label: "NCCIH — Ginger", url: "https://www.nccih.nih.gov/health/ginger" },
  magnesium: { label: "NIH ODS — Magnesium", url: "https://ods.od.nih.gov/factsheets/Magnesium-Consumer/" },
  melatonin: { label: "NCCIH — Melatonin", url: "https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know" },
  sleep: { label: "NCCIH — Sleep disorders", url: "https://www.nccih.nih.gov/health/sleep-disorders-and-complementary-health-approaches" },
  chamomile: { label: "NCCIH — Chamomile", url: "https://www.nccih.nih.gov/health/chamomile" },
  lavender: { label: "NCCIH — Lavender", url: "https://www.nccih.nih.gov/health/lavender" },
  peppermint: { label: "NCCIH — Peppermint oil", url: "https://www.nccih.nih.gov/health/peppermint-oil" },
  turmeric: { label: "NCCIH — Turmeric", url: "https://www.nccih.nih.gov/health/turmeric" },
  greenTea: { label: "NCCIH — Green tea", url: "https://www.nccih.nih.gov/health/green-tea" },
  caffeine: { label: "FDA — Caffeine", url: "https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much" },
  psyllium: { label: "MedlinePlus — Psyllium", url: "https://medlineplus.gov/druginfo/natural/866.html" },
  omega3: { label: "NIH ODS — Omega-3", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/" },
}

const options: NaturalOption[] = [
  {
    id: "ginger",
    name: "Jengibre",
    category: "Raíz / alimento funcional",
    description: "Opción tradicionalmente usada para náuseas y digestión.",
    evidence: "Media",
    goals: { digestion: 10, habitos: 4 },
    bestFor: ["Náuseas leves", "Digestión", "Malestar digestivo puntual"],
    why: "El jengibre ha sido estudiado especialmente para náuseas. La evidencia es más razonable para ese uso que para promesas generales de energía.",
    commonUse: "Suele usarse en comida, infusión o preparaciones simples. Esta app no entrega dosis médicas.",
    foodFirst: "Prioriza su uso como alimento o infusión suave antes de pensar en suplementos concentrados.",
    safety: "Precaución si tomas anticoagulantes, tienes cirugía próxima, embarazo, lactancia o sensibilidad digestiva.",
    alternatives: ["Psyllium", "Menta", "Hidratación"],
    cautionIf: ["medicamentos", "embarazo", "digestivo"],
    sources: [sources.ginger],
  },
  {
    id: "magnesium",
    name: "Magnesio",
    category: "Mineral",
    description: "Mineral importante para función muscular y nerviosa.",
    evidence: "Media",
    goals: { muscular: 9, dormir: 6, relajar: 5, energia: 5, estres: 5, habitos: 6 },
    bestFor: ["Función muscular", "Sistema nervioso", "Apoyo si la ingesta es baja"],
    why: "Participa en procesos del cuerpo como función muscular y nerviosa. No significa que todo cansancio sea falta de magnesio.",
    commonUse: "Se obtiene en alimentos como frutos secos, legumbres, semillas y verduras de hoja. Los suplementos requieren cuidado.",
    foodFirst: "Primero revisa alimentos ricos en magnesio antes de usar suplementos.",
    safety: "Los suplementos pueden causar molestias digestivas y no son ideales sin orientación si hay enfermedad renal o medicamentos.",
    alternatives: ["Legumbres", "Semillas", "Verduras de hoja", "Rutina de sueño"],
    cautionIf: ["rinon", "medicamentos", "digestivo", "menor"],
    sources: [sources.magnesium],
  },
  {
    id: "melatonin",
    name: "Melatonina",
    category: "Hormona / suplemento",
    description: "Puede apoyar el ajuste del ciclo de sueño en algunos casos.",
    evidence: "Media",
    goals: { dormir: 10 },
    bestFor: ["Horario de sueño", "Jet lag", "Apoyo de corto plazo"],
    why: "Puede tener utilidad para algunos problemas de horario de sueño, pero no debe tratarse como solución permanente.",
    commonUse: "Se usa como suplemento en algunos países. Esta app no entrega dosis ni instrucciones médicas.",
    safety: "Especial cuidado en menores de edad. La seguridad a largo plazo no está clara y los productos pueden variar en contenido.",
    alternatives: ["Higiene del sueño", "Luz natural en la mañana", "Manzanilla"],
    avoidIf: ["menor", "embarazo"],
    cautionIf: ["medicamentos"],
    sources: [sources.melatonin, sources.sleep],
  },
  {
    id: "chamomile",
    name: "Manzanilla",
    category: "Infusión herbal",
    description: "Opción suave asociada a relajación y calma.",
    evidence: "Baja-Media",
    goals: { relajar: 9, dormir: 6, estres: 7, digestion: 4, habitos: 5 },
    bestFor: ["Relajación leve", "Rutina nocturna", "Infusión suave"],
    why: "Se usa tradicionalmente para calma y sueño, aunque la evidencia clínica no es igual de fuerte que en tratamientos médicos.",
    commonUse: "Suele usarse como infusión. Evita mezclar muchas hierbas si tienes alergias o tomas medicamentos.",
    foodFirst: "Puede funcionar como parte de un ritual tranquilo: apagar pantallas, luz baja e infusión.",
    safety: "Evitar si tienes alergia a plantas de la familia Asteraceae, como ambrosía o similares.",
    alternatives: ["Lavanda", "Respiración", "Higiene del sueño"],
    avoidIf: ["alergias"],
    cautionIf: ["medicamentos", "embarazo"],
    sources: [sources.chamomile],
  },
  {
    id: "lavender",
    name: "Lavanda",
    category: "Planta aromática",
    description: "Asociada a relajación y manejo suave de tensión.",
    evidence: "Baja-Media",
    goals: { relajar: 8, estres: 8, dormir: 5 },
    bestFor: ["Relajación", "Ambiente de descanso", "Estrés leve"],
    why: "Puede ayudar a crear un ambiente de relajación. La evidencia existe, pero tiene limitaciones según forma de uso.",
    commonUse: "Puede usarse como aroma ambiental. No se recomienda ingerir aceites esenciales sin indicación profesional.",
    safety: "Evita ingerir aceites esenciales. Precaución con piel sensible, alergias, embarazo o menores.",
    alternatives: ["Manzanilla", "Respiración guiada", "Rutina de desconexión"],
    cautionIf: ["alergias", "embarazo", "menor"],
    sources: [sources.lavender],
  },
  {
    id: "peppermint",
    name: "Aceite de menta",
    category: "Extracto herbal",
    description: "Puede apoyar ciertos malestares digestivos en adultos.",
    evidence: "Media",
    goals: { digestion: 8 },
    bestFor: ["Malestar tipo colon irritable en adultos", "Digestión específica"],
    why: "Ha sido estudiado para síntomas digestivos tipo intestino irritable, pero no es para cualquier persona.",
    commonUse: "Cuando se usa, suele ser en formulaciones específicas. No es lo mismo que consumir aceite esencial directo.",
    safety: "Puede empeorar reflujo o acidez. No usar aceites esenciales de forma insegura.",
    alternatives: ["Jengibre", "Psyllium", "Revisión de comidas gatillantes"],
    avoidIf: ["digestivo", "menor"],
    cautionIf: ["medicamentos", "embarazo"],
    sources: [sources.peppermint],
  },
  {
    id: "turmeric",
    name: "Cúrcuma / curcumina",
    category: "Especia / extracto",
    description: "Puede apoyar molestias inflamatorias leves, con evidencia moderada/limitada.",
    evidence: "Baja-Media",
    goals: { muscular: 7, habitos: 4 },
    bestFor: ["Molestia articular leve", "Alimentación antiinflamatoria general"],
    why: "Es popular, pero no debe venderse como cura. Puede ser más razonable como parte de alimentación que como promesa de suplemento.",
    commonUse: "Suele usarse como especia en comida. Los extractos concentrados requieren más cuidado.",
    foodFirst: "Úsala como alimento/especia antes de pensar en cápsulas o extractos.",
    safety: "Precaución con problemas hepáticos, medicamentos, anticoagulantes o molestias digestivas.",
    alternatives: ["Omega-3", "Descanso", "Actividad física suave"],
    cautionIf: ["higado", "medicamentos", "digestivo", "embarazo"],
    sources: [sources.turmeric],
  },
  {
    id: "green-tea",
    name: "Té verde",
    category: "Bebida con cafeína",
    description: "Puede apoyar alerta suave por su contenido de cafeína.",
    evidence: "Media",
    goals: { energia: 9, concentracion: 8, habitos: 4 },
    bestFor: ["Alerta suave", "Concentración puntual", "Rutina matinal"],
    why: "Puede ayudar a la alerta por cafeína. No aumenta mágicamente el ATP ni reemplaza sueño, comida o hidratación.",
    commonUse: "Suele tomarse como bebida. Evitar exceso, especialmente si afecta sueño o ansiedad.",
    safety: "Contiene cafeína. Precaución en menores, ansiedad, presión alta, problemas de sueño o sensibilidad a cafeína.",
    alternatives: ["Luz natural", "Agua", "Pausa activa", "Sueño suficiente"],
    avoidIf: ["cafeina", "presion", "menor"],
    cautionIf: ["medicamentos", "higado"],
    sources: [sources.greenTea, sources.caffeine],
  },
  {
    id: "psyllium",
    name: "Psyllium / fibra soluble",
    category: "Fibra soluble",
    description: "Apoyo para regularidad intestinal.",
    evidence: "Media-Alta",
    goals: { digestion: 9, habitos: 5 },
    bestFor: ["Estreñimiento", "Regularidad digestiva", "Fibra diaria"],
    why: "La fibra soluble puede ayudar a la regularidad intestinal. Debe usarse con suficiente agua.",
    commonUse: "Suele mezclarse con líquido o alimentos, siguiendo indicaciones del producto o profesional.",
    foodFirst: "También puedes aumentar fibra con avena, frutas, verduras, legumbres y agua.",
    safety: "Debe tomarse con suficiente agua. Puede interferir con algunos medicamentos si se toma al mismo tiempo.",
    alternatives: ["Avena", "Frutas", "Verduras", "Agua"],
    cautionIf: ["medicamentos", "digestivo"],
    sources: [sources.psyllium],
  },
  {
    id: "omega3",
    name: "Omega-3",
    category: "Grasa esencial",
    description: "Apoyo nutricional para salud cardiovascular y dieta general.",
    evidence: "Media",
    goals: { habitos: 8, concentracion: 4, muscular: 4, energia: 3 },
    bestFor: ["Salud cardiovascular", "Nutrición general", "Dieta equilibrada"],
    why: "Es más razonable verlo como parte de alimentación saludable que como solución rápida para energía o concentración.",
    commonUse: "Puede venir de pescados grasos o suplementos. Esta app prioriza alimentación primero.",
    foodFirst: "Considera fuentes alimentarias como pescados grasos, nueces o semillas según tu dieta.",
    safety: "Precaución con anticoagulantes, cirugía próxima o suplementos de dosis alta.",
    alternatives: ["Pescados grasos", "Semillas", "Frutos secos", "Dieta equilibrada"],
    cautionIf: ["medicamentos", "embarazo"],
    sources: [sources.omega3],
  },
]

function evidenceStyle(evidence: Evidence) {
  const map: Record<Evidence, string> = {
    Alta: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    "Media-Alta": "bg-teal-50 text-teal-700 ring-teal-100",
    Media: "bg-blue-50 text-blue-700 ring-blue-100",
    "Baja-Media": "bg-amber-50 text-amber-700 ring-amber-100",
    Limitada: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  }

  return map[evidence]
}

function goalTitle(goal: Goal | null) {
  if (!goal) return "Selecciona un objetivo"
  return goals.find((item) => item.id === goal)?.title ?? "Objetivo"
}

function getRiskWarnings(option: NaturalOption, selectedRisks: Risk[]) {
  const warnings: string[] = []

  for (const risk of selectedRisks) {
    if (risk === "ninguna") continue
    if (option.avoidIf?.includes(risk)) warnings.push("No aparece como primera opción por una precaución seleccionada.")
    if (option.cautionIf?.includes(risk)) warnings.push("Requiere revisión adicional por una condición o restricción seleccionada.")
  }

  return Array.from(new Set(warnings))
}

function scoreOption(option: NaturalOption, goal: Goal, selectedRisks: Risk[]) {
  let score = option.goals[goal] ?? 0

  for (const risk of selectedRisks) {
    if (risk === "ninguna") continue
    if (option.avoidIf?.includes(risk)) score -= 6
    if (option.cautionIf?.includes(risk)) score -= 2
  }

  if (selectedRisks.includes("menor")) {
    if (option.category.toLowerCase().includes("suplemento")) score -= 4
    if (option.name.includes("Melatonina")) score -= 8
    if (option.name.includes("Té verde")) score -= 4
  }

  return score
}

function getRecommendations(goal: Goal | null, selectedRisks: Risk[]) {
  if (!goal) return []

  return options
    .map((option) => ({
      option,
      score: scoreOption(option, goal, selectedRisks),
      warnings: getRiskWarnings(option, selectedRisks),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

function ToggleCard({
  active,
  icon,
  title,
  subtitle,
  onClick,
}: {
  active: boolean
  icon: string
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "group rounded-[1.6rem] border p-5 text-left transition-all duration-200",
        active
          ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-300"
          : "border-zinc-200 bg-white text-zinc-950 shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200",
      ].join(" ")}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-xl group-hover:scale-105">{icon}</div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className={["mt-2 text-sm leading-6", active ? "text-zinc-300" : "text-zinc-500"].join(" ")}>{subtitle}</p>
    </button>
  )
}

function StepPill({ number, label, active }: { number: number; label: string; active: boolean }) {
  return (
    <div className={["flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition", active ? "bg-zinc-950 text-white" : "bg-white text-zinc-500 ring-1 ring-zinc-200"].join(" ")}>
      <span className={["flex h-5 w-5 items-center justify-center rounded-full text-[11px]", active ? "bg-white text-zinc-950" : "bg-zinc-100 text-zinc-500"].join(" ")}>
        {number}
      </span>
      {label}
    </div>
  )
}

function SafetyBanner({ selectedRisks }: { selectedRisks: Risk[] }) {
  const hasImportantRisk = selectedRisks.some((risk) => risk !== "ninguna")

  if (!hasImportantRisk) {
    return (
      <div className="rounded-[1.7rem] border border-emerald-100 bg-emerald-50 p-5 text-emerald-900">
        <p className="text-sm font-semibold">Sin restricciones marcadas</p>
        <p className="mt-1 text-sm leading-6 text-emerald-800">Aun así, Raíz entrega información educativa y no reemplaza una evaluación profesional.</p>
      </div>
    )
  }

  return (
    <div className="rounded-[1.7rem] border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <p className="text-sm font-semibold">Revisar con un profesional</p>
      <p className="mt-1 text-sm leading-6 text-amber-900">Marcaste una o más condiciones que pueden cambiar la seguridad de suplementos, hierbas o extractos. Las recomendaciones aparecerán con más precauciones y no deben usarse como indicación médica.</p>
    </div>
  )
}

function RecommendationCard({ rank, option, warnings }: { rank: number; option: NaturalOption; warnings: string[] }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 bg-gradient-to-br from-white to-zinc-50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">#{rank} sugerencia</div>
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">{option.name}</h3>
            <p className="mt-2 text-sm text-zinc-500">{option.category}</p>
          </div>

          <span className={["rounded-full px-3 py-1 text-xs font-semibold ring-1", evidenceStyle(option.evidence)].join(" ")}>
            Evidencia: {option.evidence}
          </span>
        </div>

        <p className="mt-5 text-sm leading-7 text-zinc-600">{option.description}</p>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-semibold text-zinc-950">Para qué podría servir</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {option.bestFor.map((item) => (
                <span key={item} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-50 p-5">
            <h4 className="text-sm font-semibold text-zinc-950">Por qué podría ayudar</h4>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{option.why}</p>
          </div>

          <div className="rounded-3xl bg-zinc-50 p-5">
            <h4 className="text-sm font-semibold text-zinc-950">Uso común, sin dosis médica</h4>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{option.commonUse}</p>
          </div>

          {option.foodFirst && (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <h4 className="text-sm font-semibold text-emerald-950">Primero como alimento</h4>
              <p className="mt-2 text-sm leading-7 text-emerald-800">{option.foodFirst}</p>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {warnings.length > 0 && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <h4 className="text-sm font-semibold text-amber-950">Precaución por tu selección</h4>
              <ul className="mt-3 space-y-2">
                {warnings.map((warning) => (
                  <li key={warning} className="text-sm leading-6 text-amber-900">• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-3xl border border-zinc-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-zinc-950">Notas de seguridad</h4>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{option.safety}</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-zinc-950">Alternativas</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {option.alternatives.map((item) => (
                <span key={item} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-zinc-950">Fuentes para revisar</h4>
            <div className="mt-3 space-y-2">
              {option.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950">
                  {source.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [selectedRisks, setSelectedRisks] = useState<Risk[]>([])
  const [showResults, setShowResults] = useState(false)

  const recommendations = useMemo(() => getRecommendations(selectedGoal, selectedRisks), [selectedGoal, selectedRisks])
  const currentStep = showResults ? 3 : selectedGoal ? 2 : 1

  const toggleRisk = (risk: Risk) => {
    setShowResults(false)

    if (risk === "ninguna") {
      setSelectedRisks((current) => (current.includes("ninguna") ? [] : ["ninguna"]))
      return
    }

    setSelectedRisks((current) => {
      const withoutNone = current.filter((item) => item !== "ninguna")
      if (withoutNone.includes(risk)) return withoutNone.filter((item) => item !== risk)
      return [...withoutNone, risk]
    })
  }

  const reset = () => {
    setSelectedGoal(null)
    setSelectedRisks([])
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main
      className="min-h-screen bg-[#f5f5f7] text-zinc-950"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", sans-serif' }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute right-[-12rem] top-[18rem] h-[30rem] w-[30rem] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full bg-lime-200/30 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/70 bg-[#f5f5f7]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button onClick={reset} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/15">R</div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Raíz</p>
              <p className="-mt-1 text-xs text-zinc-500">Bienestar con evidencia</p>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            <a href="#como-funciona" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-950">Cómo funciona</a>
            <a href="#evidencia" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-950">Evidencia</a>
            <a href="#evaluacion" className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800">Empezar</a>
          </nav>
        </div>
      </header>

      <section className="relative px-5 pb-10 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm ring-1 ring-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Guía educativa, no diagnóstico médico
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] text-zinc-950 sm:text-7xl">
              Bienestar natural, explicado con evidencia.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-600">
              Cuéntanos qué buscas mejorar y descubre opciones naturales con beneficios, precauciones y fuentes para revisar.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#evaluacion" className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15 transition hover:bg-zinc-800 active:scale-[0.98]">Empezar evaluación</a>
              <a href="#evidencia" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]">Ver cómo usamos evidencia</a>
            </div>
          </div>

          <div id="evaluacion" className="mx-auto mt-14 max-w-6xl scroll-mt-28 rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-2xl shadow-zinc-300/60 backdrop-blur-xl sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <StepPill number={1} label="Objetivo" active={currentStep === 1} />
                <StepPill number={2} label="Seguridad" active={currentStep === 2} />
                <StepPill number={3} label="Resultados" active={currentStep === 3} />
              </div>

              <button onClick={reset} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200 hover:text-zinc-950">
                Reiniciar
              </button>
            </div>

            {!showResults && (
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[2rem] bg-zinc-950 p-7 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Paso {selectedGoal ? "2" : "1"}</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    {selectedGoal ? "Antes de sugerir opciones, revisemos precauciones." : "¿Qué quieres mejorar hoy?"}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {selectedGoal
                      ? "Esto ayuda a ordenar mejor el ranking. Si marcas una condición de riesgo, Raíz mostrará advertencias y bajará opciones que no convienen como primera sugerencia."
                      : "Elige un objetivo. La app usará ese objetivo para ordenar las opciones naturales según utilidad, evidencia y seguridad."}
                  </p>

                  <div className="mt-8 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                    <p className="text-sm font-semibold text-white">Importante</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">Raíz entrega información educativa. No diagnostica, no trata enfermedades y no reemplaza a un profesional de salud.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 sm:p-7">
                  {!selectedGoal && (
                    <>
                      <div className="mb-5">
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-950">Selecciona tu objetivo</h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-500">Puedes cambiarlo después.</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {goals.map((goal) => (
                          <ToggleCard
                            key={goal.id}
                            active={selectedGoal === goal.id}
                            icon={goal.icon}
                            title={goal.title}
                            subtitle={goal.subtitle}
                            onClick={() => {
                              setSelectedGoal(goal.id)
                              setShowResults(false)
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {selectedGoal && (
                    <>
                      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">Precauciones para “{goalTitle(selectedGoal)}”</h3>
                          <p className="mt-2 text-sm leading-6 text-zinc-500">Marca lo que aplique. Si tienes dudas, elige la opción más cautelosa.</p>
                        </div>

                        <button onClick={() => setSelectedGoal(null)} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200">
                          Cambiar objetivo
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {risks.map((risk) => {
                          const active = selectedRisks.includes(risk.id)

                          return (
                            <button
                              key={risk.id}
                              onClick={() => toggleRisk(risk.id)}
                              className={[
                                "rounded-[1.4rem] border p-4 text-left transition-all duration-200",
                                active ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",
                              ].join(" ")}
                            >
                              <div className="flex items-start gap-3">
                                <div className={["mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", active ? "border-white bg-white text-zinc-950" : "border-zinc-300 bg-white"].join(" ")}>
                                  {active ? "✓" : ""}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">{risk.label}</p>
                                  <p className={["mt-1 text-xs leading-5", active ? "text-zinc-300" : "text-zinc-500"].join(" ")}>
                                    {risk.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      <div className="mt-6">
                        <button onClick={() => setShowResults(true)} className="w-full rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15 transition hover:bg-zinc-800 active:scale-[0.98]">
                          Ver ranking con evidencia
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {showResults && selectedGoal && (
              <div>
                <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                  <div className="rounded-[2rem] bg-zinc-950 p-7 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Resultado</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight">Opciones para “{goalTitle(selectedGoal)}”</h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-300">Este ranking prioriza utilidad probable, evidencia disponible y seguridad. No reemplaza consulta profesional ni indica dosis.</p>
                  </div>

                  <SafetyBanner selectedRisks={selectedRisks} />
                </div>

                <div className="space-y-5">
                  {recommendations.map((item, index) => (
                    <RecommendationCard key={item.option.id} rank={index + 1} option={item.option} warnings={item.warnings} />
                  ))}
                </div>

                <div className="mt-6 rounded-[2rem] border border-zinc-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-zinc-950">Mitos que Raíz no recomendaría sin respaldo</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-3xl bg-zinc-50 p-5">
                      <p className="text-sm font-semibold text-zinc-950">“Limón con sal aumenta el ATP”</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">No lo pondríamos como recomendación sin evidencia clínica sólida y fuente verificable.</p>
                    </div>
                    <div className="rounded-3xl bg-zinc-50 p-5">
                      <p className="text-sm font-semibold text-zinc-950">“Si tienes sueño, te falta magnesio”</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">El cansancio puede tener muchas causas. Raíz evita diagnosticar deficiencias.</p>
                    </div>
                    <div className="rounded-3xl bg-zinc-50 p-5">
                      <p className="text-sm font-semibold text-zinc-950">“Natural significa seguro”</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">Natural no siempre significa adecuado. Por eso mostramos precauciones.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200">Cómo funciona</div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">Una guía simple, no una promesa mágica.</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">Raíz combina objetivo, precauciones y evidencia para mostrar opciones educativas, con fuentes abiertas para que cualquiera pueda revisar.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-zinc-200">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl">1</div>
              <h3 className="text-lg font-semibold text-zinc-950">Eliges un objetivo</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Energía, sueño, relajación, digestión, concentración, estrés o hábitos.</p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-zinc-200">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl">2</div>
              <h3 className="text-lg font-semibold text-zinc-950">Marcamos precauciones</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Medicamentos, alergias, cafeína, presión, embarazo, hígado, riñón o menor de edad.</p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-zinc-200">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl">3</div>
              <h3 className="text-lg font-semibold text-zinc-950">Ves opciones citadas</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Cada tarjeta muestra beneficios posibles, seguridad, alternativas y fuentes.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="evidencia" className="relative px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-zinc-950 p-8 text-white shadow-2xl shadow-zinc-400/60 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">Cómo leemos la evidencia</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Más transparente que perfecto.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
            En esta primera versión, los niveles de evidencia son orientativos y conservadores. La idea no es reemplazar a un profesional, sino evitar afirmaciones exageradas y mostrar fuentes revisables.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Alta / Media-Alta</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Uso con respaldo más consistente para un objetivo específico.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Media</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Evidencia razonable, pero con límites según persona, forma de uso o contexto.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Baja-Media</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Puede ser prometedor o tradicional, pero no debe venderse como solución segura.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Limitada</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Se muestra con cuidado o se deja como alternativa, no como recomendación principal.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-zinc-200 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© Raíz — Guía educativa de bienestar natural.</p>
          <p className="max-w-2xl leading-6">No diagnostica, no indica dosis, no reemplaza atención médica. Si tienes síntomas persistentes, tomas medicamentos, eres menor de edad, estás embarazada o tienes una condición médica, consulta a un profesional.</p>
        </div>
      </footer>
    </main>
  )
}

