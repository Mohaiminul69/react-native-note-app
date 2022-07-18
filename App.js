import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import Edit from "./src/Screens/Edit";
import Create from "./src/Screens/Create";
import { Fragment, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import FlashMessage from "react-native-flash-message";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyA7EkdLmRTzyWdLvSx31UNopPxCigwD2rs",
//   authDomain: "note-app-16eca.firebaseapp.com",
//   projectId: "note-app-16eca",
//   storageBucket: "note-app-16eca.appspot.com",
//   messagingSenderId: "366311548573",
//   appId: "1:366311548573:web:d4c975bab7eb1c09bb5674",
// };

// initializeApp(firebaseConfig);

const auth = getAuth();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   signOut(auth);
  // }, []);

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscription;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="grey" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <Fragment>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Edit" component={Edit} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Fragment>
        )}
      </Stack.Navigator>
      <StatusBar style="dark" />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
