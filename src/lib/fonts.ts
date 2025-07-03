import localFont from 'next/font/local'

export const montserrat = localFont({
  variable: '--font-montserrat',
  src: [
    {
      path: '../../public/fonts/montserrat.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/montserrat-italic.ttf',
      style: 'italic',
    },
  ],
})

export const playwrite = localFont({
  variable: '--font-playwrite',
  src: '../../public/fonts/playwrite.ttf',
  style: 'normal',
})
