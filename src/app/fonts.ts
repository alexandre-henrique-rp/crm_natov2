import { Roboto, Rubik } from 'next/font/google'

// const rubik = Rubik({
//   subsets: ['latin'],
//   variable: '--font-rubik',
// })

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '100',
})

export const fonts = {
  // rubik,
  roboto,
}