import { makeStyles } from "@material-ui/core";
import NavBar from "../NavBar/NavBar";

const useStyles = makeStyles((theme: any) => ({
  pageContainer: {
    backgroundColor: theme.palette.layers.background,
  },
}));

interface PageWrapperProps {
  children: any;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <NavBar />
      {children}
    </div>
  );
}
