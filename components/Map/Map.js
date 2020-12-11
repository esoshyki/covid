import styles from './Map.module.sass';
import { useEffect, useState } from 'react';
import { ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  ZoomableGroup } from "react-simple-maps"
import Coords from './Coords'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export default function Map ({countries, population}) {

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

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

  const _countries = countries && countries.map(el => ({
    ...el,
    coords: Coords[el.CountryCode.toLowerCase()]}))

  console.log(countries)

  return (
    <div className={styles.root}>
    <ComposableMap>
      <ZoomableGroup
        zoom={position.zoom}
        center={position.coordinates}
        onMoveEnd={handleMoveEnd}
        >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo}/>)
          }
        </Geographies>
          {_countries && _countries.map((con, idx) => {
          const lat = con.coords?.lat;
          const long = con.coords?.long;
          const { TotalConfirmed } = con;
          const size = 9.5 ** 9 * (TotalConfirmed ** (1/3)) / population
          console.log(size)
          return <Marker key={idx} coordinates={[long, lat]}>
            <circle r={size / (position.zoom ** 0.5)} fill="#F53" />
          </Marker>})}
        </ZoomableGroup>
      </ComposableMap>
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