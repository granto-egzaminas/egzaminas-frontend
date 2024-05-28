import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { AiFillDollarCircle } from "react-icons/ai";
import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import FavoriteButton from "../Buttons/FavoriteButton";

const AdCard = ({ ad }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: "350px", width: "250px" }}
    >
      <Card.Section>
        <Image
          src={ad.image}
          alt="<ad_picture_missing>"
          height={150}
          width={150}
          style={{ objectFit: "cover" }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          <AiFillDollarCircle /> {ad.price} &#8364;
        </Text>
        <Badge color="pink">{ad.category_id.name}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {ad.description}
      </Text>

      <Group position="closest">
        <LikeButton adId={ad._id} />
        <CommentButton adId={ad._id} />
        <FavoriteButton adId={ad._id} />
      </Group>
    </Card>
  );
};

export default AdCard;
