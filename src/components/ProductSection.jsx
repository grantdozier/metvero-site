import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from './FadeIn'

function ProductImage({ src, alt, accentColor }) {
  return (
    <div className="relative aspect-[4/3] w-full">
      {/* Glow behind */}
      <div
        className="absolute -inset-4 rounded-3xl blur-[80px] opacity-[0.12]"
        style={{ backgroundColor: accentColor }}
      />
      {/* Image container */}
      <div className="relative h-full rounded-xl overflow-hidden border border-white/[0.08]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {/* Edge gradient for blending into dark bg */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/20 via-transparent to-[#0d1117]/20" />
      </div>
    </div>
  )
}

export default function ProductSection({
  id,
  name,
  tagline,
  description,
  features,
  accentColor,
  reversed,
  image,
  linkTo,
}) {
  return (
    <section id={id} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background accent glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.03] pointer-events-none"
        style={{
          backgroundColor: accentColor,
          top: '10%',
          ...(reversed ? { left: '-5%' } : { right: '-5%' }),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className={reversed ? 'lg:order-2' : ''}>
            <FadeIn>
              <p
                className="text-[11px] tracking-[0.3em] uppercase font-medium mb-5"
                style={{ color: accentColor }}
              >
                {name}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                {tagline}
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-[16px] text-white/50 leading-relaxed mb-10 max-w-lg">
                {description}
              </p>
            </FadeIn>

            <div className="space-y-5">
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={0.2 + i * 0.08}>
                  <div className="flex gap-4 items-start">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                      style={{
                        borderColor: `${accentColor}20`,
                        backgroundColor: `${accentColor}10`,
                      }}
                    >
                      <feature.icon
                        size={16}
                        style={{ color: accentColor }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-white/90 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[13px] text-white/40 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <Link
                to={linkTo || `/${id}`}
                className="group inline-flex items-center gap-2 mt-8 text-[13px] font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: accentColor }}
              >
                Explore {name}
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform duration-300"
                />
              </Link>
            </FadeIn>
          </div>

          {/* Product image */}
          <div className={reversed ? 'lg:order-1' : ''}>
            <FadeIn
              direction={reversed ? 'left' : 'right'}
              delay={0.2}
              duration={0.9}
            >
              <ProductImage
                src={image.src}
                alt={image.alt}
                accentColor={accentColor}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
