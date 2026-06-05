import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import ProductsPage from './pages/ProductsPage'
import IndustriesPage from './pages/IndustriesPage'
import InsightsPage from './pages/InsightsPage'
import AthenaPage from './pages/AthenaPage'
import HermesPage from './pages/HermesPage'
import HermesDocs from './pages/HermesDocs'
import AthenaDocs from './pages/AthenaDocs'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.4,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Hidden doc pages — no Navbar/Footer */}
        <Route path="/d/m7x9k2" element={<HermesDocs />} />
        <Route path="/d/p3v8n1" element={<AthenaDocs />} />

        {/* Main site */}
        <Route path="*" element={
          <div className="bg-[#0d1117] text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/athena" element={<AthenaPage />} />
              <Route path="/hermes" element={<HermesPage />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
