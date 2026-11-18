import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

/* Uses the phone's share sheet when available, otherwise copies the page link. */
export default function ShareButton({ title, text, className = '' }) {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* cancelled or blocked */ }
  }

  return (
    <button type="button" className={className} onClick={share}>
      {copied ? <Check size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
      <span>{copied ? 'Link copied' : 'Share this cause'}</span>
      <span className="sr-only" role="status">{copied ? 'Page link copied to clipboard' : ''}</span>
    </button>
  )
}
