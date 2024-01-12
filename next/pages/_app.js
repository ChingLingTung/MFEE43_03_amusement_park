import '@/styles/globals.css'
import { ThemeContextProvider } from "@/context/theme-context";
import { AuthContextProvider } from "@/context/auth-context";
import { SearchContextProvider} from "@/hook/use-search"



export default function App({ Component, pageProps }) {
  return (
    // <SearchContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </AuthContextProvider>
    // </SearchContextProvider> 
  )
}
