import { useState } from 'react'
import Header from '../components/Header'
import Paraphraser from '../components/Paraphraser'
import About from '../components/About'
import Footer from '../components/Footer'
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <>
      <Header />
      <Paraphraser />
      <About />
      <Footer />
      <Analytics />
    </>
  )
}

export default App
