/** @format */

import React, { useEffect, useState } from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import FavoriteButton from "../Buttons/FavoriteButton";

const AdCard = ({ ad, onBlock }) => {
  const [user,setUser] = useState("")
  useEffect(()=>{
    setUser(localStorage.getItem("user"))
  },[])
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: "100%", width: "350px" }}
    >
      <Card.Section>
        <Image
          src={ad.image}
          alt="<ad_picture_missing>"
          height={200}
          width={250}
          style={{ objectFit: "fill" }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text size="lg">
          {ad.adname}
        </Text>
        <Group>
          <Badge color="green">{ad.price} &#8364;</Badge>
          <Badge color="pink">{ad.category_id.name}</Badge>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        {ad.description}
      </Text>
      {user &&(
      <Group position="apart" mt="md">
        <FavoriteButton buttonText={"Favorite"} adId={ad._id} />
        <LikeButton adId={ad._id} />
        <CommentButton adId={ad._id} />
        {onBlock && <Button onClick={() => onBlock(ad._id)}>Block</Button>}
      </Group>
      )}
      {!user&&(
        <Group>
          <Text c="dimmed" fs="italic">Please Login for other actions</Text>
        </Group>
      )}
    </Card>
  );
};

export default AdCard;
