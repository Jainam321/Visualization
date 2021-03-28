import React from 'react';
import "./Navbar.css";
import Button from "./Button"; 
import Heading from "./Heading";
import Dropdown from "./Dropdown"

function Navbar(){
    return (
        <>
        <div className="navbar">
                <Heading name="Path Visualization"></Heading>
            <ul>
                <Dropdown name="Algorithm"></Dropdown>
                <Dropdown name="Maze and pattern"></Dropdown>
                <Button title="Start!"></Button>
                <Button title="Stop!"></Button>
            </ul>
        </div>
        </>
    );
}

export default Navbar;