import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Layout from '../components/Layout/Layout'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import { useEffect, useState,  } from 'react'
import Map from '../components/Map/Map'
import covidService from '../services/covid.service'
import { Container, Row, Col } from 'react-bootstrap'
import Graphic from '../components/Graphic/Graphic'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { useRouter } from 'next/router'
import Error from '../components/Error/Error'
import { useTranslation } from 'react-i18next';

export default function Home({worldData, error}) {

  const [country, setCountry] = useState(null)
  const [data, setData] = useState(worldData);
  const router = useRouter()
  const { t } = useTranslation("home")

  useEffect(() => {
    setData(worldData)
  }, [worldData])

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {error && <Error 
          type={t("ServerErrorType")}
          message={t("ServerErrorMessage")}
          callback={() => router.push('/')}
          callbackDescription={t("CallbackText")}
          />}
        {!error && <Container fluid>
          <Row>
            <Col xs={4}>
              <GlobalTable 
              worldData={data} 
              setCountry={setCountry}  
              country={country}
              countries={data.countries}/>
            </Col>
            <Col xs={8}>
              <Map 
                countries={data.countries} 
                population={data.population} 
                setCountry={setCountry}
                country={country}/>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col xs={6}>
              <CountriesTable countries={data.countries} />
            </Col>
            <Col xs={6}>
              <Graphic country={country} countries={data.countries}/>
            </Col>
          </Row>
        </Container> }

        
      </Layout>

      <footer className={styles.footer}>

      </footer>
    </Container>
  )
}

Home.getInitialProps = async ctx => {
  try {
    const response = await covidService.getSummary();
    const data = await response.data;
  
    return ({
      worldData: {
        ...data.Global,
        population: data.Countries.reduce((acc, cur) => {
          return acc + cur.Premium.CountryStats.Population 
        }, 0),
        countries: data.Countries
      },
    })
  } catch (err) {
    return ({
      error: "Api is not availible"
    })
  }
}



