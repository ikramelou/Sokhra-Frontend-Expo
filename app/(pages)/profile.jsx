import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import {ActivityIndicator, FlatList, StatusBar, Text, TouchableOpacity, View} from "react-native";
import COLORS from "../../constants/colors";
import {router, useLocalSearchParams} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import {Avatar} from "@rneui/themed";
import {Rating} from "@kolking/react-native-rating";
import sendAuthenticatedRequest from "../../utils/sendAuthenticatedRequest";
import domainName from "../../constants/domainName";
import ReviewCard from "../../components/ReviewCard";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const {userID} = useLocalSearchParams()

  async function fetchUserProfile() {
    const response = await sendAuthenticatedRequest("get", "/user/profile", null, false, false, {id: userID})
    setUserData(response.profile)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (<DynamicSafeAreaView className="h-full bg-white">
    {loading &&
        <View className="h-full items-center justify-center">
          <ActivityIndicator color={COLORS.brand} size="large"/>
        </View>
    }

    {!loading &&
        <>
          <StatusBar backgroundColor={COLORS.brand} barStyle="default"/>
          <View className="bg-brand h-[200]">
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
                {capitalizeFirstLetter(userData.firstName)}
              </Text>

              {userID == null &&
                  <Text className="font-pmedium text-lg text-cgrey bg-white rounded-xl p-1 absolute right-0 mr-[15]">
                    Modifier
                  </Text>}
            </View>

            <View className="items-center mb-4">
              <Avatar
                  size={100}
                  rounded
                  source={{uri: `${domainName}/user/profile/image/${userData.id}`}}
              />
            </View>

            <View className="items-center flex-row justify-center">
              <Text className="font-pmedium text-lg text-fgrey absolute left-8">
                {userData.shipmentsCount} Expéditions
              </Text>

              <Text className="font-pmedium text-lg text-fgrey">
                |
              </Text>
              <Text className="font-pmedium text-lg text-fgrey absolute right-8">
                {userData.tripsCount} Voyages
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mx-3 mb-2">
            <View className="flex-row items-end mt-5 mb-2">
              <Text className="font-pbold text-lg text-cgrey">
                Reviews&nbsp;
              </Text>

              <Text className="font-pbold text-2xl ">
                {userData.rating.numberOfRatings}
              </Text>
            </View>

            <Rating
                rating={userData.rating.ratingValue}
                size={24}
                scale={1}
                spacing={3}
                disabled={true}
                baseColor={COLORS.cgrey}
                style={{marginTop: 6}}
            />
          </View>

          <FlatList
              data={userData.ratings}
              renderItem={(item) => ReviewCard(item)}
              contentContainerStyle={{
                paddingBottom: 10
              }}
          />
        </>}
  </DynamicSafeAreaView>)
}
