import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser } from "../../lib/appWrite";

const Login = () => {
  
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  

  const enviar = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Por favor preencha todos os campos");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "usuario logado com sucesso");
      router.replace("/produtos");
    } catch (error) {
      
      
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-5">
          <Image
            source={images.logo}
            recizeMode="contain"
            className="w-[105px] h-[35px]"
          />

          <Text className="text-xl text-white text-semibold mt-10 font-psemibold">
            Login
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Senha"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Entrar"
            handlePress={enviar}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white font-pregular">
              Não possui conta?
            </Text>
            <Link
              href="/registro"
              className="text-lg font-psemibold text-secondary"
            >
              Registre-se
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
