import './globals.css'
import Navbar from "./components/navbar"
import { PageContextProvider } from './context/pageContext'

export const metadata = {
  title: 'Dienstplanung',
  description: 'WebApp zur Dienstplanung der Klinik für Innere Medizin des KMG-Klinikum Güstrow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className="bg-slate-700 text-gray-200">
      <PageContextProvider>
      <Navbar/>
      {children}
      </PageContextProvider>
      </body>
    </html>
  )
}
