import React, { useState,useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterSearch, setFilterSearch] = useState('')
    
    const effect = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response =>{
                setPersons(response.data)
            })
    }

    useEffect(effect,[])

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