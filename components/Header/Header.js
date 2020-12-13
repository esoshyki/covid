import style from './Header.module.sass'
import DropdownItem from 'react-bootstrap/DropdownItem'
import DropdownButton from 'react-bootstrap/DropdownButton'
import i18n from '../Translation/i18n'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const Header = () => {

  useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleChange = eventKey => {
    setLanguage(eventKey)
    i18n.changeLanguage(eventKey)
  }

  return <header className={style.root}>
    <img alt="logo" src="/virus.gif" className={style.logo} />
    <div className={style.title}>
    	<h1>Covid Center</h1>
    </div>
    <DropdownButton 
			id="dropdown-basic-button"
			size="sm"
      title={language} 
      variant="info"
      style={{
        position: "absolute",
        right: 20
      }}>
			<DropdownItem eventKey='en' onSelect={handleChange}><div className={style.en}></div></DropdownItem>
			<DropdownItem eventKey='ru' onSelect={handleChange}><div className={style.ru}></div></DropdownItem>
    </DropdownButton>
  </header>
}

export default Header