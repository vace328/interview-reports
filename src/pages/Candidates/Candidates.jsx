import React, { useContext } from 'react'
import {candidatesContext} from "../../contexts"
import "./Candidates.css"

const Candidates = () => {
    const candidates = useContext(candidatesContext);
    // console.log(candisdates);
  return (
    <div>Candidates</div>
  )
}

export default Candidates