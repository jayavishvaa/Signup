import React, { Component } from 'react';
import { View, Text, StyleSheet, Button ,KeyboardAvoidingView, TextInput} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { validateAll } from 'indicative/validator'
import axios from 'axios';


// create a component
class Register extends Component {

  state={
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
    error:{},
    userAllData:'',
    userData:''
 

  }

  registerUser = async (data) => {
    const rules = {
      name:'required|string',
      email:'required|email',
      password:'required|string|min:6|confirmed'
  }

  const messages = {
      required: (field) => `${field} is required`,
      'email.email': ' The email is required ',
      'password.confirmed': 'The password confimration failed',
      'password.min': 'Password is too short',
  }

  try {
    
    await   validateAll(data, rules, messages)

    const response = await  axios.post('https://react-blog-api.bahdcasts.com/api/auth/register', {
      name: data.name,
      email:data.email,
      password:data.password
  })

  this.setState({
    userData:response.data.data.user,
    userAllData:response.data.data
  })

  this.props.navigation.navigate('Profile', {...this.state.userData, ...this.state.userAllData})
    
    
  }catch(errors){
    const formattedErrors = {}
    console.log('=====', errors.response)

    if(errors.response && errors.response.status === 422){
          formattedErrors['email'] = errors.response.data['email'][0]
          this.setState({
                          error:formattedErrors, 
                    })

                

    }else{
      errors.forEach(error => formattedErrors[error.field] = error.message)

      this.setState({
        error:formattedErrors
      })

    
    }
  
          
  } 
    
 

  }

  

  render() {
 
    console.log('yyyyy',this.state.userData)
    console.log(this.state.error);

    return (
        
      <View style={{padding:15}} >
         
             <View style={{backgroundColor:'black', padding:10, marginBottom:20}}>
             <Text style={{alignSelf:'center', fontSize:25, color:'white'}} >Form Validation Tutorial</Text>
             </View>
              <KeyboardAvoidingView behavior="padding" enabled>
                   <View>
                   <Hoshi
                  label={'name'}
                  style={{marginBottom: 20,}}
                  // this is used as active border color
                  borderColor={'#b76c94'}
                  // active border height
                  borderHeight={3}
                  inputPadding={16}
                  // this is used to set backgroundColor of label mask.
                  // please pass the backgroundColor of your TextInput container.
                  backgroundColor={'#fff'}
                
                  value={this.state.name}
                  onChangeText={(name => this.setState({name,}))}
              />

              {
                this.state.error['name'] && <Text style={{fontSize:25,color:'red', marginBottom:10, paddingLeft:10}} >{this.state.error['name']}</Text>
              }


              <Hoshi
                  label={'email'}
                  style={{marginBottom: 20,}}
                  // this is used as active border color
                  borderColor={'#b76c94'}
                  // active border height
                  borderHeight={3}
                  inputPadding={16}
                  // this is used to set backgroundColor of label mask.
                  // please pass the backgroundColor of your TextInput container.
                  backgroundColor={'#fff'}
                  value={this.state.email}
                  onChangeText={(email => this.setState({email}))}
              />

{
                this.state.error['email'] && <Text style={{fontSize:25,color:'red', marginBottom:10, paddingLeft:10}} >{this.state.error['email']}</Text>
              }

<Hoshi
                  label={'password'}
                  secureTextEntry
                  style={{marginBottom: 20,}}
                  // this is used as active border color
                  borderColor={'#b76c94'}
                  // active border height
                  borderHeight={3}
                  inputPadding={16}
                  // this is used to set backgroundColor of label mask.
                  // please pass the backgroundColor of your TextInput container.
                  backgroundColor={'#fff'}
                  value={this.state.password}
                  onChangeText={(password => this.setState({password}))}
              />

              {
                this.state.error['password'] && <Text style={{fontSize:25,color:'red', marginBottom:10, paddingLeft:10}} >{this.state.error['password']}</Text>
              }

<Hoshi
                  label={'confirm password'}
                  secureTextEntry
                  style={{marginBottom: 50,}}
                  // this is used as active border color
                  borderColor={'#b76c94'}
                  // active border height
                  borderHeight={3}
                  inputPadding={16}
                  // this is used to set backgroundColor of label mask.
                  // please pass the backgroundColor of your TextInput container.
                  backgroundColor={'#fff'}
                  value={this.state.password_confirmation}
                  onChangeText={(password_confirmation => this.setState({password_confirmation}))}
              />
               {
                this.state.error['password_confirmation'] && <Text style={{color:'red', marginBottom:10, fontSize:22, paddingLeft:10}}>{this.state.error['password_confirmation']}</Text>
              }
             

              <View>
                <Button title="Register" onPress={()=> this.registerUser(this.state)}/>
              </View>
                   </View>
                   </KeyboardAvoidingView>
                  
       </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default Register