import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
const { brand, darkLight, primary, red, tertiary,secondary } = Colors;

const AfficheConsultation = ({ navigation, route }) => {
  const { selectedAnalyse } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de la Consultation</Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>{selectedAnalyse.type}</Text>
          <Text style={styles.subTitle}>Date: {selectedAnalyse.date}</Text>
          <Text style={styles.subTitle}>Contact: {selectedAnalyse.contact}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traitement:</Text>
          {selectedAnalyse.traitements.map((traitement, index) => (
            <View key={index} style={styles.traitementItem}>
              <Text style={styles.traitementTitle}>{traitement.medicament}</Text>
              <Text style={styles.traitementText}>
                Durée: {traitement.nbrJours} jours, Fréquence: {traitement.nbrfois} fois par jour
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkLight,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: brand,
  },
  moreButton: {
    padding: 10,
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  traitementItem: {
    marginBottom: 10,
  },
  traitementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  traitementText: {
    fontSize: 16,
  },
});

export default AfficheConsultation;
