import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NOT_FOUND_META, OG_IMAGE_PATH, ROUTES, SITE_NAME, SITE_URL } from './routes'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/* Updates <title>, description, canonical, Open Graph and breadcrumb data on
   every route change. Renders nothing. */
export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
    const known = ROUTES[path]
    const meta = known || NOT_FOUND_META
    const origin = SITE_URL || window.location.origin
    const url = `${origin}${path === '/' ? '/' : path}`
    const image = `${origin}${OG_IMAGE_PATH}`

    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', known ? 'index, follow' : 'noindex, follow')
    setLink('canonical', url)

    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', image)

    if (known && path !== '/') {
      setJsonLd('ld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: known.label, item: url },
        ],
      })
    } else {
      setJsonLd('ld-breadcrumb', null)
    }
  }, [pathname])

  return null
}
