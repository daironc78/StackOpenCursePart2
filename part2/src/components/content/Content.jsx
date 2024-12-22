
const Content = ({ parts }) => {
    const Part = ({ part }) => {
        return (
            <p>{part.name}: {part.exercises}</p>
        )
    }

    const Total = ({ part }) => {
        return (
            <strong>Total exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</strong>
        )
    }

    return (
        <div>
            <ul>
                {parts.map(part => <Part key={part.id} part={part} />)}
                <Total parts={parts} />
            </ul>
        </div>

    )
}

export default Content