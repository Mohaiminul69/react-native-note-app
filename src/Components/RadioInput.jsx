import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function RadioInput({ label, value, setValue, size = "small" }) {
  const labelValue =
    (label == "red" && "#F26B64") ||
    (label == "blue" && "#72A5C8") ||
    (label == "green" && "#62BC5C") ||
    (label == "purple" && "#C395CE") ||
    (label == "grey" && "#606D78") ||
    (label == "pink" && "#F29FAC");

  const selectedValue =
    (value == "red" && "#F26B64") ||
    (value == "blue" && "#72A5C8") ||
    (value == "green" && "#62BC5C") ||
    (value == "purple" && "#C395CE") ||
    (value == "grey" && "#606D78") ||
    (value == "pink" && "#F29FAC") ||
    value;

  const isSelected = selectedValue == labelValue;
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
  selectedOuterCircle: { borderColor: "#72A5C8" },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedInnerCircle: {
    borderColor: "#72A5C8",
    backgroundColor: "#72A5C8",
  },
  radioText: {
    marginLeft: 10,
    textTransform: "capitalize",
  },
});
