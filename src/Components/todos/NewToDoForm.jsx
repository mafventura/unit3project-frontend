// import axios from "axios";
// import { useState } from "react";

// export default function NewToDoForm({ fetchData, user }) {
//   const [newToDo, setNewToDo] = useState({
//     todo: "",
//     completed: false,
//   });

//   function handleChange(evt) {
//     setNewToDo({
//       ...newToDo,
//       todo: evt.target.value,
//       completed: false,
//     });
//   }

//   async function handleAddToDo(e) {
//     e.preventDefault()
//     try {
//         await axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/todos/add`,
//             newToDo,
//             {
//                 headers: {
//                 "user-email": user.email,
//                 "Content-Type": "application/json",
//                 },
//             }
//         )
//         setNewToDo({
//             todo: "",
//             completed: false,
//           });
//         fetchData();
//     } catch (e) {
//         console.error(e)
//     }
//   }

//   return (
//     <>
//       <h2>New To-Do</h2>
//       <form onSubmit={handleAddToDo}>
//         <input
//           value={newToDo.todo}
//           onChange={handleChange}
//           placeholder="New To-Do"
//           required
//           pattern=".{3,}"
//         />
//         <button type="submit">ADD</button>
//       </form>
//     </>
//   );
// }









import axios from "axios";
import { useState } from "react";

export default function NewToDoForm({ fetchData, user }) {
  const [newToDo, setNewToDo] = useState({
    todo: "",
    completed: false,
    date: new Date().toISOString().substr(0, 10), // Default to today's date
  });

  function handleChange(evt) {
    setNewToDo({
      ...newToDo,
      [evt.target.name]: evt.target.value,
    });
  }

  async function handleAddToDo(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todos/add`,
        newToDo,
        {
          headers: {
            "user-email": user.email,
            "Content-Type": "application/json",
          },
        }
      );
      setNewToDo({
        todo: "",
        completed: false,
        date: new Date().toISOString().substr(0, 10), // Reset date to today
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    
      <h4 style={{ marginBottom: 20, color: "#3a7e54" }}>New To-Do</h4>
      <form onSubmit={handleAddToDo}>
        <input        
          type="text"
          name="todo"
          value={newToDo.todo}
          onChange={handleChange}
          style={{ borderRadius: "8px", padding: "5px" }}
          placeholder="New To-Do"
          required
          pattern=".{3,}"
        />
        <input
          type="date"
          name="date"
          value={newToDo.date}
          onChange={handleChange}
          required
        /> 
        <button type="submit"
        style={{ backgroundColor: "#3a7e54", borderColor: "#3a7e54",
         borderRadius:"8px", color: "white", marginLeft: "5px" }}
        >
          ADD        
        </button>
      </form>
     
    </>
  
  );
}
