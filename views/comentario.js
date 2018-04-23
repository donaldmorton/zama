import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,StatusBar,TouchableWithoutFeedback,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
const dismissKeyboard = require('dismissKeyboard')
import api from '../api'

module.exports = class Comentarios extends Component{
   constructor(props) {
      super(props)
      this.state={
        text:''
      }
   }

   componentDidMount(){
      AsyncStorage.setItem(this.props.encuesta._id,'true',function(err,data) {

      })
   }


   navSecond(){
      var self=this;
      console.log('ENTRO TRACK');
      AsyncStorage.getItem('plaza',function(err,plaza){
         self.setState({plaza:plaza})
         console.log(self.state.plaza);
         AsyncStorage.getItem('distrito',function(err,distrito){
            self.setState({distrito:distrito})
            console.log(self.state.distrito);
            AsyncStorage.getItem('puesto',function(err,puesto) {
               console.log('ENTRO ITEM',puesto);
               api.comment('encuestas',{
                  e:self.props.encuesta.name,
                  puesto:puesto.toLowerCase(),
                  iid:self.props.encuesta.id_interno,
                  r:self.state.text,
                  plaza:self.state.plaza,
                  distrito:self.state.distrito,
               });
               self.props.navigator.push({
                  id: 'home',
                  puesto:puesto,
                  distrito:self.state.distrito,
                  plaza:self.state.plaza,
               });
            })
         })
      })
   }

   navFirst(){
      this.props.navigator.push({
         id: 'home'
      })
   }

   render(){
      return(
         <Navigator renderScene={(route, navigator) =>
            <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
            <View style={{flex:10,flexDirection:'column'}}>
              <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1,flexDirection:'row',justifyContent:'center'}}></LinearGradient>
              <LinearGradient colors={['#ffc34d','#ffdd99']} style={{flex:9}}>
                <View style={{flex:10,flexDirection:'column'}}>
                <View style={{backgroundColor:'#FFFFFF',margin:15,borderRadius:4,flex:9,elevation:3}}>
                  <View style={{flex:10,flexDirection:'column'}}>
                    <View style={{flex:2,backgroundColor:'transparent'}}>
                      <Text style={{color:'#FFC34D',textAlign:'center',fontSize:24,marginTop:15,fontWeight:'bold'}}>Comentarios adicionales:</Text>
                    </View>
                    <View style={{backgroundColor:'#e6e6e6',marginLeft:12,marginRight:12,marginBottom:15,flex:8}}>
                      <TextInput
                        style={{backgroundColor:'transparent',flex:1,textAlignVertical:'top'}}
                        multiline = {true}
                        placeholder={'Escribe aquí...'}
                        onChangeText={(text) => this.setState({text:text})}
                        value={this.state.text}
                      />
                    </View>
                  </View>
                </View>
                <View style={{margin:15,padding:5,borderRadius:10,backgroundColor:'#f22a2a'}}>
                <TouchableOpacity onPress={()=>{this.navSecond(1)}}style={{borderWidth:0,borderColor:'#f45757',borderRadius:10,alignItems:'center'}}>
                   <Text style={{color:'#FFFFFF',fontSize:26,fontWeight:'bold',borderRadius:10}}>Finalizar</Text>
                </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'transparent',flex:1,alignItems:'center'}}>
                </View>
                </View>
              </LinearGradient>
             </View>
             </TouchableWithoutFeedback>
           }
         />
      )
   }
}
