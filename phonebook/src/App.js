import React, { useState,useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/contacts';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterSearch, setFilterSearch] = useState('')
    const [message,setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(false)

    let filteredName = persons.filter(person => person.name.toLowerCase().includes(filterSearch.toLowerCase()))

    useEffect(()=>{
        contactService
            .getContacts()
                .then(person =>
                    setPersons(person))
    },[])

    const addPerson = (event) =>{
        event.preventDefault()
        const addedPerson = {name: newName,
                             number: newNumber}
        let isNewPerson = true
        let result = false
        let id = 0

        persons.forEach(person =>{
            if(person.name === newName){
                result = window.confirm(`${newName} already added to phonebook. replace the old number with a new one?`)
                isNewPerson = false
                id = person.id
            }
        })

        if(result){
            const contactInfo = persons.find(p => p.id === id)
            const changedNumber = {...contactInfo, number : newNumber}
            console.log('result id:', id)
            console.log(changedNumber,)
            
            contactService
                .updateContact(id, changedNumber)
                    .then(returnedContact =>{
                            setPersons(persons.map(person =>
                                person.id !== id ? person :returnedContact))
                    },
                    )
                    .then(
                        setErrorMessage(false),
                        setMessage(
                            `Number of ${changedNumber.name} is changed`
                        ),
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    )
                    .catch(error => {
                        setErrorMessage(true)
                        setMessage(
                            `Information of ${changedNumber.name} has already been removed from server`
                        )
                        console.log(`Information of ${changedNumber.name} has already been removed from server`)
                        setTimeout(() => {
                            setMessage(null)
                        },5000)
                    })
        }

        if(isNewPerson){
            contactService
                .addContact(addedPerson)
                    .then(returnedContact =>{
                        setPersons(persons.concat(returnedContact))
                    })
                    .then(
                        setErrorMessage(false),
                        setMessage(
                            `Added ${addedPerson.name}`
                        ),
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000) 
                    )
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

    const onClickDelete = (event) =>{
        event.preventDefault()
        const result = window.confirm('delete?')
        const id = event.target.value
        console.log(persons)
        if(result){
            contactService
                .removeContact(id)
                    .then(
                        contactService
                            .getContacts()
                                .then(person =>
                                    setPersons(person))
                    )
                    .catch((error) => {
                        alert(error)
                    })
        }
    }


    return(
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} error={errorMessage}/>
            <Filter onChangeInputSearchName={onChangeInputSearchName}
                    filterSearch={filterSearch} /> 
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} onChangeInputName={onChangeInputName}
                        newNumber={newNumber} onChangeInputNumber={onChangeInputNumber} />
            <h3>Numbers</h3>
            <Persons filteredName={filteredName} onClick={onClickDelete}/>
        </div>
    )
}

export default App