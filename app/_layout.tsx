import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from "../app/(tabs)/index";
import SplashScreen from "@/components/SplashScreen";

const SplashLoadingTime = 3000; //2s

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashLoaded, setIsSplashLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashLoaded(true);
    }, SplashLoadingTime);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isSplashLoaded ? <HomeScreen /> : <SplashScreen />}
    </ThemeProvider>
  );
}
