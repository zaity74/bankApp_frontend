import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthentificationContext } from "../context/contexts";

const OrderCheckbookScreen = ({ navigation }) => {
  const [userIban, setUserIban] = useState("");
  const { isAuthentificat, iban } = useContext(AuthentificationContext);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (isAuthentificat) {
      setUserIban(iban);
    }
  }, [isAuthentificat, iban]);

  const handleOrderCheckbook = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/checkbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iban: userIban }), // Change user_iban to iban
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      console.error("Error ordering checkbook:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Commander un chèque</Text>
        <TextInput
          style={styles.input}
          placeholder="IBAN"
          value={userIban}
          onChangeText={setUserIban}
        />
        <Button title="Commander" onPress={handleOrderCheckbook} />
        {message.text ? (
          <Text
            style={
              message.type === "success"
                ? styles.messageSuccess
                : styles.messageError
            }
          >
            {message.text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F2EE",
    alignItems: "center",
  },
  innerContainer: {
    width: "95%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0px 0px 0px 1px rgb(140 140 140/.2)",
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  messageSuccess: {
    color: "white",
    backgroundColor: "green",
    padding: 12,
    fontSize: 18,
    marginTop: 16,
    borderRadius: 5,
    textAlign: "center",
  },
  messageError: {
    color: "white",
    backgroundColor: "red",
    padding: 12,
    fontSize: 18,
    marginTop: 16,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default OrderCheckbookScreen;
