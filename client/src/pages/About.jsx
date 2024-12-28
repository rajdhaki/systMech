import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import certificate1 from '../Images/Logos/Administrator.png'
import certificate2 from '../Images/Logos/AppBuilder.png'
import certificate3 from '../Images/Logos/CPQSpecialist.png'
import certificate4 from '../Images/Logos/data-architecture-and-management-designer.png'
import certificate5 from '../Images/Logos/DevelopmentLifecycleandDeploymentDesigner.png'
import certificate6 from '../Images/Logos/IntergrationArchitecture.jpg'
import certificate7 from '../Images/Logos/PD1.png'
import certificate8 from '../Images/Logos/PD2.png'
import certificate9 from '../Images/Logos/ServiceCloudConsltant.png'
import certificate10 from '../Images/Logos/SharingandVisiblityDesigner.jpeg'
import about from '../Images/About/about.png'


const About = ({ id }) => {
  const certificates = [
    certificate1, certificate2, certificate3, certificate4, certificate5,
    certificate6, certificate7, certificate8, certificate9, certificate10
  ];
  


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };


  return (
    <div id={id} className='min-h-screen bg-white flex flex-col justify-between p-4 md:p-8 overflow-x-hidden'>
      <div className='flex-grow flex flex-col md:flex-row justify-center md:mt-12 items-center gap-8 md:gap-24'>
        
        <div className='w-full md:w-1/2 max-w-lg flex flex-col items-center md:items-start gap-3'>
          <div className='text-center md:text-left'>
            <h1 className='text-3xl md:text-5xl font-bold mb-4 text-gray-800'>We <span className='text-blue-600'>SUCCEED</span> when our customers<span className='text-blue-600'> SUCCEED</span></h1>
            <p className='text-base md:text-xl text-gray-800'>
            At SystMech, we understand the unique challenges and opportunities within the Salesforce ecosystem. Whether you’re a startup forging new paths or an established enterprise refining your Salesforce CRM operations, we deliver exceptional value and transformative results tailored to your specific business needs. We believe that our customers' success is our success. ​
            </p>
          </div>
        </div>

        <div className='w-full md:w-1/2 max-w-md text-center'>
          <div className='rounded-md p-4 mb-8 w-full max-w-[470px] h-72 mx-auto flex flex-col justify-center items-center'>
            <img src={about} alt="" />
          </div>
        </div>

      </div>

      <div  className='mt-8 py-6 px-4 md:px-12 lg:px-48'>
        <Slider  {...settings}>
          
          {certificates.map((cert, index) => (
            <div key={index} className="px-7">
              <img 
                src={cert} 
                alt={`Certificate ${index + 1}`} 
                className=' h-auto object-contain rounded-md'
              />
            </div>
          ))}
          
        </Slider>
      </div>
    </div>
  )
}



export default About
