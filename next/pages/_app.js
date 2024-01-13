import '@/styles/globals.css'
import { ThemeContextProvider } from "@/context/theme-context";
import { AuthContextProvider } from "@/context/auth-context";




export default function App({ Component, pageProps }) {
  return (

      <AuthContextProvider>
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </AuthContextProvider>

  )
}
