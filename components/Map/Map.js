import styles from './Map.module.sass';
import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import Coords from './Coords'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export default function Map ({countries}) {

  const _countries = countries.map(el => ({
    ...el,
    coords: Coords[el.CountryCode.toLowerCase()]}))

  return (
    <div className={styles.root}>
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      {_countries.map((con, idx) => {
      const lat = con.coords?.lat;
      const long = con.coords?.long;
      return <Marker key={idx} coordinates={[long, lat]}>
        <circle r={8} fill="#F53" />
      </Marker>})}
    </ComposableMap>
    </div>
  )
}