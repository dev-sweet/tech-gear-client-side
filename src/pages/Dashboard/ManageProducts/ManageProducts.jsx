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
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TableLoading from "../../../components/Shared/TableLoading/TableLoading";
import { useState } from "react";

const ManageProducts = () => {
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [products, isProductLoading, refetch] = useProducts();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // handle row click
  const handleRowCLick = (id) => {
    navigate(`/products/${id}`);
  };

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
          <label className="text-sm" htmlFor="">
            Category:
          </label>

          <NativeSelect>
            <option value="laptop">Laptop</option>
            <option value="phone">Phone</option>
            <option value="music">Music</option>
            <option value="gaming">Gaming</option>
          </NativeSelect>
        </div>
      </div>

      <TableContainer component={"Paper"}>
        <Table sx={{ minWidth: "492px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell>IMAGE</StyledTableCell>
              <StyledTableCell align="center">PRODUCT NAME</StyledTableCell>
              <StyledTableCell align="center">PRICE</StyledTableCell>
              <StyledTableCell align="center">ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products?.map((product, i) => (
              <Tooltip
                title={currentRowIndex === i && "View Product"}
                arrow
                disableHoverListener={currentRowIndex === i && true}
                key={product._id}
              >
                <StyledTableRow
                  onMouseEnter={() => setCurrentRowIndex(i)}
                  onMouseLeave={() => setCurrentRowIndex(null)}
                  onClick={() => handleRowCLick(product._id)}
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
                  <StyledTableCell align="center">
                    <img
                      className="w-[50px] h-[50px]"
                      src={product.image}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.basePrice && (
                      <del className="font-bold mr-2">${product.basePrice}</del>
                    )}
                    <span className="text-md font-bold">
                      ${product.sellPrice}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex items-center justify-center gap-0">
                      <Tooltip title="Edit Product" arrow>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditProduct(product._id);
                          }}
                          onMouseEnter={() => setCurrentRowIndex(true)}
                          onMouseLeave={() => setCurrentRowIndex(false)}
                          className="text-xl bg-[gray-300] border border-[#07174e] text-[#07174e] p-2 cursor-pointer rounded md:mr-5 mt-5  hover:bg-gray-300 transition duration-2"
                        >
                          <FaRegEdit />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete product" arrow>
                        <button
                          className="text-lg bg-red-700 text-white p-2 cursor-pointer rounded mt-5  hover:bg-gray-600 transition duration-2"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteProduct(product._id);
                          }}
                          onMouseEnter={() => setCurrentRowIndex(true)}
                          onMouseLeave={() => setCurrentRowIndex(false)}
                        >
                          <MdOutlineDelete className="text-xl" />
                        </button>
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
        {isProductLoading && <TableLoading />}
      </TableContainer>
    </div>
  );
};

export default ManageProducts;
