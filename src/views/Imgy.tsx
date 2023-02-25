import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { HistorySidebar } from './components/HistorySidebar'
import { URL_LIST_IMAGES } from './constants'
import { Main } from './components/Main'

export default function Imgy({ images }) {
  return (
    <>
      <Head>
        <title>Imgy!</title>
        <meta name="description" content="Imgx challengue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-900">
        <HistorySidebar/>
        <Main/>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const res = await fetch(URL_LIST_IMAGES);
  const images = await res.json()

  return {
    props: {
      images
    }
  }
}
