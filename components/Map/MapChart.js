import styles from './Map.module.sass';
import {  useState, useRef, useEffect } from 'react';
import { ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  ZoomableGroup, 
  } from "react-simple-maps"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useTranslation } from 'react-i18next'
import getHistory from '../../state/actions/getHistory'
import { connect } from 'react-redux';
import Loading from '../Loading/Loading'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


const MapChart = ({countries, setTooltipContent, chosenCountry, countriesLoading, dispatch}) => {

  const { t } = useTranslation("global")

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [circleMode, setCircleMode] = useState(true)
  const [chosenNode, setChosenNode] = useState(null)

  useEffect(() => {

  }, [countries])

  const map = useRef()

  useEffect(() => {
    const newCoords = chosenCountry ? {lat: chosenCountry.lat, long: chosenCountry.long }: { lat: 0, long: 0}
    const { lat, long} = newCoords;
    setPosition({coordinates: [long, lat], zoom: chosenCountry ? 8 : 1})
    const conNode = chosenCountry?.ISO ? document.querySelector("." + chosenCountry?.ISO) : null
    chosenNode && chosenNode.classList.remove("chosen");
    conNode && conNode.classList.add('chosen');
    setChosenNode(conNode)
  }, [chosenCountry])

  function handleZoomIn() {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    document.querySelector('.rsm-zoomable-group').classList.add('transition')
    setPosition(position);
  }

  function handleMoveStart () {
    document.querySelector('.rsm-zoomable-group').classList.remove('transition')
  }

  function handleClick (country) {
    country && dispatch(getHistory(country))
  }

  function changeMode (bool) {
    setCircleMode(bool)
  }

  function createTooltipData (country) {
    
      return country ? ({
        totalCases: country.cases.total, 
        totalDeaths: country.deaths.total, 
        totalRecoverd: country.cases.recovered, 
        newCases: country.cases.new, 
        newDeaths: country.deaths.new, 
        casesOnMillion: country.cases['1M_pop'], 
        deathOnMillion: country.deaths['1M_pop'],
        population: country.population,
        NAME: country.country,
        ISO_A2: country.ISO
      }) : ""
    }  

  function getColor (country) {
    const total = country?.cases.total;
    console.log(total * 0.0000055)
    return total ? `rgb(${total * 0.0000500}, 20, 30)` : "#000"
  }

  const zoomEnd = (e) => {
    document.querySelector(".transition").style.transitionDuration = 0;
  }

  const zoomStart = (e) => {
    document.querySelector(".transition").style.transitionDuration = "0.5s";
  }

  return (
    <div 
      style={{position: "relative", width: "100%", height: "100%"}} 
      onWheel={zoomStart}  
      > 

      <OverlayTrigger 
        placement="bottom"
        overlay={<Tooltip id="allWorld"><strong>{t('Allworld')}</strong></Tooltip>}
        >         
        <button 
          className={styles.allWorld} 
          onClick={() => dispatch(getHistory(null))}/>
      </OverlayTrigger>

      <div className={styles.mode}>

        <OverlayTrigger 
          placement="bottom"
          overlay={<Tooltip id="circleMode"><strong>{t('circleMode')}</strong></Tooltip>}
          > 
          <button 
            className={styles.circle} 
            onClick={() => changeMode(true)}/>
        </OverlayTrigger>

        <OverlayTrigger 
          placement="bottom"
          overlay={<Tooltip id="colorMode"><strong>{t('colorMode')}</strong></Tooltip>}
          >         
          <button 
            className={styles.color} 
            onClick={() => changeMode(false)}/>
        </OverlayTrigger>
         
      </div>
    <div className={styles.root}>
      {countriesLoading && <Loading />}
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }} fill={circleMode ? "yellow" : "black"} style={{
        backgroundColor: "#fff",
      }}
      >
        <ZoomableGroup
          className="transition"
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          onMoveStart={handleMoveStart}
          onWheel={zoomStart}
          onZoomEnd={zoomEnd}
          onMouseMove={(e) => e.target.style="transition-duration: 0"}
          >
        <Geographies 
          geography={geoUrl} 
          ref={map}
          >
          
          {({ geographies }) =>
            geographies.map(geo => {
              const { NAME, ISO_A2} = geo.properties;
              const country = countries.find(con => con.ISO === ISO_A2)
              if (!country) {
                console.log(NAME, ISO_A2)
              }
            return <Geography 
                    onMouseEnter={(e) => setTooltipContent(createTooltipData(country))}
                    onMouseLeave={(e) => setTooltipContent("")}
                    onClick={(e) => handleClick(country)}
                    onMouseLeave={() => setTooltipContent(null)}
                    key={geo.rsmKey} 
                    geography={geo}
                    className={ISO_A2}
                    style={{
                      default: {
                        fill: circleMode ? "#000" : getColor(country),
                        outline: "none",
                      },
                      hover: {
                        fill: "rgb(153, 142, 213)",
                        outline: "none",
                      },
                      pressed: {
                        fille: "red",
                        outline: "none",
                      }
                    }}
                    />
                  })
          }
        </Geographies>
          {countries && countries.map((con, idx) => {
          const lat = con?.lat;
          const long = con?.long;
          const totalConfirmed = con.cases.total;
          const size = totalConfirmed ** (0.5) / 100
          return ((long && lat) && circleMode) ? <Marker key={idx} coordinates={[long, lat]}>
            <circle 
            onMouseEnter={() => setTooltipContent(createTooltipData(con))}
            onMouseLeave={() => setTooltipContent("")}
            onClick={() => handleClick(con) }
            r={size / (position.zoom ** 0.5)} fill="#F53" />
          </Marker> : null})}

        </ZoomableGroup>
      </ComposableMap>

    </div>

    <div className={styles.controls}>
      <OverlayTrigger 
        placement="top"
        overlay={<Tooltip id="zoom-in"><strong>{t('zoomIn')}</strong></Tooltip>}
        >   
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </OverlayTrigger>

      <OverlayTrigger 
        placement="top"
        overlay={<Tooltip id="zoom-out"><strong>{t('zoomOut')}</strong></Tooltip>}
        >
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </OverlayTrigger>
    </div>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    countries: state.countries,
    chosenCountry: state.appState.chosenCountry,
    countriesLoading: state.appState.countriesLoading
  }
}

export default connect(mapStateToProps)(MapChart)