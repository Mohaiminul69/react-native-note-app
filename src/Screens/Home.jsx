import { Pressable, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Home({ navigation, route, user }) {
  const onPressCreate = () => {
    navigation.navigate("Create");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
