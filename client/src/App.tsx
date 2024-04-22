import { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Sidebar from "./component/Sidebar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<Boolean>(false);
  return (
    <>
      <div className={isDarkMode ? "dark" : ""}>
        <Navbar setIsDarkMode={setIsDarkMode} />
        <div>
          <Sidebar />
          <Signin />
        </div>
        {/* <Signup/> */}
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      </div>
    </>
  );
}

export default App;
