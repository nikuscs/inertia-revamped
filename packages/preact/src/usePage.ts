import type { Page, PageProps } from '@inertiajs-revamped/core'
import { useContext } from 'preact/hooks'
import { PageContext } from './PageContext'

export function usePage<
  SharedProps extends PageProps = PageProps,
>(): Page<SharedProps> {
  // @ts-expect-error Satisfy TS if branch on line below
  const page: Page<SharedProps> = useContext(PageContext)

  if (!page) {
    throw new Error('usePage must be used within the Inertia component')
  }

  return page
}
