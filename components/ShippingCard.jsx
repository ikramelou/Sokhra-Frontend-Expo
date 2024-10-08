import COLORS from "../constants/colors";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {Avatar, Card} from "@rneui/themed";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import {Rating} from "@kolking/react-native-rating";
import React from "react";
import sendAuthenticatedRequest from "../utils/sendAuthenticatedRequest";
import domainName from "../constants/domainName";

export default function ShippingCard({cardType}) {


  function reject() {
    const response = sendAuthenticatedRequest("put", "/shipment/reject", {shipmentId: item.shipmentId})
    Alert.alert("Réservation refusée avec succès")
  }

  function accept() {
    const response = sendAuthenticatedRequest("put", "/shipment/accept", {shipmentId: item.shipmentId})
    Alert.alert("Réservation acceptée avec succès")
  }

  function deliver() {
    const response = sendAuthenticatedRequest("put", "/shipment/deliver", {shipmentId: item.shipmentId})
    Alert.alert("Marqué comme livré avec succès")
  }

  function cancel() {
    const response = sendAuthenticatedRequest("delete", "/shipment/cancel", {shipmentId: item.shipmentId})
    Alert.alert("Réservation annulée avec succès")
  }

  return (
      <Card containerStyle={{
        borderRadius: 10, borderWidth: 1, borderColor: COLORS.cgrey, padding: 8, marginHorizontal: 12,
      }}>

        <View className="flex-row items-center justify-between mb-3 h-[150] w-full">
          <Avatar
              source={{uri: `${domainName}/shipment/image/${item.id}`}}
              size={150}
          />

          <View className="items-start justify-start h-full w-[60%] mx-4">
            <Text
                className="font-pbold text-4xl mb-5 mt-3"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
              item.title
            </Text>

            <View className="flex-row">
              <Entypo
                  name="price-tag"
                  size={25}
                  color={COLORS.cgrey}
              />

              <Text className="font-psemibold text-2xl mb-3">
                &nbsp;123 DH
              </Text>
            </View>

            <View className="flex-row">
              <MaterialCommunityIcons
                  name="weight"
                  size={25}
                  color={COLORS.cgrey}
              />

              <Text className="font-psemibold text-2xl">
                &nbsp;item.weight
              </Text>
            </View>


          </View>

        </View>

        <Card.Divider
            color={COLORS.cgrey}
            width={1}
            style={{marginBottom: 8}}
        />

        <View className="flex-row justify-between">
          <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                router.push({pathname: "/profile", params: {userID: item.sender.id}})
              }}>
            <Avatar
                source={{uri: `${domainName}/user/profile/image/${item.sender.id}`}}
                size={35}
                rounded={true}
            />

            <View className="flex-col ml-4 h-full">
              <Text className="font-psemibold text-black">
                {capitalizeFirstLetter(item.sender.firstName)}
              </Text>

              <View className="flex-row items-center">
                <Rating
                    rating={item.sender.rating.ratingValue}
                    size={14}
                    scale={1}
                    spacing={3}
                    disabled={true}
                    baseColor={COLORS.cgrey}
                />

                <Text className="text-cgrey text-xs ml-1">
                  ({item.sender.rating.numberOfRatings})
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {(cardType === `T-${items.status}`) &&
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                      reject()
                    }}
                    className="flex-row items-center bg-nred px-3 rounded-3xl h-8 mr-2"
                >

                  <Text className="font-psemibold text-right text-white text-[12px]">
                    Refuser
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                      accept()
                    }}
                    className="flex-row items-center bg-[#1ab438] px-3 rounded-3xl h-8"
                >

                  <Text className="font-psemibold text-right text-white text-[12px]">
                    Accepter
                  </Text>
                </TouchableOpacity>
              </View>
          }
          {(cardType === `S-${items.status}`) &&
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                      cancel()
                    }}
                    className="flex-row items-center bg-nred px-3 rounded-3xl h-8 mr-2"
                >

                  <Text className="font-psemibold text-right text-white text-[12px]">
                    Annuler
                  </Text>
                </TouchableOpacity>
              </View>
          }

          {(cardType === `T-${items.status}`) &&
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                      deliver()
                    }}
                    className="flex-row items-center bg-brand px-3 rounded-3xl h-8"
                >

                  <Text className="font-psemibold text-right text-white text-[12px]">
                    Marquer comme livré
                  </Text>
                </TouchableOpacity>
              </View>
          }
          {(cardType === "DELIVERED") &&
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                      setOpen(true)
                    }}
                    className="flex-row items-center bg-[#ff9500] px-3 rounded-3xl h-8"
                >

                  <Text className="font-psemibold text-right text-white text-[12px]">
                    Donnez votre avis
                  </Text>
                </TouchableOpacity>
              </View>
          }

        </View>
      </Card>
  )
}
