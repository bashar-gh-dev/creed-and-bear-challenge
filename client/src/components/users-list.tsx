import {
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsersService from "../services/users";
import UserModel from "../shared/user.model";

export default function UsersList() {
  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    (async () => {
      const usersService = new UsersService();
      setLoading(true);
      try {
        const response = await usersService.listUsers(page + 1);
        setTotalRows(response.total);
        setRows(response.data);
        setPage(response.page - 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [page]); // Whenever the current 'page' or the amount of 'rowsPerPage' change, your request will be fired again.

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedIds = rows.map((n) => n.id);
      setSelected(newSelectedIds);
      return;
    }
    setSelected([]);
  };

  const handleSelectBoxChanged = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteUser = async () => {
    const usersService = new UsersService();
    setLoading(true);
    try {
      await usersService.deleteUsers(selected);
      const response = await usersService.listUsers(page + 1);
      setTotalRows(response.total);
      setRows(response.data);
      setPage(response.page - 1);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer>
            <Table aria-labelledby="tableTitle" aria-label="enhanced table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={!rows.some((row) => !selected.includes(row.id))}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleSelectBoxChanged(row.id)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>{row.first_name}</div>
                      </TableCell>
                      <TableCell>
                        <div>{row.email}</div>
                      </TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`./${row.id}`}
                          relative="path"
                          variant="contained"
                          color="primary"
                        >
                          Details
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`./${row.id}/edit`}
                          relative="path"
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalRows} // This is what your request should be returning in addition to the current page of rows.
            rowsPerPage={5}
            rowsPerPageOptions={[]}
            page={page}
            onPageChange={handleChangePage}
          />
        </>
      )}
      {selected.length && !loading ? (
        <div>
          <Button
            variant="contained"
            color="warning"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </div>
      ) : null}
    </>
  );
}
