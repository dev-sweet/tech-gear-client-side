import { MdOutlineDelete } from "react-icons/md";
import useProducts from "../../../hooks/useProducts";
import { FaRegEdit } from "react-icons/fa";
import {
  NativeSelect,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageProducts = () => {
  const [products, , refetch] = useProducts();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  //   handle edit
  const handleEditProduct = (id) => {
    navigate(`/dashboard/manageProducts/edit/${id}`);
  };

  //   hanlde delete
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure you?",
      text: "You won't be able to revert this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07174e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };
  //   styled tablecell for cart
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
      {/* <PageTitle /> */}
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl">All Products: {products?.length}</h3>
        <div className="text-xl flex items-center gap-3">
          <label htmlFor="">Category:</label>

          <NativeSelect defaultValue={30}>
            <option value="laptop">Laptop</option>
            <option value="phone">Phone</option>
            <option value="music">Music</option>
            <option value="gaming">Gaming</option>
          </NativeSelect>
        </div>
      </div>
      <TableContainer component={"Paper"}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">IMAGE</StyledTableCell>
              <StyledTableCell align="left">PRODUCT NAME</StyledTableCell>
              <StyledTableCell align="left">PRICE</StyledTableCell>
              <StyledTableCell align="left">ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, i) => (
              <StyledTableRow key={product._id}>
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
                <StyledTableCell align="left">{product.name}</StyledTableCell>
                <StyledTableCell align="left">{product.price}</StyledTableCell>
                <button
                  onClick={() => handleEditProduct(product._id)}
                  className="text-xl bg-[gray-300] border border-[#07174e] text-[#07174e] p-2 cursor-pointer rounded mr-5 mt-5"
                >
                  <FaRegEdit />
                </button>
                <button
                  className="text-2xl bg-red-700 text-white p-2 cursor-pointer rounded"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <MdOutlineDelete className="text-xl" />
                </button>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageProducts;
