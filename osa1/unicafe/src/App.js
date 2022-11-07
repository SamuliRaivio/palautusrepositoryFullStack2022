import { useState } from 'react'

const Average = ({good, bad, allClicks}) => {
  const average = ((good - bad) / allClicks)
  return (
    average
  )
}

const Positive = ({good, allClicks}) => {
  const positive = (good * 100) / allClicks
  const positiveString = positive + " %"
  return (
    positiveString
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StaticLine = ({text, value}) => (
  <><td>{text}</td><td>{value}</td></>
)

const Statistics = ({good, setGood, neutral, setNeutral, bad, setBad, allClicks, setAllClicks}) => {

  const average = Average({good, bad, allClicks})
  const positive = Positive({good, allClicks})

  const handleGoodClick = () => {
    setAllClicks(allClicks + 1)
    setGood(good + 1)
  }


  const handleNeutralClick = () => {
    setAllClicks(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAllClicks(allClicks + 1)
    setBad(bad + 1)
  }

  if (allClicks === 0) {
    return (
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    
  <div>
    <Button handleClick={handleGoodClick} text="good" />
    <Button handleClick={handleNeutralClick} text="neutral" />
    <Button handleClick={handleBadClick} text="bad" />
    <h1>statistics</h1>
    <table>
      <tbody>
        <tr><StaticLine text="good" value={good}/></tr>
        <tr><StaticLine text="neutral" value={neutral}/></tr>
        <tr><StaticLine text="bad" value={bad}/></tr>
        <tr><StaticLine text="all" value={allClicks}/></tr>
        <tr><StaticLine text="average" value={average}/></tr>
        <tr><StaticLine text="positive" value={positive}/></tr>
      </tbody>
    </table>
  </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Statistics
      good={good}
      setGood={setGood}
      neutral={neutral}
      setNeutral={setNeutral}
      bad={bad}
      setBad={setBad}
      allClicks={allClicks}
      setAllClicks={setAllClicks}
      />
    </div>
  )
}

export default App
