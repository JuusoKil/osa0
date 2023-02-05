import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personService from './services/person'
import ShowMessage from './components/Message'

import { useState, useEffect } from 'react'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState ('')
  const [message, setMessage] = useState(null)

  // Haetaan nimitiedot palvelimelta
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('Promise fullfilled')
        setPersons(initialPersons)
      })
    }, [])
  console.log('render', persons.length, 'persons')


  // Käsittelee value kenttien muutokset
  const handleInputChange = (event) => {
    if(event.target.id === "name") {
      setNewName(event.target.value)
    }
    else if (event.target.id === "number") {
      setNewNumber(event.target.value)
    }
    else {
      setSearchValue(event.target.value.toLowerCase())
    }
  }


  // Lisää uuden kontaktin luetteloon
  const addContact = (event) => {
    event.preventDefault();

    // Tarkistaa löytyykö luettelosta jo samanniminen henkilö
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {

      // Jos löytyy, kysytään korvataanko numero
      if (window.confirm(`${newName} is alraedy added to the phonebook. Replace the old number with the new one?`)) {
        const existingContact = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const newPerson = {
          name: existingContact.name,
          number: newNumber
        }
        personService
        .update(existingContact.id, newPerson)
        .then(returnValue => {
        setPersons(persons.map(person => person.id !== existingContact.id ? person : returnValue))
        setNewName("")
        setNewNumber("")
        setMessage(`Contact's ${newPerson.name} phonenumber has been updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
        .catch(error => {
          setMessage(`Contact ${newPerson.name} has alraedy been deleted from the server.`)
          setPersons(persons.filter(person => person.id != existingContact.id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }

    // Lisätään uusi kontaki, jos olemassa olevaa ei löytynyt
    else {   
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage(`${newPerson.name} has been added to the phonebook.`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  // Kontaktin poistaminen
  const deletePerson = ({ id, name }) => {
    if (window.confirm(`Do you really want to delete contact ${name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id != id))
        setMessage(`Contact ${name} has been deleted succesfully.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`The contact ${name} has alraedy been deleted from the server.`)
        setPersons(persons.filter(person => person.id != id))
        setTimeout(() => {
          setMessage(null)
        }, 5000)   
      })
    } else {
      alert("Delete cancelled")
    }
  }

  // Filtteröi hakua vastaavat nimet luettelosta
  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(searchValue))


  return (
    <div>
      <h2>Phonebook</h2>
      <ShowMessage message={message} />
      <Filter 
        text={"filter shown with"} 
        searchValue={searchValue} 
        handleInputChange={handleInputChange}
      />
      <h2>Add a new</h2>
      <PersonForm 
        addContact={addContact}
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} 
      deletePerson={deletePerson}
      />
    </div>
  )

}

export default App