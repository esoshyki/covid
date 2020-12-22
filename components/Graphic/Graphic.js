import styles from './Graphic.module.sass';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import Loading from '../Loading/Loading'
import Badge from 'react-bootstrap/Badge';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries ,
  Crosshair,
  
} from 'react-vis';

import { keys } from '../../state/reducers/appState';

const mappers = {
	[keys.totalCases] : day => day.cases.total,
	[keys.totalDeaths] : day => day.deaths.total,
	[keys.totalRecoverd] : day => day.cases.recovered,
	[keys.newCases] : day => parseInt(day.cases.new),
	[keys.newDeaths] : day => parseInt(day.deaths.new),
	[keys.casesOnMillion] : day => parseInt(day.cases["1M_pop"]),
	[keys.deathOnMillion] : day => parseInt(day.deaths["1M_pop"])
}

function Graphic({history, dispatch, appState}) {

	const [crosshairValues, setCrosshairVelues] = useState([])

  const { t } = useTranslation("countries")
  const { key } = appState;
	const { chosenCountry } = history;
	
	const data = history.days ? [...history.days].reverse().map((day, idx) => {
		return ({
			x: idx,
			y: (mappers[key](day)),
			date: new Date(day.day)
		})
	}) : null;

	const _onNearestX = (value) => {
		console.log(value)
		// const { date, y } = value;
		// setCrosshairVelues([
		// 	date,
		// 	y
		// ])
	}

	const _onMouseLeave = () => {
		setCrosshairVelues([])
	}

  return (

    <Card>
      {appState.loading && <Loading />}

      <Card.Header style={{padding: 15}}>
        <h5 style={{color: "#000"}}>
					{t(chosenCountry ? chosenCountry.country : "All")} <Badge variant="primary">{t(key)}</Badge>
				</h5>
      </Card.Header>

			<Card.Body 
				style={{
					padding: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center"}}>

			<XYPlot width={300} height={300} onMouseLeave={_onMouseLeave}>
				<VerticalBarSeries 
					data={data}
					onNearestX={_onNearestX}
				/>
				<Crosshair 
					values={crosshairValues}
					className="test-class-name"
				/>
	    </XYPlot>
    	</Card.Body> 
    </Card>
   );
}


const mapStateToProps = state => {

   return {
      history: state.history,
      appState: state.appState
   }
}

export default connect(mapStateToProps)(Graphic);