import React, {useState} from 'react'
import {ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import DynamicSafeAreaView from "../../components/DynamicSafeAreaView"
import {router} from "expo-router"
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Avatar} from "@rneui/themed";
import {TextInput} from 'react-native-paper';
import {CameraType, launchCameraAsync, requestCameraPermissionsAsync} from "expo-image-picker";
import sendAuthenticatedRequest from "../../utils/sendAuthenticatedRequest";
import {setItem} from "../../utils/asyncStorage";
import imageToFile from "../../utils/imageToFile";

export default function register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null);

  async function pickImage() {
    await requestCameraPermissionsAsync()
    let result = await launchCameraAsync({
      cameraType: CameraType.front, allowsEditing: true, aspect: [1, 1], quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function submit() {
    if (lastName === "" || lastName.length < 3) {
      Alert.alert("Veuillez entrer un nom valid.")
      return
    }
    if (firstName === "" || firstName.length < 3) {
      Alert.alert("Veuillez entrer un prénom valid.")
      return
    }
    if (image === null) {
      Alert.alert("Une photo de profile est nécessaire pour compléter votre inscription")
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("profilePicture", imageToFile(image))
    const response = await sendAuthenticatedRequest("post", "/user/register", formData, false, true)
    if (response.created) {
      await setItem("isLoggedIn", "true")
      while (router.canGoBack()) {
        router.back()
      }
      return router.replace("/")
    } else {
      setLoading(false)
    }
  }

  return (<DynamicSafeAreaView className="h-full bg-white">
    <TouchableOpacity
        onPress={() => {
          router.navigate("/login")
        }}
        style={{
          backgroundColor: COLORS.fgrey,
          borderRadius: 20,
          width: 40,
          height: 40,
          marginLeft: 15,
          justifyContent: "center"
        }}>
      <Ionicons
          name="close"
          style={{
            fontSize: 35, color: COLORS.cgrey, marginLeft: 2
          }}
      />
    </TouchableOpacity>

    <Text className="text-center font-psemibold text-2xl mt-10 mb-10">
      Complétez votre profile pour continuer
    </Text>

    <ScrollView>
      <View className="items-center pb-5">
        {!image &&
            <Avatar
                size={150}
                rounded
                containerStyle={{backgroundColor: "#c0c2c6", paddingTop: 20}}
                icon={{
                  name: "person-fill", type: "octicon", size: 150
                }}>
              <Avatar.Accessory size={30} name="camera" type="entypo" color={"white"}
                                onPress={pickImage}
                                style={{
                                  backgroundColor: COLORS.cgrey,
                                  width: 50,
                                  height: 50,
                                  borderRadius: 25,
                                  borderWidth: 3,
                                  borderColor: "white",
                                  shadowColor: "white"
                                }}/>
            </Avatar>}

        {image &&
            <Avatar
                size={150}
                rounded
                source={{
                  uri: image.uri
                }}>
              <Avatar.Accessory size={30}
                                name="camera"
                                type="entypo"
                                color={"white"}
                                onPress={pickImage}
                                style={{
                                  backgroundColor: COLORS.cgrey,
                                  width: 50,
                                  height: 50,
                                  borderRadius: 25,
                                  borderWidth: 3,
                                  borderColor: "white",
                                  shadowColor: "white"
                                }}/>
            </Avatar>}
      </View>

      <View className="mx-3 mt-5">
        <TextInput
            returnKeyType="next"
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
            maxLength={20}
            className="mb-8"
            outlineStyle={{borderWidth: 1.5}}
            style={{height: 60, fontSize: 20, backgroundColor: COLORS.fgrey}}
            mode="outlined"
            label="Nom"
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
            activeOutlineColor={COLORS.brand}
        />

        <TextInput
            ref={(input) => {
              this.secondTextInput = input;
            }}
            maxLength={20}
            className="mb-9"
            outlineStyle={{borderWidth: 1.5}}
            style={{height: 60, fontSize: 20, backgroundColor: COLORS.fgrey}}
            mode="outlined"
            label="Prénom"
            value={firstName}
            onChangeText={firstName => setFirstName(firstName)}
            activeOutlineColor={COLORS.brand}
        />

        <TouchableOpacity
            className="justify-center items-center w-full h-11 bg-brand rounded-md"
            onPress={submit}
        >
          {loading ?
              <ActivityIndicator size="large" color="white"/>
              :
              <Text className="text-white font-pmedium text-lg">
                Valider
              </Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  </DynamicSafeAreaView>)
}
