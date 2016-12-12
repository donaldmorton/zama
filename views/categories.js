import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import api from '../api.js'
import Icon from 'react-native-vector-icons/FontAwesome';

module.exports = class Categories extends Component{

   constructor(props) {
      super(props)
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         dataSource: ds.cloneWithRows([]),
         keys:{}
      }
   }

   loadKeys(){
      var self = this;
      AsyncStorage.getAllKeys(function(err,data) {
         self.setState({keys:data})
      })
   }

   checkKeys(input){
      var self = this;
      for(key in self.state.keys){
         if(self.state.keys[key]==input){
            return true;
         }
      }
   }

   navSecond(encuesta){
      this.props.navigator.push({
         id: 'encuestas',
         encuesta:encuesta
      })
   }

   componentWillMount(){
      this.loadKeys()
      var self = this;
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var encuestas = []
      api.encuestas(this.props.categorie.slug,function(encuestas) {
         var e = encuestas.map(function(encu){
            var d1 = new Date(encu.expiracion).getTime();
            var d2 = Date.now();
            encu.compleated = (self.checkKeys(encu._id))?'true':'false';
            encu.expiracion = Math.round((d1-d2)/86400000);
            return encu
         })
         self.setState({dataSource: ds.cloneWithRows(e)})
      })
   }

   renderRows(row){
      console.log(row);
      if(row.compleated=='false'){
         return(
            <TouchableOpacity onPress={()=>{this.navSecond(row)}}>
               <View>
                  <View style={{ elevation:2,shadowColor: "#000000",shadowOpacity: 0.1,shadowRadius: 2,shadowOffset: {height: 1,width: 0},flexDirection:'row',justifyContent:'center',alignItems:'center',height:110,marginBottom:10,padding:10,backgroundColor:'rgb(255, 255, 255)',borderRadius:0}}>
                     <View style={{flex:1}}>
                        <Icon name={row.icono} size={50} color="rgb(255, 215, 73)"/>
                     </View>
                     <View style={{flex:4}}>
                        <Text style={{fontSize:25,fontWeight:'800',color:'rgb(255, 215, 73)'}}>
                           {row.name}
                        </Text>
                        <Text style={{color:'rgb(255, 215, 73)'}}>{row.preguntas.length} Preguntas {row.compleated}</Text>
                     </View>
                     <View style={{backgroundColor:'rgb(255, 215, 73)',height:70,width:2}}>

                     </View>
                     <View style={{flexDirection:'column',flex:2,alignItems:'center'}}>
                        <Icon name="clock-o" size={50} color="rgb(255, 109, 83)" />
                        <Text style={{fontSize:12,textAlign:'center',fontWeight:'800',flex:1,color:'rgb(255, 109, 83)'}}>
                           {row.expiracion} Dias
                        </Text>
                     </View>
                  </View>
               </View>
            </TouchableOpacity>
         )
      }else{
         return(
            <View>
               <View style={{ elevation:2,shadowColor: "#000000",shadowOpacity: 0.1,shadowRadius: 2,shadowOffset: {height: 1,width: 0},flexDirection:'row',justifyContent:'center',alignItems:'center',height:110,marginBottom:10,padding:10,backgroundColor:'rgb(255, 255, 255)',borderRadius:0}}>
               <View style={{flex:1}}>
               <Icon name={row.icono} size={50} color="rgb(255, 215, 73)"/>
               </View>
               <View style={{flex:4}}>
               <Text style={{fontSize:25,fontWeight:'800',color:'rgb(255, 215, 73)'}}>
               {row.name}
               </Text>
               <Text style={{color:'rgb(255, 215, 73)'}}>{row.preguntas.length} Preguntas </Text>
               </View>
               <View style={{backgroundColor:'rgb(255, 215, 73)',height:70,width:2}}>

               </View>
               <View style={{flexDirection:'column',flex:2,alignItems:'center'}}>
               <Icon name="check" size={50} color="rgb(255, 109, 83)" />
               </View>
               </View>
            </View>
         )
      }
   }

   render(){
      return(
        <Navigator renderScene={(route, navigator) =>
          <View style={{flex:10,flexDirection:'column'}}>
          <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1}}>

          </LinearGradient>
             <View style={{flex:9,backgroundColor:'#fafafa'}}>
                <Text style={{color:'#f22a2a',marginLeft:8,marginTop:5,marginBottom:8,fontWeight:'bold'}}>Encuestas</Text>
                <ListView style={{marginTop:3,flex:1,flexDirection:'column'}}  dataSource={this.state.dataSource} renderRow = {this.renderRows.bind(this)}/>
             </View>
          </View>
          }
        />
      )
   }
}
