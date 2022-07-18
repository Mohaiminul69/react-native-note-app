import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function RadioInput({ label, value, setValue, size = "small" }) {
  const isSelected = value == label;
  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.radioContainer}>
        <View
          style={[styles.outerCircle, isSelected && styles.selectedOuterCircle]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && styles.selectedInnerCircle,
            ]}
          ></View>
        </View>
        <Text style={styles.radioText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    textTransform: "capitalize",
  },
});
