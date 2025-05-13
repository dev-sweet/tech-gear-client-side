import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

const TableLoading = ({ rows = 5, columns = 5 }) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((col, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton height={40} width="100%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoading;
