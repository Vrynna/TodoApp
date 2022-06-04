import React, { useState } from "react";
import Todolist from "./components/Todolist";

function App() {

  const [counter, setCounter] = useState(0);

  return (

      <div className="max-w-xl m-auto bg-gray-200 mt-20 ">
        <Todolist />
      </div>
  );
}

export default App;