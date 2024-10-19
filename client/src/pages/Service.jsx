import React, {Component} from 'react'
import ServiceCart from '../components/serviceCart'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import service1 from '../Images/Services/service1.png'
import service2 from '../Images/Services/service2.png'
import service3 from '../Images/Services/service3.png'
import service4 from '../Images/Services/service4.png'
import service5 from '../Images/Services/service5.png'
import service6 from '../Images/Services/service6.png'

const Service = ({id}) => {

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div id={id} className='bg-white w-full min-h-screen overflow-x-hidden '>
      <div className='container mx-auto px-4 py-16'>
        <div className=' flex  items-center justify-center flex-col md:flex-row  mt-10 text-center'>
          <h1 className='text-5xl font-extrabold text-gray-800 mb-4'>Services</h1>
          <p className='text-2xl text-gray-600 max-w-2xl mx-14'>
            Empowering clients through innovative solutions and reliable support, ensuring success and satisfaction.
          </p>
        </div>
        <div className='px-4 sm:px-8 md:px-14 flex justify-center'>
          <div className='w-full max-w-[74rem]'>
            <Slider {...settings} className="service-slider  py-8">
              <div className="">
                <ServiceCart
                  imageUrl={service1}
                  heading="Salesforce Advisory Services"
                  paragraph="Our Salesforce Advisory team provides expert guidance on implementing, optimizing, and aligning Salesforce solutions with business goals. We help organizations maximize CRM efficiency, improve processes, and drive strategic growth through tailored recommendations.
"
                />
              </div>

              <div className="">
                <ServiceCart
                  imageUrl={service2}
                  heading="Salesforce Managed Services"
                  paragraph="We offer Salesforce Managed Services for ongoing support, maintenance, and optimization of Salesforce platforms, ensuring smooth operations, customizations, and scalability, allowing businesses to focus on growth while we handle technical needs"
                />
              </div>

              <div className="">
                <ServiceCart
                  imageUrl={service3}
                  heading="Salesforce Implementation Services"
                  paragraph="We help businesses set up and configure Salesforce to meet their specific needs. Our services include system setup, data migration, customization, and integration, ensuring a seamless and effective CRM deployment."
                />
              </div>

              <div className="">
                <ServiceCart
                  imageUrl={service4}
                  heading="Application Integration"
                  paragraph="Our experience of integrating various systems, including ERP, accounting, and customer service applications, with Salesforce helps us develop tailored integration strategies that connect front-end operations with back-end processes, enabling businesses to automate workflows and achieve a unified customer view."
                />
              </div>
              <div className="">
                <ServiceCart
                  imageUrl={service5}
                  heading="Custom App Development"
                  paragraph="Our Salesforce experts have a proven track record in developing, launching, and listing custom applications on App Exchanges, ensuring compliance with Salesforce guidelines and effectively navigating the intricacies of the listing process."
                />
              </div>
              <div className="">
                <ServiceCart
                  imageUrl={service6}
                  heading=" Staff Augmentation"
                  paragraph="As part of our Staff Augmentation services, we provide businesses with certified Salesforce experts on a temporary or long-term basis. We help scale teams, fill skill gaps, and support projects without the commitment of full-time hires, offering flexible monthly contracts."
                />
              </div>
              
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service
