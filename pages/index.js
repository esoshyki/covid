import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Layout from '../components/Layout/Layout'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import covidService from '../services/covid.service'
import { useState } from 'react'

export default function Home({data}) {
  const [state, setState] = useState({
    country: null
  })

  console.log(data)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.container}>
          <div className={styles.leftPart}>
            <GlobalTable data={data} state={state} setState={setState}/>
          </div>
        </div>
      </Layout>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  const covid = await covidService.getSummary();
  const population = await covidService.getWorldPopulation();
  const covidData = await covid.data;
  const populationData = await population.data;
  console.log(covidData)

  return {
    data: {
      ...covidData.Global,
      countries: covidData.Countries.map(coun => coun.Country),
      population: populationData.reduce((acc, cur) => acc + cur.population, 0)
    }
  }
}

