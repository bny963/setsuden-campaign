import Header from './components/Header'
import Hero from './components/Hero'
import CampaignCards from './components/CampaignCards'
import ApplicationForm from './components/ApplicationForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CampaignCards />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}
