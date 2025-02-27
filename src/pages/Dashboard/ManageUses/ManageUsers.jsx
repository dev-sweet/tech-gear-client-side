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
} from "@mui/material";
// import PageTitle from "../../../components/Shared/PageTitle/PageTitle";
import { MdOutlineDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //   handle make admin
  const handleMakeAdmin = (id) => {
    console.log(id);
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
        <h3 className="text-3xl">Total Users: {users.length}</h3>
        <h3 className="text-3xl">Admins: {4}</h3>
      </div>
      <TableContainer component={"Paper"}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">Full Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{user.userName}</StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    className="text-2xl bg-yellow-700 text-white p-2 cursor-pointer rounded"
                    onClick={() => handleMakeAdmin(user._id)}
                  >
                    <FaUsers className="text-xl" />
                  </button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    className="text-2xl bg-red-700 text-white p-2 cursor-pointer rounded"
                    onClick={() => handleMakeAdmin(user._id)}
                  >
                    <FaUsers className="text-xl" />
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

export default ManageUsers;
