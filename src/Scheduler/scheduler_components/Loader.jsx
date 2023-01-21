import React from "react";
import { Box, CircularProgress } from "@mui/material";
function Loader() {
  return (
    <Box mt={25}>
      {" "}
      <CircularProgress size={"130px"} />
    </Box>
  );
}

export default Loader;
