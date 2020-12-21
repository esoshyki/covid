import styles from './Graphic.module.sass';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';
import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux'
import chooseCountry from '../../state/actions/chooseCountry'

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
            }
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

function Graphic({chosenCountry, dispatch, appState}) {

   // console.log(summary)
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
   // const getData = () =>{
   //    let data = [];
   
   //    data.push({
   //       title: 'Confirmed',
   //       data: getRandomDateArray(100)
   //    });
   
   //    data.push({
   //       title: 'Categories',
   //       data: getRandomArray(20)
   //    });
   
   //    data.push({
   //       title: 'Categories',
   //       data: getRandomArray(10)
   //    });
   
   //    data.push({
   //       title: 'Data 4',
   //       data: getRandomArray(6)
   //    });
   
   //    return data;
   // }
   
   // console.log(getData())





   
   // const state = {
   //    data: getData()
   // }
   





   // // setInterval(() => {
   // //    state.data = getData();
        
   // // }, 5000)


   return (
      <div className="Graphic">
         {/* <div className="main chart-wrapper">
           
            {<LineChart
               data={state.data[0].data}
               title={state.data[0].title}
               color="#3E517A"
            />}
         </div> */}
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


const mapStateToProps = state => {

   return {
      chosenCountry: state.chosenCountry,
      appState: state.appState
   }
}

export default connect(mapStateToProps)(Graphic);