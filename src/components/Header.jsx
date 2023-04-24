import React, { useState } from 'react'
import icon from "../assets/Icon.png";
import x from "../assets/x.svg"

function Header() {

  const [visible, setVisible] = useState(true);

  const popupClose = () => {
    setVisible((prevState) => !prevState)
  }

  return (
    <>
      <header className='flex items-center justify-center flex-wrap bg-blue-400 p-6'>
        <section className="flex items-center flex-no-shrink text-white mr-6">
          <img src={icon} className='w-12 mr-4'/>
          <h1 className="font-semibold text-xl tracking-tight text-center">ტექსტის ავტომატური პერიფრაზირება </h1>
        </section>
      </header>
      { visible && 
      <div className="bg-indigo-900 text-center py-4 px-4 lg:px-4">
        <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg flex-col lg:flex-row lg:rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">გამარჯობა</span>
          <span className ="font-semibold mr-2 flex-auto my-4 lg:my-0 text-center">საიტი მუშაობს სატესტო რეჯიმში და მუდმივი დახვეწის პროცესშია. მოსალოდნელია გრამატიკული და სინტაქსური შეცდომები. მადლობა ❤</span>
          <img className='w-6 text-white hover:cursor-pointer' src={x} alt="Close Popup" onClick={popupClose}/>
        </div>
      </div> 
      }
    </>

    
  )
}

export default Header