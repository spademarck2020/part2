import React from 'react';

const Persons = ({filteredName}) =>{
    return(
        <div>
            {filteredName.map(person => <div key={person.name}>{person.name}    {person.number}</div>)}
        </div>
    )
}

export default Persons

