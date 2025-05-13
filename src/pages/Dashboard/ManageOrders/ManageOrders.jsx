import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import TableLoading from "../../../components/Shared/TableLoading/TableLoading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  console.log(orders);
  // handle row click
  const handleRowCLick = (id) => {
    navigate(`/orders/${id}`);
  };

  const handleChangeStatus = async (e, id) => {
    const status = e.target.value;
    const res = await axiosSecure.patch(`/payments/${id}`, {
      status,
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: "Updated!",
        text: "Order status updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  // table style
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#07174e",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // styled table row
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <div>
      <h1 className="text-2xl">Manage Orders</h1>
      <TableContainer component={"Paper"}>
        <Table sx={{ minWidth: "492px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell>#ORDER ID</StyledTableCell>
              <StyledTableCell align="center">#TRANSACTION ID</StyledTableCell>
              <StyledTableCell align="center">ORDER BY</StyledTableCell>
              <StyledTableCell align="center">ITEMS</StyledTableCell>
              <StyledTableCell align="center">TOTAL PRICE</StyledTableCell>
              <StyledTableCell align="center">ORDER STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          {isLoading && <TableLoading />}
          <TableBody>
            {orders?.map((order, i) => (
              <Tooltip
                title={currentRowIndex === i && "Click to view details"}
                arrow
                disableHoverListener={currentRowIndex === i && true}
                key={order._id}
              >
                <StyledTableRow
                  onMouseEnter={() => setCurrentRowIndex(i)}
                  onMouseLeave={() => setCurrentRowIndex(null)}
                  onClick={() => handleRowCLick(order._id)}
                  sx={{
                    "&:hover": {
                      boxShadow: "0px 0px 4px 4px rgba(0, 0, 0, 0.15)",
                      cursor: "pointer",
                    },
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{order._id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {order.transactionId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span className="block">{order.name}</span>
                    <span className="block">{order.email}</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.productIds?.length}
                    {order.productIds?.length > 1 ? " items" : " item"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span className="font-semibold">
                      ${parseInt(order.price)}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Click to change status" arrow>
                      <select
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => {
                          event.stopPropagation();
                          handleChangeStatus(event, order._id);
                        }}
                        onMouseEnter={() => setCurrentRowIndex(null)}
                        onMouseLeave={() => setCurrentRowIndex(order._id)}
                        defaultValue={order.status}
                        className="border-2 border-[#000f444f] focus:outline-none focus:border-[#000f4480] p-1 cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Canceled</option>
                      </select>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageOrders;
