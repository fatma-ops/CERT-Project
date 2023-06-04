import React, { useState } from 'react';
import { View, Modal,Button, TextInput, TouchableOpacity, Text, ActivityIndicator , StyleSheet } from 'react-native';

const AddDossierModal = ({ visible, onClose, onAdd }) => {
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (nom.trim() === '') {
      setError('Le nom du dossier ne peut pas être vide.');
      return;
    }

    setIsLoading(true);
    try {
      await onAdd(nom);
      setNom('');
      setError('');
    } catch (error) {
      console.error(error);
      // Gérer les erreurs
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Nom du dossier<Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={[styles.input, error ? styles.errorInput : null]}
            placeholder="Nom du dossier"
            value={nom}
            onChangeText={text => {
              setNom(text);
              setError('');
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <>
                <TouchableOpacity onPress={handleAdd} style={styles.button}>
                  <Text>Ajouter</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose} style={styles.button}>
                  <Text>Annuler</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default AddDossierModal;
