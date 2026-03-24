import { Zap, Shield, BarChart3, Puzzle, Globe, Clock } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with edge computing and intelligent caching. Your apps load in milliseconds, not seconds.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption, SSO, and role-based access controls out of the box.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time dashboards and custom reports that give you actionable insights into your business metrics.',
  },
  {
    icon: Puzzle,
    title: 'Seamless Integrations',
    description: 'Connect with 200+ tools your team already uses. Slack, GitHub, Jira, and more — all in one click.',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy to 30+ regions worldwide. Auto-scaling infrastructure that grows with your business.',
  },
  {
    icon: Clock,
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks with powerful no-code workflows. Save hours every week for your team.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything you need to move fast
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A complete toolkit designed for modern teams. No more juggling between a dozen different tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <feature.icon size={24} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
