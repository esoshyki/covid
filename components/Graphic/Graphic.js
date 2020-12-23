import styles from './Graphic.module.sass';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';
import React from 'react';
import { connect } from 'react-redux'
import Chart from 'chart.js';
import Loading from '../Loading/Loading'
import { keys } from '../../state/reducers/appState';


class LineChart extends React.Component {
   constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
      this.title = props.title
   }

   componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.time);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update({
         lazy: true
      });
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
               label: this.title,
               data: this.props.data.map(d => d.value),
               fill: 'none',
               backgroundColor: this.props.color,
               pointRadius: 1,
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

function Graphic({history, appState, mapKey, dispatch}) {
  const { t } = useTranslation("global")
  const { key } = appState;

  const mapper = appState.mapper;
   
   const getRandomDateArray = (numItems) => {
      // Create random array of objects (with date)
      let data = [];
      let timeUnuque = 0;
      history.filter((el) => {
         if (el.day !== timeUnuque){
            timeUnuque = el.day;
            console.log(timeUnuque)
            return true
         } else {false}}
         ).forEach(element => {
         data.push({
            time: new Date(element.time),
            value: mapper(element)
         });
      });
      return data;
   }
   
   const getData = () =>{
      let data = [];
   
      data.push({
         title: key,
         data: getRandomDateArray()
      });
      
      return data;
   }

   const state = {
      data: getData()
   }

console.log(state.data[0].title, mapKey)

   return (
      <div  className="Graphic" style={{marginTop: 5}}>
         <h6 style={{textAlign: "center"}}>{t(mapKey)}</h6>
         {appState.historyLoading && <Loading />}
         <div className="main chart-wrapper">

            {<LineChart
               data={state.data[0].data}
               title={""}
               color="#3E517A"
            />}
         </div>
      
      </div>
   );
}


const mapStateToProps = state => {

   return {
      history: state.history,
      appState: state.appState,
      mapKey: state.appState.key
   }
}

export default connect(mapStateToProps)(Graphic);