import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

//CreateNew renders form to create new anecdotes
//addnew and showNotification functions are in the app component and are called from props
const CreateNew = (props) => {
  const navigate = useNavigate();

  //custom hook is used for these
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.showNotification(`a new anecdote ${content.value} created!`);
    //navigates back to main screen after new anecdote is made
    navigate("/");
  };

  //.reset is build inside the custom hooks to setValue to ""
  const handleReset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input id="content" {...content.inputProps} />
        </div>
        <div>
          author
          <input id="author" {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input id="info" {...info.inputProps} />
        </div>
        <input type="submit" value="create" />
        <input type="reset" value="reset" />
      </form>
    </div>
  );
};

export default CreateNew;
