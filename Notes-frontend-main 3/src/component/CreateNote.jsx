import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import React, { useState } from "react";

function CreateNote({ fetchNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !content){
      alert("Please enter title and content of your notes!")
      return
    }
    setTitle("");
    setContent("");
    setStatus(false);

    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await fetch(`https://devnoteapp.onrender.com/note/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, status }),
      });
      const data = await res.json();

      setIsLoading(false);
      alert(data.message);

      fetchNotes();
    } catch (error) {
      setIsLoading(false);
      alert(`An error occurred: ${error}`);
    }
  };
  return (
    <Box padding='20px' fontFamily="Playwrite IS">
      <form
        style={{
          
          borderRadius:"10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
      <Text fontSize="20px" fontWeight="bold" textAlign="center">Create Note</Text>
        <Field label="Title" required>
          <Input
            placeholder="Enter your title of note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field label="Content" required>
          <Textarea
            placeholder="Enter content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>

        <Checkbox
          checked={status}
          variant={"outline"}
          onCheckedChange={(e) => setStatus(e.checked)}
        >
          Status
        </Checkbox>
        <Button
        background="blue.600"
          loading={isLoading ? true : false}
          loadingText={isLoading ? "Creating Note" : ""}
          onClick={handleSubmit}
          fontSize="16px"
        >
          Create Note
        </Button>
      </form>
    </Box>
  );
}

export default CreateNote;
