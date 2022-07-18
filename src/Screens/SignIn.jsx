import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import initializeAuthentication from "./../Firebase/firebase.init";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeAuthentication();
const auth = getAuth();

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = () => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("signed in successfully", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        style={{ height: 200, width: 200, alignSelf: "center", marginTop: 60 }}
        source={require("../../assets/img/9.jpg")}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Never forget your notes.
      </Text>

      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.signUpLink}>
        <Button
          onPress={login}
          title={"Login"}
          customStyles={{ alignSelf: "center", marginVertical: 60 }}
        />
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Don't have an account?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign Up</Text>
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
});
