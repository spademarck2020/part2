import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterSearch, setFilterSearch] = useState('')
    

    const addPerson = (event) =>{
        event.preventDefault()
        const addedPerson = {name: newName,
                             number: newNumber}
        let isNewPerson = true

        persons.forEach(person =>{
            if(person.name === newName){
                window.alert(`${newName} already added to phonebook`)
                isNewPerson = false
            }
        })

        if(isNewPerson){
            setPersons(persons.concat(addedPerson))
        }
        setNewName('')
        setNewNumber('')
    }

    const onChangeInputName = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    
    const onChangeInputNumber = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    
    const onChangeInputSearchName = (event) => {
        console.log(event.target.value)
        setFilterSearch(event.target.value)
    }

    let filteredName = persons.filter(person => person.name.toLowerCase().includes(filterSearch.toLowerCase()))

    return(
        <div>
            <h2>Phonebook</h2>
            <Filter onChangeInputSearchName={onChangeInputSearchName}
                    filterSearch={filterSearch} /> 
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} onChangeInputName={onChangeInputName}
                        newNumber={newNumber} onChangeInputNumber={onChangeInputNumber} />
            <h3>Numbers</h3>
            <Persons filteredName={filteredName} />
        </div>
    )
}

export default App