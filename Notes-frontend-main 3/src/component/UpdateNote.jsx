import React, { useEffect, useState } from "react";
import { use } from "react";

function UpdateNote({note, fetchNotes, setUpdate}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState(note.status);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try{
      const res = await fetch(`https://devnoteapp.onrender.com/note/update/${note._id}`, {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({title, content, status})
      })
      const data = await res.json();
      console.log(data);
      alert(data.message);
      fetchNotes();
      setUpdate("")
    }catch(error){
      console.log(`An error occurred: ${error}`)
    }

    
  };
  return (
    <div

      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Create New Note</h3>
      <form
        onSubmit={handleSubmit}
        style={{ border: "1px solid black", padding: "10px", display:"flex", flexDirection:"column", gap:"10px" }}
      >
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label>Completed</label>
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <button>Update</button>
        <button onClick={(e) =>{ 
          e.preventDefault()
          setUpdate("")}}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateNote;
