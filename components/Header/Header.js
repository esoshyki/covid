import style from './Header.module.sass'
import DropdownItem from 'react-bootstrap/DropdownItem'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import i18n from '../Translation/i18n'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {

  useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleChange = eventKey => {
    setLanguage(eventKey)
    i18n.changeLanguage(eventKey)
  }

  return <header className={style.root}>
    <Navbar bg="primary" style={{
      height: "100%", width: "100%"
    }}>
      <Navbar.Brand href="/">
        <img alt="logo" src="/virus.gif" className={style.logo} />
      </Navbar.Brand>

    <div className={style.title}>
    	<h1>Covid Center</h1>
    </div>
    <DropdownButton
			id="dropdown-basic-button"
			size="sm"
      variant="primary"
      style={{
        position: "absolute",
        right: 20,
        backgroundImage: `url(/icons/${language === 'en' ? "english.png" : "russia.png"})`,
        width: 32,
        height: 32,
        backgroundSize: "cover"
      }}>
			<DropdownItem onSelect={() => handleChange('en')}><div className={style.en}></div></DropdownItem>
			<DropdownItem onSelect={() => handleChange('ru')}><div className={style.ru}></div></DropdownItem>
    </DropdownButton>
    </Navbar>
  </header>
}

export default Header