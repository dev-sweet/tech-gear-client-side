import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
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
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    data: blogs,
    // isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  // handle edit product
  const handleEdit = (id) => {
    navigate(`/dashboard/manageBlogs/edit/${id}`);
  };

  // handle delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07174e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/blogs/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Blog has been deleted.",
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
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl">Manage Blogs: {blogs?.length}</h3>
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
        <Table sx={{ minWidth: 392 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">IMAGE</StyledTableCell>
              <StyledTableCell align="left">TITLE</StyledTableCell>
              <StyledTableCell align="left">CATEGORY</StyledTableCell>
              <StyledTableCell align="left">ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs?.map((product, i) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <img
                    className="w-[50px] h-[50px]"
                    src={product.image}
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{product.title}</StyledTableCell>
                <StyledTableCell align="left">
                  {product.category}
                </StyledTableCell>
                <button
                  onClick={() => handleEdit(product._id)}
                  className="text-xl bg-[gray-300] border border-[#07174e] text-[#07174e] p-2 cursor-pointer rounded mr-5 mt-5"
                >
                  <FaRegEdit />
                </button>
                <button
                  className="text-2xl bg-red-700 text-white p-2 cursor-pointer rounded"
                  onClick={() => handleDelete(product._id)}
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

export default ManageBlogs;
