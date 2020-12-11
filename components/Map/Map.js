import styles from './Map.module.sass';
import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import Coords from './Coords'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export default function Map ({countries, population}) {

  const _countries = countries && countries.map(el => ({
    ...el,
    coords: Coords[el.CountryCode.toLowerCase()]}))

  console.log(countries)

  return (
    <div className={styles.root}>
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      {_countries && _countries.map((con, idx) => {
      const lat = con.coords?.lat;
      const long = con.coords?.long;
      const { TotalConfirmed } = con;
      const size = 10 ** 9 * (TotalConfirmed ** (1/3)) / population
      console.log(size)
      return <Marker key={idx} coordinates={[long, lat]}>
        <circle r={size} fill="#F53" />
      </Marker>})}
    </ComposableMap>
    </div>
  )
}