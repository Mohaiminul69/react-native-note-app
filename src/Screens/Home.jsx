import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  Button,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../App";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default function Home({ navigation, user }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
      setLoading(false);
    });

    return notesListenerSubscription;
  }, []);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <View
        style={{
          backgroundColor: color,
          padding: 3,
          shadowColor: "#171717",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Pressable
          style={{
            borderRadius: 10,
            borderWidth: 1.5,
            borderColor: "white",
            borderStyle: "dashed",
            backgroundColor: color,
            padding: 15,
          }}
          onPress={() => navigation.navigate("Edit", { item })}
        >
          <Pressable
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              padding: 15,
              zIndex: 4,
            }}
            onPress={() => {
              deleteDoc(doc(db, "notes", item.id));
            }}
          >
            <AntDesign name="delete" size={24} color="white" />
          </Pressable>
          <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
          <Text style={{ color: "white", fontSize: 18, marginTop: 16 }}>
            {description}
          </Text>
        </Pressable>
      </View>
    );
  };

  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  const onPressLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator color="grey" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6EDF2" }}>
      <View
        style={{
          padding: 20,
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderBottomColor: "grey",
        }}
      >
        <Pressable onPress={onPressLogout}>
          <SimpleLineIcons name="logout" size={23} color="black" />
        </Pressable>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: -1 }}>
          My Notes
        </Text>
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
