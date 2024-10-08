import React, {useState} from 'react'
import {ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {router, useLocalSearchParams} from 'expo-router'
import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import {OtpInput} from "react-native-otp-entry";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import confirmStore from "../../store/confirmStore";
import sendAuthenticatedRequest from "../../utils/sendAuthenticatedRequest";
import {setItem} from "../../utils/asyncStorage";
import loginWithPhoneNumber from "../../utils/loginWithPhoneNumber";

export default function otp() {
  const {parsedPhoneNumber} = useLocalSearchParams()
  const [numberOfSeconds, setNumberOfSeconds] = useState(30)
  const [loading, setLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const {confirm, setConfirm} = confirmStore()

  async function confirmCode(code) {
    try {
      setLoginLoading(true)
      await confirm.confirm(code)
      const response = await sendAuthenticatedRequest("get", "/user/register/shouldRegister")
      if (response.shouldRegister) {
        return router.navigate("/register")
      }
      await setItem("isLoggedIn", "true")
      while (router.canGoBack()) {
        router.back()
      }
      return router.replace("/")
    } catch (error) {
      setLoginLoading(false)
      Alert.alert("code incorrect")
    }
  }

  async function resendCode() {
    setLoading(true)
    loginWithPhoneNumber(parsedPhoneNumber, setConfirm)
    setLoading(false)
    setNumberOfSeconds(60)
    Alert.alert("Un nouveau code à été envoyé")
  }
  if (numberOfSeconds >= 0) {
    setTimeout(() => setNumberOfSeconds(numberOfSeconds - 1), 1000);
  }

  return (<DynamicSafeAreaView className="h-full bg-white">
    {loginLoading && (
        <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              justifyContent: 'center',
              alignItems: 'center', zIndex: 1
            }}>
          <ActivityIndicator size={50} color={COLORS.brand}/>
        </View>
    )}

    <TouchableOpacity
        onPress={() => {
          setConfirm(null)
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
          name="chevron-back"
          style={{
            fontSize: 35, color: COLORS.cgrey
          }}
      />
    </TouchableOpacity>

    <Text className="text-center font-psemibold text-2xl mt-32">
      Saisissez le code
    </Text>

    <Text className="text-center font-pregular mx-10 mb-10">
      Un code de vérification a été envoyé à {parsedPhoneNumber.replace(" ", "\u00A0")}
    </Text>

    <View className="mx-4 mb-10">
      <OtpInput
          numberOfDigits={6}
          focusColor={COLORS.brand}
          hideStick
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: COLORS.fgrey, width: 52, height: 52, borderWidth: 0,
            }, focusedPinCodeContainerStyle: {
              borderWidth: 3,
            }, pinCodeTextStyle: {
              fontWeight: "bold"
            }
          }}
          onFilled={(code) => confirmCode(code)}
      />
    </View>

    {numberOfSeconds >= 0 &&
        <Text className="mx-5 text-center justify-center font-pmedium text-lg">
          Vous pouvez demander un code à nouveau dans {numberOfSeconds} s
        </Text>}

    {numberOfSeconds < 0 &&
        <TouchableOpacity
            className="mx-4 justify-center items-center h-11 bg-brand rounded-md mb-6"
            onPress={resendCode}
            disabled={loading}
        >

          {loading ?
              <ActivityIndicator size="large" color="white"/>
              :
              <Text className="text-white font-pmedium text-lg">
                Renvoyer le code
              </Text>}

        </TouchableOpacity>}
  </DynamicSafeAreaView>)
}
