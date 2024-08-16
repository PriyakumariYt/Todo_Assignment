
import { extendTheme } from '@chakra-ui/react';

const Darkmode = extendTheme({
  config: {
    initialColorMode: 'light', 
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      500: '#4A54A3', 
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
        },
      },
    },
  },
});
export default Darkmode;
