import React from 'react'

const ExcerciseCard = ({excercise}) => {
  return (
    <div className='p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
            <h4 className='text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400 '></h4>
        </div>
    </div>
  )
}

export default ExcerciseCard