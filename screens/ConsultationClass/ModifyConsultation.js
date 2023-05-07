import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ngrokLink } from '../../config';
import { CredentialsContext } from '../../components/CredentialsContext';

const ModifyConsultation = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { email } = storedCredentials;

  useEffect(() => {
    fetch(`${ngrokLink}/api/v1/medecin/${email}?cache_bust=123456789`)
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
  }, []);

  const options = contacts.map(contact => contact.nom);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a contact:</Text>
      <SelectDropdown
        data={options}
        onSelect={(selectedItem, index) => setSelectedContact(contacts[index].id)}
        defaultButtonText='Select a contact'
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.rowTextStyle}
        buttonTextAfterSelection={(selectedItem, index) => contacts[index].nom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    width: '80%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: '#444',
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    height: 'auto',
    maxHeight: 200,
  },
  rowStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  rowTextStyle: {
    fontSize: 16,
    color: '#444',
  },
});

export default ModifyConsultation;