import React from 'react'

type Props = {
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const AddSavedApp = () => {

  return (
    <div style={{
        scale : 1 ,
        transition: 'all 0.05s ease-in-out'
    }} className=' w-full h-full flex flex-col px-10 py-14 gap-5 bg-white rounded-lg'>
        <input type="text" placeholder='Website' className='AddAppInput'/>
        <input type="text" placeholder='Identifier (username or email)'  className='AddAppInput'/>
        <input type="text" placeholder='Password' className='AddAppInput' />
        <button className='bg-white border cursor-pointer rounded-lg py-3 px-5 text-black font-semibold'>Add</button>
    </div>    
)
}

export default AddSavedApp