import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { AuthentificationContext } from "../context/contexts";

const TransferScreen = ({ navigation }) => {
  const { isAuthentificat, iban } = useContext(AuthentificationContext);
  const [senderIban, setSenderIban] = useState("");
  const [receiverIban, setReceiverIban] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (isAuthentificat) {
      setSenderIban(iban);
    }
  }, [isAuthentificat, iban]);

  const handleTransfer = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_iban: senderIban,
          receiver_iban: receiverIban,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
      } else {
        console.error(data.error);
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      console.error("Error making transfer:", error);
      setMessage({ text: "Failed to make transfer", type: "error" });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Faire un transfert</Text>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/002/553/665/small/hands-with-smartphones-devices-transfer-money-shopping-or-payment-mobile-banking-line-style-icon-free-vector.jpg" }} // Replace with your image URL
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Sender IBAN"
              value={senderIban}
              onChangeText={setSenderIban}
            />
            <TextInput
              style={styles.input}
              placeholder="Receiver IBAN"
              value={receiverIban}
              onChangeText={setReceiverIban}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <Button title="Transférer" onPress={handleTransfer} />
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
    boxShadow: '0px 0px 0px 1px rgb(140 140 140/.2)',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 250,
    height: 150,
    marginRight: 20,
  },
  formContainer: {
    flex: 1,
    width: "95%",
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

export default TransferScreen;
