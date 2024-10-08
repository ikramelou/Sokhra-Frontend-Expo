import {ActivityIndicator, Alert, StatusBar, Text, TouchableOpacity, View} from "react-native";
import COLORS from "../../constants/colors";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useState} from "react";
import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import CityPicker from "../../components/CityPicker";
import {Input} from "@rneui/themed";
import dateToString from "../../utils/dateToString";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import CustomDatePicker from "../../components/CustomDatePicker";
import intInputHandler from "../../utils/intInputHandler";
import sendAuthenticatedRequest from "../../utils/sendAuthenticatedRequest";

export default function addListing() {
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [weight, setWeight] = useState(null)
  const [price, setPrice] = useState(null)
  const [departureDate, setDepartureDate] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (origin == null) {
      Alert.alert("Veuillez indiquer votre ville de départ.")
      return
    }
    if (destination == null) {
      Alert.alert("Veuillez indiquer votre ville d'arrivée.")
      return
    }
    if (departureDate == null) {
      Alert.alert("Veuillez indiquer la date de départ.")
      return
    }
    if (weight == null || weight.length < 1) {
      Alert.alert("Veuillez indiquer le poids maximum que vous souhaitez transporter.")
      return
    }
    if (price == null || price.length < 1) {
      Alert.alert("Veuillez indiquer le prix par kilo que vous souhaitez.")
      return
    }
    setLoading(true)
    const jsonBody = {
      origin: origin,
      destination: destination,
      weight: weight,
      departureDate: departureDate,
      price: price,
    }
    const response = await sendAuthenticatedRequest("post", "/trip/add", jsonBody, true)
    if (response.created) {
      setLoading(false)
      //todo navigate to trips page
      Alert.alert("Voyage ajouté avec succès.", null, [{
        text: 'OK', onPress: () => {
          console.log(123)
          router.navigate("myTrips")
        }
      }])
    }
  }


  return (<DynamicSafeAreaView className="h-full bg-white">
    <StatusBar backgroundColor={COLORS.brand} barStyle="default"/>
    <View className="bg-brand h-[50]">
      <View className="flex-row items-center justify-center w-full mt-1.5 mb-3">
        <TouchableOpacity
            className="bg-fgrey rounded-[20px] w-10 h-10 ml-[15] justify-center mb-[5] absolute left-0"
            onPress={() => {
              router.back()
            }}
        >
          <Ionicons
              name="chevron-back"
              style={{
                fontSize: 35, color: COLORS.cgrey
              }}
          />
        </TouchableOpacity>

        <Text className="font-psemibold text-2xl text-white">
          Publier une annonce
        </Text>
      </View>
    </View>

    <View className="items-center mt-8 mx-5 ">
      <View className="bg-white w-full h-[65] justify-center mb-5 rounded-[10px] border-brand border-2">
        <CityPicker
            placeholder="Départ"
            type="default"
            setValue={setOrigin}
            iconName="airplane-takeoff"
            labelField="label"
            valueField="value"
            searchPlaceholder="Cherchez votre ville de départ"
        />
      </View>

      <View className="bg-white w-full h-[65] justify-center mb-5 rounded-[10px] border-brand border-2">
        <CityPicker
            placeholder="Destination"
            type="default"
            setValue={setDestination}
            iconName="airplane-landing"
            labelField="label"
            valueField="value"
            searchPlaceholder="Cherchez votre ville de départ"
        />
      </View>

      <View className="bg-white w-full h-[65] justify-center mb-5 rounded-[10px] border-brand border-2">
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Input
              disabledInputStyle={{fontSize: 20, opacity: 1}}
              value={departureDate == null ? "" : dateToString(departureDate)}
              placeholderTextColor={COLORS.cgrey}
              disabled={true}
              renderErrorMessage={false}
              inputContainerStyle={{borderBottomWidth: 0, height: 45}}
              containerStyle={{
                backgroundColor: "white", paddingHorizontal: 0, borderRadius: 10,
              }}
              placeholder="Date de départ"
              leftIcon={<MaterialCommunityIcons name="calendar-clock" size={25} color={COLORS.cgrey}/>}
              leftIconContainerStyle={{width: 30, height: 30, marginLeft: 5,}}
          />
        </TouchableOpacity>
        <CustomDatePicker
            date={departureDate ? departureDate : new Date()}
            open={open}
            setDate={setDepartureDate}
            setOpen={setOpen}/>
      </View>

      <View className="bg-white w-full h-[65] justify-center mb-5 rounded-[10px] border-brand border-2">
        <Input
            inputStyle={{fontSize: 20}}
            placeholderTextColor={COLORS.cgrey}
            value={weight}
            onChangeText={(input) => intInputHandler(input, setWeight)}
            inputMode="decimal"
            disabled={false}
            renderErrorMessage={false}
            inputContainerStyle={{borderBottomWidth: 0, height: 45}}
            containerStyle={{
              backgroundColor: "white", paddingHorizontal: 0, borderRadius: 10,
            }}
            placeholder="Poids (kg)"
            leftIcon={<MaterialCommunityIcons name="weight-kilogram" size={25} color={COLORS.cgrey}/>}
            leftIconContainerStyle={{width: 30, height: 30, marginLeft: 5,}}
        />
      </View>

      <View className="bg-white w-full h-[65] justify-center mb-5 rounded-[10px] border-brand border-2">
        <Input
            inputStyle={{fontSize: 20}}
            placeholderTextColor={COLORS.cgrey}
            value={price}
            onChangeText={(input) => intInputHandler(input, setPrice)}
            inputMode="decimal"
            disabled={false}
            renderErrorMessage={false}
            inputContainerStyle={{borderBottomWidth: 0, height: 45}}
            containerStyle={{
              backgroundColor: "white", paddingHorizontal: 0, borderRadius: 10,
            }}
            placeholder="Prix (dh/kg)"
            leftIcon={<Entypo name="price-tag" size={25} color={COLORS.cgrey}/>}
            leftIconContainerStyle={{width: 30, height: 30, marginLeft: 5,}}
        />
      </View>

      <TouchableOpacity
          className="justify-center items-center w-full h-11 bg-brand rounded-md"
          onPress={submit}
      >
        {loading ?
            <ActivityIndicator size="large" color="white"/> :
            <Text className="text-white font-pmedium text-lg">
              Valider
            </Text>}
      </TouchableOpacity>
    </View>
  </DynamicSafeAreaView>)
}
