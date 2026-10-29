import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart, Home } from 'lucide-react'
import { Bell, Flower, Leaf, Page, Spark } from '../components/Shared'
import './gs-pages.css'

export default function NotFound() {
  return (
    <Page theme="brown">
      <section className="gp-404">
        <div className="gp-floaters" aria-hidden="true">
          <Flower className="f f1" /><Leaf className="f f2" /><Spark className="f f3" /><Heart className="f f4" fill="currentColor" />
          <Spark className="f f5" /><Leaf className="f f6" /><Flower className="f f7" />
        </div>
        <div className="gp-404-inner">
          <div className="gp-404-num" aria-hidden="true"><span>4</span><Bell className="bell" /><span>4</span></div>
          <h1 data-anim="up">This page wandered off.</h1>
          <p data-anim="up" style={{ '--d': '120ms' }}>Even the cows get lost on the way to the fodder sometimes. Let us take you back to the herd.</p>
          <div className="gp-hero-cta" data-anim="up" style={{ '--d': '240ms' }}>
            <Link to="/" className="gs-btn gs-btn-sun" data-magnet><Home size={17} /> Back to home</Link>
            <Link to="/our-work" className="gs-btn gs-btn-ghost" data-magnet>What we do <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </Page>
  )
}
