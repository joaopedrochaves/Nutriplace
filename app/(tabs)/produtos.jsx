import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState }from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Searchinput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";
import { getAllPosts } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Produtos = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    //procura produtos => se tiver produto
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
      
        data={posts}
        keyExtractor={(item) => item.$id}
        numColumns={3}
        renderItem={({ item }) => (
          <ProductCard produto={item} />
          
        )}
        
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}

        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bem Vindo,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}!
                </Text>
              </View>
              

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  recizeMode="contain"
                />
              </View>
            </View>

            <Searchinput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nenhum produto encontrado"
            subtitle="Adicione o primeiro produto"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
    </SafeAreaView>
    
  );
  
};


export default Produtos;