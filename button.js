import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,TouchableOpacity } from 'react-native';

module.exports = class Button extends Component {
   handlePress(e) {
      if (this.props.onPress) {
         this.props.onPress(e);
      }
   }

   render() {
      return (
         <TouchableOpacity onPress={this.handlePress.bind(this)} style={this.props.style}>
            <View style={{width:300,height:50,borderRadius:40,backgroundColor:'#fafafa',alignItems:'center',justifyContent:'center'}}>
               <Text style={{textAlign:'center',color:'#e8644d'}}>{this.props.children}</Text>
            </View>
         </TouchableOpacity>
      );
   }
}
