import { PageHero } from '../components/PageHero'
import { Button } from '../components/Button'

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="We couldn't find that page."
      subtitle="The link may be old or mistyped. Let's get you back on track."
    >
      <Button to="/" size="lg">
        Back to home
      </Button>
      <Button to="/intake" variant="secondary" size="lg">
        Start the intake
      </Button>
    </PageHero>
  )
}
