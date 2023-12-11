import { FC } from "react";
import {Box, Typography} from "@mui/material";

const Navbar: FC = () => {
  return (
    <Box sx={{
      height: 64,
      position: "fixed",
      backgroundColor: "primary.main",
      color: "primary.contrastText",
      width: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 1,
      boxShadow: 1,
    }}>
      <Typography>Trip Planner</Typography>
    </Box>
  )
}

export default Navbar
