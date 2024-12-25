import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSelllers from '../Components/BestSelllers'
import Policy from '../Components/Policy'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSelllers/>
      <Policy/>
      <Newsletter/>
    
    </div>
  )
}

export default Home