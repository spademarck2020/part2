import React from 'react';

const Persons = ({filteredName,onClick}) =>{
    return(
        <div>
            {filteredName.map(person => 
                <div key={person.name}>
                    {person.name}    {person.number} 
                    <button onClick={onClick} value={person.id}>delete</button>
                </div>)}
            
        </div>
    )
}

export default Persons

