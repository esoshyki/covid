import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import Counties from './Countries'
import covidService from '../../services/covid.service'
import getCountryData from '../../lib/getCountryData'
import popApiDict from '../../lib/populationApiDict'



const GlobalTable = ({state, setState}) => {
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

  const [covidData, setCovidData] = useState(null)

  const get100k = (value, x=0) => {
    const { population } = covidData;

    return "" + (Math.round((+value * (10 ** 5) * (10 ** x)) / (+population))) / (10 ** x)
  }

  const findCountrie = async () => {
    setToFind(!toFind)
    const contriesList = await covidService.getContries()
    const data = await contriesList.data;
    setCountries((data.sort((a, b) => a.Country - b.Country)))
  }

  useEffect(() => {
    animation(root.current, styles.fadeOut)
  }, [covidData]);

  useEffect(() => {
    cityInput.current && animation(cityInput.current, styles.fadeOut)
  }, [toFind])

  useEffect(async() => {
    if (!state.country) {
      const covid = await covidService.getSummary();
      const _population = await covidService.getWorldPopulation();
      const _covidData = await covid.data;
      const populationData = await _population.data;

      const { 
        TotalConfirmed, 
        NewConfirmed, 
        NewDeaths, 
        TotalDeaths, 
        NewRecovered, 
        TotalRecovered, 
         } = _covidData.Global;

   
        setCovidData({
        Confirmed: TotalConfirmed,
        day_Confirmed: NewConfirmed,
        Deaths: TotalDeaths,
        day_Deaths: NewDeaths,
        Recovered: TotalRecovered,
        day_Recovered: NewRecovered,
        population: populationData.reduce((acc, cur) => acc + cur.population, 0)
      })
      return
    };

    const obj = {};
    const { country } = state;
    
    try {
      const cov_response = await covidService.getByCountry({country: country.Slug})
      const cov_data = await cov_response.data
      Object.assign(obj, getCountryData(cov_data))
    } catch (error) {
      console.log(error)
    }

    try {
      const pop_response = await covidService.getCountryPopulation(country.title)
      const pop_data = await pop_response.data;
      obj.population = pop_data[0]?.population
    } catch (error) {
      console.log(error)
    }
    setCovidData(obj)
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
      {globalLine("HundredKTotalConfirmed", get100k(covidData.Confirmed))}
      {globalLine("HundredKTotalDead", get100k(covidData.Deaths))}
      {globalLine("HundredKTotalRecovered", get100k(covidData.Recovered))}
      {globalLine("HundredKDailyConfirmed", get100k(covidData.day_Confirmed))}
      {globalLine("HundredKDailyDead", get100k(covidData.day_Deaths, 2))}
      {globalLine("HundredKDailyRecovered", get100k(covidData.day_Recovered))}
      <ListGroup.Item action variant="dark" onClick={findCountrie} className={styles['global-line']}>
        <span className={styles.dataKey}>{state.country?.title || t("Allworld")}</span>
      </ListGroup.Item>
        <div className={styles.countries} ref={cityInput}>
          {toFind && <Counties contries={contries} setCountry={setCountry} setToFind={setToFind}/>}
      </div>
    </ListGroup>
  </div>}
    
  {!covidData && <div className={styles.loading}>Loading...</div>}
</div>
} 



export default GlobalTable