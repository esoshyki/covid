import styles from './Graphic.module.sass';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';
import React from 'react';
import { connect } from 'react-redux'
import Chart from 'chart.js';
import Loading from '../Loading/Loading'

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



// export default function Graphic ({country, countries}) {

//   const { t } = useTranslation('graphics')

//   const [ data, setData ] = useState(null);

//   const getCountryData = async (country) => {
//     return country?.Country
//   }

//   const getAllWorldData = async() => {
//     return 'All world'
//   }

//   useEffect(async() => {
//     setData(country === null ? await getAllWorldData() : await getCountryData(country))
//   }, [country])

//   const Graph = ({data}) => {

//   return <Card.Text style={{color: "#000"}}>{data}</Card.Text>
// }

//   return (
//     <Card style={{ width: '100%', color: "#000"}}>
//       <Card.Body>
//         <Card.Title style={{color: "#000"}}>{t("Title")}</Card.Title>
//         <Graph data={data} />
//       </Card.Body>
//     </Card>
//   )
// }

// Data generation
const getRandomArray = (numItems) => {
   // Create random array of objects
   let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   let data = [];
   for (var i = 0; i < numItems; i++) {
      data.push({
         label: names[i],
         value: Math.round(20 + 80 * Math.random())
      });
   }
   return data;
}





class LineChart extends React.Component {
   constructor(props) {
      super(props);
      this.canvasRef = React.createRef();

   }

   componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.time);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
   }

   componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
         type: 'line',
         options: {
            maintainAspectRatio: false,
            scales: {
               xAxes: [
                  {
                     type: 'time',
                     time: {
                        unit: 'week'
                     }
                  }
               ],
               yAxes: [
                  {
                     ticks: {
                        min: 0
                     }
                  }
               ]
            },
            aspectRatio: 1.4
         },
         data: {
            labels: this.props.data.map(d => d.time),
            datasets: [{
               label: this.props.title,
               data: this.props.data.map(d => d.value),
               fill: 'none',
               backgroundColor: this.props.color,
               pointRadius: 2,
               borderColor: this.props.color,
               borderWidth: 1,
               lineTension: 0
            }]
         }
      });
   }

   render() {
      return <canvas ref={this.canvasRef} />;
   }
}

function Graphic({history, dispatch, appState}) {
  const { t } = useTranslation("countries")
  const { key } = appState;
	const { chosenCountry } = history;

   console.log(history.days)
   const getRandomDateArray = (numItems) => {
      // Create random array of objects (with date)
      let data = [];
      for (var i = 0; i < history.length; i++) {
         data.push({
            time: new Date(history[i].time),
            value: history[i].cases.active
         });
      }
      return data;
   }
   // const getRandomDateArray = (numItems) => {
   //    // Create random array of objects (with date)
   //    let data = [];
   //    let baseTime = new Date('2018-09-01T00:00:00').getTime();
   //    let dayMs = 24 * 60 * 60 * 1000;
   //    for (var i = 0; i < numItems; i++) {
   //       data.push({
   //          time: new Date(baseTime + i * dayMs),
   //          value: Math.round(20 + 80 * Math.random())
   //       });
   //    }
   //    return data;
   // }
   const getData = () =>{
      let data = [];
   
      data.push({
         title: 'Confirmed',
         data: getRandomDateArray()
      });
   
      data.push({
         title: 'Categories',
         data: getRandomArray(20)
      });
   
      data.push({
         title: 'Categories',
         data: getRandomArray(10)
      });
   
      data.push({
         title: 'Data 4',
         data: getRandomArray(6)
      });
   
      return data;
   }
   
   //console.log(getData())

   const state = {
      data: getData()
   }
   
   // setInterval(() => {
   //    state.data = getData();
        
   // }, 5000)


   return (
      <div  className="Graphic">
         {appState.historyLoading && <Loading />}
         <div className="main chart-wrapper">
           
            {<LineChart
               data={state.data[0].data}
               title={state.data[0].title}
               color="#3E517A"
            />}
         </div>
         {/* <div className="sub chart-wrapper">
          <BarChart
            data={this.state.data[1].data}
            title={this.state.data[1].title}
            color="#70CAD1"
          />
        </div>
        <div className="sub chart-wrapper">
          <BarChart
            data={this.state.data[2].data}
            title={this.state.data[2].title}
            color="#B08EA2"
          />
        </div>
        <div className="sub chart-wrapper">
          <DoughnutChart
            data={this.state.data[3].data}
            title={this.state.data[3].title}
            colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']}
          />
        </div>
      */}
      </div>
   );
}














// import styles from './Graphic.module.sass';
// import { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card'
// import { useTranslation } from 'react-i18next';

// import Loading from '../Loading/Loading'
// import Badge from 'react-bootstrap/Badge';
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalBarSeries ,
//   Crosshair,
  
// } from 'react-vis';

// import { keys } from '../../state/reducers/appState';

// const mappers = {
// 	[keys.totalCases] : day => day.cases.total,
// 	[keys.totalDeaths] : day => day.deaths.total,
// 	[keys.totalRecoverd] : day => day.cases.recovered,
// 	[keys.newCases] : day => parseInt(day.cases.new),
// 	[keys.newDeaths] : day => parseInt(day.deaths.new),
// 	[keys.casesOnMillion] : day => parseInt(day.cases["1M_pop"]),
// 	[keys.deathOnMillion] : day => parseInt(day.deaths["1M_pop"])
// }

// function Graphic({history, dispatch, appState}) {

// 	const [crosshairValues, setCrosshairVelues] = useState([])

//   const { t } = useTranslation("countries")
//   const { key } = appState;
// 	const { chosenCountry } = history;
	
// 	const data = history.days ? [...history.days].reverse().map((day, idx) => {
// 		return ({
// 			x: idx,
// 			y: (mappers[key](day)),
// 			date: new Date(day.day)
// 		})
// 	}) : null;

// 	const _onNearestX = (value) => {
// 		console.log(value)
// 		// const { date, y } = value;
// 		// setCrosshairVelues([
// 		// 	date,
// 		// 	y
// 		// ])
// 	}

// 	const _onMouseLeave = () => {
// 		setCrosshairVelues([])
// 	}

//   return (

//     <Card>
//       {appState.loading && <Loading />}

//       <Card.Header style={{padding: 15}}>
//         <h5 style={{color: "#000"}}>
// 					{t(chosenCountry ? chosenCountry.country : "All")} <Badge variant="primary">{t(key)}</Badge>
// 				</h5>
//       </Card.Header>

// 			<Card.Body 
// 				style={{
// 					padding: 0,
// 					display: "flex",
// 					flexDirection: "column",
// 					alignItems: "center"}}>

// 			<XYPlot width={300} height={300} onMouseLeave={_onMouseLeave}>
// 				<VerticalBarSeries 
// 					data={data}
// 					onNearestX={_onNearestX}
// 				/>
// 				<Crosshair 
// 					values={crosshairValues}
// 					className="test-class-name"
// 				/>
// 	    </XYPlot>
//     	</Card.Body> 
//     </Card>
//    );
// }


const mapStateToProps = state => {

   return {
      history: state.history,
      appState: state.appState
   }
}

export default connect(mapStateToProps)(Graphic);