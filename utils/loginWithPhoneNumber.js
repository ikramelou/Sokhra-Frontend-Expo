import auth from "@react-native-firebase/auth";

export default async function loginWithPhoneNumber(phoneNumber, setConfirm) {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
  setConfirm(confirmation)
}
