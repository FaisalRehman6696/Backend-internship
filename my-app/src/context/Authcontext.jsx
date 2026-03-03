import { createContext, useState } from "react";

const UserContext = createContext();

const Authcontext = ({ children }) => {
  const [user, setuser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export { Authcontext, UserContext };
