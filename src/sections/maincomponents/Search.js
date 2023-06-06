import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";

const Search = ({ searchquery, setSearchQuery, searchByKeyword }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        <TextField
          sx={{ backgroundColor: "white" }}
          fullWidth
          label="Search Here By Keyword"
          id="SearchHere"
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchquery}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          //   loading={true}
          onClick={searchByKeyword}
        >
          Click here
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
