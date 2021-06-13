import { createMuiTheme } from "@material-ui/core/styles";

const colors = {
  white: "#FFFFFF",
  offwhite: "#EFEFEF",
  black: "#000000",

  theme: "#4c68d6",
  theme2: "#4c68d642",
  grey1: "#eff1fe",
  grey2: "#6f6f6f",
};

const theme = createMuiTheme({
  palette: {
    layers: {
      background: colors.white,
      foreground1: colors.grey1,
      foreground2: colors.grey2,
      theme: colors.theme,
      lighterTheme: colors.theme2,
    },
    text: {
      primary: colors.black,
      offGrey: colors.grey2,
      offwhite: colors.offwhite,
      theme: colors.theme,
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
