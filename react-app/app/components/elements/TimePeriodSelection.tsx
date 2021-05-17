import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 200,
  }
}));

export enum Period {
  OneDay = 1,
  FiveDays = 5, 
  OneMonth = 31,
  SixMonths = 186,
  OneYear = 365,
  FiveYears = 1825,
}

interface Props{
  readonly period: Period;
  readonly updatePeriod: any;
}

export default function TimePeriodSelection(props: Props){
  const classes = useStyles();

  const handleDayChanged = (event) => {
    props.updatePeriod(event.target.value);
  }

  return(
    <FormControl className={classes.formControl}>
      <InputLabel id="period-label">Period</InputLabel>
      <Select labelId="period-label" id="period-select" value={props.period} onChange={handleDayChanged}>
        <MenuItem value={Period.OneDay}>1 Day</MenuItem>
        <MenuItem value={Period.FiveDays}>5 Days</MenuItem>
        <MenuItem value={Period.OneMonth}>1 Month</MenuItem>
        <MenuItem value={Period.SixMonths}>6 Months</MenuItem>
        <MenuItem value={Period.OneYear}>1 Year</MenuItem>
        <MenuItem value={Period.FiveYears}>5 Years</MenuItem>
      </Select>
    </FormControl>
  );
}

