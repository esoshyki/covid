import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Layout from '../components/Layout/Layout'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import { useState } from 'react'

export default function Home() {
  const [state, setState] = useState({
    country: null
  })

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.container}>
          <div className={styles.leftPart}>
            <GlobalTable state={state} setState={setState}/>
          </div>
        </div>
      </Layout>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}



