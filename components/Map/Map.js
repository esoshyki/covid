import MapChart from "./MapChart"
import { useState } from 'react'
import ReactTooltip from "react-tooltip"

export default function Map ({countries, population, setCountry}) {

  const [content, setContent] = useState("")

  return (
    <div data-type="success">
      <MapChart 
        setTooltipContent={setContent} 
        countries={countries}
        population={population}
        setCountry={setCountry}/>
      <ReactTooltip type="dark" effect="float">{content}</ReactTooltip>
    </div>
  )
}