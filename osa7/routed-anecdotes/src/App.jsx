import { useState } from "react";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { BrowserRouter as Router } from "react-router-dom";

//components moved to components folder from original sourcecode
//App contains initial anecdotes, functions and renders menu that contains react router for other components and footer component
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  //sets notification state and sets it back to "" after 5 secounds
  const showNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(""), 5000);
  };
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification}
      <Router>
        <Menu
          anecdotes={anecdotes}
          addNew={addNew}
          showNotification={showNotification}
        />
      </Router>

      <Footer />
    </div>
  );
};

export default App;
