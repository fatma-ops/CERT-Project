import React from 'react';
import { FlatList, Button, Platform , StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { useState,useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import AnalyseDetail from './AnalyseDetail';
import PRODUCTS from '../data/dummy-data';
import SearchBar from '../components/SearchBar';
import { View } from 'react-native';
import NotFound from '../components/NotFound';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AnalyseFlatList = props => {
  const [searchQuery, setSearchQuery] = useState('');
const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

const handleOnSearchInput = (text) => {
setSearchQuery(text);
const filtered = PRODUCTS.filter((item) => {
return item.title.toLowerCase().includes(text.toLowerCase());
});
setFilteredProducts(filtered);
};


const loadProducts = async () => {
  try {
    const data = await AsyncStorage.getItem('PRODUCTS');
    if (data !== null) {
      const products = JSON.parse(data);
      setFilteredProducts(products);
    } else {
      setFilteredProducts(PRODUCTS);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadProducts();
}, []);


const handleOnSave = async (products) => {
  try {
    await AsyncStorage.setItem('PRODUCTS', JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
};

const handleOnUpdate = (id, product) => {
  const index = filteredProducts.findIndex(item => item.id === id);
  if (index !== -1) {
    const products = [...filteredProducts];
    products[index] = product;
    setFilteredProducts(products);
    handleOnSave(products);
  }
};

const handleOnDelete = (id) => {
  const index = filteredProducts.findIndex(item => item.id === id);
  if (index !== -1) {
    const products = [...filteredProducts];
    products.splice(index, 1);
    setFilteredProducts(products);
    handleOnSave(products);
  }
};

  
    return(
      <>
      
     <SearchBar
     value={searchQuery}
     onChangeText={handleOnSearchInput}
     containerStyle={{ marginVertical: 15 }}
     
   />
     
     
    {filteredProducts.length > 0 ? (
    <FlatList
    data={filteredProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
      <ProductItem image={itemData.item.imageUrl} 
      title={itemData.item.title} 
      price={itemData.item.price} 
      onViewDetail={() => {
        props.navigation.navigate('AnalyseDetail',
        {productId:itemData.item.id,
         productTitle:itemData.item.title,
         
        })
      } } 
      />
    )}
        
    
    
    />
    ) : (
      <NotFound />
    )}
   
    </>
      );
};


export default AnalyseFlatList;
