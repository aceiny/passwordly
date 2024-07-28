import React from 'react'
import SavedAppHeader from '../comps/SavedAppHeader'
import SavedAppList from '../comps/SavedAppList'

const SavedView = () => {
  return (
    <div className='flex-1 flex flex-col px-16 py-10'>
      <SavedAppHeader/>
      <SavedAppList/>
    </div>
  )
} 

export default SavedView