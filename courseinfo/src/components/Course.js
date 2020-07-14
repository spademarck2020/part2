import React from 'react';
import Total from './Total';
import Content from './Content';
import Header from './Header';

const Course = ({ course }) =>{
    return(
      <>
      {course.map( item =>{
        return(
          <div key = {item.id}>
            <Header course={item.name} />
            <Content course={item.parts} />
            <Total course={item.parts} />
          </div>
        )
      })}
      </>
    )
}

export default Course