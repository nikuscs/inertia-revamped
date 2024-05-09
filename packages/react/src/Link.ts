import {
  type FormDataConvertible,
  type Method,
  type PreserveStateOption,
  type Progress,
  mergeDataIntoQueryString,
  router,
  shouldIntercept,
} from '@inertiajs-revamped/core'
import {
  type AllHTMLAttributes,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
  createElement,
  forwardRef,
  useCallback,
} from 'react'

const noop = () => undefined

export interface BaseInertiaLinkProps {
  as?: string
  data?: Record<string, FormDataConvertible>
  href: string
  method?: Method
  headers?: Record<string, string>
  onClick?: (event: MouseEvent) => void
  preserveScroll?: PreserveStateOption
  preserveState?: PreserveStateOption
  replace?: boolean
  only?: string[]
  onCancelToken?: { ({ cancel }: { cancel: VoidFunction }): void }
  onBefore?: () => void
  onStart?: () => void
  onProgress?: (progress: Progress) => void
  onFinish?: () => void
  onCancel?: () => void
  onSuccess?: () => void
  onError?: () => void
  queryStringArrayFormat?: 'indices' | 'brackets'
}

export type InertiaLinkProps = BaseInertiaLinkProps &
  Omit<HTMLAttributes<HTMLElement>, keyof BaseInertiaLinkProps> &
  Omit<AllHTMLAttributes<HTMLElement>, keyof BaseInertiaLinkProps>

const Link: ForwardRefExoticComponent<
  InertiaLinkProps & RefAttributes<unknown>
> = forwardRef<unknown, InertiaLinkProps>(
  (
    {
      children,
      as = 'a',
      data = {},
      href,
      method = 'get',
      preserveScroll = false,
      preserveState = null,
      replace = false,
      only = [],
      headers = {},
      queryStringArrayFormat = 'brackets',
      onClick = noop,
      onCancelToken = noop,
      onBefore = noop,
      onStart = noop,
      onProgress = noop,
      onFinish = noop,
      onCancel = noop,
      onSuccess = noop,
      onError = noop,
      ...props
    },
    ref
  ) => {
    const visit = useCallback(
      (event: MouseEvent) => {
        onClick(event)

        if (shouldIntercept(event)) {
          event.preventDefault()

          router.visit(href, {
            data,
            method,
            preserveScroll,
            preserveState: preserveState ?? method !== 'get',
            replace,
            only,
            headers,
            onCancelToken,
            onBefore,
            onStart,
            onProgress,
            onFinish,
            onCancel,
            onSuccess,
            onError,
          })
        }
      },
      [
        data,
        href,
        method,
        preserveScroll,
        preserveState,
        replace,
        only,
        headers,
        onClick,
        onCancelToken,
        onBefore,
        onStart,
        onProgress,
        onFinish,
        onCancel,
        onSuccess,
        onError,
      ]
    )

    as = typeof as === 'string' ? as.toLowerCase() : as
    method = method.toLowerCase() as Method
    const [_href, _data] = mergeDataIntoQueryString(
      method,
      href || '',
      data,
      queryStringArrayFormat
    )
    href = _href
    data = _data

    if (as === 'a' && method !== 'get') {
      console.warn(
        `Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues. Please specify a more appropriate element using the "as" attribute. For example: <Link href="${href}" method="${method}" as="button">...</Link>`
      )
    }

    return createElement(
      as,
      {
        ...props,
        ...(as === 'a' ? { href } : { role: 'link' }),
        ref,
        onClick: visit,
      },
      children
    )
  }
)

Link.displayName = 'InertiaLink'

export { Link }
