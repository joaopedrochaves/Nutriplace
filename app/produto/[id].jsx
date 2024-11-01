// app/product/[id].js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useSearchParams } from 'expo-router';
import { Databases } from 'react-native-appwrite'; // Verifique o caminho para a configuração

const ProductDetails = () => {
  const { id } = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Databases.getDocument('[DATABASE_ID]', '[COLLECTION_ID]', id);
        setProduct(response);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#346bff" />;
  }

  if (!product) {
    return <Text style={{ color: '#fff' }}>Produto não encontrado</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#161622' }}>
      <Image source={{ uri: product.thumbnail }} style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 20 }} />
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{product.title}</Text>
      <Text style={{ color: '#fff', fontSize: 18, marginVertical: 10 }}>R${product.price.toLocaleString('pt-BR')}</Text>
      <Text style={{ color: '#fff' }}>{product.description}</Text>
    </View>
  );
};

export default ProductDetails;
