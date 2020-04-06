import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const SelectedAnecdote = ({ anecdotes, points, selected, vote, selectRandomAnecdote }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <div>{anecdotes[selected]}</div>
    <div>has {points[selected]} votes</div>
    <div>
      <Button handleClick={vote} text='vote' />
      <Button handleClick={selectRandomAnecdote} text='next anecdote' />
    </div>
  </div>
)

const MostVotedAnecdote = ({ anecdotes, points, mostVoted }) => (
  <div>
    <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {points[mostVoted]} votes</div>
  </div>
)

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [points, setPoints] = useState(
    Array.from(Array(props.anecdotes.length), () => 0)
  )

  const selectRandomAnecdote = () => {
    const randomNum = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(randomNum)
  }

  const vote = () => {
    // copies array from state
    const copy = [...points]
    // increments vote in copied array
    copy[selected] = copy[selected] + 1
    // finds most voted anecdote
    let indexMax = 0
    copy.forEach((e, index) => {
      if (e > copy[indexMax]) {
        indexMax = index
      }
    })
    // sets states
    setPoints(copy)
    setMostVoted(indexMax)
  }

  return (
    <div>
      <SelectedAnecdote
        anecdotes={props.anecdotes}
        points={points}
        selected={selected}
        vote={vote}
        selectRandomAnecdote={selectRandomAnecdote} />
      <MostVotedAnecdote
        anecdotes={props.anecdotes}
        points={points}
        mostVoted={mostVoted} />
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)