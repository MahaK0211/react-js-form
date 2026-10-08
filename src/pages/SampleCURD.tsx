/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EmployeeForm() {
  const [employees, setEmployess] = useState<any[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState<any>(null);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "id") setId(value);
    if (name === "age") setAge(value);
    if (name === "company") setCompany(value);
    if (name === "email") setEmail(value);
    if (name === "contact") setContact(value);
  };

  // Add employee
  const handleSubmit = () => {
    const data = { id, name, empId: id, age, company, email, contact };
    const updated = [...employees, data];
    setEmployess(updated);
    localStorage.setItem("employess", JSON.stringify(updated));
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setId("");
    setAge("");
    setCompany("");
    setEmail("");
    setContact("");
  };

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("employess");
    if (savedData) setEmployess(JSON.parse(savedData));
  }, []);

  // Update
  const handleUpdate = () => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = { id, name, empId: id, age, company, email, contact };
    setEmployess(updatedEmployees);
    localStorage.setItem("employess", JSON.stringify(updatedEmployees));
    setIsUpdate(false);
    setIndex(null);
    resetForm();
  };

  const hadnleEdit = (ele: any, i: number) => {
    setIndex(i);
    setIsUpdate(true);
    setName(ele.name);
    setAge(ele.age);
    setCompany(ele.company);
    setContact(ele.contact);
    setEmail(ele.email);
    setId(ele.id);
  };

  const handleDelete = (ele: any) => {
    const deletedata = employees.filter((item) => item.id !== ele.id);
    setEmployess(deletedata);
    localStorage.setItem("employess", JSON.stringify(deletedata));
  };

  return (
    <div className="p-5">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Employee Data
      </Typography>

      {/* Form with Grid layout */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              name="id"
              value={id}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              name="age"
              value={age}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company"
              name="company"
              value={company}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact"
              name="contact"
              value={contact}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={3}>
          {!isUpdate ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Table */}
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Employee List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Age</strong>
              </TableCell>
              <TableCell>
                <strong>Company</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Contact</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.length > 0 &&
              employees.map((ele: any, i: number) => (
                <TableRow key={ele.id}>
                  <TableCell>{ele.name}</TableCell>
                  <TableCell>{ele.empId}</TableCell>
                  <TableCell>{ele.age}</TableCell>
                  <TableCell>{ele.company}</TableCell>
                  <TableCell>{ele.email}</TableCell>
                  <TableCell>{ele.contact}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => hadnleEdit(ele, i)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(ele)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
