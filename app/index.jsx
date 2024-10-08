import {getItem} from "../utils/asyncStorage";
import {useEffect, useState} from "react";
import {Redirect, SplashScreen} from "expo-router";
import auth from "@react-native-firebase/auth";
import sendAuthenticatedRequest from "../utils/sendAuthenticatedRequest";
import homeProfileStore from "../store/homeProfileStore";
import {useFonts} from "expo-font";

// SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })
  return <Redirect href="tripReservations"/>
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const setUserHomeProfile = homeProfileStore().setUserHomeProfile


  async function getProfileForHome() {
    const response = await sendAuthenticatedRequest("get", "/user/profile/home")
    setUserHomeProfile(response.profile)
  }

  async function checkIfLoggedIn() {

    if ((await getItem("isLoggedIn")) != null) {
      setIsLoggedIn(true)
      await getProfileForHome()
      return
    }

    // check if user is only logged in firebase
    //  this check is for when a new user successfully login but doesn't complete registration
    if ((await auth().currentUser) != null) {
      await auth().signOut()
    }
    setIsLoggedIn(false)
  }

  useEffect(() => {
        async function prepare() {
          await checkIfLoggedIn()
          setAppIsReady(true)
        }

        prepare()
      }, [loaded]
  )

  if (!appIsReady) {
    return null;
  }

  if (isLoggedIn != null && appIsReady) {
    SplashScreen.hideAsync()
    return (
        <Redirect href={isLoggedIn ? "/home" : "/login"}/>
    )
  }

}
