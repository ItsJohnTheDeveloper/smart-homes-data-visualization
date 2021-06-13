import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  pageContainer: {
    backgroundColor: theme.palette.layers.background,
    display: "flex",
    height: "100%",
    minHeight: "100vh",
  },
}));

interface PageWrapperProps {
  children: any;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const classes = useStyles();

  return <div className={classes.pageContainer}>{children}</div>;
}
