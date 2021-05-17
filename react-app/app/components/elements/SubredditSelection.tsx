import { InputLabel, MenuItem, Select, FormControl, Input, makeStyles } from "@material-ui/core";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 200,
  }
}));

const subreddits = [
  'r/wallstreetbets',
  'r/CanadianInvestor',
  'r/investing',
  'r/smallstreetbets',
  'r/stocks',
  'r/stockmarket',
]

interface Props{
  subreddits: string[],
  updateSubreddits: any,
}
  
export default function SubredditSelection(props: Props){
  const classes = useStyles()

  const handleSubredditsChanged = (event) => {
    props.updateSubreddits(event.target.value);
  }

  return(
    <FormControl className={classes.formControl}>
        <InputLabel id="subreddit-selection-label">SubReddits</InputLabel>
        <Select
          labelId="subreddit-selection-label"
          id="subreddit-selection"
          multiple
          onChange={handleSubredditsChanged}
          value={props.subreddits}
          input={<Input />}
        >
          {subreddits.map((subreddit) => (
            <MenuItem key={subreddit} value={subreddit}>
              {subreddit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}