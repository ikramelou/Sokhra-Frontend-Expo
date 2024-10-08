import React, {useState} from 'react'
import {ActivityIndicator, Alert, Text, TouchableOpacity, View} from 'react-native'
import PhoneNumberField from "../../components/PhoneNumberField"
import DynamicSafeAreaView from "../../components/DynamicSafeAreaView"
import validatePhoneNumber from "../../utils/validatePhoneNumber"
import parseValidePhoneNumber from "../../utils/parseValidePhoneNumber"
import {router} from "expo-router"
import loginWithPhoneNumber from "../../utils/loginWithPhoneNumber"
import confirmStore from "../../store/confirmStore"

export default function login() {
  const [countryCode, setCountryCode] = useState(null)
  const [nationalNumber, setNationalNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const setConfirm = confirmStore().setConfirm


  async function handlePress() {
    if (nationalNumber === "") {
      return Alert.alert("Veuillez entrer votre numéro de téléphone")
    }
    setLoading(true)
    const flag = validatePhoneNumber(countryCode.cca2, nationalNumber)
    if (!flag) {
      setLoading(false)
      return Alert.alert("Numéro de téléphone invalide")
    }
    const parsedPhoneNumber = parseValidePhoneNumber(countryCode.cca2, nationalNumber)
    try {
      await loginWithPhoneNumber(parsedPhoneNumber, setConfirm)
    } catch (e) {
      return Alert.alert("Erreur", "Trop de tentatives de connexion avec ce numéro de téléphone. Veuillez réessayer plus tard.")
    } finally {
      setLoading(false)
    }
    router.navigate({pathname: "/otp", params: {parsedPhoneNumber: parsedPhoneNumber}})
  }

  return (<DynamicSafeAreaView className="h-full bg-white">

    <Text className="text-center font-pbold text-2xl mt-32">
      Indiquez votre numéro
    </Text>

    <Text className="text-center font-pregular mx-10 mb-10">
      Nous vous enverrons un code pour vérifier votre téléphone
    </Text>

    <View className="mx-3">
      <PhoneNumberField
          nationalNumber={nationalNumber}
          setNationalNumber={setNationalNumber}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
      />

      <TouchableOpacity
          className="justify-center items-center w-full h-11 bg-brand rounded-md mb-4"
          onPress={handlePress}
          disabled={loading}
      >

        {loading ?
            <ActivityIndicator size="large" color="white"/>
            :
            <Text className="text-white font-pmedium text-lg">Envoyer le code</Text>
        }
      </TouchableOpacity>
    </View>

    <Text className="text-black font-pextralight mx-4 text-center text-[11px]">
      L'adhésion à notre application signifie que vous acceptez nos&nbsp;
      <Text className="underline">
        Conditions d'utilisation
      </Text>
      &nbsp;et notre&nbsp;
      <Text className="underline">
        Politique de confidentialité
      </Text>
    </Text>
  </DynamicSafeAreaView>)
}
