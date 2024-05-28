// CommentsButton.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { AiOutlineComment } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import CommentsModal from "../CommentsModal/CommentsModal";

export default function CommentsButton({ adId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    fetchCommentsCount();
  }, []);

  const fetchCommentsCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/ad/${adId}`
      );
      if (response.ok) {
        const data = await response.json();
        const commentsCount = data.comments.length;
        setCommentsCount(commentsCount);
      } else {
        console.error("Failed to fetch comments count");
      }
    } catch (error) {
      console.error(`Failed to fetch comments count: ${error.message}`);
    }
  };

  const handleNewComment = () => {
    fetchCommentsCount(); // Refetch the comments count
  };

  return (
    <>
      <Button onClick={open} size="sm" rightSection={<AiOutlineComment />}>
        {commentsCount} comments
      </Button>
      <CommentsModal
        adId={adId}
        opened={opened}
        close={close}
        onNewComment={handleNewComment} // Pass the callback
      />
    </>
  );
}
