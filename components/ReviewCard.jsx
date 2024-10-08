import COLORS from "../constants/colors";
import {Text, View} from "react-native";
import {Avatar, Card} from "@rneui/themed";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import {Rating} from "@kolking/react-native-rating";
import React from "react";
import domainName from "../constants/domainName";

export default function ReviewCard({item}) {
  return (
      <Card
          containerStyle={{
            borderRadius: 10, borderWidth: 1, borderColor: COLORS.cgrey, padding: 8, marginHorizontal: 12,
          }}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Avatar
                source={{uri: `${domainName}/user/profile/image/${item.caster.id}`}}
                size={35}
                rounded={true}

            />
            <View className="flex-col ml-4 h-full">
              <Text className="font-psemibold text-black ">
                {capitalizeFirstLetter(item.caster.firstName)}
              </Text>

              <View className="flex-row items-center">
                <Rating
                    rating={item.rating}
                    size={14}
                    scale={1}
                    spacing={3}
                    disabled={true}
                    baseColor={COLORS.cgrey}
                />
              </View>
            </View>
          </View>

          <Text className="font-psemibold text-xs text-cgrey self-end">
            {item.createdAt.split("T")[0]}
          </Text>
        </View>

        <Text className="font-pregular mx-[52] mt-2">
          {item.comment}
        </Text>
      </Card>
  )
}
