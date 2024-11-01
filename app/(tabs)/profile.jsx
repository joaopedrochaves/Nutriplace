import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchinput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";
import { getUserPosts, signOut } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import {useGlobalContext} from '../../context/GlobalProvider'
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));
  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/login')
  }



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
          <View className="w-full justify-center items-center mt-6 mb-12 px-4"> 
            <TouchableOpacity className=" w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6"/>
            </TouchableOpacity>
            <View className=" w-16 h-16 border border-secundary rounded-lg justify-center items-center ">
                <Image source={{uri: user?.avatar}} className=" w-[90%] h-[90%] rounded-lg" resizeMode="cover"/>
            </View>
            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className=" flex-row">
            <InfoBox
              title={posts.length || 0}
              subtitle='produtos cadastrados'
              titleStyles='text-xl'
            />
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

export default Profile;