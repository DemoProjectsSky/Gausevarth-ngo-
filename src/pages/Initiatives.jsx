import { Link } from 'react-router-dom'
import {
  ArrowUpRight, Droplets, Heart, HeartHandshake, Moon, ShieldCheck, Stethoscope, Sun, Sunrise, Sunset,
  UsersRound, Warehouse, Wheat, CheckCircle2,
} from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import { CtaBand, Marquee, Page, PageHero, ShapePhoto, Split } from '../components/Shared'
import './gs-pages.css'
import './gs-pages-premium.css'

const work = [
  {
    key: 'fodder', icon: Wheat, no: '01', title: 'Fodder', hindi: 'Chara',
    text: 'Green grass, dry fodder and balanced feed, served on time every single day of the year. A well-fed cow is a healthy, calm cow.',
    points: ['Fresh green fodder in season', 'Dry fodder stored for summer and winter', 'Extra care feed for calves and weak cows'],
    shape: 'landscape', image: '/images/gausevarth gallery16.jpg', alt: 'A woven basket of dry fodder beside fresh grass',
  },
  {
    key: 'water', icon: Droplets, no: '02', title: 'Clean water', hindi: 'Jal',
    text: 'Rajasthan summers are harsh. Fresh, clean drinking water is kept available through the day so no cow ever goes thirsty.',
    points: ['Clean troughs, refilled through the day', 'Cool, shaded drinking points', 'Extra attention in peak summer'],
    shape: 'portrait', image: '/images/gausevarth gallery17.jpg', alt: 'A black and white cow resting calmly',
  },
  {
    key: 'medical', icon: Stethoscope, no: '03', title: 'Medical care', hindi: 'Upchar',
    text: 'Cows that are sick, injured or weak need proper treatment, medicines and time to recover. That is what we work to give them.',
    points: ['Treatment for injured and sick cows', 'Medicines and follow-up care', 'Rest and recovery in a quiet space'],
    shape: 'square', image: '/images/gausevarth gallery15.jpg', alt: 'A gentle white cow resting with a brass bell',
  },
  {
    key: 'shelter', icon: Warehouse, no: '04', title: 'Shelter', hindi: 'Ashray',
    text: 'A safe, shaded and clean place to rest, protected from the heat of the day and the cold of the night.',
    points: ['Shaded sheds against the sun', 'Warm, dry resting space in winter', 'A safe home for abandoned cows'],
    shape: 'landscape', image: '/images/gausevarth gallery18.jpg', alt: 'A brown cow resting on straw',
  },
]

// photo back-colours: champagne gold, sage teal, rose, clay (match the row tints in gs-pages-premium.css)
const rowColors = { fodder: '#e9c87a', water: '#9cc9b8', medical: '#e7a9a0', shelter: '#d8b08a' }

const day = [
  { icon: Sunrise, time: 'Sunrise', title: 'Morning feed', text: 'The herd is greeted, fed and given fresh water before the day heats up.' },
  { icon: Sun, time: 'Mid-morning', title: 'Care & cleaning', text: 'Sheds are cleaned, calves are checked and any cow that needs treatment is seen to.' },
  { icon: Wheat, time: 'Afternoon', title: 'Rest in the shade', text: 'Cows rest while fodder is prepared and water points are topped up.' },
  { icon: Sunset, time: 'Evening', title: 'Second feed', text: 'Another round of fodder and water, with a last look at every cow.' },
  { icon: Moon, time: 'Night', title: 'Safe and sound', text: 'Everyone is settled in a safe, covered shelter for the night.' },
]

const valueIcons = [ShieldCheck, HeartHandshake, CheckCircle2, UsersRound]
// wine, rose, champagne, sage
const valueColors = ['#8c2543', '#e7b5b1', '#f0dcae', '#cfe0d3']

export default function Initiatives() {
  const { values } = foundationContent
  return (
    <Page theme="brown">
      <PageHero
        kicker="What we do"
        title="What We Do"
        lead="Four simple things keep a cow well: good food, clean water, proper treatment and a safe place to rest. This is the work we do, quietly, every day."
      >
        <Link to="/donate" className="gs-btn gs-btn-sun" data-magnet><Heart size={17} fill="currentColor" /> Support our work</Link>
        <Link to="/campaigns" className="gs-btn gs-btn-ghost" data-magnet>See campaigns</Link>
      </PageHero>

      <Marquee className="gs-m-sun" items={['Fodder', 'Clean water', 'Medical care', 'Shelter']} />

      {/* four ways we care */}
      <section className="gp-section gp-work" aria-labelledby="work-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Our initiatives</span>
          <h2 id="work-title"><Split text="Four ways we care." /></h2>
        </header>

        <div className="gp-rows">
          {work.map((w, i) => (
            <article key={w.key} className={`gp-row gp-row-${w.key} ${i % 2 ? 'is-flip' : ''}`}>
              <div className="gp-row-photo" data-anim={i % 2 ? 'left' : 'right'}>
                <span className="gp-row-no">{w.no}</span>
                <ShapePhoto src={w.image} alt={w.alt} shape={w.shape} color={rowColors[w.key]} />
              </div>
              <div className="gp-row-body" data-anim="up" style={{ '--d': '120ms' }}>
                <span className="gp-pill"><w.icon size={16} /> {w.hindi}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <ul>
                  {w.points.map(p => <li key={p}><CheckCircle2 size={18} /> {p}</li>)}
                </ul>
                <Link to="/donate" className="gs-link">Help with {w.title.toLowerCase()} <ArrowUpRight size={18} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* a day at the gaushala */}
      <section className="gp-section gp-day" aria-labelledby="day-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">A typical day</span>
          <h2 id="day-title"><Split text="From sunrise to sunset." /></h2>
        </header>
        <ol className="gp-day-track">
          {day.map(({ icon: Icon, time, title, text }, i) => (
            <li key={time} data-anim="up" style={{ '--d': `${i * 110}ms`, '--k': i }}>
              <span className="gp-day-ico"><Icon size={26} /></span>
              <small>{time}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* values */}
      <section className="gp-section gp-values" aria-labelledby="values-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">How we work</span>
          <h2 id="values-title"><Split text="Our promise to you." /></h2>
        </header>
        <div className="gp-tiles">
          {values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length]
            return (
              <article key={v.title} className="gp-tile" data-anim="rotate" style={{ '--d': `${i * 100}ms`, '--tile': valueColors[i % valueColors.length], '--rot-from': `${i % 2 ? 8 : -8}deg` }}>
                <Icon size={30} />
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <CtaBand
        title="Be part of the daily care."
        text="Every rupee goes towards fodder, water, medicines and shelter for the cows."
        primary={{ to: '/donate', label: 'Donate now' }}
        secondary={{ to: '/get-involved', label: 'Other ways to help' }}
      />
    </Page>
  )
}