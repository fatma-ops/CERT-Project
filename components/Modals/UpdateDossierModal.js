import React, { useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

const UpdateDossierModal = ({ visible, onClose, onUpdate, oldNom }) => {
    const [nom, setNom] = useState(oldNom);
    const [error, setError] = useState('');
  
    const handleUpdate = () => {
      if (nom.trim() === '') {
        setError('Le nom du dossier ne peut pas être vide.');
        return;
      }
  
      onUpdate(nom);
      onClose();
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Ancien nom : {oldNom} <Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
              value={nom}
              onChangeText={setNom}
              placeholder="Nouveau nom du dossier"
              style={[styles.input, error ? styles.errorInput : null]}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                <Text>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text>Annuler</Text>
              </TouchableOpacity>
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UpdateDossierModal;

