import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import Counties from './Countries'
import DTO from './TableDTO';

const GlobalTable = ({worldData, setCountry, country, countries}) => {
  const { t } = useTranslation();
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
      <ListGroup.Item variant ="dark" className={styles['global-line']} key={key}>
        <span className={styles.dataKey}>{t(key) + " : "}</span>
        <span className={styles.dataValue}>{toNiceNum("" + value)}</span>
      </ListGroup.Item>
    )

  const renderData = DTO(activeData)

  return <div ref={root} className={styles.root}>
  {renderData && <div className className={styles.global}>
    <ListGroup className={styles["list-group"]}>
      {Object.entries(renderData).map(([key, value]) => globalLine(key, value)) }
      <ListGroup.Item action variant="dark" onClick={findCountrie} className={styles['global-line']}>
        <span className={styles.dataKey}>{country?.Country || t("Allworld")}</span>
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
</div>
} 



export default GlobalTable