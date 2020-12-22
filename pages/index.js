import Layout from '../components/Layout/Layout'
import { useEffect } from 'react'
import Map from '../components/Map/Map'
import { Container, Row, Col } from 'react-bootstrap'
import Graphic from '../components/Graphic/Graphic'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { connect } from 'react-redux';
import getCountries from '../state/actions/getCountries'
import getHistory from '../state/actions/getHistory';

function Home({dispatch}) {

  useEffect(() => dispatch(getCountries()), [])
  useEffect(() => dispatch(getHistory()), [])

  return (
      <Layout>
        <Container fluid style={{padding: 0, paddingTop: 10}}>
          <Row>
            <Col lg={4} sm={false}>
              {/* <GlobalTable /> */}
            </Col>
            <Col lg={8} sm={12} >
              <Map />
            </Col>
          </Row>
          <Row style={{marginTop: 5}}>
            <Col lg={6} sm={12}>
              <CountriesTable />
            </Col>
            <Col lg={6} sm={12}>
              <Graphic />
            </Col>
          </Row>
        </Container>
      </Layout>
  )
}

const mapStateToProps = state => {

  return {
    countries: state.countries,
    history: state.history
  }
}

export default connect(mapStateToProps)(Home)



