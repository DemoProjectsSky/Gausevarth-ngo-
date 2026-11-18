import { Component } from 'react'

/* Catches rendering errors and failed page downloads (for example right after a new deploy),
   and shows a friendly screen with a reload button instead of a blank page. */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.error('Page error:', error)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="error-screen" role="alert">
        <h1>Something went wrong</h1>
        <p>The page could not be loaded. Please check your internet connection and try again.</p>
        <div>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Reload page</button>
          <a className="btn btn-secondary" href="/">Go to home</a>
        </div>
      </section>
    )
  }
}
