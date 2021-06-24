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

 const Item = (item: {val: number, title: string}) => (
  <View style={styles.itemList}>
    <Text style={styles.itemText}>{item.val} {item.title}</Text>
  </View>
);

 const App = () => {

  const STORAGE_KEY = '@save_galleons'

  const [galleons, setGalleons] = React.useState(0);

  const DATA = [
    {
      id: 'GAL',
      val: galleons.toFixed(2),
      ...(galleons == 1 && {title: 'galleon'}),
      ...(galleons != 1 && {title: 'galleons'})
    },
    {
      id: 'SIC',
      val: (galleons / 17).toFixed(2),
      ...((galleons / 17) == 1 && {title: 'sickle'}),
      ...((galleons / 17) != 1 && {title: 'sickles'})
    },
    {
      id: 'KNU',
      val: (galleons / 493).toFixed(2),
      ...((galleons / 493) == 1 && {title: 'knut'}),
      ...((galleons / 493) != 1 && {title: 'knuts'})
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
    val = val.replace(/[^0-9]/g, '')
    setGalleons(+val);
    saveData();
  }; 

   return (
     <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Wizarding Currency Converter</Text>
      <KeyboardAvoidingView>
        <Text style={styles.galleons}> Galleons: </Text>
        <TextInput 
        style = {styles.input} 
        value = {galleons.toString()}
        keyboardType = 'numeric'
        onChangeText = {setValue} 
        />
      </KeyboardAvoidingView>
      <View style={styles.listView}>
        <Text style={styles.listHeader}> Converted Currency: </Text>
        <FlatList 
        data = {DATA}
        keyExtractor = {item => item.id}
        renderItem={({ item }) => Item(item)}
        />
      </View>
     </SafeAreaView>
   )

 };

 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#cfc2a9',
     height: '100%',
     width: '100%',

   },
   title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
   },
   galleons: {
     fontSize: 16,
     textAlign: 'center',
     marginBottom: 10
   },
   input: {
     fontSize: 16,
     borderRadius: 10,
     marginHorizontal: 10,
     borderWidth: 1,
     padding: 10,
     backgroundColor: '#a48b5a',
     color: '#000'
   },
   listView: {
    
   },
   listHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10
   },
   itemList: {
     backgroundColor: '#a48b5a',
     color: '#000',
     marginVertical: 5,
     marginHorizontal: 10,
     padding: 10,
     borderRadius: 10,
     borderWidth: 1,
   },
   itemText: {
    fontSize: 16,
    textAlign: 'center',
   }
 });

 export default App;
