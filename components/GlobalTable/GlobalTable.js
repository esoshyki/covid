import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Contries from './Countries'
import Counties from './Countries'
import axios from 'axios'
import covidService from '../../services/covid.service'


const GlobalTable = ({data, state, setState}) => {
  const { t } = useTranslation();
  const root = useRef();
  const cityInput = useRef();

  const [toFind, setToFind] = useState(false);
  const [contries, setCountries] = useState(null);
  const [covidData, setCovidData] = useState(data);

  const setCountry = (country) => {
    setState({
      ...state,
      country
    })
  }

  const { 
    TotalConfirmed, 
    NewConfirmed, 
    NewDeaths, 
    TotalDeaths, 
    NewRecovered, 
    TotalRecovered, 
    population } = data;

  const get100k = (value, x=0) => {
    return Math.round((+value * (10 ** 5)) / (+population)) / (10 ** x)}

  const findCountrie = async () => {
    setToFind(!toFind)
    const contriesList = await covidService.getContries()
    const data = await contriesList.data;
    setCountries((data.map(el => el.Country).sort()))
  }

  useEffect(() => {
    animation(root.current, styles.fadeOut)
  }, [data]);

  useEffect(() => {
    animation(cityInput.current, styles.fadeOut)
  }, [toFind])

  const globalLine = (key, value) => {

    return (key !== 'population' && key !== "countries") ? (
      <ListGroup.Item variant ="dark" className={styles['global-line']} key={key}>
        <span className={styles.dataKey}>{t(key) + " : "}</span>
        <span className={styles.dataValue}>{toNiceNum("" + value)}</span>
      </ListGroup.Item>
    ) : null
  }
  
  return <div ref={root} className={styles.root}>
  {covidData && <div className className={styles.global}>
    <ListGroup className={styles["list-group"]}>
      {data && Object.keys(data).map(key => globalLine(key, data[key])) }
      {globalLine("HundredKTotalConfirmed", get100k(TotalConfirmed))}
      {globalLine("HundredKTotalDead", get100k(TotalDeaths))}
      {globalLine("HundredKTotalRecovered", get100k(TotalRecovered))}
      {globalLine("HundredKDailyConfirmed", get100k(NewConfirmed))}
      {globalLine("HundredKDailyDead", get100k(NewDeaths, 4))}
      {globalLine("HundredKDailyRecovered", get100k(NewRecovered, 2))}
      <ListGroup.Item action variant="dark" onClick={findCountrie} className={styles['global-line']}>
        <span className={styles.dataKey}>{state.country || t("Allworld")}</span>
      </ListGroup.Item>
        <div className={styles.countries} ref={cityInput}>
          {toFind && <Counties contries={contries} setCountry={setCountry}/>}
      </div>
    </ListGroup>
  </div>}
    
  {!covidData && <div className={styles.loading}>Loading...</div>}
</div>
} 



export default GlobalTable