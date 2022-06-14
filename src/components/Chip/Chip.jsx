import * as React from "react"
import "./Chip.css"

export function Chip({ buttonClassName="", label = "", isActive = true, onClick=()=>{}, onClose=()=>{}}) {
  if(isActive == false){ 
  buttonClassName = "chip";
  }else{ buttonClassName = "chip active";
  }

  return (
    <button className={buttonClassName} onClick = {onClick}>
      <p className="label">{label}</p>
      <span className="close" role="button" onClick={onClose}>{`X`}</span>
    </button>
  )
}

export default Chip
