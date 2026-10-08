import React, { useState } from "react";
import { useRole } from "../pages/context/RoleContext";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

export default function Login() {
  const { login } = useRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(email, password);
    if (!success) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <Typography variant="h5" component="div" align="center" className="font-bold mb-6 text-gray-700">
            Login
          </Typography>

          <Box className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded-lg"
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white rounded-lg"
            />

            {error && (
              <Typography variant="body2" color="error" className="text-center">
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              className="mt-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500  hover:to-indigo-600 transition-all"
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
