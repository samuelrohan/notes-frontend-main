import React, { useEffect, useState } from "react";
import CreateNote from "../component/CreateNote";
import UpdateNote from "../component/UpdateNote";
import { Text } from "@chakra-ui/react";
import { Button } from "../components/ui/button";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState("");
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://devnoteapp.onrender.com/note`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setNotes(data.notes);
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://devnoteapp.onrender.com/note/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      alert(data.message);
      fetchNotes();
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };

  return (
    <div>
      <Text
        textAlign="center"
        fontFamily="Playwrite IS"
        fontSize={{ base: "10px", small: "12px", md: "18px", lg: "22px" }}
      >
        Notes Page
      </Text>
      <CreateNote fetchNotes={fetchNotes} />
      <ul style={{ position: "relative", padding: "10px" }}>
        {notes?.map((note) => (
          <li
            key={note._id}
            style={{
              border: "1px solid",
              padding: "10px",
              listStyle: "none",
              margin: "10px 0",
              fontFamily: "Playwrite IS",
            }}
          >
            <Text
              fontSize={{ base: "10px", sm: "12px", md: "16px", lg: "18px" }}
            >
              {note.title}
            </Text>
            <Text
              my="2"
              fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "16px" }}
            >
              {note.content}
            </Text>
            <Text
              fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "16px" }}
              my="2"
            >
              Status: {note.status ? "Completed" : "Uncompleted"}
            </Text>
            <Button
              fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "16px" }}
              onClick={() => handleDelete(note._id)}
              mr="2"
              size="xs"
              backgroundColor="red.600"
            >
              Delete the note
            </Button>
            <Button
              fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "16px" }}
              onClick={() => {
                setUpdate((id) => (id === note._id ? "" : note._id));
              }}
              size="xs"
              backgroundColor="teal.600"
            >
              Edit the note
            </Button>
            {note._id === update && (
              <UpdateNote
                note={note}
                fetchNotes={fetchNotes}
                setUpdate={setUpdate}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
