import { useState } from 'react'

const App = () => {
  //määritellään objektijono henkilöistä
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 
  //newName on uusi nimi joka luetaan käyttäjän inputista
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
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



  

  
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App