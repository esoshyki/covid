import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import animation from '../../lib/animation'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';


const GlobalTable = ({data}) => {
  const { t } = useTranslation();
  const root = useRef();

  const [state, setState ] = useState(data);

  const { 
    TotalConfirmed, 
    NewConfirmed, 
    NewDeaths, 
    TotalDeaths, 
    NewRecovered, 
    TotalRecovered, 
    population } = state;

  const get100k = (value, x=0) => Math.round((+value * (10 ** 5)) / (population)) / (10 ** x)

  useEffect(() => {
    animation(root.current, styles.fadeOut)
  }, [data]);

  const globalLine = (key, value) => {

    return key !== 'population' ? (
      <ListGroup.Item action variant ="dark" className={styles['global-line']} key={key}>
        <span className={styles.dataKey}>{t(key) + " : "}</span>
        <span className={styles.dataValue}>{toNiceNum(value)}</span>
      </ListGroup.Item>
    ) : null
  }
  
  return <div ref={root} className={styles.root}>
  {data && <div className className={styles.global}>
    <ListGroup className={styles["list-group"]}>
      {data && Object.keys(data).map(key => globalLine(key, data[key])) }
      {globalLine(t("100kTotalConfirmed"), get100k(TotalConfirmed))}
      {globalLine(t("100kTotalDead"), get100k(TotalDeaths))}
      {globalLine(t("100kTotalRecovered"), get100k(TotalRecovered))}
      {globalLine(t("100kDailyConfirmed"), get100k(NewConfirmed))}
      {globalLine(t("100kDailyDead"), get100k(NewDeaths, 4))}
      {globalLine(t("100kDailyRecovered"), get100k(NewRecovered, 2))}
    </ListGroup>
  </div>}
    
  {!data && <div className={styles.loading}>Loading...</div>}
</div>
} 



export default GlobalTable