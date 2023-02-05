// Course komponentti
const Course = ({ courses }) => {
    return (
      <>
        {courses.map(course => (
          <div key={course.id}>
            <Header title={course.name} />
            <Content course={course} />
            <Total parts={course.parts}/>
          </div>
        ))}
      </>
    )
  };
  
  // Header komponentti
  const Header = ({ title }) => <h2>{title}</h2>
  
  // Content komponentti
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
        <Part key={part.id} name={part.name} number={part.exercises} />
      )}
      </div>
    )
  }
  
  // Part komponentti
  const Part = ({ name, number }) => <p>{name} {number}</p>
  

  // Total komponentti
  const Total = ({ parts }) => {
    // Kerätään tehtävien lukumäärät olioista
    const result = parts.map(part => part.exercises)
  
    // Lasketaan yhteen kerätystä listasta
    const sum = result.reduce((total, num) => total + num, 0)
  
    // Palautetaan teksti ja saatu summa
    return (
    <h3>total of {sum} exercises</h3>
    )
  }

  export default Course;