import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (<h1>{props.course}</h1>)


const Content = (props) => (
  <div>
    <Part name = {props.content.part1} exercises = {props.content.exercises1}/>
    <Part name = {props.content.part2} exercises = {props.content.exercises2}/>
    <Part name = {props.content.part3} exercises = {props.content.exercises3}/>
  </div>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = (props) => (<p>Number of exercises {props.total}</p>)

const App = () => {
  const course = 'Half Stack application development'
  const content = {
    part1: 'Fundamentals of React',
    part2: 'Using props to pass data',
    part3: 'State of a component',
    exercises1: 10,
    exercises2: 7,
    exercises3: 14,
  }

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={
        content.exercises1 +
        content.exercises2 +
        content.exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))