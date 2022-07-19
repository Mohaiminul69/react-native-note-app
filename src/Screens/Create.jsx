import { View, ActivityIndicator, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import Input from "../Components/Input";
import RadioInput from "../Components/RadioInput";
import Button from "../Components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";

const noteColorOptions = ["red", "blue", "green", "purple", "grey", "pink"];

export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color:
          (noteColor == "red" && "#F26B64") ||
          (noteColor == "blue" && "#72A5C8") ||
          (noteColor == "green" && "#62BC5C") ||
          (noteColor == "purple" && "#C395CE") ||
          (noteColor == "grey" && "#606D78") ||
          (noteColor == "pink" && "#F29FAC"),
        uid: user.uid,
      });
      setLoading(false);
      showMessage({
        message: "Note Created Successfully!",
        type: "success",
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
      {loading ? (
        <ActivityIndicator color="grey" size="large" />
      ) : (
        <Button
          title={"Submit"}
          customStyles={{
            alignSelf: "center",
            marginVertical: 60,
            width: "100%",
          }}
          onPress={onPressCreate}
        />
      )}
    </SafeAreaView>
  );
}
