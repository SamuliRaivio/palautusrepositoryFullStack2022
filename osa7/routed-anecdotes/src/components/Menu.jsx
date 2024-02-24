import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import About from "./About";
import CreateNew from "./CreateNew";
import Anecdote from "./Anecdote";

//Menu renders react router and passes funtions from App to other components
const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5,
  };

  //match finds anecdote for Anecdote component
  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
    </div>
  );
};

export default Menu;
