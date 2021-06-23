/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   KeyboardAvoidingView,
   TextInput,
   FlatList,
 } from 'react-native';

 import AsyncStorage from '@react-native-community/async-storage'

 const Item = (val: number) => (
  <View>
    <Text>{val}</Text>
  </View>
);

 const App = () => {

  const STORAGE_KEY = '@save_galleons'

  const [galleons, setGalleons] = React.useState(0);
  const [sickles, setSickles] = React.useState(galleons / 17);
  const [knuts, setKnuts] = React.useState(sickles / 29);

  const DATA = [
    {
      id: 'GAL',
      val: galleons,
      title: 'galleons',
    },
    {
      id: 'SIC',
      val: galleons / 17,
      title: 'sickles'
    },
    {
      id: 'KNU',
      val: galleons / 493,
      title: 'knuts'
    }
  ]

  const saveData = async () => {
    try{
      await AsyncStorage.setItem(STORAGE_KEY, galleons.toString())
    } catch (e) {
      console.log("fail saving")
    }
  };

  const readData = async () => {
    try {
      const userGalleons = await AsyncStorage.getItem(STORAGE_KEY);

      if (userGalleons){
        setValue(userGalleons);
      }
    } catch(e){
      console.log("fail reading");
    }
  };

  useEffect(() => {
    readData()
  }, []);

  const setValue = function(val: string){
    setGalleons(+val);
    setSickles(+val / 17);
    setKnuts(+val / 29);
    saveData();
  }; 

   return (
     <SafeAreaView>
      <Text> Wizarding Currency Converter</Text>
      <KeyboardAvoidingView>
        <Text> Galleons: </Text>
        <TextInput 
        style = {styles.input} 
        value = {galleons.toString()}
        onChangeText = {setValue} 
        />
      </KeyboardAvoidingView>
      <FlatList 
      data = {DATA}
      keyExtractor = {item => item.id}
      renderItem={({ item }) => <Text>{item.val} {item.title}</Text>}
      />
     </SafeAreaView>
   )

 };

 const styles = StyleSheet.create({
   input: {

   },
 });

 export default App;
