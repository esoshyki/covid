import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import Counties from './Countries'
import covidService from '../../services/covid.service'
import getSumCases from '../../lib/getSumCases'



const GlobalTable = ({data, state, setState}) => {
  const { t } = useTranslation();
  const root = useRef();
  const cityInput = useRef();

  const [toFind, setToFind] = useState(false);
  const [contries, setCountries] = useState(null);

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

  const [covidData, setCovidData] = useState({
    confirmed: TotalConfirmed,
    day_confirmed: NewConfirmed,
    deaths: TotalDeaths,
    day_deaths: NewDeaths,
    recovered: TotalRecovered,
    day_recovered: NewRecovered,
    population: population
  })

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
  }, [covidData]);

  useEffect(() => {
    animation(cityInput.current, styles.fadeOut)
  }, [toFind])

  useEffect(async() => {
    if (!state.country) return;
    const obj = {};
    const keys = ['confirmed', 'deaths', 'recovered']
    const [ confirmed, deaths, recovered ] = keys;
    const { country } = state;
    await Promise.all([
      covidService.getByCountry({country, status: confirmed}),
      covidService.getByCountry({country, status: deaths}),
      covidService.getByCountry({country, status: recovered}),       
    ]).then(values => values.map(value => value.data))
      .then(dataArrays => {
        Object.assign(obj, getSumCases(dataArrays, ...keys))
      })
    .catch(err => console.log(err));
    const population = await covidService.getCountryPopulation(country)
    obj.population = population.data[0]?.population;
    setCovidData({...obj})
  }, [state])



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
      {covidData && Object.keys(covidData).map(key => globalLine(key, covidData[key])) }
      {globalLine("HundredKTotalConfirmed", get100k(covidData.confirmed))}
      {globalLine("HundredKTotalDead", get100k(covidData.deaths))}
      {globalLine("HundredKTotalRecovered", get100k(covidData.recovered))}
      {globalLine("HundredKDailyConfirmed", get100k(covidData.day_confirmed))}
      {globalLine("HundredKDailyDead", get100k(covidData.day_deaths, 4))}
      {globalLine("HundredKDailyRecovered", get100k(covidData.day_recovered, 2))}
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