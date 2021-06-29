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
   StyleSheet,
   Text,
   View,
   KeyboardAvoidingView,
   TextInput,
   Modal,
   TouchableOpacity,
   SectionList,
   SafeAreaView,
   Appearance
 } from 'react-native';

 import AsyncStorage from '@react-native-community/async-storage'

 const isDarkMode = Appearance.getColorScheme() === 'dark';

 const App = () => {


  const STORAGE_KEY = '@save_galleons'

  const [galleons, setGalleons] = React.useState(0);

  const [itemId, setItemId] = React.useState("")
  const [itemConversion, setItemConversion] = React.useState("")
  const [modalVisible, setModalVisible] = React.useState(false)

  const openModal = (id: string, conversion: string) => {
    setItemId(id);
    setItemConversion(conversion);
    setModalVisible(true)
  }
 
  const Item = (item: {id: string, val: string, title: string, conversion: string}) => (
 
   <TouchableOpacity onPress = {() => openModal(item.id, item.conversion)}>
   <View style={styles.itemList}>
     <Text style={styles.itemText}>{item.val} {item.title}</Text>
   </View>
   </TouchableOpacity>
 );

  const DATA = [
    {
      title: 'Wizard',
      data: [
        {
          id: 'GAL',
          val: galleons.toFixed(2),
          title: 'galleon',
          ...(galleons != 1 && {title: 'galleons'}),
          conversion: '1 GAL = 1 GAL'
        },
        {
          id: 'SIC',
          val: (galleons / 17).toFixed(2),
          title: 'sickle',
          ...(+(galleons / 17).toFixed(2) != 1 && {title: 'sickles'}),
          conversion: '1 SIC = 17 GAL'
        },
        {
          id: 'KNU',
          val: (galleons / 493).toFixed(2),
          title: 'knut',
          ...(+(galleons / 493).toFixed(2) != 1 && {title: 'knuts'}),
          conversion: '1 KNU = 493 GAL'
        },
      ]
    },
    {
      title: 'Muggle',
      data: [
        {
          id: 'USD',
          val: (galleons * 6.64).toFixed(2),
          title: 'USD',
          conversion: '1 GAL = 6.64 USD'
        },
        {
          id: 'EUR',
          val: (galleons * 5.58).toFixed(2),
          title: 'EUR',
          conversion: '1 GAL = 5.58 EUR'
        },
        {
          id: 'BRL',
          val: (galleons * 21.64).toFixed(2),
          title: 'BRL',
          conversion: '1 GAL = 21.64 BRL'
        }
      ]
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
    readData();
  }, []);

  useEffect(() => {
    saveData();
  })

  const setValue = function(val: string){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    val = val.match(rgx)?.toString()!;
    setGalleons(+val);
  };
  

   return (
     <SafeAreaView style={styles.container}>

      <Modal
      visible = {modalVisible}
      onRequestClose = {() => {
        setModalVisible(false)
      }}
      animationType="slide" 
      >
        <View style={styles.modalContainer}>
        <Text style={styles.modalHeader}> {itemId} </Text>
        <Text style={styles.modalText}> {itemConversion} </Text>
        </View>
      </Modal>

      <Text style={styles.title}> Wizarding Currency Converter</Text>
      <KeyboardAvoidingView>
        <Text style={styles.galleons}> Galleons: </Text>
        <TextInput 
        style = {styles.input} 
        keyboardType = 'numeric'
        onChangeText = {setValue} 
        />
      </KeyboardAvoidingView>
      <View>
        <Text style={styles.listHeader}> Converted Currency: </Text>
        <View>
          <SectionList 
          sections = {DATA}
          keyExtractor = {item => item.id}
          renderItem={({ item }) => Item(item)}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          />
        </View>
      </View>
     </SafeAreaView>
   )

 };

 const COLORS = {
  containerBackground: '#cfc2a9',
  ...(isDarkMode  && {containerBackground: '#000'}),
  containerText: '#000',
  ...(isDarkMode && {containerText: '#cdbfa4'}),
  itemBackground: '#a48b5a',
  ...(isDarkMode && {itemBackground: '#121212'}),
  itemText: '#000',
  ...(isDarkMode && {itemText: '#cdbfa4'}),
  sectionBackground: '#55482f',
  ...(isDarkMode && {sectionBackground: '#282828'}),
  sectionText: '#cfc2a9',
  ...(isDarkMode && {sectionText: '#cfc2a9'}),
  modalBackground: '#4c442c',
  ...(isDarkMode && {modalBackground : '#121212'}),
  modalText: '#cdbfa4',
  ...(isDarkMode && {modalText : '#cfc2a9'})

 }

 const styles = StyleSheet.create({
   
   container: {
     backgroundColor: COLORS.containerBackground,
     height: '100%',
     width: '100%',
   },
   title: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    marginBottom: 20,
    color: COLORS.containerText
   },
   galleons: {
     fontSize: 18,
     textAlign: 'center',
     marginBottom: 10,
     color: COLORS.containerText
   },
   input: {
     fontSize: 16,
     borderRadius: 10,
     marginHorizontal: 10,
     borderWidth: 1,
     padding: 10,
     backgroundColor: COLORS.itemBackground,
     color: COLORS.itemText
   },
   sectionHeader: {
    backgroundColor: COLORS.sectionBackground,
    color: COLORS.sectionText,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'center',
   },
   listHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.containerText
   },
   itemList: {
     backgroundColor: COLORS.itemBackground,
     marginVertical: 5,
     marginHorizontal: 10,
     padding: 10,
     borderRadius: 10,
     borderWidth: 1,
   },
   itemText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.itemText,
   },
   modalContainer: {
     backgroundColor: COLORS.modalBackground,
     height: '100%',
     alignItems: 'center',
     justifyContent: 'center'
   },
   modalHeader: {
    color: COLORS.modalText,
    fontSize: 30
   },
   modalText: {
     color: COLORS.modalText,
     fontSize: 18
   }
 });

 export default App;
