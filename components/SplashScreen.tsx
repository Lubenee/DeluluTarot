import { Image, MotiView, Text } from "moti";
import React from "react";
import { StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 1300,
        delay: 50,
      }}>
      <Text style={styles.text}>Delulu Tarot hihi</Text>
      <Image source={require("../assets/bird.png")} style={styles.logo} />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  logo: {
    width: "100%",
    height: 695,
    resizeMode: "contain",
    zIndex: -1,
  },
  text: {
    zIndex: 0,
    top: 80,
    fontSize: 26,
    fontWeight: "bold",
    color: "#b6b2bc",
  },
});

export default SplashScreen;
