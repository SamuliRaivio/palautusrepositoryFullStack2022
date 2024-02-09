import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

//get all anecdotes
const getAll = () => axios.get(baseUrl).then((res) => res.data);

//post new anecdote
/* const createNew = async (content) => {
  const obj = { content, votes: 0 };
  const res = await axios.post(baseUrl, obj);
  return res.data;
}; */

//put/edit anecdote
/* const update = async (obj) => {
  const res = await axios.put(`${baseUrl}/${obj.id}`, obj);
}; */

export default { getAll /* createNew */ /* update */ };
