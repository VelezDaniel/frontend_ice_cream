import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e3faff',
      main: '#37dbff',
      dark: '#033249',
      contrastText: '#fff',
      bgLight: '#ebfffe',
      bgMediumLight: '#8efbff',
      btnHomeHover: '#dfdfdf67',
      colorBtnsForms: '#0D5D7D',
      colorDisable: '#4c8bd4',
    },
    secondary: {
      light: '#0c7676',
      main: '#8efbff',
      dark: '#0091c0',
      contrastText: '#272727',
      roseColor: '#f73378',
    },
    error: {
      main: '#ff3131',
      dark: '#703131',
    },
  },
});

export default theme;