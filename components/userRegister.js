import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthentificationContext } from "../context/contexts";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [solde, setSolde] = useState("");
  const [iban, setIban] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isRegister, setIsRegister } = useContext(AuthentificationContext);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:7000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nom, prenom, solde, iban }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegister(true);
        setMessage({ text: "User registred successfully!", type: "success" });
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert("Error", "Failed to register user: " + error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Delay of 2 seconds
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>
          {isRegister ? "Vous etes inscris" : "Inscription"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="IBAN"
          value={iban}
          onChangeText={setIban}
        />
        <TextInput
          style={styles.input}
          placeholder="Solde"
          value={solde}
          onChangeText={setSolde}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>S'inscrire</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Vous avez déjà un compte ?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.link}> Connectez-vous </Text>
          </TouchableOpacity>
        </Text>
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
    boxShadow: '0px 0px 0px 1px rgb(140 140 140/.2)',
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
  Text: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
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

export default RegisterScreen;
