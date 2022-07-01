import { ChakraProvider, ColorModeScript, DarkMode, extendTheme } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { theme } from '../styles/theme'

interface Props {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: Props): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp