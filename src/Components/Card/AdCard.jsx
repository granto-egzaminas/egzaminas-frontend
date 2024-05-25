import React from "react";
import { Card, Image, Text, Badge, Group } from "@mantine/core";

const AdCard = ({ ad, userId }) => {
  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image src={ad.image} alt={ad.description} />
      </Card.Section>
      <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
        <Text weight={500}>Price: {ad.price}</Text>
        <Badge color="pink" variant="light">
          {ad.category_id.name}
        </Badge>
      </Group>
      <Text size="sm" style={{ lineHeight: 1.5 }}>
        {ad.description}
      </Text>
      <div className="likeContainer">
        <Text>{ad.like_ids.length} likes</Text>
        {ad.like_ids.some((like) => like.user_id === userId) ? (
          <div className="likedLike likeIcon" /> // full square
        ) : (
          <div className="unlikedLike likeIcon" /> //empty square
        )}
      </div>
      <Text>{ad.comment_ids.length} comments</Text>
    </Card>
  );
};

export default AdCard;
