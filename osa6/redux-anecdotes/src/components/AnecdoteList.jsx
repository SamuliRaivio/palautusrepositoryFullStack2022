import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Filter from "./Filter";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);
  const sortedBlogsByLikes = anecdotes.sort((a, b) => b.votes - a.votes);

  const anecdotesToShow = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filterValue)
  );

  console.log("value:" + filterValue);

  return (
    <div>
      <div>
        <Filter />
      </div>
      <div>
        {anecdotesToShow.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(voteAnecdote(anecdote.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default Anecdotes;
