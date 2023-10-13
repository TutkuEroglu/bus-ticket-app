import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { UserProvider } from "@/context/UserContext"
import Alerts from "../components/Alerts"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Alerts/>
      <Component {...pageProps} />
    </UserProvider>
  )
}