import {
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchinput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";
import { searchPosts } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        numColumns={3}
        renderItem={({ item }) => <ProductCard produto={item} />}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Resultado da pesquisa,
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className='mt-6 mb-8'> 
            <Searchinput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nenhum produto encontrado"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;