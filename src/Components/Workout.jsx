import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExcerciseCard from './ExcerciseCard'

const Workout = ({workout}) => {
  return (
    <SectionWrapper id={'workout'} header={'Welcome to'} title={['The','Danger', 'Zone']}>
        <div>
          {workout.map((excercise, i )=>{
            return(
              <ExcerciseCard i={i}  key={i} excercise={excercise} />
            )
          })}
        </div>
    </SectionWrapper>
  )
}

export default Workout