import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_SESSION_KEY = "user_session";

export const saveUserSession = async (userSession) => {
  try {
    const jsonValue = JSON.stringify(userSession);
    //console.log("Guardando sesión del usuario en AsyncStorage: ", jsonValue);
    await AsyncStorage.setItem(USER_SESSION_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving user session:", e);
  }
};

export const getUserSession = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_SESSION_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving user session:", e);
  }
};

export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem(USER_SESSION_KEY);
  } catch (e) {
    console.error("Error clearing user session:", e);
  }
};
