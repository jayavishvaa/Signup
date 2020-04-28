import * as React from 'react';
import { Text, View, StyleSheet, Button, KeyboardAvoidingView } from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import {validateAll} from 'indicative/validator';
import { ScrollView } from 'react-native-gesture-handler';

export default class Regform extends React.Component {

  state= {
    name:'',
    rollNumber:'',
    contactNumber:'',
    email:'',
    password:'',
    password_confirmation:'',
    error:{},
  }
  
  registerUser =async(data) => {

    const rules = {
      name: 'required|string',
      rollNumber: 'required|string|min:8|max:8',
      contactNumber: 'required|min:10|max:10',
      email: 'required|email|ends_with:@smail.iitm.ac.in',
      password: 'required|string|min:8|confirmed'
    }

    const messages = {

      required: (field) => `${field} is required`,
      'rollNumber.min': 'Invalid RollNumber',
      'rollNumber.max': 'Invalid RollNumber',
      'contactNumber.min': 'Invalid ContactNumber',
      'contactNumber.max': 'Invalid ContactNumber',
      'email.email': 'The Email Syntax is wrong',
      'email.ends_with': 'Smail id only valid',
      'password.min': 'password is too short',
      'password.confirmed': 'The Password did not match'
      
    }


    try{

      await validateAll(data, rules, messages)

      this.props.navigation.navigate('Secondpage')



    }catch(errors){
      
      console.log(errors.response);

      const formattedErrors = {}
      
      if(errors.response && errors.response.status === 422){

        formattedErrors['email']  == errors.response.data['email'][0]

        this.setState({

          error:formattedErrors
          
        })
      }else{

        errors.forEach(error => formattedErrors[error.field] = error.message);

        this.setState({
        error: formattedErrors
      })


      }

        


        

      


    }
  }


  
  
  render() {
        
    
    return (

      <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView>
        
        <Text style={{
          fontSize: 30,
          paddingBottom: 10,
          marginBottom: 40,
          borderBottomColor: '#199187',
          borderBottomWidth: 1,
          marginTop:40,
          alignSelf: 'center',
        }}> Registration </Text>

        
        <Hoshi 
        style={{marginBottom:20}}
        label={"name"} 
        backgroundcolor={"#fff"} 
        bordercolor={'#000000'} 
        borderheight={3} 
        inputpadding={16}
        value={this.state.name} 
        onChangeText={name => this.setState({name})}/>



        {
          this.state.error['name'] && <Text style={{fontSize:20, color:'red'}}> {this.state.error['name']} </Text>
        }
         
      
        
        <Hoshi 
        style={{marginBottom:20}}
        label={"rollNumber"} 
        backgroundcolor={"#fff"} 
        bordercolor={'#000000'} 
        borderheight={3} 
        inputpadding={16}  
        value={this.state.rollNumber} 
        onChangeText={rollNumber => this.setState({rollNumber})}/>

       {
          this.state.error['rollNumber'] && <Text style={{fontSize:20, color:'red'}}>{this.state.error['rollNumber']}</Text>
        }
        
        
        <Hoshi 
        style={{marginBottom:20}}
        label={"contactNumber"} 
        backgroundcolor={"#fff"} 
        bordercolor={'#000000'} 
        borderheight={3} 
        inputpadding={16}  
        value={this.state.contactNumber} 
        onChangeText={contactNumber => this.setState({contactNumber})}/>


        {
          this.state.error['contactNumber'] && <Text style={{fontSize:20,color:'red'}}>{this.state.error['contactNumber']}</Text>
        }

       <Hoshi 
        style={{marginBottom:20}}
        label={"email"} 
        backgroundcolor={"#fff"}
        bordercolor={'#000000'} 
        borderheight={3} 
        inputpadding={16}  
        value={this.state.email} 
        onChangeText={email => this.setState({email})}/>

       {
          this.state.error['email'] && <Text style={{fontSize:20,color:'red'}}>{this.state.error['email']}</Text>
        }
        
        
        <Hoshi 
        style={{marginBottom:20}}
        label={"password"} 
        backgroundcolor={"#fff"} 
        bordercolor={'#000000'} 
        borderheight={3} 
        inputpadding={16}
        secureTextEntry  
        value={this.state.password} 
        onChangeText={password => this.setState({password})}/>

        {
          this.state.error['password'] && <Text style={{fontSize:20,color:'red'}}>{this.state.error['password']}</Text>
        }

       <Hoshi 
        style={{marginBottom:20}}
        label={"confirmPassword"} 
        backgroundcolor= {"#fff"} 
        bordercolor={'#000000'} 
        borderheight={3} 
        inputpadding={16}  
        style ={{marginBottom:20}}
        secureTextEntry  
        value={this.state.password_confirmation} 
        onChangeText={password_confirmation => this.setState({password_confirmation})}/>

        {
          this.state.error['password_confirmation'] && <Text style={{fontSize:20,color:'red'}}>{this.state.error['password_confirmation']}</Text>
        }

        <View>
            <Button title="sign up" onPress={() => this.registerUser(this.state)}/>
        </View>
      
      
        </KeyboardAvoidingView>
      </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 60,
    paddingRight: 60,
    
    
  },
});