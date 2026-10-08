import axios from "axios";
import DataTabel from "../Components/DataTabel";
import { useEffect, useState } from "react";

function Tabel() {
  const [users, setUsers] = useState([]);
  const header = [
    { headerName: "Id", field: "id" },
    { headerName: "Names", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "City", field: "city" },
    { headerName: "Status", field: "status" },
  ];
  const ApiHeader = [
    { headerName: "Serial.No", field: "id" },
    { headerName: "UserName", field: "username" },
    { headerName: "FirstName", field: "firstName" },
    { headerName: "LastName", field: "lastName" },
    { headerName: "Email", field: "email" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Contact", field: "phone" },
  ];
  const data = [
    { id: 1, name: "Maha", email: "maha@g.com", city: "Chennai", status: "Active" },
    { id: 2, name: "Naveen", email: "naveen@g.com", city: "Madurai", status: "Pending" },
    { id: 3, name: "Kumar", email: "kumar@g.com", city: "Erode", status: "Inactive" },
    { id: 4, name: "Kumar", email: "kumar@g.com", city: "Erode", status: "Inactive" },
    { id: 5, name: "Kumar", email: "kumar@g.com", city: "Erode", status: "Inactive" },
    { id: 6, name: "Kumar", email: "kumar@g.com", city: "Erode", status: "Inactive" },
  ];

  async function getApi() {
    const tabel = await axios.get("https://dummyjson.com/users");
    console.log(tabel.data.users, "fvkik");
    setUsers(tabel.data.users);
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div>
      <DataTabel sampleData={data} hearderPart={header} isClient={true} />
      <hr />
      <DataTabel sampleData={users} hearderPart={ApiHeader} isClient={false} />
    </div>
  );
}
export default Tabel;
//{header:''s.no,daata:{id;1}}
