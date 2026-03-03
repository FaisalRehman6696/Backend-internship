import React, { useState } from "react";
import counterContext from "./components/context";
import Navbar from "./components/Navbar";

const App = () => {
  const [count, setcount] = useState(0);

  return (
    <counterContext.Provider value={count}>
      <Navbar />

      <div>
        <button onClick={() => setcount(count + 1)}>counter:{count}</button>
      </div>
    </counterContext.Provider>
  );
};

export default App;
