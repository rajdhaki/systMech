import React from 'react'

const Testmonials = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center mt-6'>
      <div className='flex justify-center items-center flex-col gap-12 '>

        <div>
            <h1 className='text-4xl font-bold text-center w-[30vw]'>Trusted by the world's fastest growing companies</h1>
        </div>

        <div className='flex justify-center items-center gap-10'>
            <div>
                <img src="https://www.pngfind.com/pngs/m/53-532438_creative-tail-people-man-male-icon-png-color.png" alt="Human Logo" className="w-44 h-44" />
            </div>
            <div className='w-72'><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta provident eius repellat illum deserunt rem, eos voluptatum aliquid atque unde earum officia fuga excepturi, suscipit velit! Dolores est ut a.</p></div>
        </div>

        <div className='flex justify-center items-center gap-8'>
            <div className='flex justify-center items-center border-solid border-black border-2 w-60 h-40 rounded-md'><img src="" alt="" />BRAND LOGO</div>
            <div className='flex justify-center items-center border-solid border-black border-2 w-60 h-40 rounded-md' ><img src="" alt="" />BRAND LOGO</div>
            <div className='flex justify-center items-center border-solid border-black border-2 w-60 h-40 rounded-md'><img src="" alt="" />BRAND LOGO</div>
        </div>

      </div>
    </div>
  )
}

export default Testmonials
