import React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Product } from "@/models/product";

interface Props {
  products: Product[];
}

export default function Products({ products }: Props) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom></Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>title</TableCell>
            <TableCell>price</TableCell>
            <TableCell>brand</TableCell>
            <TableCell>category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
