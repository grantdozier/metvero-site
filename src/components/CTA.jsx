import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-primary-600 rounded-3xl p-12 sm:p-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-700 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to transform your workflow?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join thousands of teams already using Metvero to build and ship faster. 
              Start your free trial today — no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group bg-white text-primary-600 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2 shadow-lg"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="text-white/90 px-8 py-3.5 rounded-xl text-base font-semibold hover:text-white hover:bg-primary-500/50 transition-colors border border-white/20"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
