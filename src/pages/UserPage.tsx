/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRole } from "../pages/context/RoleContext";
import { Card, CardContent, Typography, Button, Container, Box, TextField, Grid } from "@mui/material";

export default function UserPanel() {
  const { currentUser, logout, changePassword } = useRole();

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
      <Container maxWidth="sm">
        <Card className="shadow-2xl rounded-2xl">
          <CardContent className="p-8">
            <Box className="flex justify-between items-center mb-6">
              <Typography variant="h5" className="font-bold text-gray-700">
                User Profile
              </Typography>
              <Button variant="contained" color="error" onClick={logout} className="rounded-lg shadow-md">
                Logout
              </Button>
            </Box>

            {currentUser ? (
              <div className="space-y-3 mb-6">
                <Typography>
                  <strong>Name:</strong> {currentUser.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {currentUser.email}
                </Typography>
                <Typography>
                  <strong>Role:</strong> <span className="capitalize">{currentUser.role}</span>
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {currentUser.phone}
                </Typography>
              </div>
            ) : (
              <Typography color="textSecondary">No user found</Typography>
            )}

            {/* Change Password Section */}
            {currentUser && (
              <Box>
                <Typography variant="h6" gutterBottom className="font-semibold text-gray-700">
                  Change Password
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Old Password"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                      color="primary"
                      onClick={handleChangePassword}
                      className="rounded-lg shadow-md"
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
