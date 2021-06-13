import { createMuiTheme } from "@material-ui/core/styles";

const colors = {
  white: "#FFFFFF",
  offwhite: "#EFEFEF",
  black: "#000000",

  theme: "#5b7bfb",
  grey1: "#eff1fe",
};

const theme = createMuiTheme({
  palette: {
    layers: {
      background: colors.white,
      foreground1: colors.grey1,
    },
    text: {
      primary: colors.black,
      offwhite: colors.offwhite,
    },
  },
  typography: {
    fontFamily: {
      primary: "Arial, Arial, sans-serif",
    },
    fontSizes: {
      md: "1.000em", //16px
      lg: "1.0625em", //17px
      xl: "1.125em", //18px
      xxl: "1.250em", //20px
      xxxl: "1.500em", //24px
      xxxxl: "1.750em", //28px
      xxxxxl: "2.000em", //32px
    },
  },
});

export default theme;
