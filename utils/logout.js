import {removeItem} from "./asyncStorage";
import auth from "@react-native-firebase/auth";
import {router} from "expo-router";

export default async function logout() {
  await removeItem("isLoggedIn")
  await auth().signOut()
  while (router.canGoBack()) {
    router.back()
  }
  router.replace("/login")
}
