import React from 'react'

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0);

    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map((part) =>
            <Part key={part.id} part={part} />
        )}
        <Total parts={parts} />
    </div>
)

const Header = ({ name }) => (<h1>{name}</h1>)

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course