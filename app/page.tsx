import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Inventory } from '@/components/site/inventory'
import { CreditCalculator } from '@/components/site/credit-calculator'
import { WhyUs } from '@/components/site/why-us'
import { Cta } from '@/components/site/cta'
import { About } from '@/components/site/about'
import { Reviews } from '@/components/site/reviews'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'
import { MobileBar } from '@/components/site/mobile-bar'

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Inventory />
      <WhyUs />
      <CreditCalculator />
      <Cta />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <div className="h-20 lg:hidden" />
      <MobileBar />
    </main>
  )
}
