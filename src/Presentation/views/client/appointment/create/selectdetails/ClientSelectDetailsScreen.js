import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import useViewModel from "./ViewModel";

export const ClientSelectDetailsScreen = () => {
  const route = useRoute();
  const {
    massages,
    selectedMassage,
    setSelectedMassage,
    selectedOption,
    setSelectedOption,
    localNote,
    handleNextPerson,
    handlePreviousPerson,
    handleAddNotes,
    currentPersonState,
    quantity,
  } = useViewModel(route);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handlePreviousPerson} accessibilityLabel="Go back">
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Massage Details</Text>
      </View>
      <Text style={styles.progressIndicator}>
        Person {currentPersonState} of {quantity}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {massages.map((massage) => (
          <Pressable
            key={massage.id}
            onPress={() => setSelectedMassage(massage)}
            style={[
              styles.massageItem,
              selectedMassage?.id === massage.id && styles.selectedMassageItem,
            ]}
          >
            <Text style={styles.massageName}>{massage.nombre}</Text>
            <Image
              source={{ uri: massage.imagen }}
              style={styles.massageImage}
              accessibilityLabel={`Image of ${massage.nombre}`}
            />
            <Text style={styles.massageDescription}>{massage.descripcion}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {selectedMassage && (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Choose a Duration:</Text>
          <View style={styles.optionsList}>
            {selectedMassage.options.map((option, index) => (
              <Pressable
                key={option.id || index}
                onPress={() =>
                  setSelectedOption({
                    duracion: option.duracion,
                    precio: option.precio,
                  })
                }
                style={[
                  styles.optionItem,
                  selectedOption?.duracion === option.duracion &&
                    styles.selectedOptionItem,
                ]}
              >
                <Text>
                  {option.duracion} minutes - ${option.precio}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <Pressable onPress={handleAddNotes} style={styles.addNotesButton}>
        <AntDesign name="pluscircleo" size={16} color="black" />
        <Text style={styles.addNotesText}>
          {localNote ? "Edit Therapist Notes" : "Any notes for your therapist?"}
        </Text>
      </Pressable>

      <Pressable onPress={handleNextPerson} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  backIcon: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "500",
    marginLeft: 10,
  },
  sectionTitle: {
    margin: 10,
    marginTop: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  massageItem: {
    width: 250,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedMassageItem: {
    borderColor: "#9bcadc",
  },
  massageName: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "400",
  },
  massageImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  massageDescription: {
    color: "gray",
    marginVertical: 5,
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 20,
    padding: 10,
  },
  optionsTitle: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 15,
  },
  optionsList: {
    flexDirection: "row",
    marginTop: 10,
  },
  optionItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  selectedOptionItem: {
    borderColor: "#9bcadc",
  },
  addNotesButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  addNotesText: {
    fontWeight: "500",
    fontSize: 15,
    marginHorizontal: 5,
  },
  nextButton: {
    justifyContent: "center",
    backgroundColor: "#9bcadc",
    padding: 10,
    margin: 15,
    borderRadius: 5,
    marginTop: 100,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
