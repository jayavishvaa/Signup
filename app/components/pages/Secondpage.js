import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import Axios from 'axios';



export default class Example extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userData: '',
      Sheeba: '',
      final: []
    }
  }

  
  
  componentWillMount() {
    this.registerUser()
  }


  registerUser = async () => {
    const response = Axios.get('https://saarang2021aspirers.herokuapp.com/welcome')
      .then(response => {
        console.log('getting data of mukesh favourite movie', response.data);
        
        this.setState({
          userData: response.data,
        })
    
      })

    const response1 = Axios.get('https://saarang2021aspirers.herokuapp.com/saarang2021')
      .then(response1 => {
        console.log('getting data of sheeba favourite tv series', response1.data);
        
        
        this.setState({
          Sheeba: response1.data,
        })
      })


    const response2 = Axios.get('https://saarang2021aspirers.herokuapp.com/character21')
      .then(response2 => {
        console.log('getting data', response2.data);
        
        this.setState({
          final: response2.data,
        })
      })

      
      

      

  }

  render() {
    if (this.state.final) {
      return (
        <SectionGrid
          itemDimension={90}
          // staticDimension={300}
          // fixed
          // spacing={20}
          sections={[
            {
              title: '                                Ford v Ferrari',
              data: this.state.final.slice(0, 4)
            },
            {
              title: '                                F.R.I.E.N.D.S',
              data: this.state.final.slice(4, 8)
            }
          ]}
          style={styles.gridView}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
        />)
    }
    else {
      return <View> <Text> Receiving data!! </Text> </View>
    }
}
}
const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingTop:20,
    paddingBottom:20,
    height: 150,
    color: '#00ffff',
    backgroundColor: '#008b8b',
    
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
    alignSelf: 'center',
    paddingLeft:10,
  },
  itemDescription: {
    fontWeight: '900',
    fontSize: 12,
    color: '#fff',
    paddingLeft:10,
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    justifyContent:"center",
    color: 'white',
    padding: 10,
    
  }
});
