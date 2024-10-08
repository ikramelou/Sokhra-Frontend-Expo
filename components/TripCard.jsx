import COLORS from "../constants/colors";
import {Text, View} from "react-native";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {Button, Card} from "@rneui/themed";
import React from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import {router} from "expo-router";

export default function TripCard({item}) {
  return (<Card containerStyle={{
        borderRadius: 10, borderWidth: 1, borderColor: COLORS.cgrey, padding: 8, marginHorizontal: 12,
      }}>

        <View className="flex-row items-center justify-between mb-3">
          <Text
              className="font-pbold text-xl text-black w-[40%]"
              numberOfLines={1}
              ellipsizeMode="tail"
          >
            {capitalizeFirstLetter(item.origin.city)}
          </Text>

          <MaterialCommunityIcons
              style={{width: "10%"}}
              name="arrow-right-thin"
              size={40}
              color={COLORS.cgrey}
          />

          <Text
              className="font-pbold text-xl text-black text-right w-[40%]"
              numberOfLines={1}
              ellipsizeMode="tail"
          >
            {capitalizeFirstLetter(item.destination.city)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row">
            <MaterialCommunityIcons
                name="calendar-import"
                size={15}
                color={COLORS.cgrey}
            />

            <Text className="font-psemibold text-black text-xs">
              &nbsp;Départ le {item.departureDate}
            </Text>
          </View>

          <View className="flex-row">
            <Entypo
                name="price-tag"
                size={15}
                color={COLORS.cgrey}
            />

            <Text className="font-psemibold text-black text-xs">
              &nbsp;{item.price} DH/KG
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-row">
            <MaterialCommunityIcons
                name="weight"
                size={15}
                color={COLORS.cgrey}
            />

            <Text className="font-psemibold text-black text-xs">
              &nbsp;Poids maximal: {item.maxWeight}kg
            </Text>
          </View>

          <View className="flex-row">
            <MaterialCommunityIcons
                name="weight"
                size={15}
                color={COLORS.cgrey}
            />

            <Text className="font-psemibold text-black text-xs">
              &nbsp;Poids restant: {item.availableWeight}kg
            </Text>
          </View>
        </View>

        <Button
            color={COLORS.brand}
            radius="lg"
            title="Consulter les réservations"
            onPress={() =>
                router.navigate({
                  pathname: "/tripReservations",
                  params: {tripId: item.id, tripStatus: (item.status === "ACTIVE") ? "PENDING" : "DELIVERED"}
                })}
        />
      </Card>
  )
}
