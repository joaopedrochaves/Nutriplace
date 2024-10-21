import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButtom from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ heightL: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo} //mudar a logo depois
            className="max-w-[360px] w-full h-[320px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              Gerencia de estoque
            </Text>
          </View>

          <CustomButtom
            title="continue com email"
            handlePress={() => {}}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar

      />
    </SafeAreaView>
  );
}
