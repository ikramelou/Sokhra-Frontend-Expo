import {Dropdown} from "react-native-element-dropdown"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import React, {useState} from "react"
import axios from "axios"
import {google_places_api_key} from "../config/apiKeys";
import COLORS from "../constants/colors";
import defaultCities from "../constants/defaultCities";


export default function CityPicker({placeholder, iconName, setValue, searchPlaceholder, type}) {
  const [data, setData] = useState(defaultCities)


  async function searchCity(searchQuery = "") {
    if (searchQuery.length < 3) return
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
      params: {
        input: searchQuery, language: "fr", types: "(cities)", key: google_places_api_key
      }
    })
    await setData(response.data.predictions.map(prediction => ({
      label: prediction.description, value: {
        city: prediction.description.split(", ")[0],
        country: prediction.description.split(", ").reverse()[0]
      }
    })))
  }

  return (
      <Dropdown
          mode={type}
          data={data}
          labelField="label"
          valueField="value"
          onChange={item => {
            setValue(item.value);
          }}
          value={null}
          onChangeText={(searchQuery) => {
            searchCity(searchQuery)
          }}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          search={true}
          searchQuery={() => {
            return true
          }}
          renderLeftIcon={() => (
              <MaterialCommunityIcons name={iconName} size={25} style={{color: COLORS.cgrey, marginHorizontal: 5}}/>)}
          renderRightIcon={() => {
            null
          }}
          autoScroll={false}
          style={{height: 45,}}
          selectedTextProps={{ellipsizeMode: "tail", numberOfLines: 1}}
          selectedTextStyle={{fontSize: 20,}}
          placeholderStyle={{color: COLORS.cgrey, fontSize: 20}}
      />
  )
}
