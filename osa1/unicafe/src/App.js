import { useState } from "react";

// Otsikoille komponentti
const Header = ({ text }) => <h1>{text}</h1>
  
// Painikkeille komponentti
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

// Statistics osion komponentti
const Statistics = ({ good, neutral, bad }) => {

  // Määritellään apumuuttujat
  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = good / sum * 100;

  // Tulostuu sivulle jos ei ole palautteita
  if (sum === 0) {
    return ( 
    <p>No feedback given</p>
    )
  }

  // Muuten tulostetaan tilastot
  return (
    <table>
      <tbody>
        <StatisticsLine value={good} text="Good"/>
        <StatisticsLine value={neutral} text="Neutral"/>
        <StatisticsLine value={bad} text="Bad"/>
        <StatisticsLine value={sum} text="All"/>
        <StatisticsLine value={average} text="Average"/>
        <StatisticsLine value={positive} text="Positive"/>
      </tbody>
     </table>
  )
}

// Komponentti joka luo yksittäisen tilastorivin
const StatisticsLine = ({ value, text }) => <tr><td>{text}</td><td>{value}</td></tr>


// App
const App = () => {

 // Määritetään hookit
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
     <Header text="Give feedback" />
     <Button handleClick={handleGoodClick} text="Good" />
     <Button handleClick={handleNeutralClick} text="Neutral" />
     <Button handleClick={handleBadClick} text="Bad" />
     <Header text="Statistics" />
     <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
