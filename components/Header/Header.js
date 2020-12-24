import style from './Header.module.sass'
import Dropdown from 'react-bootstrap/Dropdown'
import i18n from '../Translation/i18n'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Clock from './Clock'
import { useRouter } from 'next/router'; 

const Header = () => {
  const router = useRouter();

  useTranslation();
  const [language, setLanguage] = useState('en');
  const [langIcon, setLongIcon] = useState(`english.png`)

  const handleChange = eventKey => {
    setLanguage(eventKey)
    i18n.changeLanguage(eventKey)
    switch (eventKey) {
      case "en":
        setLongIcon(`english.png`)
        break
      case "ru":
        setLongIcon(`russia.png`)
        break
      case "be":
        setLongIcon(`belarus.png`)
        break        
    }
  }

  function routeTo(address) {
    router.push(`/${address}`)
  }

  const { t } = useTranslation("global")

  return (
    <Navbar sticky="top" bg="dark" style={{maxHeight: 90}}>
      <Navbar.Brand href="/" >
        <Image alt="logo" src="/virus.gif" className={style.logo} />
      </Navbar.Brand>

    <div style={{display: "none"}}>
    	<h1>Covid Center</h1>
    </div>

    <Nav className="justify-content-center" activeKey="/" style={{color: "#fff"}}>
      <Nav.Item >
        <Nav.Link onClick={() => routeTo('')}>{t("home")}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => routeTo('about')}>{t("about")}</Nav.Link>
      </Nav.Item>
    </Nav>

    <Clock lang={language}/>

    <Dropdown 
      drop="left"
      style={{
      position: "absolute",
      bottom: 25,
      right: 15
    }}>
      <Dropdown.Toggle style={{
        backgroundImage: `url(/icons/${langIcon})`,
        width: 32,
        height: 32,
        backgroundSize: "cover"
      }}>
      </Dropdown.Toggle>

      <Dropdown.Menu  drop="top">

        <Dropdown.Item 
          onSelect={() => handleChange('en')}>
          <div className={style.en} />          
        </Dropdown.Item>

        <Dropdown.Item 
          onSelect={() => handleChange('ru')}>
          <div className={style.ru} />          
        </Dropdown.Item>

        <Dropdown.Item 
          onSelect={() => handleChange('be')}>
          <div className={style.be} />          
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
    </Navbar>
  )
}

export default Header