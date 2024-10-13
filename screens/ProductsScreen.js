// screens/ProductsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://seu-backend-url.com/products');
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products');
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('https://seu-backend-url.com/products', { name, price });
      if (response.data.success) {
        loadProducts();
        setName('');
        setPrice('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`https://seu-backend-url.com/products/${selectedProduct.id}`, {
        name,
        price,
      });
      if (response.data.success) {
        loadProducts();
        setSelectedProduct(null);
        setName('');
        setPrice('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to edit product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`https://seu-backend-url.com/products/${id}`);
      if (response.data.success) {
        loadProducts();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  return (
    <View>
      <Text>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Edit" onPress={() => {
              setSelectedProduct(item);
              setName(item.name);
              setPrice(item.price.toString());
            }} />
            <Button title="Delete" onPress={() => handleDeleteProduct(item.id)} />
          </View>
        )}
      />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Product Name"
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Product Price"
        keyboardType="numeric"
      />
      <Button
        title={selectedProduct ? "Edit Product" : "Add Product"}
        onPress={selectedProduct ? handleEditProduct : handleAddProduct}
      />
    </View>
  );
}
