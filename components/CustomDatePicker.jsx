import {Alert} from "react-native";
import DatePicker from "react-native-date-picker";
import React from "react";

export default function CustomDatePicker({open, setOpen, date, setDate}) {
  const yesterdayDate = new Date()
  yesterdayDate.setHours(0, 0, 0, 0)
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  return (
      <DatePicker
          title="Selectionner une date"
          confirmText="Confirmer"
          cancelText="Annuler"
          mode="date"
          minimumDate={new Date()}
          maximumDate={new Date("2030-12-31")}
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            if (date < yesterdayDate) return Alert.alert("La date sélectionnée est inférieure à celle d'aujourd'hui")
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
      />
  )
}
