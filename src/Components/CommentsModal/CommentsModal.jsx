import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineComment } from "react-icons/ai";

export default function CommentsModal({ adId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [text, setText] = useState(""); // State to store the comment text
  const [message, setMessage] = useState(""); // State to store message
  const [comments, setComments] = useState([]); // State to store comments

  useEffect(() => {
    if (opened) {
      fetchComments();
    }
  }, [opened]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/ad/${adId}`
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        setMessage("Failed to fetch comments");
      }
    } catch (error) {
      setMessage(`Failed to fetch comments: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          adId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Comment created successfully");
        fetchComments(); // Fetch comments after adding a new comment
      } else {
        setMessage(`Comment creation failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Comment creation failed: ${error.message}`);
    }
  };

  return (
    <>
      <Button onClick={open} rightSection={<AiOutlineComment />}>
        {adId}
      </Button>
      <Modal opened={opened} onClose={close} size="lg">
        <Modal.Header>
          <Modal.Title>Comments</Modal.Title>
          <Modal.CloseButton onClick={close} />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <TextInput
              data-autofocus
              label="Your comment:"
              placeholder="Type your comment here..."
              mt={"sm"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" variant="outline" fullWidth mt="md">
              Submit
            </Button>
            {message && (
              <Text mt="md" c={message.includes("failed") ? "red" : "green"}>
                {message}
              </Text>
            )}
          </form>
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <Text key={index} mt="xs" c="dimmed">
                {comment.text} {/* Render the text property of each comment */}
              </Text>
            ))
          ) : (
            <Text mt="xs" c="dimmed">
              No comments available.
            </Text>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
