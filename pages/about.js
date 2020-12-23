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

export default function About () {

  const { t } = useTranslation("about")

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
<<<<<<< HEAD

          <Col lg={4} md={12}>
            <a href="https://github.com/esoshyki" target="_blank" style={{
              textDecoration: 'none'
            }}>
              <Card >
                <Card.Header style={{textAlign: "center"}}>
                  Shyki
                </Card.Header>

                <Card.Body style={{ padding: 0}}>
                  <Card.Img src="https://avatars.mds.yandex.net/get-kinopoisk-post-img/1374145/4e559bf19bc46b2879cfbffa8792253b/960x540" />
                </Card.Body>

                <Card.Text style={{margin: 15}}>
                  {t("shykiCardText")}
                </Card.Text>

              </Card>
            </a>
          </Col>

          <Col lg={4} md={12}>
            <a href="https://github.com/esoshyki" target="_blank" style={{
=======
          <Col xs={4}>
          <a href="https://github.com/Valeryaleshka" target="_blank" style={{
>>>>>>> redux-valer
              textDecoration: 'none'
            }}>
              <Card >
                <Card.Header style={{textAlign: "center"}}>
<<<<<<< HEAD
                  Shyki
                </Card.Header>

                <Card.Body style={{ padding: 0}}>
                  <Card.Img src="https://giknutye.ru/wp-content/uploads/2016/08/giknutye-Doctor-Strange.jpg" />
                </Card.Body>

                <Card.Text style={{margin: 15}}>
                  {t("shykiCardText")}
=======
                  Valeron
                </Card.Header>

                <Card.Body style={{ padding: 0}}>
                  <Card.Img src="https://images.wallpaperscraft.ru/image/avtomobil_neon_chelovek_137624_300x168.jpg" />
                </Card.Body>

                <Card.Text style={{margin: 15}}>
                  {t("valeronCardText")}
>>>>>>> redux-valer
                </Card.Text>

              </Card>
            </a>
          </Col>
<<<<<<< HEAD

=======
          
          <Col xs={4}></Col>
>>>>>>> redux-valer
        </Row>
      </Container>
    </Layout>
  )
}