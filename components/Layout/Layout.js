import style from './Layout.module.sass'
import Header from '../Header/Header'
import Container from 'react-bootstrap/Container'
import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <Container fluid={"lg"}>
      <Head>
        <title>Covid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </Container>)
}

export default Layout