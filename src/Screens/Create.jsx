import { View, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import Input from "../Components/Input";
import RadioInput from "../Components/RadioInput";

const noteColorOptions = ["red", "blue", "green"];

export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        autoCapitalize={"words"}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
      />
      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOptions.map((option, index) => (
        <RadioInput
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))}
    </SafeAreaView>
  );
}
