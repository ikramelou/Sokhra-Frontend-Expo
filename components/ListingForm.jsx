import {TouchableOpacity, View} from "react-native";
import COLORS from "../constants/colors";
import CityPicker from "./CityPicker";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Divider, Input} from "@rneui/themed";
import dateToString from "../utils/dateToString";
import CustomDatePicker from "./CustomDatePicker";
import intInputHandler from "../utils/intInputHandler";
import React, {useState} from "react";

export default function ListingForm({
                                      setOrigin,
                                      setDestination,
                                      departureDate,
                                      setDepartureDate,
                                      weight,
                                      setWeight,
                                      filterData
                                    }) {
  const [open, setOpen] = useState(false)

  return (<>
    <View className="mx-3 mt-5">
      <View className="flex-row items-center justify-center mb-5">
        <View className="bg-white" style={{borderRadius: 10, width: "80%"}}>
          <CityPicker
              type="modal"
              placeholder="Départ"
              setValue={setOrigin}
              iconName="airplane-takeoff"
              labelField="label"
              valueField="value"
              searchPlaceholder="Cherchez votre ville de départ"
          />

          <Divider color={COLORS.cgrey}/>

          <CityPicker
              placeholder="Destination"
              type="modal"
              setValue={setDestination}
              iconName="airplane-landing"
              labelField="label"
              valueField="value"
              searchPlaceholder="Cherchez votre ville de déstination"
          />
        </View>

        <TouchableOpacity
            style={{
              width: 70, height: 70, justifyContent: "center", alignItems: "center", marginLeft: 10, borderRadius: 10
            }}
            onPress={() => {
              filterData()
            }}>
          <MaterialCommunityIcons
              name="magnify"
              size={70}
              style={{color: "white",}}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mb-2">
        <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{width: "48%"}}
        >
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
            open={open} setDate={setDepartureDate}
            setOpen={setOpen}
        />

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
              backgroundColor: "white", paddingHorizontal: 0, borderRadius: 10, width: "48%"
            }}
            placeholder="Poids (kg)"
            leftIcon={<MaterialCommunityIcons name="weight-kilogram" size={25} color={COLORS.cgrey}/>}
            leftIconContainerStyle={{width: 30, height: 30, marginLeft: 5,}}
        />
      </View>
    </View>
  </>)
}
