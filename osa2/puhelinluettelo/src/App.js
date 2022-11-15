import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'


//Person komponentti palauttaa yhdin listan osan jossa näkyy henkilön nimi ja numero
const Person = ({person, deletePerson}) => {
  return (
    <li>
      {person.name} {person.number}
      <Button id={person.id} deletePerson={deletePerson}/>
    </li>
  )
}

const Button = ({id, deletePerson}) => {

  return(
    <button value={id} onClick={deletePerson}>delete</button>
  )
}

//Filter komponentti ottaa käyttäjän syötteestä merkkijonon
const Filter = ({filterName, filterPerson}) => {
  return(
    <div>filter shown with <input value={filterName} onChange={filterPerson} /></div>
  )
}


//PersonForm komponentti ottaa käyttäjän syötteestä nimen ja numeron
const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

//Persons komponentti palauttaa listan henkilöitä Part komponentissa
//palautuksessa ensin filtteröidään käyttäjän antaman syötteen mukaan henkilöt ja lopulta mapataan ne nätisti Person komponentin mukaisiksi
const Persons = ({persons, filterName, deletePerson}) => {

  return (
    <ul>
      {persons.filter(person =>
         person.name.toLowerCase()
         .includes(filterName.toLocaleLowerCase()))
         .map((person, i) =>
         <Person key={i} person={person} deletePerson={deletePerson}/>
         )}
    </ul>
  )

}


const App = () => {


  //määritellään objektijono henkilöistä
  const [persons, setPersons] = useState([]);

  //haetaan persons listaan oliot json serveriltä effect hookilla
  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])


  //newName on uusi nimi joka luetaan käyttäjän inputista
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  

  
  //handleNameChange tallentaa käyttäjän inputin muuttujaan newName
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //handleNumberChange tallentaa käyttäjän inputin muuttujaan newNumber
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //addPerson tallentaa nappia painamalla käyttäjän antaman nimen muuttujasta newName objetkijonoon uudeksi henkilöksi 
  //addPerson myös tunnistaa mikäli käyttäjä antaa nimen joka jo jollain henkilöllä on ja antaa virheilmoituksen
  const addPerson = (event) => {
    event.preventDefault()

    //luodaan uusi jono joka sisältää vain henkilöiden nimet
    const personsName = persons.map(person => person.name)
    
    //tarkistetaan mikäli uusi nimi on jo henkilöllä
    if (personsName.includes(newName)) {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')){
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personService
        .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })  
      }

    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })  
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const id = event.target.value
    console.log(id)
    console.log()

    const personToDelete = persons.filter(person => person.id === parseInt(id))
    console.log(personToDelete)
    
    /* const personToDelete =  persons.filter(person => person.id !== parseInt(idd))
    console.log(personToDelete) */

    if (window.confirm("Delete " + personToDelete[0].name)) {
      personService
      .deleteObject(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== parseInt(id)))
        })
    }
  }


  //filterPerson tapahtumankäsittelijä antaa filterName muuttujalle sen arvon minkä käyttäjä on syöttänyt suodatukseen
  const filterPerson = (event) => {
    setFilterName(event.target.value)
    console.log(persons.filter(person => person.name.includes(filterName))) 
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} filterPerson={filterPerson} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson}/>
    </div>
  )

}

export default App