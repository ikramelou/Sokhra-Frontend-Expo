import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import {ActivityIndicator, FlatList, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import React, {useEffect, useState} from "react";
import {SegmentedButtons} from "react-native-paper";
import TripCard from "../../components/TripCard";
import sendAuthenticatedRequest from "../../utils/sendAuthenticatedRequest";

export default function MyTrips() {
  const [status, setStatus] = useState("ACTIVE");
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(true)
  const [myTripsList, setMyTripsList] = useState([])

  async function fetchData() {
    setMyTripsList([])
    setLoading(true)

    const response = await sendAuthenticatedRequest(
        "get",
        "/trips/my",
        null,
        false,
        false,
        {
          status: status,
        })

    setMyTripsList(response.tripList)
    if (response.tripList.length === 0) setIsEmpty(true)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [status])


  return (<DynamicSafeAreaView className="h-full bg-white">
    <StatusBar backgroundColor={COLORS.brand} barStyle="default"/>
    <View className="flex-row items-center justify-center w-full mb-3 bg-brand h-[50]">
      <TouchableOpacity
          className="bg-fgrey rounded-[20px] w-10 h-10 ml-[15] justify-center mb-[5] absolute left-0"
          onPress={() => {
            router.navigate("/home")
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
        Mes voyages
      </Text>
    </View>

    <SegmentedButtons
        value={status}
        onValueChange={setStatus}
        style={{
          marginTop: 10,
          marginHorizontal: 12,
          marginBottom: 18,
        }}
        buttons={[
          {
            value: "ACTIVE",
            label: "⏳En cours",
            checkedColor: "white",
            uncheckedColor: "black",
            style: {
              backgroundColor: (status === "ACTIVE") ? COLORS.brand : COLORS.fgrey,
              borderWidth: 2,
            },
            labelStyle: {
              fontFamily: "Poppins-Bold",
              fontSize: 16
            },
          },
          {
            value: "COMPLETED",
            label: "✅ Complété",
            checkedColor: "white",
            uncheckedColor: "black",
            style: {
              backgroundColor: (status === "COMPLETED") ? COLORS.brand : COLORS.fgrey,
              borderWidth: 2,
            },
            labelStyle: {
              fontFamily: "Poppins-Bold",
              fontSize: 16
            },
          },
        ]}
    />

    {loading &&
        <View className="mt-72">
          <ActivityIndicator color={COLORS.brand} size="large"/>
        </View>
    }

    {isEmpty &&
        <View className="mt-72">
          <Text className="text-center font-psemibold text-2xl">
            Vous n'avez aucun voyage actif.
          </Text>
        </View>}

    {!loading &&
        <FlatList
            data={myTripsList}
            renderItem={(item) => TripCard(item)}
            contentContainerStyle={{
              paddingBottom: 10
            }}
        />
    }


  </DynamicSafeAreaView>)
}
