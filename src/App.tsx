import { ThemeProvider } from "@material-ui/core/styles";
import PageWrapper from "./Components/AllPages/Formatting/PageWrapper";
import theme from "./Components/AllPages/Theme";
import DashBoard from "./Components/DashBoard/DashBoard";

const backgroundColor = "white";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <style>{`body { margin: 0; background-color: ${backgroundColor} }`}</style>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <PageWrapper>
        <DashBoard />
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
