import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";

export default function SignIn({ navigation }) {
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
        <Input placeholder="Email Address" />
        <Input placeholder="Password" secureTextEntry />
      </View>

      <View style={styles.signUpLink}>
        <Button
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
