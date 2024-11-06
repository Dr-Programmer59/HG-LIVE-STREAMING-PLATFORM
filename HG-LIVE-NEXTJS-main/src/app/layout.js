import { Suez_One} from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StoreProvider from '@/components/StoreProvider'
import UserProvider from '@/components/UserProvider'
import ProtectedRoute from '@/components/ProtectedRoute'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MessageProvider from '@/components/MessageProvider'
import { SocketProvider } from '@/Context/socketProvider'

const suez_One = Suez_One({ subsets: ['latin'],weight: ['400'] })

export const metadata = {
  title: 'HG Live',
  description: 'HG Live is for streaming',
}

export default function RootLayout({ children }) {
  return (
        <StoreProvider>
          <UserProvider>
            <ProtectedRoute>
              <MessageProvider>
                <html lang="en">
                  <body className={suez_One.className}>
                      <Header/>
                        {children}
                      <Footer/>
                      <ToastContainer
                          position="top-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored"
                      />
                  </body>
                </html>
              </MessageProvider>
            </ProtectedRoute>
          </UserProvider>
        </StoreProvider>
  )
}
