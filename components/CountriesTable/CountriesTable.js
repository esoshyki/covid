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
import Button from 'react-bootstrap/Button'

const CountriesTable = ({countries, appState, dispatch}) => {

  const { t } = useTranslation('global');
  const conT = useTranslation("countries").t;

  const _onSelect = (eventKey) => {
    dispatch(setKey(eventKey))
  }

  return (
    <Card style={{ width: '100%'}}>
      <Card.Header style={{color: "#000"}}>
          {t("сountryTable")}
      </Card.Header>
      <Card.Body style={{width: "100%"}}>
      <Dropdown as={ButtonGroup} onSelect={_onSelect}>
      <Button variant="success">{t(appState.key)}</Button>
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

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