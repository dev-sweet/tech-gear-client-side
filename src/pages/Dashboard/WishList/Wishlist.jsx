import { Link, useNavigate } from "react-router-dom";
import useWishlist from "../../../hooks/useWishlist";
import { TiShoppingCart } from "react-icons/ti";
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
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Wishlist = () => {
  const [wishlist, , refechWishlist] = useWishlist();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
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

  const handleRowCLick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleMoveCart = (item) => {
    axiosSecure.post("/carts", item).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: `${item.name} moved to cart.`,
          showConfirmButton: false,
          timer: 1500,
        });

        refechWishlist();
      }
    });
  };
  const handleDelete = (id) => {
    axiosSecure.delete(`/wishlist/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your wishlist has been deleted.",
          icon: "success",
          timer: "1500",
          showConfirmButton: false,
        });

        refechWishlist();
      }
    });
  };
  return wishlist.length > 0 ? (
    <div>
      <div className="pb-5 text-gray-700">
        <h3 className="text-3xl">My Wishlist: {wishlist.length}</h3>
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
            {wishlist.map((item, i) => (
              <StyledTableRow
                sx={{
                  "&:hover": {
                    boxShadow: "0px 0px 4px 4px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                  },
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                onClick={() => handleRowCLick(item.id)}
                key={item._id}
              >
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <img className="w-[50px] h-[50px]" src={item.image} alt="" />
                </StyledTableCell>
                <StyledTableCell align="left">{item.name}</StyledTableCell>
                <StyledTableCell align="left">
                  <span className="text-gray-800 font-bold">${item.price}</span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Tooltip arrow title="Move to cart">
                    <button
                      className="text-2xl mr-5 bg-green-800 text-white p-2 cursor-pointer rounded hover:bg-gray-600 transition duration-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleMoveCart(item);
                      }}
                    >
                      <TiShoppingCart />
                    </button>
                  </Tooltip>
                  <Tooltip arrow title="Delete">
                    <button
                      className="text-2xl bg-red-700 text-white p-2 cursor-pointer rounded hover:bg-gray-600 transition duration-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      <MdOutlineDelete />
                    </button>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
          alt="Empty Wishlist"
          className="w-40 h-40"
        />

        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mt-2">Start adding your favorite items!</p>

        <Link
          to="/products"
          className="mt-6 px-4 text-sm text-gray-900 bg-[#07174e] py-3 hover:bg-gray-700 text-white font-medium rounded shadow-md  transition cursor-pointer"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
