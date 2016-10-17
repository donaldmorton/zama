/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import LinearGradient from 'react-native-linear-gradient'
 import Button from './button.js'
 import Icon from 'react-native-vector-icons/FontAwesome';
 import EncuestasBottom from './encuestasBottom'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Navigator,
  ListView,
  TouchableOpacity,
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



class oxxodueno extends Component {
  render() {
    return (
      <LinearGradient colors={['#f22a2a','#ed6767']} style={styles.linearGradient}>
         <Image style={{width:100,height:100}} source={require('./img/calisto.png')} />
      </LinearGradient>
    );
  }
}

class Welcome extends Component{
   constructor(props) {
      super(props)
   }
   navSecond(){
    this.props.navigator.push({
      id: 'seleccion'
    })
   }
   render(){
      return(
         <LinearGradient colors={['#f22a2a','#ed6767']} style={stylesWelcome.container}>
            <Image style={stylesWelcome.description,{width:200,height:100}} source={require('./img/oxxo.png')}/>
               <Text style={stylesWelcome.description}>
                  Hola!
               </Text>
               <Text style={stylesWelcome.description}>
                  dcscdscsdcdscdcd sdcds sdcsd sdcds sdcd sdcdsc sdc
                  dcscdscsdcdscdcd sdcds sdcsd sdcds sdcd sdcdsc sdc
                  dcscdscsdcdscdcd sdcds sdcsd sdcds sdcd sdcdsc sdc
               </Text>
               <Button onPress={this.navSecond.bind(this)}>CONTINUAR</Button>
         </LinearGradient>
      )
   }
}

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
            return (<Categories navigator={navigator} title="Categories"/>);
         case 'home':
            return (<Home navigator={navigator} title="Home" />);
         case 'encuestas':
            return(<Encuestas navigator={navigator} title="Encuestas"/>);
         case 'preguntas':
            return(<Preguntas navigator={navigator} title="Preguntas"/>);
         case 'comentarios':
            return(<Comentarios navigator={navigator} title="Comentarios"/>);
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
      var NavigationBarRouteMapper = {

         LeftButton: function(route, navigator, index, navState) {
            if(route.id=='home'){
               return (
                  <Image style={stylesWelcome.description,{width:80,height:50,marginBottom:80}} source={require('./img/oxxo.png')}/>
               );
            }
            if(route.id=='categories'){
               return(
                  <Text></Text>
               )
            }
         },

         RightButton: function(route, navigator, index, navState) {
            return null;
         },

         Title: function(route, navigator, index, navState) {
            return null;
         }
      }

      return(
         <Navigator initialRoute={{id: 'comentarios'}} renderScene={this.navigatorRenderScene}
         configureScene = {this.navigatorConfigureScene}
         navigationBar={
            <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            />
         }
         />
      )
   }
}

class Home extends Component{

   constructor(props) {
      super(props)
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         dataSource: ds.cloneWithRows(['Revisiones Verticales', 'Competencias y Valores'])
      }
   }
     navSecond(){
       this.props.navigator.push({
         id: 'categories'
       })
     }

   renderRows(row){
      return(
         <TouchableOpacity onPress={()=>this.navSecond()}>
            <View style={{ shadowColor: "#000000",shadowOpacity: 0.1,shadowRadius: 2,shadowOffset: {height: 1,width: 0},flexDirection:'row',justifyContent:'center',alignItems:'center',height:140,marginBottom:10,padding:10,backgroundColor:'rgb(255, 255, 255)',borderRadius:0}}>
               <Text style={{fontSize:30,flex:2,fontWeight:'800',color:'rgb(255, 215, 73)'}}>
                  {row}
               </Text>
               <View style={{backgroundColor:'rgb(255, 215, 73)',height:100,width:2}}>

               </View>
               <Text style={{fontSize:50,textAlign:'center',fontWeight:'800',flex:1,color:'rgb(255, 109, 83)'}}>
                  3/4
               </Text>
            </View>
         </TouchableOpacity>
      )
   }

   render(){
      return(
         <LinearGradient style={{flex:1}} colors={['#e8e6e6','#ffffff']}>
            <ListView style={{marginTop:80,flex:1,flexDirection:'column'}}  dataSource={this.state.dataSource} renderRow = {this.renderRows.bind(this)}/>
         </LinearGradient>
      )
   }
}

