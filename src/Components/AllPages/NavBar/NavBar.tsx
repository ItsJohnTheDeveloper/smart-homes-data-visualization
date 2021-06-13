import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.layers.foreground1,
    color: theme.palette.text.offGrey,
    fontFamily: theme.typography.fontFamily.primary,
    display: "flex",
    placeContent: "space-between",
    padding: "38px 34px",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Smart Homes Data Visualization</div>
    </div>
  );
}
