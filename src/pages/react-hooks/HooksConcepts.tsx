import React, { createContext, useContext } from "react";

const UserContext = createContext(0);

function UserC() {
  const user = useContext(UserContext);

  return <h2>{user}</h2>;
}
export default function HooksConcepts() {
  return (
    <UserContext.Provider value="John Doe">
      <UserC />
    </UserContext.Provider>
  );
}
