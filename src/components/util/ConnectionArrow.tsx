import {FC} from "react";
import {Box} from "@mui/material";
import ConnectionArrowIcon from "./ConnectionArrow.svg"

const ConnectionArrow: FC = () => {
  return <Box sx={{
    color: (theme) => theme.palette.text.secondary,
    height: 32,
    pl: 1,
    pr: 1,
  }}>
    <ConnectionArrowIcon height={32} fill={"currentColor"}/>
  </Box>
}

export default ConnectionArrow
