# Changelog - @inertiajs-revamped/vue

## 0.1.0 (2024-04-25)

### Bug Fixes

- fix all type errors in link.ts ([cd6d756](https://github.com/inertiajs-revamped/inertia/commit/cd6d756))
- use `PreserveStateOption` from core package ([9df6050](https://github.com/inertiajs-revamped/inertia/commit/9df6050))
- remove invalid type assignments for link ([ef503f2](https://github.com/inertiajs-revamped/inertia/commit/ef503f2))
- add missing event types ([7546bd1](https://github.com/inertiajs-revamped/inertia/commit/7546bd1))
- remove line breaks in link.ts warn, fixes minified bundle mess ([c9f9153](https://github.com/inertiajs-revamped/inertia/commit/c9f9153))
- fix `onCancelToken` type in link.ts ([5374426](https://github.com/inertiajs-revamped/inertia/commit/5374426))
- fix type errors & remove invalid type assignments ([3e29b0b](https://github.com/inertiajs-revamped/inertia/commit/3e29b0b))
- add missing string types in remember.ts ([ad3b6d9](https://github.com/inertiajs-revamped/inertia/commit/ad3b6d9))
- re-export all types from core package ([a716e00](https://github.com/inertiajs-revamped/inertia/commit/a716e00))
- check for `undefined` in `useRemember()`, fixes multiple ts(2722) ([ed15c23](https://github.com/inertiajs-revamped/inertia/commit/ed15c23))
- remove useless rename of `default` export in server.ts ([22e17de](https://github.com/inertiajs-revamped/inertia/commit/22e17de))
- ensure that all imports used only as a type use a type-only `import` ([bb5bc8d](https://github.com/inertiajs-revamped/inertia/commit/bb5bc8d))

### Builds

- add @vue/runtime-core to `devDependencies` ([37025d9](https://github.com/inertiajs-revamped/inertia/commit/37025d9))

### Code Refactoring

- add `InertiaComponentType` type ([52a1bfc](https://github.com/inertiajs-revamped/inertia/commit/52a1bfc))
- replace inline types with types from core package ([dfef9b3](https://github.com/inertiajs-revamped/inertia/commit/dfef9b3))
- restructure exports ([0b03808](https://github.com/inertiajs-revamped/inertia/commit/0b03808))

### Features

- add aria-role for non anchor `<Link>` tags (based on [inertia/pull/1762](inertiajs/inertia#1762)) ([67c251b](https://github.com/inertiajs-revamped/inertia/commit/67c251b))
- check `as`, before convert to lowercase (based on [inertia/pull/1297](inertiajs/inertia#1297)) ([87b6d12](https://github.com/inertiajs-revamped/inertia/commit/87b6d12))
- export function `resolvePageComponent` from core ([bf52de5](https://github.com/inertiajs-revamped/inertia/commit/bf52de5))