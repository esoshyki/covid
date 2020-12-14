import MapChart from "./MapChart"
import { useState } from 'react'
import ReactTooltip from "react-tooltip"
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';

export default function Map ({countries, population, setCountry}) {

  const { t } = useTranslation("global")

  const [content, setContent] = useState("")

  const createContent = () => {
    if (typeof content === 'string') {
      return content
    } else {
      return (<Card style={{padding: 0, backgroundColor: "none"}}>
        <Card.Title style={{
          color: "brown",
          fontSize: 12,
          margin: 0,
          lineHeight: 1
          }}>
          {content.NAME}
        </Card.Title>
        <Card.Body style={{padding: 4}}>
          {Object.entries(content).map(([key, value], idx) => key !== "NAME" && (
            <div key={idx}>
              <Card.Subtitle 
                as="span" 
                style={{
                  color: "#000",
                  fontSize: 14,
                  margin: 0,
                  marginRight: 5,
                  lineHeight: 1
                  }}>
                  {t(key)}
              </Card.Subtitle>
              <Card.Text 
                as="span" 
                style={{
                  fontSize: 14, 
                  color: "brown",
                  margin: 0,
                  lineHeight: 1
                  }}>{value}</Card.Text>
            </div>
            ))}
        </Card.Body>
      </Card>)
    }
  }

  return (
    <Card data-type="success" style={{width: '100%', height: "100%"}}>
      {(!countries || !population) && <Spinner animation="border"/>} 
      {countries && <MapChart 
        setTooltipContent={setContent} 
        countries={countries}
        population={population}
        setCountry={setCountry}/>}
      {(countries && content) && <ReactTooltip dangerouslySetInnerHTML={{__html: '<p>test</p>'}} type="dark" effect="float">{createContent()}</ReactTooltip>}
    </Card>
  )
}