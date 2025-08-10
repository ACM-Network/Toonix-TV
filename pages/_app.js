// pages/_app.js
import '../styles/globals.css' // create this file if you don't have it

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
