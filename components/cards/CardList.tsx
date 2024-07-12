import TarotCard from "@/types/shared-types";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MotiView, View } from "moti";
import { Text } from "react-native-paper";

const { width, height } = Dimensions.get("window");

interface Props {
  cards: TarotCard[] | null;
}

const CardList = ({ cards }: Props) => {
  const [delay] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const openCardModal = (card: TarotCard) => {
    setSelectedCard(card);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
  };

  return (
    <MotiView
      style={styles.cardContainer}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 10000,
      }}>
      {cards &&
        cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              openCardModal(card);
            }}>
            <CardItem
              key={index}
              card={card}
              animateDelay={delay + index * 110}
            />
          </TouchableOpacity>
        ))}

      <Modal
        visible={selectedCard !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={closeCardModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedCard?.name}</Text>

            <Text style={styles.modalSubtitle}>Fortune Telling:</Text>
            {selectedCard?.fortune_telling.map((item, index) => (
              <Text key={index} style={styles.modalText}>
                {item}
              </Text>
            ))}

            <Text style={styles.modalSubtitle}>Meanings (Light):</Text>
            {selectedCard?.meanings.light.map((item, index) => (
              <Text key={index} style={styles.modalText}>
                {item}
              </Text>
            ))}

            <Text style={styles.modalSubtitle}>Meanings (Shadow):</Text>
            {selectedCard?.meanings.shadow.map((item, index) => (
              <Text key={index} style={styles.modalText}>
                {item}
              </Text>
            ))}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeCardModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#eaeaea",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay behind the modal
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width - 40, // Take almost entire width with some padding
    maxHeight: height - 80, // Take almost entire height with some padding
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2E236C",
    borderRadius: 10,

    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default CardList;
