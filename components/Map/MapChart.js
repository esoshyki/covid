import styles from './Map.module.sass';
import {  useState, memo } from 'react';
import { ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  ZoomableGroup, 
  } from "react-simple-maps"
import Coords from './Coords'
import Pagination from 'react-bootstrap/Pagination'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


const MapChart = ({countries, population, setCountry, setTooltipContent}) => {

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [tooltip, setTooltip] = useState(null)
  const [circleMode, setCircleMode] = useState(true)

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleClick (ISO) {
    const country = countries.find(el => el.CountryCode.toLowerCase() === ISO.toLowerCase())
    country && setCountry(country)
  }

  function changeMode (bool) {
    setCircleMode(bool)
  }

  function getColor ({ISO_A2, key}) {
    const con = countries.find(el => el.CountryCode === ISO_A2)
    const target = con && con[key || "TotalConfirmed"];
    const size = target ? (11 * ((9.5 ** 9 * (target ** (1/3)) / population))) : 10
    return size
  }

  const _countries = countries && countries.map(el => ({
    ...el,
    coords: Coords[el.CountryCode.toLowerCase()]}))

  return (
    <div style={{position: "relative", width: "100%", height: "100%"}}> 
      <div className={styles.mode}>
        <button className={styles.circle} onClick={() => changeMode(true)}/>
        <button className={styles.color} onClick={() => changeMode(false)}/>
      </div>
      <div className={styles.root}>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }} fill={circleMode ? "yellow" : "black"}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          onMouseDown={(e) => e.target.style="transition-duration: 0"}
          onMouseMove={(e) => e.target.style="transition-duration: 0"}
          >
        <Geographies geography={geoUrl} fill="rgb(20, 20, 20)">
          {({ geographies }) =>
            geographies.map(geo => {
              const { NAME, ISO_A2} = geo.properties;
              const rgb = ISO_A2 !== -99 ? `rgba(${getColor({ISO_A2})}, 40, 20)` : null
            return <Geography 
                    onMouseEnter={(e) => setTooltipContent(NAME)}
                    onMouseLeave={(e) => setTooltipContent("")}
                    onClick={() => handleClick(ISO_A2)}
                    onMouseLeave={() => setTooltipContent(null)}
                    key={geo.rsmKey} 
                    geography={geo}
                    style={{
                      default: {
                        fill: circleMode ? "#000" : rgb || "none",
                        outline: "none"
                      },
                      hover: {
                        fill: "#fff",
                        outline: "none"
                      },
                      pressed: {
                        fill: "red",
                        outline: "none"
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
            onMouseEnter={() => setTooltipContent(con.Country)}
            onMouseLeave={() => setTooltipContent("")}
            r={size / (position.zoom ** 0.5)} fill="#F53" />
          </Marker> : null})}

        </ZoomableGroup>
      </ComposableMap>

    </div>

    <div className={styles.controls}>
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
      </div>
  </div>
  )
}

export default memo(MapChart)