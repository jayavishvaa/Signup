import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Regform from './app/components/Regform';
import Secondpage from './app/components/pages/Secondpage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';




const stack = createStackNavigator();

export default class App extends React.Component {
  render()
   {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen name="Home" component={Regform} />
            <stack.Screen name="Secondpage" component={Secondpage} />
          </stack.Navigator>


        </NavigationContainer>
      </View>
           );
   }       
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    
    
  },
});
