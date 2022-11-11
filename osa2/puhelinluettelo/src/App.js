import { useEffect, useState } from 'react'
import axios from 'axios'


//Person komponentti palauttaa yhdin listan osan jossa näkyy henkilön nimi ja numero
const Person = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
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
const Persons = ({persons, filterName}) => {

  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())).map((person, i) => <Person key={i} person={person}/>)}
    </ul>
  )

}


const App = () => {


  //määritellään objektijono henkilöistä
  const [persons, setPersons] = useState([]);

  //haetaan persons listaan oliot json serveriltä effect hookilla
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      alert(newName + ' is already added to phonebook')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
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
      <Persons persons={persons} filterName={filterName}/>
    </div>
  )

}

export default App