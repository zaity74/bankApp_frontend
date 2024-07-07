import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthentificationContext } from "../context/contexts";

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setIsAuthentificat,
    isAuthentificat,
    setIban,
    setNom,
    nom,
    setPrenom,
    prenom,
    setSolde,
    solde,
  } = useContext(AuthentificationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:7000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User logged in successfully!");
        setIban(data.iban);
        setNom(data.nom);
        setPrenom(data.prenom);
        setIsAuthentificat(true);
        setMessage({ text: "User logged in successfully!", type: "success" });
        // navigation.navigate('Transfer', { user: data.user });
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      Alert.alert("Error", "Failed to login user");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Delay of 2 seconds
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>
          {isAuthentificat ? `Bienvenue\n${nom} ${prenom}` : "Connectez-vous avec votre adresse email"}
        </Text>
        {!isAuthentificat ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={setemail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Button title="Se connecter" onPress={handleLogin} />
            )}
            <Text style={styles.linkText}>
              Vous n'avez pas encore de compte ?{" "}
              <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={styles.link}> Inscrivez-vous </Text>
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
          </>
        ) : (
          <>
            <Text style={styles.linkText}>
              Si vous souhaitez faire un transfert, cliquez sur le lien suivant
              :{" "}
              <TouchableOpacity onPress={() => navigation.navigate("Transfer")}>
                <Text style={styles.link}>Transfert</Text>
              </TouchableOpacity>
            </Text>
            <Text style={styles.linkText}>
              Si vous souhaitez commander un chèque, cliquez sur le lien suivant
              :{" "}
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderCheckbook")}
              >
                <Text style={styles.link}>Je commande un chèque</Text>
              </TouchableOpacity>
            </Text>
          </>
        )}
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
    textAlign: "center", // Center align the text
    width: "100%",
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

export default LoginScreen;
