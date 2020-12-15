import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from './GlobalTable.module.sass'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function Counties ({countries, setCountry, setToFind}) {
  const { t } = useTranslation();

  const chooseCountry = async (country) => {
    setCountry(country);
    setToFind(false);
  }

  const [filtString, setFiltString] =useState("")

  const handleChange = ({target} )=> setFiltString(target.value)

  return (
    <div className={styles.countries}>
      {countries && (
        <Dropdown className={styles.countries}>
          <Dropdown.Toggle variant="primary" className={styles.countries}>
            {t("ChooseCountry")}
            <InputGroup className="mb-3">
            <FormControl onChange={handleChange}
              placeholder={t("Country")}
              aria-label={t("Country")}
            />
          </InputGroup>
          </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown} show={'true'}>
              <Dropdown.Item onClick={() => chooseCountry(null)} key={'null'}>{t("Allworld")}</Dropdown.Item>
              {countries
                .sort((a, b) => a.Country > b.Country ? 1 : -1)
                .filter(con => con.Country.toLowerCase().startsWith(filtString.toLowerCase()))
                .map(con => <Dropdown.Item 
                            key={con.Slug}  
                            onClick={() => chooseCountry(con)}>
                            {con.Country}
                          </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
        )}
      {!countries && t("Loading")}
    </div>
    )
}