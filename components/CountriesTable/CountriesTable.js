import styles from './CountriesTables.module.sass'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import setKey from '../../state/actions/setKey'
import { keys } from '../../state/reducers/appState';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Loading from '../Loading/Loading'

const CountriesTable = ({countries, appState, dispatch}) => {

  const { t } = useTranslation('global');
  const conT = useTranslation("countries").t;
  const [loading, setLoading] = useState(false);

  const _onSelect = (eventKey) => {
    dispatch(setKey(eventKey))
  }

  const enclude = [
    "Asia", "Europe", "North-America", "All", "South-America", "Africa"
  ]

  
  const Group = () => {

    const mapper = appState.mapper;
    const filtred = countries ? countries.filter(con => !enclude.includes(con.country)).map(con => {
      return ({
        country: con.country,
        cases: mapper(con),
        ISO: con.ISO
      })
    }).sort((a, b) => b.cases - a.cases) :null

    return (
      <ListGroup className="list-group-flush">
        {filtred && filtred.map((con, idx) => (
          <ListGroupItem 
            key={idx}
            style={{
              color: "#000",
              padding: 0,
              "&::hover" : {
                cursor: "pointer"
              }
              }}>
            <Image 
              style={{width: 32, height: 32, marginRight: 20}}
              rounded 
              src={con.ISO === 'BY' ? '/icons/bchb.png' : con.ISO ? `https://www.countryflags.io/${con.ISO}/flat/64.png` : "/default.jpg"}
            />
            <h5 style={{
              display: "inline-block",
              color: "black",
              fontSize: 12 }}>{conT(con.country)}</h5>
            <h6 style={{
              display: "inline-block", 
              color: "red",
              marginLeft: 20,
              fontSize: 12 
              }}>{con.cases}</h6>

          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }

  return (
    <Card style={{ width: '100%', height: 300, overflowY: "scroll"}}>
      {(appState.countriesLoading || loading) && <Loading />}
      <Card.Header 
        style={{
          color: "#000",
          padding: 5
          }}>
          {t("сountryTable")}
      </Card.Header>
      <Card.Body 
        style={{
          width: "100%",
          padding: 5
          }}>
        <Dropdown 
          as={ButtonGroup} 
          onSelect={_onSelect} 
          style={{
            position: "absolute",
            right: 5,
            zIndex: 5,
            top: 3
          }}
          >
          <Button 
            variant="success" 
            size="sm"
            style={{
              padding: 2,
              height: 35
            }}
            >
            {t(appState.key)}
          </Button>
          <Dropdown.Toggle split variant="success" style={{height: 35}} />

          <Dropdown.Menu>
            {Object.keys(keys).map((el, idx) => (
            <Dropdown.Item 
              eventKey={el}
              key={idx}>
              {t(el)}
            </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Group />
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = state => {

  return {
    countries: state.countries,
    appState: state.appState
  }
}

export default connect(mapStateToProps)(CountriesTable)