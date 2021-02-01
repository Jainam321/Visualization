import React from 'react';
import ReactDOM from 'react-dom';


function Button(props){
  return (
  <>
  <button className="buttons">{props.title}</button>
  </>);
}


export default Button;