import {
  Grid
} from "@material-ui/core";

export default function TypingIcon() {

  return (
    <Grid
      item
      >
      <svg id="dots" xmlns="http://www.w3.org/2000/svg" width="32" height="8" viewBox="0 0 32 8">
        <circle id="dot" cx="4" cy="4" r="4" transform="translate(24)" fill="#fff" opacity="0.304"/>
        <circle id="dot-2" data-name="dot" cx="4" cy="4" r="4" transform="translate(12)" fill="#fff" opacity="0.304"/>
        <circle id="dot-3" data-name="dot" cx="4" cy="4" r="4" fill="#fff" opacity="0.304"/>
      </svg>
    </Grid>
  )
}