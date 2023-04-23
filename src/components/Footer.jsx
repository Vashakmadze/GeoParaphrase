import React from 'react'

import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";



function Footer() {
  return (
    <footer className='w-10/12 m-auto border-t-2 border-grey border-solid py-4 text-[#8c8d94] flex justify-between flex-row'>
        <p>© Copyright 2023 ყველა უფლება დაცულია</p>
        <div className='icons flex flex-row [&>*]:text-2xl [&>*]:mx-2 [&>*]:hover:cursor-pointer'>
            <a href='https://www.facebook.com/luka.vashakmadze.1' target='blank'>
                <BsFacebook className='hover:fill-[#60A5FA]'/>
            </a>
            <a href='https://github.com/Vashakmadze' target='blank'>
                <BsGithub className='hover:fill-[#60A5FA]'/>
            </a>
            <a href='https://www.linkedin.com/in/luka-vashakmadze-6690311b7/' target='blank'>
                <BsLinkedin className='hover:fill-[#60A5FA]'/>
            </a>
            <a href='https://www.instagram.com/lukavasha/' target='blank'>
                <BsInstagram className='hover:fill-[#60A5FA]'/>
            </a>
        </div>
    </footer>
  )
}

export default Footer