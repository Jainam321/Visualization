import React from 'react';
import "./Navbar.css"


function Dropdown(props){
  return (
  <>
 <select name="myName" className="Dropdown">
	<option value="1">{props.name}</option>
	<option value="2">Option 2</option>
	<option value="3">Option 3</option>
 </select>
  </>);
}


export default Dropdown;