// Header komponentti
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
};

// Content komponentti
const Content = (props) => {
  //console.log(props);
  return (
    <>
      <Part name={props.course.parts[0].name} number={props.course.parts[0].excercises} />
      <Part name={props.course.parts[1].name} number={props.course.parts[1].excercises} />
      <Part name={props.course.parts[2].name} number={props.course.parts[2].excercises} />
    </>
  )
};

// Part komponentti
const Part = (props) => {
  return (
      <p>{props.name} {props.number}</p>
  )
};

// Total komponentti
const Total = (props) => {
 // console.log(props);
  return (
    <p>Number of exercises {props.course.parts[0].excercises + props.course.parts[1].excercises + props.course.parts[2].excercises}</p>
  )
};


// App komponentti
const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
      { 
      name: "Fundamentals of React",
      excercises: 10
      },
      {
      name: "Using props to pass data",
      excercises: 7
      },
      {
      name: "State of a component",
      excercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total  course={course}/>
    </div>
  )
};

export default App;