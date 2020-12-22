import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import DTO from './TableDTO';
import DTOLastDay from './TabloDTOLastDay';
import {Card, Button, Dropdown, InputGroup, ListGroup, DropdownButton} from 'react-bootstrap'
import { connect } from 'react-redux';
import getHistory from '../../state/actions/getHistory'
import Loading from '../Loading/Loading'

const GlobalTable = ({countries, chosenCountrys, dispatch}) => { 
 
  let chosenCountry; 
  
  if(chosenCountrys === undefined || chosenCountrys === null){    
    if(countries.length<1){      
      return <Loading />
    }else{      
      chosenCountry = countries.find(country => country.country === "All")      
    }    
  }else{
    chosenCountry = chosenCountrys
  }    
  
  const { t } = useTranslation("countries", 'global');
  const root = useRef();
  const [toFind, setToFind] = useState(false);  
  const [isTotalRender, setisTotalRender] = useState(true) 
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
  let displayedCovidData; 
  let headDropdownText;
  
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
      displayedCovidData = renderData;
      headDropdownText = t('global:All Time');
    }else{
      displayedCovidData = renderDataDaily;
      headDropdownText = t('global:Last Day');
    }
    
    const list = 
     <ListGroup className={styles["list-group"]}>
      {Object.entries(displayedCovidData).map(([key, value]) => globalLine(key, value)) }
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
              <Dropdown.Item  
                style={{width: "100%"}} 
                key={'AllWorld'}
                onClick={() => {
                handleClick(countries.find(country => country.country === "All")),
                findCountrie()}}>
                  {t('global:Allworld')}
                </Dropdown.Item>         
              {countries
                .filter(a => a.country != a.continent)
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
    
  return  <Card ref={root} >    
    <Dropdown>
      <Dropdown.Toggle style={{width: "100%", color: "#fff"}} variant="success" id="dropdown-basic">
        {headDropdownText}
    </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={renderTotal}>{t('global:All Time')}</Dropdown.Item>
        <Dropdown.Item onClick={renderDaily}>{t('global:Last Day')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

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