import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import RegisterScreen from "./components/userRegister";
import LoginScreen from "./components/loginRegister";
import OrderCheckbookScreen from "./components/order";
import TransferScreen from "./components/transfer";
import {
  AuthentificationProvider,
  AuthentificationContext,
} from "./context/contexts";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREvK9GtpkyLg-KgXaM781JBB2cbg2gdpgMbzLFBPyS975gcYlQjKiqh8IsVK3HdXrUb2E&usqp=CAU' }} // Remplacez cette URL par celle de votre logo
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function AppNavigator() {
  const { isAuthentificat, nom } = useContext(AuthentificationContext);

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: isAuthentificat ? `Utilisateur ${nom}` : "Connexion",
        }}
      />
      {!isAuthentificat && (
        <Drawer.Screen
          name="register"
          component={RegisterScreen}
          options={{ title: "S'inscrire" }}
        />
      )}
      {isAuthentificat && (
        <>
          <Drawer.Screen
            name="Transfer"
            component={TransferScreen}
            options={{ title: "Faire un transfert" }}
          />
          <Drawer.Screen
            name="OrderCheckbook"
            component={OrderCheckbookScreen}
            options={{ title: "Commander un chèque" }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthentificationProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthentificationProvider>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 250,
    height: 250,
  },
});
