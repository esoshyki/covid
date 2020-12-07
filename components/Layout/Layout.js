import style from './Layout.module.sass'
import Header from '../Header/Header'

const Layout = ({children}) => {
  return <div className={style.container}>
    <Header />
    {children}
  </div>
}

export default Layout