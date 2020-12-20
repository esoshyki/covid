import styles from './CountriesTables.module.sass'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';

const keys = {
  TotalConfirmed: "TotalConfirmed",
  TotalDeaths : "TotalDeaths",
  TotalRecovered : "TotalRecovered",
  NewConfirmed: "NewConfirmed",
  NewDeaths : "NewDeaths",
  NewRecovered : "NewRecovered",
  HundredKTotalConfirmed : "HundredKTotalConfirmed",
  HundredKTotalDead : "HundredKTotalDead",
  HundredKTotalRecovered : "HundredKTotalRecovered",
  HundredKDailyConfirmed : "HundredKDailyConfirmed",
  HundredKDailyDead : "HundredKDailyDead",
  HundredKDailyRecovered : "HundredKDailyDead"
}

export default function CountriesTable ({countries}) {

  const { t } = useTranslation('countries');
  const [key, setKey] = useState(countries);

//при первой загрузке выдает ошибку
  const selectField = document.getElementById('field');
  let choosenField = 'TotalConfirmed';
  selectField.addEventListener('change', () => { 
    console.log(selectField.value);
    choosenField = selectField.value;
  });
  // ошибка на этом моменте, не выводит переменную choosenField после span, даже если я только ее вывожу 
  const countriesElement = countries.map((item, index) =>
      <li style={{color: "#000"}}><img src={`https://www.countryflags.io/${item.CountryCode}/flat/64.png`}></img><span>{item.Country}</span>{item.choosenField}</li>
  );
  
  function searchCountries() {
    let input, elements, ul, el;
    input = document.getElementById('myInput').value.toUpperCase();
    ul = document.getElementById("ul");
    elements = ul.getElementsByTagName("li");
    // 192 страны
    for (let i = 0; i < elements.length; i++) {
        el = elements[i].getElementsByTagName("span")[0].innerHTML.toUpperCase(); //получаем страны
        if (el.indexOf(input) > -1) {
          elements[i].style.display = "";
        }
        else {
          elements[i].style.display = "none";
        }
    }
  }

 
  //const selectOption = document.getElementById('sort');
 /* let typeOfSort;
  selectOption.addEventListener('change', () =>{
    console.log(selectOption.value);
    typeOfSort = selectOption.value;
    sort(typeOfSort);
  });
*/
  function sort(type) {
    console.log('sort');
    let ul,elements,el;
    ul = document.getElementById("ul");
    elements = ul.getElementsByTagName("li");
    for (let i = 0; i < elements.length; i++) {
      el = elements[i].getElementsByTagName("span")[0].innerHTML.toUpperCase();
        switch(type){
          case 'sortAlfabetUp': 
            el.sort((a,b)=>{
              return a.Country-b.Country;
            });
            console.log('countru = '+ countries);
        // break;
          default:
          el.sort((a,b)=>{
            return b.Country-a.Country;
          });
        // break;
        }
      }


    
  }

  function changeSize(){
    alert('hi');
  }




  return (
    <Card style={{ width: '100%'}}>
      <Card.Body className = {styles.countrieTable}>
        <Card.Title style={{color: "#000"}} className = {styles.title}>{t("CountriesTableTitle")}<button onClick={changeSize}><img src="https://img.icons8.com/windows/32/000000/resize-diagonal.png"/></button></Card.Title>
        <select id='sort' className = {styles.sort}>
          <option value='sortAlfabetUp'>Сортировка стран по возрастанию</option>
          <option value='sortAlfabetDown'>Сортировка стран по убыванию</option>
          <option value='TotalConfirmedUp'>Сортировка по возрастанию Total Confirmed</option>
          <option value='TotalConfirmedDown'>Сортировка по убыванию Total Confirmed</option>
          <option value='TotalDeathsUp'>Сортировка по возрастанию Total Deaths</option>
          <option value='TotalDeathsDown'>Сортировка по убыванию Total Deaths</option>
          <option value='TotalRecoveredUp'>Сортировка по возрастанию Total Recovered</option>
          <option value='TotalRecoveredDown'>Сортировка по убыванию Total Recovered</option>
        </select>
        <input className = {styles.input} type="text" id="myInput" onKeyUp={searchCountries} placeholder="Search for countries.."></input>
        <Card.Title>
          <div className = {styles.nav}>
          <div className = {styles.fieldName}><span>{"Countrie"}</span>
            <select id='field' className = {styles.sort}>
              <option value='TotalConfirmed'>Total Confirmed</option>
              <option value='TotalDeaths'>Total Deaths</option>
              <option value='TotalRecovered'>Total Recovered</option>
             </select>
          </div>
          <ul id="ul" className = {styles.ul}>{countriesElement}</ul>
          </div>
        </Card.Title>
        
      </Card.Body>
    </Card>
  )
}