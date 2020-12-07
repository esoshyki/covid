import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Layout from '../components/Layout/Layout'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import covidService from '../services/covid.service'

export default function Home({data}) {
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
            <GlobalTable data={data}/>
          </div>
        </div>
      </Layout>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  const covid = covidService.getSummary();
  const population = covidService.getWorldPopulation();
  const covidData = await covid.then(res => res.json());
  const populationData = await population.then(res => res.json());

  return {
    data: {
      ...covidData.Global,
      population: populationData.reduce((acc, cur) => acc + cur.population, 0)
    }
  }
}

