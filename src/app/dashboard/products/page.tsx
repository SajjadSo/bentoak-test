import Products from "@/components/Products";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function ProductsLayout() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Products />
        </Paper>
      </Grid>
    </Grid>
  );
}
