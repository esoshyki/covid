import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Layout from '../components/Layout/Layout'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import { useEffect, useState, } from 'react'
import Map from '../components/Map/Map'
import covidService from '../services/covid.service'
import { Container, Row, Col } from 'react-bootstrap'
import Graphic from '../components/Graphic/Graphic'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { useRouter } from 'next/router'
import Error from '../components/Error/Error'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import getSummary from '../state/actions/summary';
import chooseCountry from '../state/actions/chooseCountry'

function Home({ summary, countries, chosenCountry, error, dispatch }) {

  useEffect(() => {
    if (Object.keys(summary).length === 0) {
      dispatch(getSummary())
    } else {
      console.log(summary)
    }
  }, [summary])

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {error && <Error
          type={t("APIerrorType")}
          message={t("APIerrorMessage")}
          callback={() => router.push('/')}
          callbackDescription={t("tryAgarin")}
        />}
        {!error && <Container fluid>
          <Row>
            <Col xs={4}>
              <GlobalTable
                worldData={summary}
                setCountry={chooseCountry}
                country={chosenCountry}
                countries={countries} />
            </Col>
            <Col xs={8}>
              <Map
                population={summary.population}
                chooseCountry={chooseCountry}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col xs={6}>
              <CountriesTable countries={countries} />
            </Col>
            <Col xs={6}>
              <Graphic summary={summary} country={chosenCountry} countries={countries} />
            </Col>
          </Row>
        </Container>}


      </Layout>

      <footer className={styles.footer}>

      </footer>
    </Container>
  )
}

const mapStateToProps = state => {

  return {
    summary: state.summary,
    countries: state.countries,
    chosenCountry: state.choseCountry
  }
}

export default connect(mapStateToProps)(Home)



