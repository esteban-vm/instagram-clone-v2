const url = (p: string) => process.env['NEXT_PUBLIC_APP_BASE_URL'] + p

const make = (p: string) => ({
  path: p,
  url: url(p),
  URL: () => new URL(url(p)),
})

export const paths = {
  ...make(''),
  locale: (locale: string) => ({
    ...make('' + ('/' + locale)),
    login: {
      ...make('' + ('/' + locale) + '/login'),
    },
    register: {
      ...make('' + ('/' + locale) + '/register'),
    },
    components: {
      atoms: make('' + ('/' + locale) + '/_components' + '/atoms'),
      molecules: make('' + ('/' + locale) + '/_components' + '/molecules'),
    },
    scene: {
      ...make('' + ('/' + locale) + '/scene'),
      components: {
        atoms: make('' + ('/' + locale) + '/scene' + '/_components' + '/atoms'),
        molecules: make('' + ('/' + locale) + '/scene' + '/_components' + '/molecules'),
        organisms: make('' + ('/' + locale) + '/scene' + '/_components' + '/organisms'),
      },
    },
  }),
}
