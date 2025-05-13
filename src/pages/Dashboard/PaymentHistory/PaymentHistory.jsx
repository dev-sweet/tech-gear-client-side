import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
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
import { Link, useNavigate } from "react-router-dom";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  console.log(payments);
  //   styled tablecell for cart
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#d7d1ff",
      color: "#5d5d5d",
      fontWeight: 700,
      // padding: "20px 0",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      // padding: "15px 0",
    },
  }));

  // styled table row
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      padding: "20px 0",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
      padding: "20px 10px",
    },
  }));
  return payments?.length > 0 ? (
    <div>
      <div className="lg:px-20 px-10 py-3 bg-gray-100 text-gray-700">
        <p className="font-bold">/cart /checkout</p>
        <h3 className="text-center text-2xl font-bold">Order History</h3>
      </div>
      <div className="mt-5">
        <TableContainer component={"Paper"}>
          <Table
            sx={{ minWidth: 700, overflowX: "scroll" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">#ORDER ID</StyledTableCell>
                <StyledTableCell align="center">TRANSACTION ID</StyledTableCell>
                <StyledTableCell align="center">ITEMS</StyledTableCell>
                <StyledTableCell align="center">TOTAL PRICE</StyledTableCell>
                <StyledTableCell align="center">DATE</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments?.map((item, i) => (
                <Tooltip title="Click to view details" arrow key={item._id}>
                  <StyledTableRow
                    onClick={() =>
                      navigate(`/dashboard/paymentHistory/${item._id}`)
                    }
                    sx={{
                      "&:hover": {
                        boxShadow: "0px 0px 4px 4px rgba(0, 0, 0, 0.15)",
                        cursor: "pointer",
                      },
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <span className="text-[12px]"># {item._id}</span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <span className="text-[12px]">
                        # {item.transactionId}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.productIds?.length}
                      {item.productIds?.length > 1 ? "items" : "item"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      $ {item.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {item.status === "pending" && (
                        <div className="max-w-25 bg-[#f39c12] py-2 rounded rounded-[20px] text-gray-200 font-bold">
                          Pending
                        </div>
                      )}
                      {item.status === "shipped" && (
                        <div className="max-w-25 bg-[#3498db] py-2 rounded rounded-[20px] text-gray-200 font-bold">
                          Shipped
                        </div>
                      )}
                      {item.status === "delivered" && (
                        <div className="max-w-25 bg-[#2ecc71] py-2 rounded rounded-[20px] text-gray-200 font-bold">
                          Delivered
                        </div>
                      )}
                      {item.status === "cancelled" && (
                        <div className="max-w-25 bg-[#e74c3c] py-2 rounded rounded-[20px] text-gray-200 font-bold">
                          Canceled
                        </div>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4555/4555974.png"
        alt="Empty Orders"
        className="w-40 h-40"
      />

      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        No Orders Yet
      </h2>
      <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>

      <Link className="mt-6 px-6 py-2 bg-[#07174e] text-white text-lg font-medium rounded-lg shadow-md hover:bg-[#000721] transition duration-2">
        Shop Now
      </Link>
    </div>
  );
};

export default PaymentHistory;
