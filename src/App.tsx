import { Box } from "@mui/material";
import React from "react";
import FSTextField from "./Common/TextBoxStyle";
const title = require("./images/title.png");
function App(): JSX.Element {
  React.useEffect(() => {
    document.title = "Pokedex";
  });
  return (
    <div className="topLevelDiv">
      <div className="MainBox">
        <img src={title} alt="title" />
        <Box
          component="form"
          sx={{ display: "flex", mb: 1 }}
          noValidate
          autoComplete="off"
          className="centerDiv--DictVersion"
        >
          <FSTextField
            sx={{ mr: 2, width: 350 }}
            id="reddit-input"
            label="Pokemon name"
            variant="filled"
          />
        </Box>
      </div>
    </div>
  );
}

export default App;
