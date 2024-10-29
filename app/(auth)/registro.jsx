import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton"
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";


const Registro = () => {

  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username:"",
    email:"",
    password:""
  })


    const enviar = async () => {
      if (form.username === "" || form.email === "" || form.password === "") {
        Alert.alert("Error", "Por favor preencha todos os campos");
      }
  
      setIsSubmitting(true);
      try {
        const result = await createUser(form.email, form.password, form.username);
        setUser(result);
        setIsLoggedIn(true);
  
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
            recizeMode='contain'
            className='w-[105px] h-[35px]'
          />

          <Text className='text-xl text-white text-semibold mt-10 font-psemibold'>Registro</Text>

            <FormField
            title='Usuário'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles='mt-10'
            />

            <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
            />

            <FormField
            title='Senha'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
            />

            <CustomButton
              title='Registrar'
              handlePress={enviar}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-white font-pregular'>
                Já possui conta?
              </Text>
              <Link href='/login' className="text-lg font-psemibold text-secondary">
                Entrar
              </Link>

            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registro;
