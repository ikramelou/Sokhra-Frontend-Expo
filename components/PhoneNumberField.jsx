import PhoneInput from "react-native-international-phone-number";
import React from "react";
import COLORS from "../constants/colors";


export default function PhoneNumberField({nationalNumber, setNationalNumber, countryCode, setCountryCode}) {

  function handleNationalNumber(nationalNumber) {
    setNationalNumber(nationalNumber);
  }

  function handleCountryCode(countryCode) {
    setCountryCode(countryCode);
  }

  return (
      <PhoneInput
          value={nationalNumber}
          onChangePhoneNumber={handleNationalNumber}
          selectedCountry={countryCode}
          onChangeSelectedCountry={handleCountryCode}
          language="fr"
          defaultCountry="MA"
          placeholder=""
          phoneInputStyles={{
            divider: {display: "none"}, flagContainer: {
              backgroundColor: COLORS.fgrey, paddingEnd: 0
            }, container: {
              borderWidth: 0, backgroundColor: COLORS.fgrey, marginBottom: 25
            }, caret: {
              color: COLORS.cgrey, fontSize: 15, marginEnd: 30
            }, callingCode: {
              color: "black", fontSize: 20, fontWeight: "bold"
            }, input: {
              color: "black", fontSize: 20, fontWeight: "bold",
            },
          }}
          modalStyles={{
            modal: {
              backgroundColor: "white",
            }, searchInput: {
              backgroundColor: COLORS.fgrey, borderWidth: 0,
            }, countryButton: {
              borderWidth: 0, borderColor: COLORS.fgrey,
            }
          }}
      />)
}
