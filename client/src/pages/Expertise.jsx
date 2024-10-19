import React from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import demoCorporate from '../Images/Expertise/demo-corporate.webp'
import demoCorporateBack from '../Images/Expertise/demo-corporate-03.png'
import salesforce from '../Images/Expertise/cloude.png'
import bullet from '../Images/Expertise/bullet.png'

gsap.registerPlugin(ScrollTrigger);

const Expertise = ({id}) => {
    const cloudeRef = React.useRef(null)
    const cloudeRef1 = React.useRef(null)
    const cloudeRef2 = React.useRef(null)
    const cloudeRef3 = React.useRef(null)

    useGSAP(() => {
        gsap.from([cloudeRef.current, cloudeRef1.current, cloudeRef2.current, cloudeRef3.current], {
            y: 45,
            duration: 1.5,
            // ease: "bounce.out",
            scrollTrigger: {
                trigger: [cloudeRef.current, cloudeRef1.current, cloudeRef2.current, cloudeRef3.current],
                // markers: true,
                // end : 'bottom 50%+=100px',
                // start: "top center",
                // pin: true
            }
        })
    })

    return (
        <div id={id} className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 flex flex-col py-6 overflow-x-hidden">
            <div className="flex-grow flex flex-col justify-center max-w-7xl mx-auto w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-center mt-14 mb-8 sm:mb-12 text-gray-800">
                    Our <span className="text-blue-600">EXPERTISE</span> can elevate your business to new <span className="text-blue-600">HEIGHTS</span>
                </h1>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 flex-grow">
                    <div className="md:w-1/4 flex-shrink-0">
                        <ExpertiseList
                            items={[
                                "Sales Cloud",
                                "Service Cloud",
                                "Salesforce Experience Cloud",
                                "Field Service Lightning"
                            ]}
                            paras={[
                                "Unify sales, billing, and revenue recognition processes.",
                                "Create and manage quotes, proposals, and pricing with ease.",
                                "Automates invoicing, payments, and revenue recognition for businesses.",
                                "Manage customer agreements and recurring revenue models effectively. "
                            ]}
                        />
                    </div>

                    <div className="relative flex items-center justify-center flex-grow overflow-hidden my-8 md:my-0">
                        <img src={salesforce} ref={cloudeRef} className='absolute w-20 sm:w-24 md:w-28 lg:w-36 left-1 sm:left-2 md:left-0 top-16 sm:top-10 md:top-32' alt="Salesforce Logo 1" />
                        <img src={salesforce} ref={cloudeRef1} className='absolute w-16 sm:w-20 md:w-24 lg:w-28 left-24 sm:left-28 md:left-32 top-3 md:top-5' alt="Salesforce Logo 2" />
                        <img src={salesforce} ref={cloudeRef2} className='absolute w-20 sm:w-24 md:w-28 lg:w-36 right-4 sm:right-6 md:right-0 top-14 sm:top-12 md:top-28' alt="Salesforce Logo 3" />
                        <img src={salesforce} ref={cloudeRef3} className='absolute w-12 sm:w-16 md:w-20 lg:w-24 right-1 sm:right-2 md:right-20 top-4 sm:top-2 md:top-11' alt="Salesforce Logo 4" />

                        <div className="relative w-full h-full">
                            <img src={demoCorporateBack} alt="Corporate Demo Background" className="absolute w-full h-full object-contain" />
                            <img src={demoCorporate} alt="Corporate Demo" className="relative max-w-full h-auto z-10 md:mt-32" />
                        </div>
                    </div>

                    <div className="md:w-1/4 flex-shrink-0">
                        <ExpertiseList
                            items={[
                                "Revenue Cloud",
                                "CPQ",
                                "Billing",
                                "Contracts & Subscriptions Management"
                            ]}
                            paras={[
                                "Streamlines sales process, automates tasks, and boosts productivity.",
                                "Enhance customer support with automation and insights.",
                                "Builds branded portals for customer engagement and collaboration.",
                                "Optimizes field operations and workforce management."
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExpertiseList = ({ items, paras }) => (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg  flex flex-col justify-center h-full">
        {items.map((item, index) => (
            <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-start justify-centers">
                    <span className="mr-3 mt-2">
                        <svg className="w-7 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" className="text-blue-600 opacity-90" />
                        </svg>
                    </span>
                    <div className='flex flex-col'>
                        <h3 className="text-2xl  font-bold mb-1 text-gray-800">{item}</h3>
                        <p className="text-xl  md:text-base text-gray-800">{paras[index]}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default Expertise
