import { View, ActivityIndicator, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import Input from "../Components/Input";
import RadioInput from "../Components/RadioInput";
import Button from "../Components/Button";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";

const noteColorOptions = ["red", "blue", "green", "purple", "grey", "pink"];

export default function Edit({ navigation, route, user }) {
  const item = route.params.item;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [noteColor, setNoteColor] = useState(item.color);
  const [loading, setLoading] = useState(false);

  const onPressUpdate = async () => {
    const noteRef = doc(db, "notes", item.id);
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", item.id), {
        title: title,
        description: description,
        color:
          (noteColor == "red" && "#F26B64") ||
          (noteColor == "blue" && "#72A5C8") ||
          (noteColor == "green" && "#62BC5C") ||
          (noteColor == "purple" && "#C395CE") ||
          (noteColor == "grey" && "#606D78") ||
          (noteColor == "pink" && "#F29FAC"),
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
        value={title}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
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
          onPress={onPressUpdate}
        />
      )}
    </SafeAreaView>
  );
}
