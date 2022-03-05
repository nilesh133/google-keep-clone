import React, { useContext, useEffect } from 'react';
import Navbar from "./Navbar";
import Texteditor from "./TextEditor";

const Main = () => {
    return (
        <div className = "flex flex-col md:flex-row mb-4">
            <Navbar />
            <Texteditor />
        </div>
    )
}

export default Main