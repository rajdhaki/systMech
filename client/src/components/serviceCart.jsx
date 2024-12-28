import React from 'react'


const ServiceCart = ({ imageUrl, heading, paragraph }) => {
  return (
    <div className="bg-gradient-to-r from-[#00c4d8] via-[#d3e0b3] to-[#f5da71] w-full  rounded-lg shadow-md h-[500px] overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col m-4">
      <div className="flex justify-center items-center h-40 overflow-hidden">
        <img src={imageUrl} alt={heading} className="w-3/5 h-4/5 object-contain" />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <h3 className="text-2xl font-bold mb-2 text-center">{heading}</h3>
        <p className="text-[18px] text-center flex-grow">{paragraph}</p>
      </div>
    </div>
  )
}

export default ServiceCart
