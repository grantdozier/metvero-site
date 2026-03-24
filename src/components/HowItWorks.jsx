import { UserPlus, Settings, Rocket } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up in seconds with your email or SSO. No credit card required to get started.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'Configure Your Workspace',
    description: 'Set up your team, connect your tools, and customize workflows to match how you work.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Launch & Scale',
    description: 'Start shipping faster immediately. Our platform scales automatically as your team grows.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting started with Metvero is simple. Three steps and you're ready to go.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

          {steps.map((step) => (
            <div key={step.step} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg shadow-primary-500/10 border border-primary-100 mb-6 relative z-10">
                <step.icon size={28} className="text-primary-600" />
              </div>
              <div className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2">Step {step.step}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
