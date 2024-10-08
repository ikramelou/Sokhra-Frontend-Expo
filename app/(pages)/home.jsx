import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import {Avatar, Badge, Divider, Icon} from "@rneui/themed";
import COLORS from "../../constants/colors";
import {LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View} from "react-native";
import {useState} from "react";
import {router} from "expo-router";
import homeProfileStore from "../../store/homeProfileStore";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import domainName from "../../constants/domainName";
import logout from "../../utils/logout";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Home() {
  const [expanded, setExpanded] = useState(false)
  const userHomeProfile = homeProfileStore().userHomeProfile
  const toggleHeight = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  return (<DynamicSafeAreaView className="h-full bg-white">
        <View className="absolute top-[70] left-0 right-0 justify-center items-center">
          <View
              className="px-5 rounded-3xl py-6 bg-fgrey z-[1] w-[80%]"
              style={{
                height: (expanded) ? 310 : ""
              }}
          >

            <View className=" flex-row items-center justify-between">
              <Icon
                  ressableProps={{backgroundColor: "transparent"}}
                  name={expanded ? "x" : "menu"}
                  type="feather"
                  color={COLORS.cgrey}
                  containerStyle={{alignContent: "flex-start", activeOpacity: 1}}
                  onPress={toggleHeight}
              />

              <TouchableOpacity
                  onPress={() => {
                    setExpanded(false)
                    router.push("/profile")
                  }}>

                <View className="flex-row items-center">
                  <Avatar
                      size={45}
                      rounded
                      source={{uri: `${domainName}/user/profile/image/${userHomeProfile.id}`}}
                      containerStyle={{marginRight: 10}}
                  />

                  <View className="flex-col justify-evenly">
                    <Text className="text-xs font-pbold">
                      Bonjour
                    </Text>

                    <Text className="text-lg font-pbold">
                      {capitalizeFirstLetter((userHomeProfile.firstName))}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View className="flex-row items-center">
                <Icon
                    name="chat"
                    type="material-community"
                    color={COLORS.cgrey}
                    containerStyle={{alignSelf: "center"}}
                    size={30}
                    onPress={() => router.navigate("/chatList")}
                />

                <Badge
                    value={1}
                    badgeStyle={{
                      backgroundColor: COLORS.nred, opacity: (1 === 0) ? 0 : 1, marginBottom: 10, marginLeft: -10
                    }}/>
              </View>
            </View>

            {expanded &&
                <>
                  <Divider
                      color={COLORS.cgrey}
                      style={{marginTop: 10}}
                  />

                  <TouchableOpacity
                      style={{marginVertical: 10}}
                      onPress={() => console.log(1)}
                  >

                    <View className="flex-row items-center ">
                      <Icon
                          name="package-variant-closed"
                          type="material-community"
                          color={COLORS.cgrey}
                          size={35}
                          containerStyle={{marginRight: 10}}
                      />

                      <Text className="text-2xl font-pmedium text-black">
                        Mes expéditions
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={{marginVertical: 10}}
                      onPress={() => router.navigate("myTrips")}
                  >
                    <View className="flex-row items-center ">
                      <Icon
                          name="bag-suitcase-outline"
                          type="material-community"
                          color={COLORS.cgrey}
                          size={35}
                          containerStyle={{marginRight: 10}}
                      />
                      <Text className="text-2xl font-pmedium text-black">
                        Mes voyages
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={{marginVertical: 10}}
                      onPress={() => {
                        setExpanded(false)
                        router.push("/profile")
                      }}>
                    <View className="flex-row items-center">
                      <Icon
                          name="account-outline"
                          type="material-community"
                          color={COLORS.cgrey}
                          size={35}
                          containerStyle={{marginRight: 10}}
                      />
                      <Text className="text-2xl font-pmedium text-black">
                        Mon profil
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={{marginVertical: 10}}
                      onPress={() => logout()}
                  >
                    <View className="flex-row items-center">
                      <Icon
                          name="logout"
                          type="material"
                          color={COLORS.nred}
                          size={35}
                          containerStyle={{marginRight: 10}}
                      />
                      <Text className="text-2xl font-pmedium text-nred">
                        Se déconnecter
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>}
          </View>
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="font-psemibold text-center text-xl mt-8">
            Vous souhaitez?
          </Text>
          <Text className="font-pextrabold text-center text-xl mt-12 mb-5">
            Chercher un voyage
          </Text>

          <Icon
              size={100}
              name="search-outline"
              type="ionicon"
              color="white"
              onPress={() => router.navigate("listings")}
              containerStyle={{backgroundColor: COLORS.brand, padding: 10, alignSelf: "center", borderRadius: 20}}
          />

          <View className="flex-row items-center m-[50]">
            <Divider
                style={{flex: 1,}}
                color={COLORS.cgrey}
                width={1.5}
            />

            <Text className="mx-4 font-psemibold leading-5">
              OU
            </Text>

            <Divider
                style={{flex: 1}}
                color={COLORS.cgrey}
                width={1.5}
            />
          </View>

          <Icon
              size={100}
              name="add"
              type="ionicon"
              color="white"
              onPress={() => router.navigate("addListing")}
              containerStyle={{backgroundColor: COLORS.brand, padding: 10, alignSelf: "center", borderRadius: 20}}
          />

          <Text className="font-pextrabold text-center text-xl mt-5">
            Publier une annonce
          </Text>
        </View>
      </DynamicSafeAreaView>
  )
}
