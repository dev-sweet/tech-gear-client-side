import { MdOutlineDelete } from "react-icons/md";
import useProducts from "../../../hooks/useProducts";
import { FaRegEdit } from "react-icons/fa";
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

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TableLoading from "../../../components/Shared/TableLoading/TableLoading";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const ManageProducts = () => {
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [query, setQuery] = useState({ search: "" });
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // products search and filter query

  const handleSort = (e) => {
    const sortItem = e.target.value.split(",");
    setQuery({ ...query, sortBy: sortItem[0], order: sortItem[1] });
  };

  const handleMinPrice = (e) => {
    setQuery({ ...query, minPrice: e.target.value });
  };
  const handleMaxPrice = (e) => {
    setQuery({ ...query, maxPrice: e.target.value });
  };

  const handleCategory = (e) => {
    setQuery({ ...query, category: e.target.value });
  };

  const handleSearch = () => {
    setQuery({ ...query, search: searchText });
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setQuery({ ...query, search: e.target.value });
  };

  // load products form server using custom hook
  const [products, isProductLoading, refetch] = useProducts(query);

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
      <div className="flex lg:flex-row flex-col items-center justify-between mb-5">
        <div className="order-2 lg:order-1 flex items-center justify-start lg:gap-5 gap-1 flex-wrap w-full">
          <div>
            <label htmlFor="">Sort By</label> <br />
            <select
              onChange={handleSort}
              defaultValue=""
              className="border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] p-1"
            >
              <option value="" disabled={true}>
                Select
              </option>
              <option value="name,asc">Name (A-Z)</option>
              <option value="name,desc">Name (Z-A)</option>
              <option value="sellPrice,asc">Price (Low &gt; High) </option>
              <option value="sellPrice,desc">Price (High &gt; Low) </option>
            </select>
          </div>
          <div>
            <label htmlFor="">Min Price</label> <br />
            <select
              onChange={handleMinPrice}
              defaultValue=""
              className="border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] p-1"
            >
              <option value="" disabled={true}>
                Select
              </option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
              <option value={5000}>5000</option>
              <option value={10000}>10000</option>
              <option value={20000}>20000</option>
              <option value={50000}>50000</option>
              <option value={100000}>100000</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Max Price</label> <br />
            <select
              onChange={handleMaxPrice}
              defaultValue=""
              className="border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] p-1"
            >
              <option value="" disabled={true}>
                Select
              </option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
              <option value={5000}>5000</option>
              <option value={10000}>10000</option>
              <option value={20000}>20000</option>
              <option value={50000}>50000</option>
              <option value={100000}>100000</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Category:</label> <br />
            <select
              onChange={handleCategory}
              className="select border-2 border-gray-400 focus:border-[#2b4190]  outline-none focus:border-2 p-1"
              defaultValue=""
            >
              <option value="">All</option>
              <option value="laptop">Laptop</option>
              <option value="phone">phone</option>
              <option value="earbuds">Earbuds</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="camera">Camera</option>
              <option value="smartwatch">Smartwatch</option>
              <option value="tablet">Tablet</option>
              <option value="drone">Drone</option>
              <option value="speaker">Speaker</option>
            </select>
          </div>
        </div>
        <div className="order-1 lg:order-1 relative flex items-center rounded-lg md:my-5 my-2 w-full md:w-80">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchInput}
            className="py-1 px-5 border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] p-1 w-full"
          />
          <button
            onClick={handleSearch}
            className="flex items-center px-2 py-1 bg-[#07174e] border-2 border-[#07174e] text-white cursor-pointer hover:text-gray-200"
          >
            <IoSearch className="text-2xl" />
          </button>
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
          {isProductLoading && <TableLoading />}
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
      </TableContainer>
    </div>
  );
};

export default ManageProducts;
