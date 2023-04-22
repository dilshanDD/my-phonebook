import React from "react";
import "./App.css";
import InsertContacts from "./components/InsertContacts";
import DisplayContacts from "./components/DisplayContacts";

function App() {
  return (
    <div className="main-container">
      <InsertContacts />
      <DisplayContacts />
    </div>
  );
}

export default App;
