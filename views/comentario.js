import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

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
      AsyncStorage.setItem(this.props.encuesta.name,'true',function(err,data) {
         console.log(err,'error set key');
         if(!err){
            this.props.navigator.push({
               id: 'home',
               encuesta:this.props.encuesta.categoria_encuestas[0]
            })
         }
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
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                      />
                    </View>
                  </View>
                </View>
                <View style={{backgroundColor:'transparent',flex:1,alignItems:'center'}}>
                </View>
                </View>
              </LinearGradient>
             </View>
           }
         />
      )
   }
}
