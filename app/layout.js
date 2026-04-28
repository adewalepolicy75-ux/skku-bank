import "./globals.css";
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Wire Transfer Bank - The money app for Africans',
  description: 'Send and receive money instantly with Wire Transfer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en"><head><script src="https://cdn.tailwindcss.com"></script></head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
