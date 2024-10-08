import React, {useState} from 'react';
import defaultCities from "../../constants/defaultCities";
import {View} from "react-native";

const App = () => {
  const [data, setData] = useState(defaultCities)
  const [value, setValue] = useState(null)




  return (


      <View className="items-center justify-center h-full">
        <View className="bg-white" style={{borderRadius: 10, width: "80%"}}>

          {/*<Dropdown*/}
          {/*    // containerStyle={{marginBottom: 150}}*/}

          {/*    value={value}*/}
          {/*    data={data}*/}

          {/*    search*/}


          {/*    searchQuery={() => true}*/}
          {/*    style={{height: 45,}}*/}
          {/*    selectedTextProps={{ellipsizeMode: "tail", numberOfLines: 1}}*/}
          {/*    selectedTextStyle={{fontSize: 20,}}*/}
          {/*    placeholderStyle={{color: COLORS.cgrey, fontSize: 20}}*/}
          {/*/>*/}

        </View>
      </View>
  )
}

export default App;
