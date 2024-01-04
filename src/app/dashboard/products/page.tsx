"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Products from "@/components/Products";
import { getAllProducts } from "@/services/product.service";
import toast from "react-hot-toast";
import { Product } from "@/models/product";

export default function ProductsLayout() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {products && <Products products={products} />}
        </Paper>
      </Grid>
    </Grid>
  );
}
