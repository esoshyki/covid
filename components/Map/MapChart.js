import styles from './Map.module.sass';
import {  useState, memo, useRef, useEffect } from 'react';
import { ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  ZoomableGroup, 
  } from "react-simple-maps"
import Coords from './Coords'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useTranslation } from 'react-i18next'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


const MapChart = ({countries, population, setCountry, country, setTooltipContent}) => {

  const { t } = useTranslation("global")

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [circleMode, setCircleMode] = useState(true)
  const [chosenNode, setChosenNode] = useState(null)

  const map = useRef()

  useEffect(() => {
    const newCoords = country ? Coords[country.CountryCode.toLowerCase()] : { lat: 0, long: 0} 
    const { lat, long} = newCoords;
    setPosition({coordinates: [long, lat], zoom: country ? 8 : 1})
    const conNode = country?.CountryCode ? document.querySelector("." + country?.CountryCode) : null
    chosenNode && chosenNode.classList.remove("chosen");
    conNode && conNode.classList.add('chosen');
    setChosenNode(conNode)
  }, [country])

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

  function handleClick (ISO) {
    const country = countries.find(el => el.CountryCode.toLowerCase() === ISO.toLowerCase())
    country && setCountry(country)
  }

  function changeMode (bool) {
    setCircleMode(bool)
  }

  function createTooltipData ({country, ISO_A2, NAME}) {
    const con = country || countries.find(el => el.CountryCode === ISO_A2);

    if (con) {
      const { TotalConfirmed, NewConfirmed, TotalDeaths, NewDeaths, TotalRecovered, NewRecovered } = con;
      return ({
        TotalConfirmed, 
        NewConfirmed, 
        TotalDeaths, 
        NewDeaths, 
        TotalRecovered, 
        NewRecovered, 
        population: con.Premium?.CountryStats?.Population,
        NAME: NAME || con.Country,
        ISO_A2: ISO_A2 || con.ISO_A2
      })
    } else {
      return NAME
    }
  }

  function getColor ({ISO_A2, key}) {
    const con = countries.find(el => el.CountryCode === ISO_A2)
    const target = con && con[key || "TotalConfirmed"];
    const size = target ? (11 * ((9.5 ** 9 * (target ** (1/3)) / population))) : 10
    return size
  }

  const _countries = countries && countries.map(el => ({
    ...el,
    coords: Coords[el.CountryCode.toLowerCase()],
    ISO_A2: el.CountryCode.toLowerCase()}
    ))

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
          onClick={() => setCountry(null)}/>
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
              const rgb = ISO_A2 !== -99 ? `rgba(${getColor({ISO_A2})}, 40, 20)` : null
            return <Geography 
                    onMouseEnter={(e) => setTooltipContent(createTooltipData({ISO_A2, NAME}))}
                    onMouseLeave={(e) => setTooltipContent("")}
                    onClick={(e) => handleClick(ISO_A2)}
                    onMouseLeave={() => setTooltipContent(null)}
                    key={geo.rsmKey} 
                    geography={geo}
                    className={ISO_A2}
                    style={{
                      default: {
                        fill: circleMode ? "#000" : rgb || "none",
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
                    }}/>
                  })
          }
        </Geographies>
          {_countries && _countries.map((con, idx) => {
          const lat = con.coords?.lat;
          const long = con.coords?.long;
          const { TotalConfirmed } = con;
          const size = 9.5 ** 9 * (TotalConfirmed ** (1/3)) / population
          return ((long && lat) && circleMode) ? <Marker key={idx} coordinates={[long, lat]}>
            <circle 
            onMouseEnter={() => setTooltipContent(createTooltipData({country: con}))}
            onMouseLeave={() => setTooltipContent("")}
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

export default memo(MapChart)