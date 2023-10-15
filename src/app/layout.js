import './globals.css'

export const metadata = {
  title: 'Genshin Grind - Farming Schedule Generator',
  description: 'Farming Schedule Generator for Genshin Impact.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
