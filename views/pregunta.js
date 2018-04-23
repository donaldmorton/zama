import React, { Component } from 'react';
import {AppRegistry,AlertIOS,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View,TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import dismissKeyboard from 'dismissKeyboard'
import EncuestasBottom from '../encuestasBottom'
import api from '../api'
// ┌────────────┬──────────────────────────────────────────────────────────────────┐
// │ Name       │ Deployment Key                                                   │
// ├────────────┼──────────────────────────────────────────────────────────────────┤
// │ Production │ fJMLYunY8MuxdkpLg5-9wCKYtWipb47057fc-4888-4a66-a51e-5d17253f0c76 │
// ├────────────┼──────────────────────────────────────────────────────────────────┤
// │ Staging    │ K4sLxbf0UUa8C9hBy1Mp6P35vvFPb47057fc-4888-4a66-a51e-5d17253f0c76 │
// └────────────┴──────────────────────────────────────────────────────────────────
module.exports = class Preguntas extends Component{
  constructor(props) {
    super(props)
    this.state={
      text:'',
    }
  }

  navSecond(value,p){
    var self=this;
          AsyncStorage.getItem('plaza',(err,plaza)=>{
          AsyncStorage.getItem('distrito',(err,distrito)=>{
          AsyncStorage.getItem('puesto',(err,puesto) =>{
          AsyncStorage.getItem('tienda',(err,tienda)=>{
          AsyncStorage.getItem('entrevistado',(err,entrevistado)=>{
          AsyncStorage.getItem('entrevistador',(err,entrevistador)=>{

          self.setState({plaza:plaza})
          self.setState({distrito:distrito})

          let record = {
            e:self.props.encuesta.name,
            puesto:puesto.toLowerCase(),
            plaza,
            distrito,
            iid:self.props.encuesta.id_interno,
            r:value,
            index:self.props.index,
            pregunta:self.props.encuesta.preguntas[self.props.index].id,
            tipo:self.props.encuesta.preguntas[self.props.index].tipo,
            tienda,
            entrevistado,
            entrevistador
          }

          api.track('encuestas',record);

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
        })
        })
        })
      })
    })
  }

  tipoPregunta(){
    switch(this.props.encuesta.preguntas[this.props.index].tipo){
      case '1':
      return (<View>
        <View style={{backgroundColor:'#d80e0e',marginTop:20}}>
          <TouchableOpacity onPress={()=>{this.navSecond(5)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>5</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#d80e0e'}}>
          <TouchableOpacity onPress={()=>{this.navSecond(4)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>4</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#d80e0e'}}>
          <TouchableOpacity onPress={()=>{this.navSecond(3)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#d80e0e'}}>
          <TouchableOpacity onPress={()=>{this.navSecond(2)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>2</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#d80e0e'}}>
          <TouchableOpacity onPress={()=>{this.navSecond(1)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
            <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>1</Text>
          </TouchableOpacity>
        </View>
      </View>)
      break;
      case '2':
      return(
        <View>
          <View style={{backgroundColor:'#d80e0e',marginTop:20}}>
            <TouchableOpacity onPress={()=>{this.navSecond(1)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
              <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Si</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor:'#d80e0e'}}>
            <TouchableOpacity onPress={()=>{this.navSecond(0)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
              <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>No</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor:'#d80e0e'}}>
            <TouchableOpacity onPress={()=>{this.navSecond('NA')}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
              <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>)
        break;
        case '3':
        return(
          <View style={{marginLeft:12,marginRight:12,marginBottom:15,flex:8}}>
            <TextInput
              style={{backgroundColor:'transparent',height:40,textAlignVertical:'top'}}
              multiline = {false}
              placeholder={'Escribe aquí...'}
              onChangeText={(text) => this.setState({text:text})}
              value={this.state.text}
              />
            <TouchableOpacity onPress={()=>{this.navSecond(this.state.text)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
              <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Siguiente</Text>
            </TouchableOpacity>
          </View>)
          break;
          case '4':
          return(
            <View>
              <View style={{backgroundColor:'#d80e0e',marginTop:20}}>
                <TouchableOpacity onPress={()=>{this.navSecond(1)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
                  <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Si</Text>
                </TouchableOpacity>
              </View>
              <View style={{backgroundColor:'#d80e0e'}}>
                <TouchableOpacity onPress={()=>{this.navSecond(0)}}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
                  <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>No</Text>
                </TouchableOpacity>
              </View>
            </View>)
            break;
        }
      }

      keyboarddis(){
        dismissKeyboard();
      }

      render(){
        return(
          <Navigator renderScene={(route, navigator) =>
              <TouchableWithoutFeedback onPress={this.keyboarddis.bind(this)}>
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
              </TouchableWithoutFeedback>
            }
            />
        )
      }
    }
