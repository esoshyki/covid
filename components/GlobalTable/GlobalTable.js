import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import Counties from './Countries'
import DTO from './TableDTO';
import DTOLastDay from './TabloDTOLastDay';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const GlobalTable = ({worldData, setCountry, country, countries}) => {
  const { t } = useTranslation("global");
  const root = useRef();
  const cityInput = useRef(); 

  const [toFind, setToFind] = useState(false);
  const [activeData, setActiveData] = useState(worldData)
  const [isTotalRender, setisTotalRender] = useState(false)
  
  
  const findCountrie = async () => {
    setToFind(!toFind)
  }

  const renderDaily = async () => {
    setisTotalRender(false)
  }

  const renderTotal = async () => {
    setisTotalRender(true)
  }

  useEffect(() => {
    animation(root.current, styles.fadeOut)
  }, [activeData]);

  useEffect(() => {
    cityInput.current && animation(cityInput.current, styles.fadeOut)
  }, [toFind]);

  useEffect(async() => {
    if (!country) {
      setActiveData(worldData)
    } else {
      setActiveData({...country, population: country.Premium.CountryStats.Population})
    }

  }, [country]);
  
  const renderData = DTO(activeData);
  const renderDataDaily = DTOLastDay(activeData);
  
  const globalLine = (key, value) => (
      <ListGroup.Item style={{
        width: "100%",
        padding: 2,
      }}>
        <Card.Text 
          as="span" 
          style={{
            color: "#000",
            fontSize: 18
            }}>
          {t(key) + " : "}
        </Card.Text>
        <Card.Text 
          as="span" 
          style={{
            color: "rgb(255, 85, 51)",
            fontSize: 18
            }}>
          {toNiceNum("" + value)}
        </Card.Text>

      </ListGroup.Item>
    )
    let list;
    if (isTotalRender) {
     list = <ListGroup className={styles["list-group"]}>
      {Object.entries(renderData).map(([key, value]) => globalLine(key, value)) }
      <ListGroup.Item
        style={{
          width: "100%",
          padding: '5px',
          fontSize: 18
        }}
        action 
        onClick={findCountrie} 
      >
      <Button vairant="primary" style={{width: "100%", color: "#fff"}}>{country?.Country || t("Allworld")}</Button>
      </ListGroup.Item>        
          {toFind && <Counties 
                      countries={countries.sort((a, b) => a.Country > b.Country ? 1 : -1)} 
                      setCountry={setCountry} 
                      setToFind={setToFind}/>}      
    </ListGroup>;
    
    } else {
      list =   <ListGroup className={styles["list-group"]}>
      {Object.entries(renderDataDaily).map(([key, value]) => globalLine(key, value)) }
      <ListGroup.Item
        style={{
          width: "100%",
          padding: '5px',
          fontSize: 18
        }}
        action 
        onClick={findCountrie} 
      >
        <Button vairant="primary" style={{width: "100%", color: "#fff"}}>{country?.Country || t("Allworld")}</Button>
      </ListGroup.Item>        
          {toFind && <Counties 
                      countries={countries.sort((a, b) => a.Country > b.Country ? 1 : -1)} 
                      setCountry={setCountry} 
                      setToFind={setToFind}/>}
      
    </ListGroup>;
    }

  return <Card ref={root} >
    <Card.Title style={{color: "#000", margin: "auto", flexDirection: 'row'}}>
      <Button onClick={renderTotal} className={styles["change-button"]}  variant="primary">All Time</Button>
      <Button onClick={renderDaily} className={styles["change-button"]}  variant="primary">Last Day</Button>
    </Card.Title>

    {renderData && <div className className={styles.global}>
      {list}   
    </div>}
    
    {!activeData && <div className={styles.loading}>Loading...</div>}
</Card>
console.log(cityInput)
} 



export default GlobalTable

