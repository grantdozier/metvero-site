import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-indigo-50 -z-10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-700">Now in Public Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Build, Ship & Scale
            <span className="block text-primary-600">Faster Than Ever</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Metvero is the all-in-one platform that helps modern teams streamline their workflow, 
            automate repetitive tasks, and deliver products at lightning speed.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="group flex items-center gap-2 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <Play size={18} className="text-primary-600" />
              Watch Demo
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Trusted by <span className="font-semibold text-gray-700">2,500+</span> teams worldwide
            </p>
          </div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-1 max-w-5xl mx-auto">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-gray-800 rounded-md px-4 py-1 text-xs text-gray-400 font-mono">
                    app.metvero.com/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-6 grid grid-cols-3 gap-4 min-h-[300px]">
                <div className="col-span-2 space-y-4">
                  <div className="h-8 bg-gray-800 rounded-lg w-48" />
                  <div className="grid grid-cols-3 gap-3">
                    {['Revenue', 'Users', 'Growth'].map((label, i) => (
                      <div key={label} className="bg-gray-800/80 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">{label}</p>
                        <p className="text-lg font-bold text-white">
                          {['$48.2K', '12,847', '+24.5%'][i]}
                        </p>
                        <div className="mt-2 h-12 bg-gradient-to-t from-primary-600/20 to-transparent rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 h-32">
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-4 bg-gray-700 rounded w-24" />
                      <div className="h-4 bg-gray-700 rounded w-16" />
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary-500/60 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-800/80 rounded-xl p-4">
                    <div className="h-4 bg-gray-700 rounded w-20 mb-3" />
                    <div className="space-y-2">
                      {[85, 62, 91, 45].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-600/30" />
                          <div className="flex-1">
                            <div className="h-2 bg-gray-700 rounded" style={{ width: `${w}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-800/80 rounded-xl p-4">
                    <div className="h-4 bg-gray-700 rounded w-16 mb-3" />
                    <div className="flex items-center justify-center h-24">
                      <div className="w-20 h-20 rounded-full border-4 border-primary-500 border-t-transparent animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-x-20 -bottom-10 h-40 bg-primary-500/10 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  )
}
