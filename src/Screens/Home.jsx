import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../App";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setNotes(list);
    });

    return notesListenerSubscription;
  }, []);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 16,
          padding: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
        <Text style={{ color: "white", fontSize: 18, marginTop: 16 }}>
          {description}
        </Text>
      </Pressable>
    );
  };

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
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}
