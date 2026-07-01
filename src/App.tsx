import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { AskLane } from './components/AskLane'

import Home from './pages/Home'
import Services from './pages/Services'
import ForSmallBusinesses from './pages/ForSmallBusinesses'
import HowItWorks from './pages/HowItWorks'
import Intake from './pages/Intake'
import FullIntake from './pages/FullIntake'
import Demos from './pages/Demos'
import CaseStudies from './pages/CaseStudies'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/for-small-businesses" element={<ForSmallBusinesses />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/full-intake" element={<FullIntake />} />
          {/* Alias so /intake/full also resolves to the full form. */}
          <Route path="/intake/full" element={<FullIntake />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* Lightweight guided concierge (not a live AI chat). Site-wide. */}
      <AskLane />
    </div>
  )
}