class Categories extends Component{

   constructor(props) {
      super(props)
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         dataSource: ds.cloneWithRows(['Satisfaccion', 'Contenido','Jefe Subordinado'])
      }
   }
   navSecond(){
     this.props.navigator.push({
       id: 'encuestas'
     })
   }
   renderRows(row){
      return(
        <TouchableOpacity onPress={this.navSecond.bind(this)}>
         <View>
            <View style={{ shadowColor: "#000000",shadowOpacity: 0.1,shadowRadius: 2,shadowOffset: {height: 1,width: 0},flexDirection:'row',justifyContent:'center',alignItems:'center',height:110,marginBottom:10,padding:10,backgroundColor:'rgb(255, 255, 255)',borderRadius:0}}>
               <View style={{flex:1}}>
                  <Icon name="smile-o" size={50} color="rgb(255, 215, 73)" />
               </View>
               <View style={{flex:4}}>
                  <Text style={{fontSize:25,fontWeight:'800',color:'rgb(255, 215, 73)'}}>
                     {row}
                  </Text>
                  <Text style={{color:'rgb(255, 215, 73)'}}>11 Preguntas</Text>
               </View>
               <View style={{backgroundColor:'rgb(255, 215, 73)',height:70,width:2}}>

               </View>
               <View style={{flexDirection:'column',flex:2,alignItems:'center'}}>
                  <Icon name="clock-o" size={50} color="rgb(255, 109, 83)" />
                  <Text style={{fontSize:12,textAlign:'center',fontWeight:'800',flex:1,color:'rgb(255, 109, 83)'}}>
                     3 Dias
                  </Text>
               </View>
            </View>
         </View>
         </TouchableOpacity>
      )
   }

   render(){
      return(
         <LinearGradient style={{flex:1}} colors={['#e8e6e6','#ffffff']}>
            <ListView style={{marginTop:80,flex:1,flexDirection:'column'}}  dataSource={this.state.dataSource} renderRow = {this.renderRows.bind(this)}/>
         </LinearGradient>
      )
   }
}

class Seleccion extends Component{
   constructor(props) {
      super(props)
   }
    state = {
      canada: ''
    }
     _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
    _canada(province) {
  }

     navSecond(){
       this.props.navigator.push({
         id: 'home'
       })
     }

