import React from "react";
import SigningButton from "../signin-button/SigningButton";


const NavBar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <SigningButton/>
    </header>
  );
};

export default NavBar;