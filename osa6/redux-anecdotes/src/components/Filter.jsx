import { useDispatch, useSelector } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    dispatch(filterAnecdote(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
