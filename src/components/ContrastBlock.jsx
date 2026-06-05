import FadeIn from './FadeIn'

const ROWS = [
  { other: 'Other platforms alert.', metvero: 'Metvero absorbs the load.' },
  { other: 'Other platforms coordinate work.', metvero: 'Metvero removes it.' },
  {
    other: 'Other platforms flag risk.',
    metvero: 'Metvero explains the cause, the options, and the next move.',
  },
  {
    other: 'Other platforms add another interface.',
    metvero: 'Metvero makes the interfaces matter less.',
  },
]

export default function ContrastBlock({
  accentColor = '#D6A86E',
  eyebrow = 'The Difference',
  title = 'A category apart.',
}) {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              {eyebrow}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1]">
              {title}
            </h2>
          </FadeIn>
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {ROWS.map((row, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.4fr] items-center gap-3 sm:gap-8 py-6 lg:py-7">
                <p className="text-[15px] sm:text-[16px] text-white/35 leading-relaxed">
                  {row.other}
                </p>
                <div
                  className="hidden sm:block w-px h-8 mx-auto"
                  style={{ backgroundColor: `${accentColor}30` }}
                />
                <p className="text-[16px] sm:text-[18px] text-white/90 font-medium leading-relaxed">
                  {row.metvero}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
