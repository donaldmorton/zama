import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import api from '../api.js'
import DropDown, {
   Select,
   Option,
   OptionList,
} from 'react-native-selectme';
import Button from '../button.js'

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
      console.log(this.state.plaza,this.state.selected,this.state.distrito);
      AsyncStorage.clear(function(err){
         if(err){
            console.log(err);
         }
      })
      if(this.state.selected){
         AsyncStorage.setItem('puesto',this.state.selected);
         AsyncStorage.setItem('plaza',this.state.plaza);
         AsyncStorage.setItem('distrito',this.state.distrito);
         this.props.navigator.push({
            distrito:this.state.distrito,
            plaza:this.state.plaza,
            puesto:this.state.selected,
            id: 'seleccion2'
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
         <LinearGradient colors={['#f22a2a','#ed6767']} style={stylesWelcome.container}>
            <Image style={[stylesWelcome.description,{width:200,height:100,marginBottom:0}]} source={require('../img/oxxo.png')}/>
            <Text style={stylesWelcome.description}>
               Elige tu puesto:
            </Text>
            <Select style={stylesWelcome.select} width={200} ref="SELECT1" defaultValue="Selecciona Puesto" optionListRef={this._getOptionList.bind(this)} onSelect={this._canada.bind(this)}>
               {this.state.options}
            </Select>
            <Text style={stylesWelcome.description}>
               ¿De qué plaza eres?
            </Text>
            <OptionList ref="OPTIONLIST" overlayStyles={{backgroundColor:'rgba(249, 24, 24, 0)'}}/>
            <Select style={stylesWelcome.select} width={200} defaultValue="Selecciona Plaza" ref="SELECT2" optionListRef={this._getOptionList2.bind(this)} onSelect={this._mexico.bind(this)}>
               <Option>Monterrey Centro</Option>
               <Option>Monterrey Sur</Option>
               <Option>Saltillo</Option>
               <Option>Monterrey Norte</Option>
               <Option>Monterrey Oriente</Option>
            </Select>
            <OptionList ref="OPTIONLIST2" overlayStyles={{backgroundColor:'rgba(249, 24, 24, 0)'}}/>
            <Text style={stylesWelcome.description}>
               ¿De qué distrito eres?
            </Text>
            <Select style={stylesWelcome.select} width={200} defaultValue="Selecciona Distrito" ref="SELECT3" optionListRef={this._getOptionList3.bind(this)} onSelect={this._eua.bind(this)}>
               <Option>D1</Option>
               <Option>D2</Option>
               <Option>D3</Option>
            </Select>
            <OptionList ref="OPTIONLIST3" overlayStyles={{backgroundColor:'rgba(249, 24, 24, 0)'}}/>
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
      marginBottom:15,
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
      paddingRight: 10,
      borderRadius: 0,
      alignItems: 'center'
   }
})
