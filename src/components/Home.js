import { HomeContextProvider } from '../context/HomeContext';

import React from 'react'
import HomeContainer from './HomeContainer';

function Home() {
  return (
    <HomeContextProvider>
        <HomeContainer />
    </HomeContextProvider>
  )
}

export default Home