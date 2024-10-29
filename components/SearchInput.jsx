import { View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import React from "react";
import { useState } from "react";
import { icons, images } from "../constants";

const Searchinput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secundary items-center flex-row sapce-x-4">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder='Procurar produtos cadastrados'
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title ==='Password' && !showPassword}
        />

            <TouchableOpacity>
                <Image
                source={icons.search}
                className='w-5 h-5'
                recizeMode='contain'
                />
            </TouchableOpacity>

      </View>

  );
};

export default Searchinput;
