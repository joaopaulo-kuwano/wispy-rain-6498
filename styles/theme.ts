import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: {
        height: '100%'
      },
      body: {
        height: '100%',
        margin: 0,
        'fontFamily': 'Roboto -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        'box-sizing': 'border-box'
      },
      code: {
        'font-family': 'source-code-pro, Menlo, Monaco, Consolas, monospace'
      },
      '#__next': {
        height: '100%'
      }
    }
  }
})

export const HiddenScrollbarCSS = {
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { background: "gray", borderRadius: '24px' }
}