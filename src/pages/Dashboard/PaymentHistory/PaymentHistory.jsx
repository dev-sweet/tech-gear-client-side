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
} from "@mui/material";
import { Link } from "react-router-dom";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments, refech } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  //   styled tablecell for cart
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "black",
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
  return payments?.length > 0 ? (
    <div>
      <h2 className="text-3xl text-center">Payment History</h2>
      <div>
        <TableContainer component={"Paper"}>
          <Table
            sx={{ minWidth: 700, overflowX: "scroll" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="left">TRANSACTION ID </StyledTableCell>
                <StyledTableCell align="left">EMAIL</StyledTableCell>
                <StyledTableCell align="left">NAME</StyledTableCell>
                <StyledTableCell align="left">PRICE</StyledTableCell>
                <StyledTableCell align="left">STATUS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments?.map((item, i) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {item.transactionId}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.email}</StyledTableCell>
                  <StyledTableCell align="left">{item.name}</StyledTableCell>
                  <StyledTableCell align="left">{item.price}</StyledTableCell>
                  <StyledTableCell align="left">{item.status}</StyledTableCell>
                </StyledTableRow>
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

      <Link className="mt-6 px-6 py-3 bg-[#07174e] text-white text-lg font-medium rounded-lg shadow-md hover:bg-[#242283] transition">
        Shop Now
      </Link>
    </div>
  );
};

export default PaymentHistory;
