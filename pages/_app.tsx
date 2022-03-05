import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@material-tailwind/react/tailwind.css";
import 'tailwindcss/tailwind.css';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp