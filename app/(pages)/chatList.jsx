import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import DynamicSafeAreaView from "../../components/DynamicSafeAreaView";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {router} from "expo-router";

export default function ChatList() {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const unsubscribe = firebase.firestore()
        .collection('conversations')
        .where('users', 'array-contains', user.uid)
        .onSnapshot(querySnapshot => {
          const conversations = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setConversations(conversations)
        })

    return () => unsubscribe();
  }, []);

  return (
      <DynamicSafeAreaView className="h-full bg-white">
        <TouchableOpacity
            onPress={() => {
              router.navigate("/home")
            }}
            style={{
              backgroundColor: COLORS.fgrey,
              borderRadius: 20,
              width: 40,
              height: 40,
              marginLeft: 15,
              justifyContent: "center",
              marginBottom: 5
            }}>
          <Ionicons
              name="chevron-back"
              style={{
                fontSize: 35, color: COLORS.cgrey
              }}
          />
        </TouchableOpacity>


        <View style={{flex: 1, padding: 16}}>
          <FlatList
              data={conversations}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                  <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', {conversationId: item.id})}>
                    <Text>{item.id}</Text>
                  </TouchableOpacity>
              )}
          />
        </View>
      </DynamicSafeAreaView>
  );
}
