import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'

const locales = {
  en: "en-US",
  ru: "ru-RU",
  be: "be-BY"
}

const Clock = ({lang}) => {

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setTimeout(() => setDate(new Date()), 1000)
  })

  const formatter = new Intl.DateTimeFormat(locales[lang], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  return (
    <Container>
      <Row>
        <Col ld={12} className='d-sm-block d-none'>
          <span style={{color: "#fff", marginLeft: 20, fontSize: 14}}>
            {formatter.format(date)}
          </span>
        </Col>
      </Row>

    </Container>
  )
}

export default Clock