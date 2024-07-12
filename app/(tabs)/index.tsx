import "react-native-gesture-handler";
import "react-native-reanimated";

import {
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button, Searchbar, Text } from "react-native-paper";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";
import CardList from "@/components/cards/CardList";
import { useDebounce } from "@/hooks/useDebounce";
import TarotCard from "@/types/shared-types";
import { View } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth, height } = Dimensions.get("window");
const theQuarry = require("@/assets/gaze.png");
const tarotCards = require("../../db.json");

const aspectRatio = 16 / 10;
const headerHeight = screenWidth / aspectRatio;

export default function HomeScreen() {
  const allCards = tarotCards.cards;
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<TarotCard[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const searchQuery = useDebounce(search, 200);

  const fetchCards = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const numberOfCards = parseInt(searchQuery);
    if (!numberOfCards || Number.isNaN(numberOfCards)) {
      setError("Invalid Number!");
      setLoading(false);
      return;
    }

    if (numberOfCards < 1 || numberOfCards > 10) {
      setError("Cards must be between 1-10");
      setLoading(false);
      return;
    }
    setError(null);

    const shuffled = allCards.sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, numberOfCards));

    setLoading(false);
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#2E236C", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={theQuarry}
            style={styles.mainImage}
            resizeMode="cover"
          />
        }>
        <Searchbar
          placeholder="Number of cards"
          value={search}
          onChange={(event) => setSearch(event.nativeEvent.text)}
          keyboardType="numeric"
          style={styles.searchBar}
        />
        <Button
          icon="cards"
          mode="contained"
          onPress={() => {
            if (cards != null) setConfirmDialog(true);
            else fetchCards();
          }}>
          Fetch cards
        </Button>
        {loading && <ActivityIndicator animating={true} color="#2E236C" />}
        {error && <Text style={styles.error}>{error}</Text>}
        <Modal
          visible={confirmDialog === true}
          animationType="fade"
          transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Fetching new cards will erase the previous ones. Continue?
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setConfirmDialog(false);
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.yesButton}
                  onPress={() => {
                    setConfirmDialog(false);
                    fetchCards();
                  }}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <CardList cards={cards} />
      </ParallaxScrollView>
      <SafeAreaView style={styles.creditsView}>
        <Text style={styles.credits}>Developer: Luben</Text>
        <Text style={styles.credits}>Art: Niki</Text>
        <Text style={styles.credits}>Api: Isind18</Text>
        <Text style={styles.credits}>Version: 1.0</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mainContainer: {
    backgroundColor: "red",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  mainImage: {
    width: "100%",
    height: headerHeight,
    resizeMode: "cover",
  },
  searchBar: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay behind the modal
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: screenWidth - 40,
    maxHeight: height - 80,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  yesButton: {
    backgroundColor: "#2E236C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  closeButton: {
    backgroundColor: "#a52a36",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  credits: {
    display: "flex",
    fontSize: 10,
  },
  creditsView: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  main: {
    display: "flex",
  },
  parallax: {},
});
