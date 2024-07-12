import imageMappings from "@/constants/images";
import TarotCard from "@/types/shared-types";
import { Image, MotiView, Text } from "moti";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
  card: TarotCard;
  animateDelay: number;
}

const CardItem = ({ card, animateDelay }: Props) => {
  return (
    <MotiView
      style={styles.moti}
      from={{ opacity: 0, translateY: -80 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 1000,
        delay: animateDelay,
      }}>
      <Text style={styles.title}>{card.name}</Text>
      <Image source={imageMappings[card.img]} style={styles.image} />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
  },
  moti: {
    backgroundColor: "#C8ACD6",
    alignItems: "center",
    width: width * 0.379,
    height: height * 0.32,
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default CardItem;
