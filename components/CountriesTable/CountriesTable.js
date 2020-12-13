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

  const { t } = useTranslation('countries')

  const [key, setKey] = useState()

  return (
    <Card style={{ width: '100%'}}>
      <Card.Body>
        <Card.Title style={{color: "#000"}}>{t("CountriesTableTitle")}</Card.Title>
      </Card.Body>
    </Card>
  )
}