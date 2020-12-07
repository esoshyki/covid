import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from './GlobalTable.module.sass'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function Counties ({contries, setCountry}) {
  const { t } = useTranslation();

  const chooseCountry = (eventKey) => setCountry(eventKey)

  const [filtString, setFiltString] =useState("")

  const handleChange = ({target} )=> setFiltString(target.value)

  return (
    <div className={styles.countries}>
      {contries && (
        <Dropdown onSelect={chooseCountry} className={styles.countries}>
          <Dropdown.Toggle variant="primary" className={styles.countries}>
            {t("ChooseCountry")}
            <InputGroup className="mb-3">
            <FormControl onChange={handleChange}
              placeholder={t("Country")}
              aria-label={t("Country")}
            />
          </InputGroup>
          </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown}>
              {contries
                .filter(con => con.toLowerCase().includes(filtString.toLowerCase()))
                .map(con => <Dropdown.Item eventKey={con} key={con}>{con}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
        )}
      {!contries && `Loading...`}
    </div>
    )
}