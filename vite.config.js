
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import contactHandler from './api/contact.js'

// Load environment variables from project root .env
dotenv.config()

function contactApiPlugin() {
  return {
    name: 'contact-api',

    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        const apiResponse = {
          status(statusCode) {
            res.statusCode = statusCode
            return this
          },
          json(data) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(data))
          },
        }

        if (req.method !== 'POST') {
          void contactHandler(req, apiResponse)
          return
        }

        let body = ''
        req.setEncoding('utf8')

        req.on('data', chunk => {
          body += chunk
        })

        req.on('end', () => {
          try {
            req.body = body ? JSON.parse(body) : {}
          } catch {
            apiResponse.status(400).json({
              success: false,
              message: 'Invalid JSON request body.',
            })
            return
          }

          Promise.resolve(contactHandler(req, apiResponse)).catch(error => {
            server.config.logger.error('Contact API failed:', error)

            if (!res.headersSent) {
              apiResponse.status(500).json({
                success: false,
                message: 'Unable to send your message right now. Please try again later.',
              })
            }
          })
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), contactApiPlugin()],
})
