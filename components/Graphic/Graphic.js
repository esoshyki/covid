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
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries
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

  const { t } = useTranslation("countries")
  const { key } = appState;
	const { chosenCountry } = history;
	
	const data = history.days ? history.days.reverse().map(day => {
		return ({
			x: new Date(day.day),
			y: mappers[key](day)
		})
	}) : null;

	console.log(history)
	console.log(data)

  return (

    <Card>
      {appState.loading && <Loading />}

      <Card.Title style={{padding: 15}}>
        <h5 style={{color: "#000"}}>
					{t(chosenCountry ? chosenCountry.country : "All")} <Badge variant="primary">{t(key)}</Badge>
				</h5>
      </Card.Title>

      <Card.Body style={{padding: 0}}>

				<XYPlot width={300} height={300}>
      		<VerticalGridLines />
      		<HorizontalGridLines />
      		<XAxis />
      		<YAxis />
      		<LineMarkSeries
        		className="linemark-series-example"
        		style={{
         		  strokeWidth: '3px'
        		}}
        		lineStyle={{stroke: 'red'}}
        		markStyle={{stroke: 'blue'}}
        		data={data}
      />
      <LineMarkSeries
        className="linemark-series-example-2"
        curve={'curveMonotoneX'}
        data={[{x: 1, y: 11}, {x: 1.5, y: 29}, {x: 3, y: 7}]}
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