import Button from '@/components/Button'
import Seo from '@/components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" noindex title="Page not found | Meezan Tours & Travels" description="The page you are looking for could not be found." />
      <section className="section">
        <div className="container max-w-xl text-center">
          <p className="font-display text-7xl text-accent-500">404</p>
          <h1 className="mt-4 text-display-md">This page could not be found</h1>
          <p className="mt-3 text-ink-500">It may have moved. Try one of these pages instead.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="primary">Home</Button>
            <Button to="/packages" variant="outline">Packages</Button>
            <Button to="/contact" variant="outline">Contact</Button>
          </div>
        </div>
      </section>
    </>
  )
}
