/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRole } from "../pages/context/RoleContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

export default function AdminPanel() {
  const { users, addUser, logout, currentUser, changePassword } = useRole();

  // Add User State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleAddUser = () => {
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
    if (checkEmail) {
      alert("Already Email exist ");
    } else {
      addUser(name, email, password, phone, "user");
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      alert("Both fields are required!");
      return;
    }
    const success = changePassword(currentUser.id, oldPassword, newPassword);
    if (success) {
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } else {
      alert("Old password is incorrect!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center p-6">
      <Container>
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-800">
            Admin Page
          </Typography>
          <Button variant="contained" color="error" onClick={logout} className="rounded-lg shadow-lg">
            Logout
          </Button>
        </Box>

        {/* Add User Form */}
        <Card className="mb-6 shadow-2xl rounded-2xl">
          <CardContent>
            <Typography variant="h6" gutterBottom className="font-semibold">
              Create New User
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="User Name" value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="User Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleAddUser}
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 transition-all"
                >
                  Create User
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Paper className="shadow-2xl rounded-2xl mb-6">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.filter((u: any) => u.role !== "superadmin").length > 0 ? (
                users
                  .filter((u: any) => u.role !== "superadmin")
                  .map((u: any) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No Admins or Users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Change Own Password */}
        <Card className="shadow-2xl rounded-2xl">
          <CardContent>
            <Typography variant="h6" gutterBottom className="font-semibold">
              Change Your Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleChangePassword}
                  className="rounded-lg shadow-md"
                >
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
