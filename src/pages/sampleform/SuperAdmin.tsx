/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRole } from "../pages/context/RoleContext";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Drawer,
  Grid,
  TextField,
} from "@mui/material";

export default function SuperAdminPanel() {
  const { users, addUser, logout } = useRole();
  const [open, setOpen] = useState(false); // drawer state

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"admin" | "user">("admin");

  const handleAddUser = () => {
    console.log(name, email, password, "hnkjhvgvgh");
    if (!name || !email || !password || !phone) {
      alert("All fields are required!");
      return;
    }
    const savedData = localStorage.getItem("users");
    console.log(typeof savedData);
    const objectdata = JSON.parse(savedData);
    console.log(objectdata);
    const checkEmail = objectdata.some((item: { email: string }) => {
      return item.email === email;
    });
    console.log(checkEmail, "kjhbjhjhjh");
    if (checkEmail) {
      alert("Already Email exist ");
    } else {
      addUser(name, email, password, role, phone);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("admin");
      setOpen(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center p-6">
      <Container>
        {/* Header */}
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold ">
            Super Admin
          </Typography>
          <Button variant="contained" color="error" onClick={logout} className="rounded-lg shadow-lg">
            Logout
          </Button>
        </Box>

        {/* Role Select + Create Button */}
        <div className="flex gap-3 items-center mb-6">
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            size="small"
            className="w-40 bg-white rounded-lg shadow-sm"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            className="px-6 py-2 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 transition-all"
          >
            + Create {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </div>

        {/* Users Table */}
        <Paper className="shadow-2xl rounded-2xl">
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Role</b>
                </TableCell>
                <TableCell>
                  <b>Phone Number</b>
                </TableCell>
                <TableCell align="center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((u: any) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          if (window.confirm(`Are you sure to delete ${u.name}?`)) {
                            const updatedUsers = users.filter((usr: any) => usr.id !== u.id);
                            localStorage.setItem("users", JSON.stringify(updatedUsers));
                            window.location.reload();
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Drawer for Create User/Admin */}
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 400, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Create New {role.charAt(0).toUpperCase() + role.slice(1)}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddUser}
                  className="rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 transition-all"
                >
                  Create {role}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Drawer>
      </Container>
    </div>
  );
}
