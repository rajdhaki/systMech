import React from 'react'
import contact from '../Images/Contact/contactImg.png'
import ReCAPTCHA from "react-google-recaptcha";
import Footer from '../components/Footer';

const Contact = ({id}) => {

    const [verify, setVerify] = React.useState(false)
    const [cursor, setCursor] = React.useState("pointer")

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerify(true)
    }

    return (
        <>
        <div id={id} className="min-h-[95vh] w-full bg-gradient-to-r from-[#00c4d8] via-[#d3e0b3] to-[#f5da71]  ">
            <div className='flex flex-col md:flex-row justify-center items-center gap-11 p-4 md:p-8'>
            <div className="w-full md:w-1/3 max-w-md mb-8 md:mb-0">
                <img className='w-full h-auto max-w-[200px] mx-auto md:max-w-[95%]' src={contact} alt="Contact" />
            </div>

            <div className="w-full md:w-2/3 max-w-2xl">
                <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center md:text-left">
                    Contact The <span className='text-blue-600' >SystMech</span>  Team: Unlock Your Next Success Story!
                </h1>
                <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dau000002QOqL" method="POST" className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg px-6 py-8 mb-4">


                    <div className="mb-4 flex flex-col md:flex-row md:justify-between">
                        <input type="hidden" name="oid" value="00Dau000002QOqL" />
                        <input type="hidden" name="retURL" value="https://www.systmechsolutions.com/" />
                        <div className="md:w-[48%] mb-4 md:mb-0">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                placeholder="Enter your first name"
                                maxlength="40"
                                size="20"
                            />
                        </div>
                        <div className="md:w-[48%]">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                maxlength="80"
                                size="20"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            maxlength="80"
                            size="20"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="comments"
                            rows="4"
                            placeholder="Enter your comments"
                        />
                    </div>
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                        className='mb-6'
                    />
                    <div className=" justify-center md:ms-64 md:justify-start">
                        <button
                            className={`${!verify ? "cursor-not-allowed opacity-50" : "cursor-pointer"} bg-[#032e61] hover:bg-[#00a1e0] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
                            type="submit"
                            disabled={!verify}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            </div>
            <div className=''>
            <Footer/>
            </div>
        </div>
            </>
    )
}

export default Contact
