import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import About from "./About";
import CreateNew from "./CreateNew";

//Menu renders react router and passes funtions from App to other components
const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Router>
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
        </Routes>
      </Router>
    </div>
  );
};

export default Menu;
