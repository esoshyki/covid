import { useEffect } from 'react'
import Map from '../components/Map/Map'
import Layout from '../components/Layout/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import Graphic from '../components/Graphic/Graphic'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import getCountries from '../state/actions/getCountries'
import getHistory from '../state/actions/getHistory';
import Card from 'react-bootstrap/Card'

const About = ({lang}) => {

  const { t } = useTranslation("about")

  useEffect(() => {
    console.log(lang)
  }, [lang])

  return (
    <Layout>
      <Container fluid style={{padding: 5}}>
        <h2>{t("summaryArticleTitle")}</h2>
        <article>
          {t("summaryArticle")}
        </article>

        <h2>{t("ourTeam")}</h2>
        <Row>

          <Col lg={4} md={12}>
            <a href="https://github.com/esoshyki" target="_blank" style={{
              textDecoration: 'none'
            }}>
              <Card >
                <Card.Header style={{textAlign: "center"}}>
                  Shyki
                </Card.Header>

                <Card.Body style={{ padding: 0}}>
                  <Card.Img src="https://cdn.igromania.ru/mnt/news/c/0/7/1/0/2/93633/6e4cdb20b6330a98_1920xH.jpg" />
                </Card.Body>

                <Card.Text style={{margin: 15}}>
                  {t("shykiCardText")}
                </Card.Text>

              </Card>
            </a>
          </Col>

          <Col lg={4} md={12}>
          <a href="https://github.com/Valeryaleshka" target="_blank" style={{
              textDecoration: 'none'
            }}>
              <Card >
                <Card.Header style={{textAlign: "center"}}>
                  Valeron
                </Card.Header>

                <Card.Body style={{ padding: 0}}>
                  <Card.Img src="https://images.wallpaperscraft.ru/image/avtomobil_neon_chelovek_137624_300x168.jpg" />
                </Card.Body>

                <Card.Text style={{margin: 15}}>
                  {t("valeronCardText")}
                </Card.Text>

              </Card>
            </a>
          </Col>
          
          <Col lg={4}>
          <a href="https://github.com/bexon26" target="_blank" style={{
              textDecoration: 'none'
            }}>
              <Card >
                <Card.Header style={{textAlign: "center"}}>
                  Bexon26
                </Card.Header>

                <Card.Body style={{ padding: 0, height:' 193px'}}>
                  <Card.Img style={{objectFit: 'cover', width:'100%',height:' 193px'}} src="https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg" />
                </Card.Body>

                <Card.Text style={{margin: 15}}>
                  {t("bexonCardText")}
                </Card.Text>

              </Card>
            </a>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

About.getInitialProps = ctx => {
  console.log(ctx.query)
  return {
    lang: ctx.query.lang
  }
}

export default About

