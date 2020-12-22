import { useEffect, useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import DTO from './TableDTO';
import DTOLastDay from './TabloDTOLastDay';
import {Card, Button, Dropdown, InputGroup, ListGroup} from 'react-bootstrap'
import { connect } from 'react-redux';
import chooseCountry from '../../state/actions/chooseCountry'

const GlobalTable = ({worldData, setCountry, country, countries, chosenCountry, dispatch}) => {  
  const { t } = useTranslation("countries", 'global');
  const root = useRef();

  const [toFind, setToFind] = useState(false);
  
  const [isTotalRender, setisTotalRender] = useState(false)

  const currentCountry = chosenCountry.country !== null ? {...chosenCountry.country, population: chosenCountry.country.Premium.CountryStats.Population} : worldData;
     
  const findCountrie = async () => {
    setToFind(!toFind)
  }

  const renderDaily = async () => {
    setisTotalRender(false)
  }

  const renderTotal = async () => {
    setisTotalRender(true)
  }  
  const renderData = DTO(currentCountry);
  const renderDataDaily = DTOLastDay(currentCountry);
 
    
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

    const countryLine = (key, value) => (
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
     list = 
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
      <Button vairant="primary" style={{width: "100%", color: "#fff"}}>{ t(currentCountry.Country) || t('global:Allworld')}</Button>
      </ListGroup.Item>        
          {toFind && <div className={styles.countries}>      
        <Dropdown className={styles.countries}>
          <Dropdown.Toggle variant="primary" className={styles.countries}>
            {t("ChooseCountry")}
            <InputGroup className="mb-3">
          
          </InputGroup>
          </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown} show={'true'}>
              <Dropdown.Item onClick={() => {dispatch(chooseCountry(null)); findCountrie()}} key={'null'}>{t('global:Allworld') }</Dropdown.Item>
              {countries 
                .map(con => <Dropdown.Item 
                            key={con.Slug}  
                            onClick={() => {
                            dispatch(chooseCountry(con));
                            findCountrie()} }>
                          {t(con.Country)}
                          </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>             
    </div>}      
    </ListGroup>;

    } else {

      list =   
    <ListGroup className={styles["list-group"]}>
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
        <Button vairant="primary" style={{width: "100%", color: "#fff"}}>{t(currentCountry.Country) || t('global:Allworld')}</Button>
      </ListGroup.Item>        
        {toFind && <div className={styles.countries}>      
        <Dropdown className={styles.countries}>
          <Dropdown.Toggle variant="primary" className={styles.countries}>
            {t("ChooseCountry")}
            <InputGroup className="mb-3">
          
          </InputGroup>
          </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown} show={'true'}>
              <Dropdown.Item key={'null'}>{t('global:Allworld')}</Dropdown.Item>
              {countries 
                .map(con => <Dropdown.Item 
                            key={con.Slug}  
                            onClick={() => {
                            dispatch(chooseCountry(con));
                            findCountrie()} }>
                            {t(con.Country)}
                          </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>             
    </div>}      
    </ListGroup>;
    }

  return <Card ref={root} >
    <Card.Title style={{color: "#000", margin: "auto", flexDirection: 'row'}}>
      <Button onClick={renderTotal} className={styles["change-button"]}  variant="primary">{t('global:All Time')}</Button>
      <Button onClick={renderDaily} className={styles["change-button"]}  variant="primary">{t('global:Last Day')}</Button>
    </Card.Title>

    {renderData && <div className className={styles.global}>
      {list}   
    </div>}
    
</Card>

} 

const GlobalTableStateToProps = state => {

  return {   
    population: state.summary.population,
    countries: state.countries,
    chosenCountry: state.chosenCountry    
  }
}



export default connect(GlobalTableStateToProps)(GlobalTable)

