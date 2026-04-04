import FadeIn from './FadeIn'

export default function FeatureBlock({
  title,
  description,
  image,
  accentColor,
  reversed,
  bullets,
}) {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.025]"
        style={{
          backgroundColor: accentColor,
          top: '15%',
          ...(reversed ? { left: '-5%' } : { right: '-5%' }),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className={reversed ? 'lg:order-2' : ''}>
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                {title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-[16px] text-white/45 leading-relaxed mb-8 max-w-lg">
                {description}
              </p>
            </FadeIn>

            {bullets && (
              <div className="space-y-3">
                {bullets.map((bullet, i) => (
                  <FadeIn key={i} delay={0.15 + i * 0.06}>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <p className="text-[14px] text-white/55 leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className={reversed ? 'lg:order-1' : ''}>
            <FadeIn
              direction={reversed ? 'left' : 'right'}
              delay={0.15}
              duration={0.9}
            >
              <div className="relative aspect-[4/3] w-full">
                <div
                  className="absolute -inset-4 rounded-3xl blur-[80px] opacity-[0.1]"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="relative h-full rounded-xl overflow-hidden border border-white/[0.08]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/40 via-transparent to-transparent" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
