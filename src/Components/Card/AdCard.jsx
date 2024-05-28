import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { AiFillDollarCircle, AiFillLike } from "react-icons/ai";
import CommentButton from "../Buttons/CommentButton";
function AdCard({ ad }) {
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

      <Button color="blue" fullWidth mt="md" radius="md" mb="sm">
        Favorite
      </Button>
      <Group position="apart">
        <Text>
          {ad.like_ids.length} <AiFillLike />
        </Text>
        <CommentButton adId={ad._id} />
      </Group>
    </Card>
  );
}

export default AdCard;
