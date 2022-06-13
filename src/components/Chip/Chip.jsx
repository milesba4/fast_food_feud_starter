import * as React from "react"
import "./Chip.css"

export function Chip({ buttonClassName="", label = "", isActive = true, onclick}) {
  if(isActive == false){ 
  buttonClassName = "chip";
  }else{ buttonClassName = "chip active";
  }

  return (
    <button className={buttonClassName} onClick = {onclick}>
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  )
}

export default Chip
