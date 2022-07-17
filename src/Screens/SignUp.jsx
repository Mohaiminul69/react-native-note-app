import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import initializeAuthentication from "./../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const app = initializeAuthentication();

const auth = getAuth();
const db = getFirestore(app);

const genderOptions = ["Male", "Female"];

export default function SignUp({ navigation }) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  const signUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid,
      });
      console.log(result);
      showMessage({
        message: "User Created!",
        description: "User created successfully!",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      showMessage({
        message: "Error!!!",
        description: "Oppss!! Something went wrong",
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input placeholder="Full Name" onChangeText={(text) => setName(text)} />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        <View style={{ marginVertical: 20 }}>
          <Text>Select Gender</Text>
        </View>
        {genderOptions.map((option) => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => setGender(option)}
              key={option}
              style={styles.radioContainer}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                ></View>
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.signUpLink}>
        <Button
          title={"Sign Up"}
          customStyles={{ alignSelf: "center", marginVertical: 60 }}
          onPress={signUp}
        />
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text>
            Already have an account?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signUpLink: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOuterCircle: { borderColor: "orange" },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedInnerCircle: {
    borderColor: "orange",
    backgroundColor: "orange",
  },
  radioText: {
    marginLeft: 10,
  },
});
