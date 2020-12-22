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
import { connect } from 'react-redux';
import getCountries from '../state/actions/getCountries'
import getHistory from '../state/actions/getHistory';

function Home({countries, history, dispatch}) {

  useEffect(() => dispatch(getCountries()), [])
  useEffect(() => dispatch(getHistory()), [])

  // useEffect(() => {
  //   if (countries.length === 0) {
  //     dispatch(getCountries())
  //   } else {

  //   }
  // }, [countries])

  // useEffect(() => {
  //   if (history.days && history?.days.length === 0) {
  //     dispatch(getHistory(history.chosenCountry))
  //   } else {
  //     console.log(history)
  //   }
  // }, [history])


  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>

        <Container fluid>
          <Row>
            <Col xs={4}>
              {/* <GlobalTable /> */}
            </Col>
            <Col xs={8}>
              <Map />
            </Col>
          </Row>
          <Row style={{marginTop: 5}}>
            <Col xs={6}>
              {/* <CountriesTable /> */}
            </Col>
            <Col xs={6}>
              <Graphic />
            </Col>
          </Row>
        </Container>

        
      </Layout>

      <footer className={styles.footer}>

      </footer>
    </Container>
  )
}

const mapStateToProps = state => { 

  return {
    countries: state.countries,
    history: state.history
  }
}

export default connect(mapStateToProps)(Home)



