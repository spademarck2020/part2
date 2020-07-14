import React from 'react';

const Total = ({ course }) => {
    const sum = course.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,0)
    return(
      <strong>total of {sum} exercises</strong>
    ) 
  }

export default Total