import { useState, useEffect } from "react";
import { Modal, TextInput, Text, Button, Group } from "@mantine/core";

export default function CommentsModal({ adId, opened, close, onNewComment }) {
  const [text, setText] = useState(""); // State to store the comment input text
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
        setComments(data.comments.reverse());
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
      const response = await fetch(
        `http://localhost:5000/api/comments/ad/${adId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Comment created successfully");
        setText(""); // Clear the text input after submitting
        fetchComments(); // Fetch comments after adding a new comment
        onNewComment(); // to re-render CommentsButton component with updated comment count
      } else {
        setMessage(`${data.error}`);
      }
    } catch (error) {
      setMessage(`Comment creation failed: ${error.message}`);
    }
  };

  return (
    <Modal opened={opened} onClose={close} size="lg">
      <Modal.Header>
        <Modal.Title>Comments</Modal.Title>
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
          <Button type="submit" variant="outline" mt="md">
            Submit
          </Button>
          {message && (
            <Text mt="md" c={message.includes("failed") ? "red" : "green"}>
              {message}
            </Text>
          )}
        </form>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} style={{ marginTop: "16px" }}>
              <Group>
                <div>
                  <Text size="sm">{comment.user_id.name}</Text>
                  <Text size="xs" c="dimmed">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Text>
                </div>
              </Group>
              <Text pl={54} pt="sm" size="sm">
                {comment.text}
              </Text>
            </div>
          ))
        ) : (
          <Text mt="xs" c="dimmed">
            No comments available.
          </Text>
        )}
      </Modal.Body>
    </Modal>
  );
}