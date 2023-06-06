import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";

const Filters = ({
  searchDate,
  setSearchDate,
  applyFilters,
  category,
  setCategory,
  sources,
  setSources,
}) => {
  return (
    <Grid
      container
      sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 2, mt: 0.1 }}
      p={2}
      spacing={2}
    >
      <Grid item xs={12}>
        <TextField
          sx={{ backgroundColor: "white" }}
          fullWidth
          label="Search By Category"
          id="SearchHere"
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ backgroundColor: "white" }}
          fullWidth
          label="Search By Sources"
          id="SearchHere"
          size="small"
          onChange={(e) => setSources(e.target.value)}
          value={sources}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ backgroundColor: "white" }}
          fullWidth
          size="small"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="contained"
          onClick={applyFilters}
        >
          Apply filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
