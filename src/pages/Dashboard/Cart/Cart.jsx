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
import useCart from "../../../hooks/useCart";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PageTitle from "../../../components/Shared/PageTitle/PageTitle";
const Cart = () => {
  const [cart, , refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07174e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/carts/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your cart has been deleted.",
            icon: "success",
            timer: "1500",
            showConfirmButton: false,
          });
          refetch();
        }
      }
    });
  };
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

  return (
    <div>
      <PageTitle />
      <div className="bg-[#07174e] flex items-center justify-between pb-5 text-white px-20 mb-5">
        <h3 className="text-3xl">My cart: {cart.length}</h3>
        <h3 className="text-3xl">Total Prices: ${}</h3>
        <button className="bg-yellow-800 text-white font-bold p-3 rounded cursor-pointer">
          Checkout
        </button>
      </div>
      <TableContainer component={"Paper"}>
        <Table
          sx={{ minWidth: 700, overflowX: "scroll" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">ITEM IMAGE</StyledTableCell>
              <StyledTableCell align="left">ITEM NAME</StyledTableCell>
              <StyledTableCell align="left">PRICE</StyledTableCell>
              <StyledTableCell align="left">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <img
                    className="w-[50px] h-[50px]"
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6_CFHvfQ-ejBLt7AJLrlaUzR44ASJe8rog&s"
                    }
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{item.name}</StyledTableCell>
                <StyledTableCell align="left">{item.price}</StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    className="text-2xl bg-red-700 text-white p-2 cursor-pointer rounded"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cart;
