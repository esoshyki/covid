import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import Counties from './Countries'
import DTO from './TableDTO';
import Card from 'react-bootstrap/Card'

const GlobalTable = ({worldData, setCountry, country, countries}) => {
  const { t } = useTranslation("global");
  const root = useRef();
  const cityInput = useRef();

  const [toFind, setToFind] = useState(false);
  const [activeData, setActiveData] = useState(worldData)

  const findCountrie = async () => {
    setToFind(!toFind)
  }

  useEffect(() => {
    animation(root.current, styles.fadeOut)
  }, [activeData]);

  useEffect(() => {
    cityInput.current && animation(cityInput.current, styles.fadeOut)
  }, [toFind])

  useEffect(async() => {
    if (!country) {
      setActiveData(worldData)
    } else {
      setActiveData({...country, population: country.Premium.CountryStats.Population})
    }

  }, [country])



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

  const renderData = DTO(activeData)

  return <Card ref={root} >
    <Card.Title style={{color: "#000", margin: "auto"}}>{t("Summary")}</Card.Title>
  {renderData && <div className className={styles.global}>
    <ListGroup className={styles["list-group"]}>
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
        <Card.Text as="span" vairant="success">{country?.Country || t("Allworld")}</Card.Text>
      </ListGroup.Item>
        <div className={styles.countries} ref={cityInput}>
          {toFind && <Counties 
                      countries={countries.sort((a, b) => a.Country > b.Country ? 1 : -1)} 
                      setCountry={setCountry} 
                      setToFind={setToFind}/>}
      </div>
    </ListGroup>
  </div>}
    
  {!activeData && <div className={styles.loading}>Loading...</div>}
</Card>
} 



export default GlobalTable