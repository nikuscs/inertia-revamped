import type {
  HeadManagerTitleCallback,
  Page,
  PageResolver,
  ProgressCallback,
} from '@inertiajs-revamped/core'
import { type Plugin, type App as VueApp, createSSRApp, h } from 'vue'
import { App, plugin } from './app'
import type { InertiaComponentType } from './types'

export interface CreateInertiaAppProps {
  id?: string
  resolve: PageResolver<InertiaComponentType>
  setup: (props: {
    el: HTMLElement | null
    App: typeof App
    props: InstanceType<typeof App>['$props']
    plugin: Plugin
  }) => void | VueApp
  title?: HeadManagerTitleCallback
  progress?: ProgressCallback
  page?: Page
  render?: (app: VueApp) => Promise<string>
}

export async function createInertiaApp({
  id = 'app',
  resolve,
  setup,
  title,
  progress,
  page,
  render,
}: CreateInertiaAppProps): Promise<
  { head: string[]; body: string } | undefined
> {
  const isServer = typeof window === 'undefined'
  const el: HTMLElement | null = isServer
    ? null
    : <HTMLElement>document.getElementById(id)
  const initialPage: Page = page || JSON.parse(el?.dataset.page as string)

  const resolveComponent = (name: string) =>
    Promise.resolve(resolve(name)).then((module) => {
      return typeof module === 'object' && !!module && 'default' in module
        ? module.default
        : module
    })

  let head: string[] = []

  const vueApp = await resolveComponent(initialPage.component).then(
    (initialComponent) => {
      return setup({
        el,
        App,
        props: {
          initialPage,
          initialComponent,
          resolveComponent,
          titleCallback: title,
          onHeadUpdate: isServer ? (elements) => (head = elements) : null,
        },
        plugin,
      })
    }
  )

  if (!isServer && progress) {
    progress()
  }

  if (isServer && render) {
    const body = await render(
      createSSRApp({
        render: () =>
          h('div', {
            id,
            'data-page': JSON.stringify(initialPage),
            innerHTML: vueApp ? render(vueApp) : '',
          }),
      })
    )

    return { head, body }
  }
}
