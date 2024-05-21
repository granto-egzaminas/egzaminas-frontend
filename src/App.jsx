import React, { useEffect, useState } from 'react'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Body from './Components/Body/Body'
const App = () => {
  const current_theme = localStorage.getItem('current_theme')
  const [theme,setTheme] = useState(current_theme? current_theme: "light")
  useEffect(()=>{
    localStorage.setItem('current_theme',theme)
  },[theme])
  return (
    <div className={`container ${theme} `}>
      <Header theme={theme} setTheme={setTheme}/>
      <Body/>
      <Footer/>
      </div>
  )
}

export default App