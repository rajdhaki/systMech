import React from 'react'
import img1 from '../Images/Home/image.png'
import img2 from '../Images/Home/img.png'
import salesforcePartner from '../Images/Logos/Salesforce_Partner_Logo.png'

const Home = ({id}) => {
  return (
    
    <div id={id} className="bg-gradient-to-r from-[#00c4d8] via-[#d3e0b3] to-[#f5da71] h-screen w-full overflow-x-hidden flex justify-center items-center flex-col">

      <div className=' md:flex md:justify-center md:gap-24 md:items-center'>

        <div className="relative w-full max-w-[80vw] md:w-[32vw] mx-auto md:mx-0 mb-8 md:mb-0">
          
          <img className='w-full opacity-45' src={img1} alt="Background" />
          <img className='w-full absolute top-0 left-0' src={img2} alt="Foreground" />
        </div>

        <div className=' md:flex md:flex-col md:justify-center '>

          <div className="text-center md:w-[44vw] md:text-left md:leading-tight">
            <h1 className="text-3xl md:text-6xl font-bold mb-4  tracking-tight">Empowering Customers</h1>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight ">Simplifying Salesforce Consultancy</h1>
            <h3 className="text-xl md:text-xl mb-1 leading-relaxed">We provide tailored CRM solutions for your</h3>

            <h3 className="text-xl md:text-xl ">Unique business requirements</h3>
          </div >

          <div className='mt-4 md:mt-8 text-center md:text-left'>
            <a href="#contact" className='py-3 px-6 md:px-8 text-sm md:text-base border-2 border-solid border-black bg-[#032e61] rounded-full transition duration-300 ease-in-out hover:bg-[#00a1e0] text-white md:w-auto'>
              Contact Us <span className='font-semibold text-lg'>→</span>
            </a>
          </div>

        </div>
      </div>
      <div className="absolute hidden md:block bottom-0 right-0 mb-4 mr-4 md:mb-8 md:mr-8">
        <img className='w-32 md:w-48' src={salesforcePartner} alt="Salesforce Partner" />
      </div>
    </div>
  )
}

export default Home