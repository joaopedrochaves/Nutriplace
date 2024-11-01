import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppWrite from "../../lib/useAppWrite";
import { getAllPosts } from "../../lib/appWrite";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');  // Exibe a data no formato DD/MM/AAAA
};

const Historico = () => {
  const { data: posts } = useAppWrite(getAllPosts);
  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Historico</Text>
      {posts &&
        posts.map((post) => (
          <View key={post.$id} className="mt-4">
            <Text className="text-white text-lg font-semibold">
              Título: {post.title}
            </Text>
            <Text className="text-gray-300 text-sm">
              Atualizado em: {formatDate(post.$updatedAt)}
            </Text>
            <Text className="text-gray-300 text-sm">
              Criador: {post.creator.username}
            </Text>
          </View>
        ))}
    </SafeAreaView>
  );
};

export default Historico;
