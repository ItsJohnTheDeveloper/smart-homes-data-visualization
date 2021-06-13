import { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
} from "@material-ui/core";

import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectorStyle: {
    color: theme.palette.text.primary,
  },
  loadingIconWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  loadingIcon: {
    color: theme.palette.text.theme,
  },
}));

interface SelectorProps {
  title: string;
  objProp: any;
  getData: any;
  value: string;
  setValue: any;
  refresh?: string;
}

export default function Selector({
  title,
  objProp,
  getData,
  value,
  setValue,
  refresh = "",
}: SelectorProps) {
  const classes = useStyles();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    console.log(refresh);
    const getInitialData = async () => {
      getAndSetData();
    };
    getInitialData();
  }, [refresh]);

  const getAndSetData = async () => {
    try {
      const data = await getData();
      const parsedData = JSON.parse(JSON.stringify(data));
      setList(parsedData);
      setLoading(false);
    } catch (err) {
      console.log("an error occured getting data");
      setLoading(false);
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="input-label">{title}</InputLabel>
        <Select
          labelId="select-id"
          id={`${title} - selector`}
          value={value}
          onChange={handleChange}
        >
          {loading ? (
            <div className={classes.loadingIconWrapper}>
              <CircularProgress className={classes.loadingIcon} />
            </div>
          ) : (
            list.map((item: any) => {
              return (
                <MenuItem
                  className={classes.selectorStyle}
                  value={item[objProp]}
                  key={item[objProp]}
                  defaultValue=""
                >
                  {item[objProp]}
                </MenuItem>
              );
            })
          )}
        </Select>
      </FormControl>
    </div>
  );
}
