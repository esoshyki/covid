import style from './Layout.module.sass'
import Header from '../Header/Header'
import Container from 'react-bootstrap/Container'

const Layout = ({children}) => {
  return <Container>
    <Header />
    {children}
  </Container>
}

export default Layout