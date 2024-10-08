import {View} from "react-native";
import {Card, Skeleton} from "@rneui/themed";
import COLORS from "../constants/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";

export default function SkeletonTravelCard() {
  return (
      <View className="w-full">
        <Card
            containerStyle={{
              borderRadius: 10, borderWidth: 1, borderColor: COLORS.cgrey, padding: 8, marginHorizontal: 12,
            }}
        >

          <View className="flex-row items-center justify-between mb-3">
            <Skeleton
                style={{width: "40%", height: 15}}
                LinearGradientComponent={LinearGradient}
                animation="wave"

            />

            <MaterialCommunityIcons
                style={{width: "10%"}}
                name="arrow-right-thin"
                size={40}
                color={COLORS.cgrey}
            />

            <Skeleton
                style={{width: "40%", height: 15}}
                name="arrow-right-thin"
                size={40}
            />
          </View>

          <View className="flex-row mb-3 justify-start">
            <Skeleton
                width="50%"
                height={12}
                animation="wave"
                LinearGradientComponent={LinearGradient}
            />
          </View>

          <View className="flex-row items-center justify-between mb-[22]">
            <Skeleton
                width="40%"
                height={12}
                animation="wave"
                LinearGradientComponent={LinearGradient}
            />

            <Skeleton
                width="30%"
                height={12}
                animation="wave"
                LinearGradientComponent={LinearGradient}
            />
          </View>

          <Card.Divider
              color={COLORS.cgrey}
              width={1}
              style={{marginBottom: 10}}
          />

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Skeleton
                  width={35}
                  height={35}
                  circle={true}
                  animation="wave"
                  LinearGradientComponent={LinearGradient}
              />

              <View className="flex-col ml-4">
                <Skeleton
                    width={80}
                    height={15}
                    animation="wave"
                    LinearGradientComponent={LinearGradient}
                    style={{marginBottom: 8}}
                />

                <Skeleton
                    width={120}
                    height={15}
                    animation="wave"
                    LinearGradientComponent={LinearGradient}
                />
              </View>
            </View>

            <Skeleton
                width={80}
                height={30}
                animation="wave"
                LinearGradientComponent={LinearGradient}
            />
          </View>
        </Card>
      </View>)
}
