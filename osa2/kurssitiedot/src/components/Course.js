// Header komponentii palauttaa kurssin nimen
// courseName = course.name
const Header = ({courseName}) => {
    return (
      <div>
      <h1>{courseName}</h1>
    </div>
    )
  }
  
  // Part palauttaa kurssin osien nimen ja tehtävien määrän
  //partName = course.parts[x].name
  const Part = ({partName, exercises}) => {
    return (
      <li>{partName} {exercises}</li>
    )
  }
  
  //Content palauttaa listan Part komponentteja
  //lista saadaan käyttämällä map metodia. Map metodi palauttaa parts listasta <li> elementtejä.
  const Content = ({parts}) => {
    
    return (
    <div>
      <ul>
        {parts.map(part => <Part key={part.id} partName={part.name} exercises={part.exercises} />)}
      </ul>
    </div>
    )
  }
  
  //Total komponentii palauttaa kaikkien kurssin osien yhteenlasketut tehtävät (exercises)
  //muuttujalle totalExercises annetaan arvoksi yhteenlaskettujen tehtävien määrä reduce metodilla avulla
  const Total = ({parts}) => {
  
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        <p>total of {totalExercises} exercises</p>
      </div>
    )
  }
  
  //Course komponentti sisältää kaikki edelliset komponentit ja palauttaa ne 
  const Course = ({course}) => {
  
    const courseName = course.name
    const parts = course.parts
  
    return (
      <li>
        <Header courseName={courseName}/>
        <Content parts={parts}/>
        <Total parts={parts} />
      </li>
    )
  }
  
  //AllCourses palauttaa listan Course componentteja map metodin avulla
  const AllCourses = ({courses}) => {
    return (
      <div>
        <ul>
          {courses.map(course => <Course key={course.id} course={course}/>)}
        </ul>
      </div>
    )
  } 

  export default AllCourses