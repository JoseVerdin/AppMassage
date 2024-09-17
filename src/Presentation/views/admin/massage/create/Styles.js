import { StyleSheet } from "react-native";

const AdminMassageCreateStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    paddingTop: 50,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  formImage: {
    height: 30,
    width: 30,
    tintColor: "#06b1f0",
  },
  formImage2: {
    height: 30,
    width: 30,
    tintColor: "#06b1f0",
  },
  form: {
    backgroundColor: "white",
    height: "65%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    marginTop: 100,
  },
});

export default AdminMassageCreateStyles;
