import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { AskLane } from './components/AskLane'
import { SystemSignature } from './components/SystemSignature'
import { AnalyticsProvider } from './components/Analytics'

import Home from './pages/Home'
import Services from './pages/Services'
import LeadSystems from './pages/LeadSystems'
import Contractors from './pages/Contractors'
import Industries from './pages/Industries'
import ForSmallBusinesses from './pages/ForSmallBusinesses'
import HowItWorks from './pages/HowItWorks'
import Intake from './pages/Intake'
import FullIntake from './pages/FullIntake'
import Demos from './pages/Demos'
import LeadCaptureDemo from './pages/demos/LeadCapture'
import FollowUpAssistantDemo from './pages/demos/FollowUpAssistant'
import SmallBusinessDashboardDemo from './pages/demos/SmallBusinessDashboard'
import CaseStudies from './pages/CaseStudies'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {/* Site-wide analytics: cookieless pageviews + custom event tracking. */}
      <AnalyticsProvider />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/lead-systems" element={<LeadSystems />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/for-small-businesses" element={<ForSmallBusinesses />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/full-intake" element={<FullIntake />} />
          {/* Alias so /intake/full also resolves to the full form. */}
          <Route path="/intake/full" element={<FullIntake />} />
          <Route path="/demos" element={<Demos />} />
          {/* Static demo showcase pages — example data only, nothing live. */}
          <Route path="/demos/lead-capture" element={<LeadCaptureDemo />} />
          <Route
            path="/demos/follow-up-assistant"
            element={<FollowUpAssistantDemo />}
          />
          <Route
            path="/demos/small-business-dashboard"
            element={<SmallBusinessDashboardDemo />}
          />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* Site-wide concierge: AI chat (via /api/ask-lane) + guided fallback. */}
      <AskLane />
      {/* Subtle brand-family watermark (desktop, non-interactive). */}
      <SystemSignature />
    </div>
  )
}
