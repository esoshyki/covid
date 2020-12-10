import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import Counties from './Countries'
import covidService from '../../services/covid.service'
import getCountryData from '../../lib/getCountryData'

const GlobalTable = ({worldData, setCountry, country, countries}) => {
  const { t } = useTranslation();
  const root = useRef();
  const cityInput = useRef();

  const [toFind, setToFind] = useState(false);
  const [activeData, setActiveData] = useState(worldData)
  const [contries, setCountries] = useState(countries?.sort((a, b) => a.Country - b.Country))
  const [population, setPopulation] = useState(0);

  useEffect(() => {
    if (!country) {
      const newPopulation = countries?.reduce((acc, cur) => {
        return acc + cur.Premium.CountryStats.Population
      }, 0)
      setPopulation(newPopulation)
    } else {
      console.log(country)
    }
  }, [country])

  const get100k = (value, x=0) => {
    return "" + (Math.round((+value * (10 ** 5) * (10 ** x)) / (+population))) / (10 ** x)
  }

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
      setActiveData({...worldData})
    } else {
      const {
        Confirmed, Deaths, Recovered, NewConfirmed, NewDeaths, NewRecovered
      } = country;
      setActiveData({
        Confirmed, Deaths, Recovered, NewConfirmed, NewDeaths, NewRecovered,
        population: country.Premium.CountryStats.Population     
      })
    }

  }, [country])



  const globalLine = (key, value) => {

    return (key !== 'population' && key !== "Countries") ? (
      <ListGroup.Item variant ="dark" className={styles['global-line']} key={key}>
        <span className={styles.dataKey}>{t(key) + " : "}</span>
        <span className={styles.dataValue}>{toNiceNum("" + value)}</span>
      </ListGroup.Item>
    ) : null
  }
  
  return <div ref={root} className={styles.root}>
  {activeData && <div className className={styles.global}>
    <ListGroup className={styles["list-group"]}>
      {activeData && Object.keys(activeData).map(key => globalLine(key, activeData[key])) }
      {globalLine("HundredKTotalConfirmed", get100k(activeData.Confirmed))}
      {globalLine("HundredKTotalDead", get100k(activeData.Deaths))}
      {globalLine("HundredKTotalRecovered", get100k(activeData.Recovered))}
      {globalLine("HundredKDailyConfirmed", get100k(activeData.day_Confirmed))}
      {globalLine("HundredKDailyDead", get100k(activeData.day_Deaths, 2))}
      {globalLine("HundredKDailyRecovered", get100k(activeData.day_Recovered))}
      <ListGroup.Item action variant="dark" onClick={findCountrie} className={styles['global-line']}>
        <span className={styles.dataKey}>{country?.title || t("Allworld")}</span>
      </ListGroup.Item>
        <div className={styles.countries} ref={cityInput}>
          {toFind && <Counties contries={contries} setCountry={setCountry} setToFind={setToFind}/>}
      </div>
    </ListGroup>
  </div>}
    
  {!activeData && <div className={styles.loading}>Loading...</div>}
</div>
} 



export default GlobalTable