   render(){
      return(
         <LinearGradient colors={['#f22a2a','#ed6767']} style={stylesWelcome.container}>
            <Image style={stylesWelcome.description,{width:200,height:100,marginBottom:80}} source={require('./img/oxxo.png')}/>
            <Text style={stylesWelcome.description}>
               Elige tu puesto!
            </Text>
            <Select style={stylesWelcome.select} width={250} ref="SELECT1" optionListRef={this._getOptionList.bind(this)} defaultValue="Asesor de tienda" onSelect={this._canada.bind(this)}>
               <Option value = {{id : "alberta"}}>Alberta</Option>
               <Option>British Columbia</Option>
               <Option>Manitoba</Option>
               <Option>Manitoba</Option>
               <Option>Manitoba</Option>
               <Option>New Brunswick</Option>
               <Option>Newfoundland and Labrador</Option>
            </Select>
            <OptionList ref="OPTIONLIST" overlayStyles={{backgroundColor:'rgba(249, 24, 24, 0)'}}/>
            <Button onPress={this.navSecond.bind(this)}>CONTINUAR</Button>
         </LinearGradient>
      )
   }
}
class Encuestas extends Component{
   constructor(props) {
      super(props)
   }
   navSecond(){
    this.props.navigator.push({
      id: 'preguntas'
    })
   }
   render(){
      return(
         <LinearGradient colors={['#ffc34d','#ffdd99']} style={stylesWelcome.container}>
           <View>
              <Icon name="smile-o" size={100} color="rgb(255, 255, 255)" />
           </View>
           <Text style={{fontSize:28,color:'#ffffff'}}>
              Satisfacción
           </Text>
           <Text style={{color:'#b37700',marginBottom:20}}>
              11 Preguntas
           </Text>
           <Text style={{marginBottom: 20,fontSize: 18,textAlign: 'justify',color: '#f4efef',}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           </Text>
           <Button onPress={this.navSecond.bind(this)}>COMENZAR</Button>
         </LinearGradient>
      )
   }
}
class Preguntas extends Component{
   constructor(props) {
      super(props)
   }
   navSecond(){
    this.props.navigator.push({
      id: 'comentarios'
    })
   }
   render(){
      return(
         <Navigator renderScene={(route, navigator) =>
           <View style={{flex:10,flexDirection:'column'}}>
           <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1,justifyContent:'center'}}>
            <View style={{backgroundColor:'transparent'}}>
              <Text style={{color:'#FFFFFF',fontSize:18,textAlign:'center',fontWeight:'bold'}}>SATISFACCIÓN</Text>
            </View>
           </LinearGradient>
              <LinearGradient colors={['#ffc34d','#ffdd99']} style={{flex:9}}>
                <View style={{flex:10,flexDirection:'column'}}>
                <View style={{backgroundColor:'#FFFFFF',margin:15,borderRadius:4,flex:9,elevation:3}}>
                  <Text style={{color:'#FFC34D',textAlign:'center',fontSize:24,marginTop:15,fontWeight:'bold'}}>Los Instructores:</Text>
                  <Text style={{fontSize:16,color:'#000000',textAlign:'center',marginTop:23,marginBottom:15}}>1.Mostraron comprensión del tema</Text>
                  <View style={{backgroundColor:'#d80e0e',marginTop:20}}>
                    <TouchableOpacity onPress={this.navSecond.bind(this)}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
                      <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Muy de acuerdo</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{backgroundColor:'#d80e0e'}}>
                    <TouchableOpacity onPress={this.navSecond.bind(this)}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
                      <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>De acuerdo</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{backgroundColor:'#d80e0e'}}>
                    <TouchableOpacity onPress={this.navSecond.bind(this)}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
                      <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>En desacuerdo</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{backgroundColor:'#d80e0e'}}>
                    <TouchableOpacity onPress={this.navSecond.bind(this)}style={{backgroundColor:'#f22a2a',borderWidth:1,borderColor:'#f45757'}}>
                      <Text style={{color:'#FFFFFF',paddingLeft:20,fontSize:26,paddingTop:3,paddingBottom:5,fontWeight:'bold'}}>Muy desacuerdo</Text>
                    </TouchableOpacity>
                  </View>
                  <EncuestasBottom/>
                </View>
                <View style={{backgroundColor:'transparent',flex:1,alignItems:'center'}}>
                  <Text style={{color:'#FFFFFF',textAlign:'center',fontWeight:'bold',fontSize:22}}>1/11</Text>
                </View>
                </View>
              </LinearGradient>
             </View>
           }
         />
      )
   }
}
class Comentarios extends Component{
   constructor(props) {
      super(props)
      this.state={
        text:''
      }
   }
   navSecond(){
    this.props.navigator.push({
      id: 'categories'
    })
   }
   navFirst(){
    this.props.navigator.push({
      id: 'preguntas'
    })
   }
   render(){
      return(
         <Navigator renderScene={(route, navigator) =>
           <View style={{flex:10,flexDirection:'column'}}>
           <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1,flexDirection:'row',justifyContent:'center'}}>

           </LinearGradient>
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
                  <Text style={{color:'#FFFFFF',textAlign:'center',fontWeight:'bold',fontSize:22}}>11/11</Text>
                </View>
                </View>
              </LinearGradient>
             </View>
           }
           navigationBar={
     <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          { return (<View><TouchableOpacity onPress={()=>1+1}><Text style={{marginTop:12,marginLeft:5}}><Icon name="long-arrow-left" size={25} color="#FFFFFF"style={{marginLeft:-3}}/></Text></TouchableOpacity></View>); },
         RightButton: (route, navigator, index, navState) =>
           { return (<TouchableOpacity onPress={this.navSecond.bind(this)}><View><Text style={{color:'#FFFFFF',fontWeight:'bold',marginTop:15,marginRight:8}}>FINALIZAR</Text></View></TouchableOpacity>); },
         Title: (route, navigator, index, navState) =>
           { return (<Text style={{textAlign:'center',marginLeft:40,color:'#FFFFFF',fontWeight:'bold',marginTop:15}}>SATISFACCIÓN</Text>); },
       }}
       style={{backgroundColor: 'transparent'}}
     />
  }
         />
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
