import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Product from '../data/dummy-data';
import { Colors } from '../components/styles';
const { brand } = Colors;

const AnalyseDetail = (props) => {
  const route = useRoute();
  const id = route.params.productId;
  const navigation = useNavigation();

  const [analyse, setAnalyse] = useState(Product.find((analyse) => analyse.id === id));

  const handleEdit = () => {
    // Navigate to the edit screen and pass the current analyse as a parameter
    navigation.navigate('EditAnalyse', { analyse });
  };

  const handleDelete = () => {
    // Show an alert to confirm deletion
    Alert.alert(
      'Supprimer l\'analyse',
      'Êtes-vous sûr de vouloir supprimer cette analyse ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            // Filter out the current analyse from the products list and save it
            const updatedProducts = Product.filter((product) => product.id !== id);
            setAnalyse(null); // set the current analyse to null to trigger a re-render
            saveProducts(updatedProducts);
            navigation.goBack(); // go back to the previous screen
          },
        },
      ],
      { cancelable: true },
    );
  };

  const saveProducts = (products) => {
    // Save the updated products list to local storage
    // You can implement this using AsyncStorage or another local storage solution
  };

  if (!analyse) {
    // If the analyse has been deleted, show a message
    return (
      <View style={styles.container}>
        <Text style={styles.deleted}>Cette analyse a été supprimée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: analyse.imageUrl }} />
      <Text style={styles.title}>{analyse.title}</Text>
      <Text style={styles.price}>{analyse.price}</Text>
      <View style={styles.actions}>
        <Button color={brand} title="Modifier" onPress={handleEdit} />
        <Button color={brand} title="Supprimer" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 300,
    borderRadius:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleted: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AnalyseDetail;

