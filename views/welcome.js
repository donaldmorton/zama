import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import Button from '../button.js'
import api from '../api.js'
import LinearGradient from 'react-native-linear-gradient'

module.exports = class Welcome extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         description:'',
         saludo:''
      }
      AsyncStorage.getItem('puesto',function(err,data) {
         if(data){
            this.props.navigator.push({id:'home'})
         }
      })
   }

   navSecond(){
      this.props.navigator.push({
         id: 'seleccion'
      })
   }

   componentWillMount(){
      var self = this;
      var categorias = {};

      api.intro(function(intro) {
         self.setState({description:intro.intro,saludo:intro.saludo});
      })
   }

   render(){
      return(
         <LinearGradient colors={['#f22a2a','#ed6767']} style={stylesWelcome.container}>
            <Image style={stylesWelcome.description,{width:200,height:100}} source={require('../img/oxxo.png')}/>
               <Text style={[stylesWelcome.description,{fontWeight:'600'}]}>
                  {this.state.saludo}
               </Text>
               <Text style={stylesWelcome.description}>
                  {this.state.description}
               </Text>
               <Button onPress={this.navSecond.bind(this)}style={{paddingRight:10}}>CONTINUAR</Button>
         </LinearGradient>
      )
   }
}

 var stylesWelcome = StyleSheet.create({
   description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'left',
      color: '#f4efef',
      backgroundColor:'transparent'
   },
   select:{
      borderWidth:0,
      width:300,
      marginBottom:150,
      height:50,
      borderRadius:4,
      backgroundColor:'rgba(74, 10, 10, 0.4)',
      alignItems:'center',
      justifyContent:'center'
   },
   container: {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      paddingLeft: 9,
      paddingRight: 5,
      borderRadius: 0,
      alignItems: 'center'
   }
})
