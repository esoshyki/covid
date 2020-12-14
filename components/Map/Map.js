import MapChart from "./MapChart"
import { useState } from 'react'
import ReactTooltip from "react-tooltip"
import Spinner from 'react-bootstrap/Spinner'

export default function Map ({countries, population, setCountry}) {

  const [content, setContent] = useState("")

  return (
    <div data-type="success" style={{width: '100%', height: "100%"}}>
      {(!countries || !population) && <Spinner animation="border"/>} 
      {countries && <MapChart 
        setTooltipContent={setContent} 
        countries={countries}
        population={population}
        setCountry={setCountry}/>}
      {countries && <ReactTooltip dangerouslySetInnerHTML={{__html: '<p>test</p>'}} type="dark" effect="float">{content}</ReactTooltip>}
    </div>
  )
}