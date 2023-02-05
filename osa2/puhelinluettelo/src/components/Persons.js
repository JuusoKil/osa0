const Persons = ({ namesToShow, deletePerson }) => {
    return (
      <div>
        {namesToShow.map(person => 
          <div key={person.name}>
            {person.name}&nbsp;
            {person.number}
            ........
            <button onClick={() => deletePerson(person)}>Delete</button>
          </div>
        )}
      </div>
    )
  }

export default Persons;