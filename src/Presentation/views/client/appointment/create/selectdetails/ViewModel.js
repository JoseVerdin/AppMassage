import { useContext, useState, useCallback, useEffect } from "react";
import { AppointmentContext } from "../../../../../context/AppointmentContext";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const ClientAppointmentViewModel = (route) => {
  const { massages, getMassages } = useContext(AppointmentContext);
  const navigation = useNavigation();

  const {
    quantity,
    note: initialNote,
    currentPerson: initialCurrentPerson,
    personSelections: initialPersonSelections = {},
  } = route.params;

  const [selectedMassage, setSelectedMassage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPersonState, setCurrentPerson] = useState(
    initialCurrentPerson || route.params.currentPerson || 1,
  );
  const [personSelections, setPersonSelections] = useState(
    initialPersonSelections,
  );
  const [localNote, setLocalNote] = useState(initialNote || "");
  const parsedQuantity = parseInt(quantity, 10);

  useEffect(() => {
    const fetchMassages = async () => {
      try {
        const massagesWithParsedOptions = massages.map((massage) => ({
          ...massage,
          options: massage.options,
        }));
        getMassages(massagesWithParsedOptions);

        // Load the selected massage for the current person if it exists
        const currentPersonSelection = personSelections[currentPersonState];
        if (currentPersonSelection && currentPersonSelection.selectedMassage) {
          setSelectedMassage(currentPersonSelection.selectedMassage);
          setSelectedOption(currentPersonSelection.selectedOption);
          setLocalNote(currentPersonSelection.note || "");
        } else {
          setSelectedMassage(massagesWithParsedOptions[0]);
        }
      } catch (error) {
        console.error("Error fetching massages:", error);
        Alert.alert("Error", "Failed to load massages. Please try again.");
      }
    };

    fetchMassages();
  }, [currentPersonState, personSelections]);

  useEffect(() => {
    if (route.params?.updatedNote) {
      setLocalNote(route.params.updatedNote);
      updatePersonSelections();
      navigation.setParams({ updatedNote: undefined });
    }
  }, [route.params?.updatedNote, navigation]);

  const updatePersonSelections = useCallback(() => {
    setPersonSelections((prev) => ({
      ...prev,
      [currentPersonState]: {
        selectedMassage,
        selectedOption,
        note: route.params?.updatedNote || localNote,
      },
    }));
  }, [
    currentPersonState,
    selectedMassage,
    selectedOption,
    localNote,
    route.params?.updatedNote,
  ]);

  const handleAddNotes = useCallback(() => {
    updatePersonSelections();
    navigation.navigate("ClientNotesScreen", {
      currentPerson: currentPersonState,
      note: localNote,
      quantity: parsedQuantity,
    });
  }, [
    updatePersonSelections,
    navigation,
    currentPersonState,
    localNote,
    parsedQuantity,
  ]);

  const handleNextPerson = useCallback(() => {
    if (!selectedMassage || !selectedOption) {
      Alert.alert("Please", "select a massage and an option.");
      return;
    }

    updatePersonSelections();

    if (currentPersonState < parsedQuantity) {
      const nextPerson = currentPersonState + 1;
      navigation.setParams({
        currentPerson: nextPerson,
        personSelections: {
          ...personSelections,
          [currentPersonState]: {
            selectedMassage,
            selectedOption,
            note: localNote,
          },
        },
      });
      setCurrentPerson(nextPerson);

      // Load the next person's selections if they exist
      const nextPersonSelection = personSelections[nextPerson];
      if (nextPersonSelection) {
        setSelectedMassage(nextPersonSelection.selectedMassage);
        setSelectedOption(nextPersonSelection.selectedOption);
        setLocalNote(nextPersonSelection.note || "");
      } else {
        // If no selections exist for the next person, reset to default state
        setSelectedMassage(massages[0]);
        setSelectedOption(null);
        setLocalNote("");
      }
    } else {
      navigation.navigate("ConfirmAppointScreen", {
        personSelections: {
          ...personSelections,
          [currentPersonState]: {
            selectedMassage,
            selectedOption,
            note: localNote,
          },
        },
      });
    }
  }, [
    selectedMassage,
    selectedOption,
    updatePersonSelections,
    currentPersonState,
    parsedQuantity,
    navigation,
    personSelections,
    localNote,
    massages,
  ]);

  const handlePreviousPerson = useCallback(() => {
    if (currentPersonState > 1) {
      const previousPerson = currentPersonState - 1;
      setCurrentPerson(previousPerson);
      const previousSelection = personSelections[previousPerson];
      if (previousSelection) {
        setSelectedMassage(previousSelection.selectedMassage);
        setSelectedOption(previousSelection.selectedOption);
        setLocalNote(previousSelection.note || "");
      }
    } else {
      navigation.goBack();
    }
  }, [currentPersonState, navigation, personSelections]);

  return {
    massages,
    selectedMassage,
    setSelectedMassage,
    selectedOption,
    setSelectedOption,
    localNote,
    setLocalNote,
    handleNextPerson,
    handlePreviousPerson,
    handleAddNotes,
    currentPersonState,
    quantity: parsedQuantity,
  };
};

export default ClientAppointmentViewModel;
