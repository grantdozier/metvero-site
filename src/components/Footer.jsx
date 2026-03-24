export default function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Docs'],
    Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
    Resources: ['Community', 'Help Center', 'Status', 'API Reference', 'Templates'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  }

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-lg font-bold text-white">Metvero</span>
            </div>
            <p className="text-sm leading-relaxed">
              The modern platform for teams that ship fast.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Metvero. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-sm hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-sm hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
