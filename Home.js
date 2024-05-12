import React from 'react'
import Navbar from './Navbar'

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="fst-italic text-center bg-primary-subtle">
      <h2><p>Welcome to <strong>V Cart</strong></p></h2>
      <img src="/logo192.png" className="rounded bg-primary-subtle" alt="..."/>
      
    </div>
    </>
  )
}
