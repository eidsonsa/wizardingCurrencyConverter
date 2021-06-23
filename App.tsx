/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   KeyboardAvoidingView,
   TextInput
 } from 'react-native';

 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';


 const App = () => {

  const [galleons, setGalleons] = React.useState(0);
  const [sickles, setSickles] = React.useState(galleons / 17);
  const [knuts, setKnuts] = React.useState(sickles / 29);

  const setValue = function(val: string){
    setGalleons(+val);
    setSickles(+val / 17);
    setKnuts(+val / 29);
  }

   return (
     <SafeAreaView>
      <Text> Wizarding Currency Converter</Text>
      <KeyboardAvoidingView>
        <TextInput 
        style = {styles.input} 
        value = {galleons.toString()}
        onChangeText = {setValue} 
        placeholder = "Galleons"
        />
      </KeyboardAvoidingView>
      <View>
        <Text> {sickles} </Text>
        <Text> {knuts} </Text>
      </View>
     </SafeAreaView>
   )

 };

 const styles = StyleSheet.create({
   input: {

   },
 });

 export default App;
