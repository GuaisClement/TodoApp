import React from 'react'

type Props = {
  label : string;
  onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
  return <button className="btn" onClick={props.onClick} >{props.label}</button>;
}



export default Button;

