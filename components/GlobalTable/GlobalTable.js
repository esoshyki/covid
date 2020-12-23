import { useRef, useState } from "react"
import styles from './GlobalTable.module.sass'
import toNiceNum from '../../lib/toniceNum'
import { useTranslation } from 'react-i18next';
import DTO from './TableDTO';
import DTOLastDay from './TabloDTOLastDay';
import { Card, Dropdown, ListGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import getHistory from '../../state/actions/getHistory'
import Loading from '../Loading/Loading'
import React from 'react'

const GlobalTable = ({ countries, chosenCountrys, dispatch}) => {

  let chosenCountry;

  if (chosenCountrys === undefined || chosenCountrys === null) {
    if (countries.length < 1) {
      return <Loading />
    } else {
      chosenCountry = countries.find(country => country.country === "All")
    }
  } else {
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

  if (isTotalRender) {
    displayedCovidData = renderData;
    headDropdownText = t('global:All Time');
  } else {
    displayedCovidData = renderDataDaily;
    headDropdownText = t('global:Last Day');
  }

  function handleClick(country) {
    dispatch(getHistory(country.country !== "All" ? country : null))
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
          fontSize: 18,
          marginLeft: 10
        }}>
        {toNiceNum(value)}
      </Card.Text>

    </ListGroup.Item>
  )

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Dropdown.Toggle
      variant="success"
      style={{ width: "100%", color: "#fff" }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Dropdown.Toggle>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                (!value || child.props.children.toLowerCase().startsWith(value.toLowerCase())) || child.props.children === "All",
            )}
          </ul>
        </div>
      );
    },
  );

  const list =
    <ListGroup className={styles["list-group"]}>
      {Object.entries(displayedCovidData).map(([key, value]) => globalLine(key, value))}
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
          <Dropdown.Toggle as={CustomToggle} variant="success" style={{ width: "100%", color: "#fff" }}>
            {t(chosenCountry.country) || t('global:Allworld')}
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu} className={styles.dropdown}>
            <Dropdown.Item
              style={{ width: "100%" }}
              key={'AllWorld'}
              onClick={() => {
                handleClick(countries.find(country => country.country === "All")),
                  findCountrie()
              }}>
              {t('global:Allworld')}
            </Dropdown.Item>
            {countries
              .filter(a => a.country != a.continent)
              .sort((a, b) => a.country > b.country ? 1 : -1)
              .map(con => <Dropdown.Item
                style={{ width: "100%" }}
                key={con.country}
                onClick={() => {
                  handleClick(con),
                    findCountrie()
                }}>
                {t(con.country)}
              </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup.Item>
    </ListGroup>;


  return <Card ref={root} >
    <Dropdown>
      <Dropdown.Toggle style={{ width: "100%", color: "#fff" }} variant="success" id="dropdown-basic">
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
    history: state.history,
    appState: state.appState
  }
}

export default connect(GlobalTableStateToProps)(GlobalTable)