import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import DTO from './TableDTO';
import DTOLastDay from './TabloDTOLastDay';
import {Card, Button, Dropdown, InputGroup, ListGroup} from 'react-bootstrap'
import { connect } from 'react-redux';
import getHistory from '../../state/actions/getHistory'
import Loading from '../Loading/Loading'

const GlobalTable = ({countries, chosenCountrys, dispatch}) => { 
 
  console.log('!!!!!!!!!!!')
  console.log(countries)
  console.log(chosenCountrys)

  let chosenCountry;
  
  if(chosenCountrys === undefined || chosenCountrys === null){
    
    if(countries.length<1){
      console.log('oops');
      return <Loading />
    }else{
      console.log("это")
      chosenCountry =countries.find(country => country.country === "All")      
    }    
  }else{
    chosenCountry = chosenCountrys
  } 
   
    
  const { t } = useTranslation("countries", 'global');

  const root = useRef();

  const [toFind, setToFind] = useState(false);
  
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
  const renderData = DTO(chosenCountry);
  const renderDataDaily = DTOLastDay(chosenCountry);
  let data; 
  
  function handleClick (country) {
    dispatch(getHistory(country))
  }

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
          {t(`global:${key}`) + " : "}
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

    
    
    if (isTotalRender) {
      data = renderData;
    }else{
      data = renderDataDaily;
    }

    
    const list = 
     <ListGroup className={styles["list-group"]}>
      {Object.entries(data).map(([key, value]) => globalLine(key, value)) }
      <ListGroup.Item
        style={{
          width: "100%",
          padding: '5px',
          fontSize: 18
        }}
        action 
        onClick={findCountrie} 
      >
       <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: "100%", color: "#fff"}}>
            { t(chosenCountry.country) || t('global:Allworld')}            
          </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown}>           
              {countries 
                .sort((a, b) => a.country > b.country ? 1 : -1)
                .map(con => <Dropdown.Item 
                            style={{width: "100%"}}
                            key={con.country}  
                            onClick={() => {
                            handleClick(con),
                            findCountrie()} }>
                          {t(con.country)}
                          </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>  
      </ListGroup.Item> 
    </ListGroup>;
    
  return <Card ref={root} >
    <Card.Title style={{color: "#000", margin: "auto", flexDirection: 'row'}}>
      <Button onClick={renderTotal} className={styles["change-button"]}  variant="success">{t('global:All Time')}</Button>
      <Button onClick={renderDaily} className={styles["change-button"]}  variant="success">{t('global:Last Day')}</Button>
    </Card.Title>

    {renderData && <div className className={styles.global}>
      {list}   
    </div>}
    
</Card>

} 


const GlobalTableStateToProps = state => {

  return {
    countries: state.countries,
    chosenCountrys: state.appState.chosenCountry,      
  }
}

export default connect(GlobalTableStateToProps)(GlobalTable)