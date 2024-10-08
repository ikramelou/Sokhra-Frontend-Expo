import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import {ActivityIndicator, FlatList, StatusBar, Text, TouchableOpacity, View} from "react-native";
import COLORS from "../../constants/colors";
import {router, useLocalSearchParams} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import {SegmentedButtons} from "react-native-paper";
import ShippingCard from "../../components/ShippingCard";
import sendAuthenticatedRequest from "../../utils/sendAuthenticatedRequest";

export default function tripReservations() {
  const [isEmpty, setIsEmpty] = useState(false)
  const {tripId, tripStatus} = useLocalSearchParams()
  const [cardType] = useState((tripStatus === "PENDING") ? "S-PENDING" : "S-DELIVERED")
  const [shipmentStatus, setShipmentStatus] = useState((tripStatus === "ACTIVE") ? "PENDING" : "DELIVERED")
  const [open, setOpen] = useState(false)
  const [shipmentList, setShipmentList] = useState([])
  const [loading, setLoading] = useState(true)


  async function fetchData() {
    setShipmentList([])
    setLoading(true)

    const response = await sendAuthenticatedRequest(
        "get",
        "/trip/shipments",
        null,
        false,
        false,
        {
          status: shipmentStatus,
          id: tripId
        })
    console.log(response)

    if (response.shipmentList.length === 0) setIsEmpty(true)
    setShipmentList(response.shipmentList.shipments)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [shipmentStatus])


  return (<DynamicSafeAreaView className="h-full bg-white">
    <StatusBar backgroundColor={COLORS.brand} barStyle="default"/>
    <View className="flex-row items-center justify-center w-full mb-3 bg-brand h-[50]">
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
        Réservations
      </Text>
    </View>

    <SegmentedButtons
        value={shipmentStatus}
        onValueChange={setShipmentStatus}
        style={{
          marginTop: 10,
          marginHorizontal: 12,
          marginBottom: 18,
        }}
        buttons={
          (tripStatus === "ACTIVE") ?
              [
                {
                  value: "PENDING",
                  label: "En attente",
                  checkedColor: "white",
                  uncheckedColor: "black",
                  style: {
                    backgroundColor: (shipmentStatus === "PENDING") ? COLORS.brand : COLORS.fgrey,
                    borderWidth: 2,
                  },
                  labelStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    width: 500
                  },
                },
                {
                  value: "ACCEPTED",
                  label: "Accéptés",
                  checkedColor: "white",
                  uncheckedColor: "black",
                  style: {
                    backgroundColor: (shipmentStatus === "ACCEPTED") ? COLORS.brand : COLORS.fgrey,
                    borderWidth: 2,
                  },
                  labelStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    width: 500
                  },
                },
                {
                  value: "DELIVERED",
                  label: "Délivrés",
                  checkedColor: "white",
                  uncheckedColor: "black",
                  style: {
                    backgroundColor: (shipmentStatus === "DELIVERED") ? COLORS.brand : COLORS.fgrey,
                    borderWidth: 2,
                  },
                  labelStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    width: 500
                  },
                },
                {
                  value: "REJECTED",
                  label: "Refusés",
                  checkedColor: "white",
                  uncheckedColor: "black",
                  style: {
                    backgroundColor: (shipmentStatus === "REFUSED") ? COLORS.brand : COLORS.fgrey,
                    borderWidth: 2,
                  },
                  labelStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    width: 500
                  },
                },
              ] :
              [
                {
                  value: "DELIVERED",
                  label: "Délivrés",
                  checkedColor: "white",
                  uncheckedColor: "black",
                  style: {
                    backgroundColor: (shipmentStatus === "DELIVERED") ? COLORS.brand : COLORS.fgrey,
                    borderWidth: 2,
                  },
                  labelStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    width: 500
                  },
                },
                {
                  value: "REJECTED",
                  label: "Refusés",
                  checkedColor: "white",
                  uncheckedColor: "black",
                  style: {
                    backgroundColor: (shipmentStatus === "REJECTED") ? COLORS.brand : COLORS.fgrey,
                    borderWidth: 2,
                  },
                  labelStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    width: 500
                  },
                },
              ]
        }
    />

    {loading &&
        <View className="mt-72">
          <ActivityIndicator color={COLORS.brand} size="large"/>
        </View>
    }

    {isEmpty &&
        <View className="mt-72">
          <Text className="text-center font-psemibold text-2xl">
            Vous n'avez aucun voyage.
          </Text>
        </View>}

    {!loading &&
        <FlatList
            data={shipmentList}
            renderItem={(item) => ShippingCard({item})}
            contentContainerStyle={{
              paddingBottom: 10
            }}
        />}

  </DynamicSafeAreaView>)
}
