import React, { Component } from 'react';
import {AppRegistry,KeyboardAvoidingView,TouchableWithoutFeedback,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import api from '../api.js'
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';
import Button from '../button.js'
import dismissKeyboard from 'dismissKeyboard'

module.exports = class Seleccion extends Component{
  constructor(props) {
    super(props)
    this.state = {
      options:[],
      puestoCheck:''
    }
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  _getOptionList2() {
    return this.refs['OPTIONLIST2'];
  }
  _getOptionList3() {
    return this.refs['OPTIONLIST3'];
  }

  _canada(province) {
    this.setState({selected:province})
  }
  _mexico(plaza) {
    this.setState({plaza:plaza})
  }
  _eua(distrito) {
    this.setState({distrito:distrito})
  }

  navSecond(){
    if(this.state.tienda){
      AsyncStorage.getItem('puesto',(err,puesto)=>{
      AsyncStorage.setItem('tienda',this.state.tienda);
      AsyncStorage.setItem('entrevistado',this.state.entrevistado);
      AsyncStorage.setItem('entrevistador',this.state.entrevistador);
      this.props.navigator.push({
        distrito:this.state.distrito,
        plaza:this.state.plaza,
        puesto:puesto,
        id: 'home'
      })
    })
    }
  }

  componentWillMount(){
    this.opciones()
  }

  opciones(){
    var self = this;
    api.puestos(function(json) {
      json.map(function(puesto) {
        if(puesto){
          self.state.options.push(<Option>{puesto.name}</Option>)
        }
      })
    })
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={()=>{dismissKeyboard()}}>
      <LinearGradient colors={['#f22a2a','#ed6767']} style={stylesWelcome.container}>
        <KeyboardAvoidingView behavior="padding" style={stylesWelcome.container}>
        <Image style={[stylesWelcome.description,{width:200,height:100,marginBottom:0}]} source={require('../img/oxxo.png')}/>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={stylesWelcome.description}>
          CR Tienda:
        </Text>
        <TextInput keyboardType={'numeric'} style={stylesWelcome.select} onChangeText={(tienda) => this.setState({tienda})} value={this.state.tienda}/>
        <Text style={stylesWelcome.description}>
          Numero de Entrevistador:
        </Text>
        <TextInput keyboardType={'numeric'} style={stylesWelcome.select} onChangeText={(entrevistador) => this.setState({entrevistador})} value={this.state.entrevistador}/>
        <Text style={stylesWelcome.description}>
          Numero de Entrevistado:
        </Text>
        <TextInput keyboardType={'numeric'}  style={stylesWelcome.select} onChangeText={(entrevistado) => this.setState({entrevistado})} value={this.state.entrevistado}/>
        </View>
        <Button onPress={this.navSecond.bind(this)}style={{paddingRight:10}}>CONTINUAR</Button>
        </KeyboardAvoidingView>
      </LinearGradient>
      </TouchableWithoutFeedback>
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
    marginBottom:15,
    height:50,
    borderRadius:4,
    color:'#fff',
    backgroundColor:'rgba(74, 10, 10, 0.4)',
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 9,
    paddingRight: 10,
    borderRadius: 0,
    alignItems: 'center'
  }
})
