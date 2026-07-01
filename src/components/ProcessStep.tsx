interface ProcessStepProps {
  step: number
  title: string
  description: string
  /** Hide the connecting line on the last step. */
  last?: boolean
}

export function ProcessStep({ step, title, description, last }: ProcessStepProps) {
  return (
    <div className="relative flex gap-5">
      {/* Number + connector */}
      <div className="flex flex-col items-center">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white">
          {step}
        </div>
        {!last && <div className="mt-2 w-px flex-1 bg-slate-200" aria-hidden />}
      </div>

      <div className={last ? '' : 'pb-10'}>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </div>
  )
}
