import React from 'react'

export default function Footer() {
  return (
    <div className=' bg-white dark:bg-[#171736] dark:text-white w-full font-nunito text-sm p-5'>
        <footer className="relative  pb-6">
  <div className="container mx-auto px-4">
  <div className="divider"></div>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500  py-1">
          Copyright © <span id="get-current-year">2024</span> POS Software by Repwoop Company
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}
