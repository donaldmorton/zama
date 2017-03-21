/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';

 import LinearGradient from 'react-native-linear-gradient'
 import Button from './button.js'
 import Icon from 'react-native-vector-icons/FontAwesome';
 import EncuestasBottom from './encuestasBottom'

 import Seleccion from './views/seleccion'
 import Comentario from './views/comentario'
 import Home from './views/home'
 import Intro from './views/intro'
 import Pregunta from './views/pregunta'
 import Welcome from './views/welcome'
 import Encuestas from './views/encuesta'
 import Categories from './views/categories'
 import Comentarios from './views/comentario'

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
  Navigator,
  ListView,
  TouchableOpacity,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

var deviceWidth = Dimensions.get('window').width;
var initial = 'welcome'
var puesto = 'Puesto'

AsyncStorage.getItem('puesto',function(err,data) {
   puesto = data
})

class MainNavigator extends Component{

   constructor(props) {
      super(props)
   }

   state = {
      color1:'blue'
   }

   navigatorRenderScene(route, navigator) {
      _navigator = navigator;
      switch (route.id) {
         case 'welcome':
            return (<Welcome navigator={navigator} title="Welcome"/>);
         case 'seleccion':
            return (<Seleccion navigator={navigator} title="Seleccion"/>);
         case 'categories':
            return (<Categories categorie={route.categorie} navigator={navigator} title="Categories"/>);
         case 'home':
            return (<Home route={route} navigator={navigator} title="Home" />);
         case 'encuestas':
            return(<Encuestas encuesta={route.encuesta} navigator={navigator} title="Encuestas"/>);
         case 'preguntas':
            return(<Pregunta encuesta={route.encuesta} index={route.index} navigator={navigator} title="Preguntas"/>);
         case 'comentarios':
            return(<Comentarios encuesta={route.encuesta} navigator={navigator} title="Comentarios"/>);
      }
   }

   navigatorConfigureScene(route){
      switch (route.id) {
         case 'welcome':
            return Navigator.SceneConfigs.HorizontalSwipeJump;
         case 'seleccion':
            return Navigator.SceneConfigs.HorizontalSwipeJump;
         case 'categories':
            return Navigator.SceneConfigs.PushFromRight;
         case 'home':
            return Navigator.SceneConfigs.FloatFromBottom;
         case 'encuestas':
            return Navigator.SceneConfigs.PushFromRight;
         case 'preguntas':
            return Navigator.SceneConfigs.PushFromRight;
         case 'comentarios':
            return Navigator.SceneConfigs.PushFromRight;
      }
   }

   render(){
      if(!puesto){
         puesto = ' '
      }
      var NavigationBarRouteMapper = {

         LeftButton: function(route, navigator, index, navState) {
            if(route.id=='home'){
               return (
                    <Image style={stylesWelcome.description,{width:80,height:50,marginBottom:80}} source={require('./img/oxxo.png')}/>
               );
            }
            if(route.id=='categories'){
               return (
                  <TouchableOpacity onPress={() => {navigator.pop()}}>
                    <Icon name="long-arrow-left" size={25} color="#FFFFFF"style={{marginLeft:4,marginTop:13}}/>
                  </TouchableOpacity>
               );
            }
            if(route.id=='encuestas'){
               return(
                 <TouchableOpacity onPress={() => {navigator.pop()}}>
                   <Icon name="long-arrow-left" size={25} color="#FFFFFF"style={{marginLeft:4,marginTop:13}}/>
                 </TouchableOpacity>
               )
            }
         },

         RightButton: function(route, navigator, index, navState) {
            if(route.id == 'home'){
               return(
                  <TouchableOpacity onPress={() => {navigator.replace({id:'seleccion',puestoCheck:puesto})}}>
                     <Text style={{color:'#FFFFFF',fontWeight:'bold',marginTop:14}}>{route.puesto.toUpperCase()}  </Text>
                  </TouchableOpacity>
               );
            }
            if(route.id == 'comentarios'){
               return(
                  <TouchableOpacity onPress={()=>navigator.push({id:'home',puesto:puesto})}>
                     <Text style={{color:'#FFFFFF',fontWeight:'bold',marginTop:15,marginRight:8}}></Text>
                  </TouchableOpacity>
               );
            }
         },

         Title: function(route, navigator, index, navState) {
            if(route.id == 'categories'){
              return(
               <Text style={{color:'#FFFFFF',fontWeight:'bold',marginTop:15,marginLeft:10}}>{route.categorie.name.toUpperCase()}</Text>
              );
            }
            if(route.id == 'encuestas'){
              return(
                <Text style={{textAlign:'center',marginLeft:10,color:'#FFFFFF',fontWeight:'bold',marginTop:15}}>{route.encuesta.name.toUpperCase()}</Text>
              );
            }
            if(route.id=='comentarios'||route.id=='preguntas'){
              return(
                <Text style={{textAlign:'center',marginLeft:40,color:'#FFFFFF',fontWeight:'bold',marginTop:15}}>SATISFACCIÓN</Text>
              );
            }
         }
      }

      return(
         <View style={{flex:1}}>
               <StatusBar
              backgroundColor="#f22a2a"
              barStyle="light-content"
            />
            <Navigator initialRoute={{id:initial}} renderScene={this.navigatorRenderScene} configureScene = {this.navigatorConfigureScene}
            navigationBar={
               <Navigator.NavigationBar
               routeMapper={NavigationBarRouteMapper}
               />
            }
           />
        </View>

      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
    linearGradient: {
   flexDirection:'row',
   justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 0
  },
    buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
   flexRow:{
      flexWrap: 'wrap'
   },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 0,
      alignItems: 'center'
   }
})

   AppRegistry.registerComponent('oxxodueno', () => MainNavigator);
