import Header from './components/Header'
import Hero from './components/Hero'
import SeasonShowcase from './components/SeasonShowcase'
import CampaignCards from './components/CampaignCards'
import ApplicationForm from './components/ApplicationForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SeasonShowcase />
        <CampaignCards />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}
