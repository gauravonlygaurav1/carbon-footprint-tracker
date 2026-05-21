import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'

function RootLayout() {
  return (
    <div>
        <Toaster/>
        <Navbar/>
        <main className="pt-8">
        <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout