// Warms up page chunks so navigation feels instant.
// Vite reuses these chunks for the React.lazy() imports in App.jsx.
const loaders = {
  '/about': () => import('./pages/AboutUs'),
  '/our-work': () => import('./pages/Initiatives'),
  '/campaigns': () => import('./pages/Campaigns'),
  '/gallery': () => import('./pages/Gallery'),
  '/get-involved': () => import('./pages/GetInvolved'),
  '/contact': () => import('./pages/Contact'),
  '/donate': () => import('./pages/donate'),
}

const done = new Set()

export function prefetch(path) {
  if (done.has(path) || !loaders[path]) return
  done.add(path)
  loaders[path]().catch(() => done.delete(path))
}

// After the first page has loaded and the browser is idle, fetch the other pages quietly.
export function prefetchAllWhenIdle() {
  const conn = navigator.connection
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return
  const run = () => Object.keys(loaders).forEach(prefetch)
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2500)
}
