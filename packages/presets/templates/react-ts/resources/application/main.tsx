// @ts-nocheck
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import './app.css'

createInertiaApp({
  progress: () =>
    createProgress({
      delay: 250,
    }),
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../views/pages/${name}.tsx`,
      import.meta.glob('../views/pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    hydrateRoot(
      // we are save here
      el!,
      <StrictMode>
        <App {...props} />
      </StrictMode>
    )
  },
})
