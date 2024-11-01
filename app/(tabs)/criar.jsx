import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { createProdutoPost } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Criar = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    price: "",
    amount: "",
    description: ""
  });
  const handleNumericInput = (value, field) => {
    if (/^\d*$/.test(value)) {  // Valida que o valor é um número inteiro ou vazio
      setForm({ ...form, [field]: value });
    }
  };

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Documento selecionado", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.price === "") |
      (form.description === "") |
      (form.amount === "") |
      (form.title === "") |
      !form.thumbnail
    ) {
      return Alert.alert("Por favor preencha todos os campos");
    }

    setUploading(true);
    try {
      await createProdutoPost({
        ...form,
        price: parseInt(form.price),
        amount: parseInt(form.amount),
        userId: user.$id,
      });

      Alert.alert("Sucesso", "Produto acionado");
      router.push("/produtos");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        thumbnail: null,
        price: "",
        amount: "",
        description: ""
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Enviar Produto</Text>

        <FormField
          title="Nome do produto"
          value={form.title}
          placeholder="Nome do produto"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Foto do Produto
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  escolha um arquivo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Preço"
          value={form.price}
          placeholder="Preço do produto"
          handleChangeText={(e) => handleNumericInput(e, "price")}
          keyboardType="numeric"
          otherStyles="mt-7"
        />
        <FormField
          title="Quantidade"
          value={form.amount}
          placeholder="Quantidade do produto"
          handleChangeText={(e) => handleNumericInput(e, "amount")}
          keyboardType="numeric"
          otherStyles="mt-7"
        />
        <FormField
          title="Descrição do Produto"
          value={form.description}
          placeholder="Descrição do produto"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Enviar e Cadastrar"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Criar;