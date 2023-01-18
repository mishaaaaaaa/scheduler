import React from "react";
import { Stack, Button } from "@mui/material";
function TableButtonGroup({ clearTable, saveChanges }) {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ position: "absolute", right: 0 }}
      mt={3}
    >
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={clearTable}
      >
        Clear
      </Button>
      <Button variant="contained" size="large" onClick={saveChanges}>
        Save Changes
      </Button>
    </Stack>
  );
}

export default TableButtonGroup;
