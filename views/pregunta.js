import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import EncuestasBottom from '../encuestasBottom'
import api from '../api'

module.exports = class Preguntas extends Component{
   constructor(props) {
      super(props)
   }

   navSecond(value,p){
      var self=this;
      console.log('ENTRO TRACK');
      AsyncStorage.getItem('puesto',function(err,puesto) {
        console.log('ENTRO ITEM',puesto);
         api.track('encuestas',{
            e:self.props.encuesta.name,
            puesto:puesto.toLowerCase(),
            iid:self.props.encuesta.id_interno,
            r:value,
            index:self.props.index,
            pregunta:self.props.encuesta.preguntas[self.props.index].id,
            tipo:self.props.encuesta.preguntas[self.props.index].tipo
         });

         if(self.props.encuesta.preguntas.length>(self.props.index+1)){
            self.props.navigator.push({
               id: 'preguntas',
               encuesta:self.props.encuesta,
               index:self.props.index+1
            });
         }else{
            self.props.navigator.push({
               id: 'comentarios',
               encuesta:self.props.encuesta
            });
         }
      })
   }

   tipoPregunta(){
      if(this.props.encuesta.preguntas[this.props.index].tipo=='1'){
         return(
            <View>
            <View style={{backgroundColor:'#d80e0e',marginTop:20}}>
            <TouchableOpacity onPress={()=>{this.navSecond(1)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Muy de acuerdo</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#d80e0e'}}>
            <TouchableOpacity onPress={()=>{this.navSecond(2)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>De acuerdo</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#d80e0e'}}>
            <TouchableOpacity onPress={()=>{this.navSecond(3)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>En desacuerdo</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#d80e0e'}}>
            <TouchableOpacity onPress={()=>{this.navSecond(4)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Muy desacuerdo</Text>
            </TouchableOpacity>
            </View>
            </View>
         )
      }else{
         return(
         <View>
         <View style={{backgroundColor:'#d80e0e',marginTop:20}}>
         <TouchableOpacity onPress={()=>{this.navSecond(1)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
         <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Verdadero</Text>
         </TouchableOpacity>
         </View>
         <View style={{backgroundColor:'#d80e0e'}}>
         <TouchableOpacity onPress={()=>{this.navSecond(0)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
         <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Falso</Text>
         </TouchableOpacity>
         </View>
         </View>)
      }
   }

   render(){
      return(
         <Navigator renderScene={(route, navigator) =>
           <View style={{flex:10,flexDirection:'column'}}>
           <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1,justifyContent:'center'}}>
           </LinearGradient>
              <LinearGradient colors={['#ffc34d','#ffdd99']} style={{flex:9}}>
                <View style={{flex:10,flexDirection:'column'}}>
                <View style={{backgroundColor:'#FFFFFF',margin:15,borderRadius:4,flex:9,elevation:3}}>
                  <Text style={{color:'#FFC34D',textAlign:'center',fontSize:24,marginTop:15,fontWeight:'bold'}}>{this.props.encuesta.preguntas[this.props.index].bloque}:</Text>
                  <Text style={{padding:5,fontSize:16,color:'#000000',textAlign:'center',marginTop:23,marginBottom:15}}>{this.props.index+1}. {this.props.encuesta.preguntas[this.props.index].texto}</Text>
                  {this.tipoPregunta()}
                </View>
                <View style={{backgroundColor:'transparent',flex:1,alignItems:'center'}}>
                  <Text style={{color:'#FFFFFF',textAlign:'center',fontWeight:'bold',fontSize:22}}>{this.props.index+1}/{this.props.encuesta.preguntas.length}</Text>
                </View>
                </View>
              </LinearGradient>
             </View>
           }
         />
      )
   }
}
