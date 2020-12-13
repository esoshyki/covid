import styles from './Graphic.module.sass';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { useTranslation } from 'react-i18next';

export default function Graphic ({country, countries}) {

  const { t } = useTranslation('graphics')

  const [ data, setData ] = useState(null);

  const getCountryData = async (country) => {
    return country?.Country
  }

  const getAllWorldData = async() => {
    return 'All world'
  }

  useEffect(async() => {
    setData(country === null ? await getAllWorldData() : await getCountryData(country))
  }, [country])

  const Graph = ({data}) => {
  
  return <Card.Text style={{color: "#000"}}>{data}</Card.Text>
}

  return (
    <Card style={{ width: '100%', color: "#000"}}>
      <Card.Body>
        <Card.Title style={{color: "#000"}}>{t("Title")}</Card.Title>
        <Graph data={data} />
      </Card.Body>
    </Card>
  )
}