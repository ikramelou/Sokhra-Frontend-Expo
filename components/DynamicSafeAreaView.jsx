import {Platform, SafeAreaView, StatusBar} from "react-native";

export default function DynamicSafeAreaView({children, style}) {

  return (<SafeAreaView
      style={[style, {paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,}]}>
    {children}
  </SafeAreaView>)
}
