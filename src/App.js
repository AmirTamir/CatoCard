import React from "react";
// import CatoCard from "./components/CatoCard";

import "./App.css"
import {columns as categories} from "./columns";
import {fetchApps} from "./services/FetchApps";
import CardCato from "./components/Card2";


function App() {
  return (
    <div className="App">
        <div className="card-container">
            {/*<CatoCard source="../services/apps.json"/>*/}
            <CardCato
                columns={categories}
                fetchMethod={fetchApps}
            />
        </div>
    </div>
  );
}

export default App;
