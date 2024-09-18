import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import CategoryListScreen from "./screens/CategoryListScreen";
import MealDetailScreen from "./screens/CategoryScreen";
import DetailMealScreen from "./screens/DetailMealScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import useStore from "./store";
import { useFonts } from "expo-font";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MealsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoryListScreen}
        options={{ title: "Meal Categories" }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
      <Stack.Screen
        name="DetailMeal"
        component={DetailMealScreen}
        options={{ title: "Meal Details" }}
      />
    </Stack.Navigator>
  );
}
function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoryListScreen}
        options={{ title: "Meal Categories" }}
      />
    </Stack.Navigator>
  );
}
function FavoritesNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{ title: "Your Favorites" }}
      />
      <Stack.Screen
        name="DetailMeal"
        component={DetailMealScreen}
        options={{ title: "Meal Details" }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "MealsTab") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "FavoritesTab") {
            iconName = focused ? "star" : "star-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="MealsTab"
        component={MealsNavigator}
        options={{ title: "Meals" }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesNavigator}
        options={{ title: "Favorites" }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  const user = useStore((state) => state.user);

  const [fontsLoaded] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={user ? "Home" : "Login"}>
        {user ? (
          <>
            <Drawer.Screen
              name="Meals"
              component={TabNavigator}
              options={{ title: "Meals" }}
            />
            <Drawer.Screen name="Favorites" component={FavoritesNavigator} />
          </>
        ) : (
          <>
            <Drawer.Screen name="LoginScreen" component={LoginNavigator} />
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
