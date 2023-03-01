import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { ImgyStoreProvider, SSRDataProps } from '@/controllers/useImgyStoreProvider'

import { POSSIBLE_PROPS_FOR_CHANGE, URL_LIST_IMAGES } from './constants'
import { Main } from './components/Main'

export type ImgyViewProps = {
  ssrData: SSRDataProps;
}

export default function Imgy({ ssrData }: ImgyViewProps) {

  return (
    <>
      <ImgyStoreProvider>
        <Head>
          <title>Imgy!</title>
          <meta name="description" content="Imgx challengue" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-gray-900">
          <Main ssrData={ssrData}/>
        </main>
      </ImgyStoreProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const res = await fetch(URL_LIST_IMAGES);
  const images = await res.json()
  const possibleChanges = POSSIBLE_PROPS_FOR_CHANGE;

  return {
    props: {
      ssrData: {
        images,
        possibleChanges 
      } 
    }
  }
}
