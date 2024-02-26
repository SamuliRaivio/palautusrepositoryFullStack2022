import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

//CreateNew renders form to create new anecdotes
//addnew and showNotification functions are in the app component and are called from props
const CreateNew = (props) => {
  //const [content, setContent] = useState("");
  //const [author, setAuthor] = useState("");
  //const [info, setInfo] = useState("");
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <input type="submit" value="create" />
        <input
          type="button"
          value="asd"
          onClick={() => document.activeElement.value.reset}
        />
        <p>{document.activeElement.value}</p>
      </form>
      <p></p>
    </div>
  );
};

export default CreateNew;
