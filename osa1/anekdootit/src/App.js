import { useState } from 'react'

// Otsikko komponentti
const Header = ({ text }) => <h1>{text}</h1>

// Buttonien komponentti
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  // Määritetään hookit
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState()
  const [votes, setVotes] = useState([    
    { name: "Anecdote 1", value: 0 },
    { name: "Anecdote 2", value: 0 },
    { name: "Anecdote 3", value: 0 },
    { name: "Anecdote 4", value: 0 },
    { name: "Anecdote 5", value: 0 },
    { name: "Anecdote 6", value: 0 },
    { name: "Anecdote 7", value: 0 },
  ]);

  // Luodaan random
  const randomGenerator = () => {
    const randomNumber = Math.floor(Math.random() * 7)
    setSelected(randomNumber)
  }

  // Lisätään ääni anekdootille
  const addVote = () => {
    const newVotes = [...votes];
    newVotes[selected].value += 1;
    setVotes(newVotes)

    // Pidetään kirjaa eniten ääniä saaneesta anekdootista
    const largestValue = votes.reduce((maxItem, currentItem) => 
    currentItem.value > maxItem.value ? currentItem : maxItem
    )

    // Asetetaan eniten ääniä omaava anekdootti
    setBest(votes.findIndex(votes => votes.value === largestValue.value))
  }


  return (
    <div>
      <div>
        <Header text="Anecdote of the day" />
      </div>
      <div>
      {anecdotes[selected]}
      </div>
      <div>
        <Button handleClick={addVote} text="Vote"/>
        <Button handleClick={randomGenerator} text="Next anecdote"/>
      </div>
      <div>
        <Header text="Anecdote with most votes" />
      </div>
      <div>
        {anecdotes[best]}
        </div>
    </div>
  )
}

export default App