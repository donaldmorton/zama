import React, { Component } from 'react';
import {TouchableOpacity,View,Text} from 'react-native';

module.exports = class EncuestasBottom extends Component {
  render(){
    return(
      <View style={{bottom:0,backgroundColor:'transparent'}}>
         <View style={{position:'absolute',backgroundColor:'#FFFFFF',elevation:2,height:5,width:1000,borderRadius:4,marginTop:63}}>
           <Text style={{color:'#FFFFFF'}}>component</Text>
         </View>
         <View style={{backgroundColor:'#FFFFFF',elevation:2,height:4,width:1000,borderRadius:4,marginTop:72}}>
           <Text style={{color:'#FFFFFF'}}>component</Text>
         </View>
      </View>
    );
  }
}
