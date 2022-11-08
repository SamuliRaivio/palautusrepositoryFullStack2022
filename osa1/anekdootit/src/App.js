import { useState } from 'react'


//Button komponentti
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  //Sovelluksen arvottavat anecdootit taulukossa
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  //luodaan rivi pisteitä joiden arvo on nolla, rivin pituus on sama kuin anekdoottien määrä. Pisteet toimivat sovelluksessa anekdoottien ääninä.
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  //numero jonka mukaan tulostettavat anekdootit valitaan
  const [selected, setSelected] = useState(0)

  //indexin suurin numero, käytetään haettaessä pointsien suurin arvo ja sitä kautta eniten ääniä saanut anekdootti
  const [maxIndexOf, setMaxIndexOf] = useState(0)


  //handleNextClick arpoo numeron ja antaaa sen arvoksi muuttujalle selected. Selected arvo määrittää mikä anekdootti tulostetaan ruudulle ja mitä äänestetään
  const handleNextClick = () => {
    const randomNum = Math.floor(Math.random() * 7)
    setSelected(randomNum) 
  }

  //handleVoteClick funktio äänestää ruudulla näkyvää anekdoottia
  const handleVoteClick = () => {
    
    //ensin funktio luo uuden taulukon, joka on suora kopio points taulukosta.
    //Sitten taulukon kohta (selected) nostetaan yhdellä. Sama kohta viittaa anekdoottitaulukon saman kohdan anekdoottiin ja toimii tämän ääninä
    //lopuksi vanhalle points taulukolle annetaan arvoksi uusi päivitetty taulukko
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)


    //handleVoteClick funktio toimii myös eniten ääniä saaneen anekdootin hakijana
    const max = Math.max(...newPoints)
    const maxIndex = newPoints.indexOf(max)
    setMaxIndexOf(maxIndex)
    console.log(maxIndexOf)
    

  }


  //palautettava HTML pätkä
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <div>
          has {points[selected]} votes
        </div>
        <div>
          <Button handleClick={handleVoteClick} text = "vote"/>
          <Button handleClick={handleNextClick} text = "next anecdote"/>
        </div>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndexOf]}
      <p>has {points[maxIndexOf]} votes</p>
    </div>
  )
}

export default App