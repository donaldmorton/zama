import React, { Component } from 'react';
import {AppRegistry,RefreshControl,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import api from '../api.js'

module.exports = class Home extends Component{

   constructor(props) {
      super(props)
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         categorias:{},
         dataSource: ds.cloneWithRows([]),
         compleated:[]
      }
   }

   loadItems(){
      var self = this;
      AsyncStorage.getAllKeys(function(err,data) {
         self.setState({'keys':data})
      })
   }

   navSecond(categorie){
      this.props.navigator.push({
         id: 'categories',
         categorie:categorie
      })
   }

   onRefresh(){
      this.componentDidMount()
      this.setState({refreshing:false})
   }

   componentDidMount(){
      var self = this;
      var cate = []
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      self.loadItems()
      api.categorias(function(json){
         var x = 0;
         for(key in json){
            var contestadas = [];
            for (c in json[key].encuestas){
               for(k in self.state.keys){
                  console.log(self.state.keys[k],'keys',json[key].encuestas[c]);
                  if(self.state.keys[k]==json[key].encuestas[c].replace(' ','').replace('encuesta','')){
                     contestadas.push(self.state.keys[k])
                     console.log('true');
                  }else {
                     console.log('false');
                  }
               }
            }
            json[key].contestadas = contestadas
         }
         console.log(json);
         self.setState({loaded:true,dataSource:ds.cloneWithRows(json)});
      })
   }

   renderRows(row,s,index){
      return(
         <View>
         <TouchableOpacity onPress={()=>this.navSecond(row)}>
            <View style={{ elevation:2,shadowColor: "#000000",shadowOpacity: 0.1,shadowRadius: 2,shadowOffset: {height: 1,width: 0},flexDirection:'row',justifyContent:'center',alignItems:'center',height:140,marginBottom:10,padding:10,backgroundColor:'rgb(255, 255, 255)',borderRadius:0}}>
               <Text style={{fontSize:30,flex:2,fontWeight:'800',color:'rgb(255, 215, 73)'}}>
                  {row.name}
               </Text>
               <View style={{backgroundColor:'rgb(255, 215, 73)',height:100,width:2}}>

               </View>
               <Text style={{fontSize:50,textAlign:'center',fontWeight:'800',flex:1,color:'rgb(255, 109, 83)'}}>
                  {row.contestadas.length}/{row.encuestas.length}
               </Text>
            </View>
         </TouchableOpacity>
         </View>
      )
   }

   render(){
      if(this.state.loaded){
         return(
            <View style={{flex:10,flexDirection:'column'}}>
            <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1}}>

            </LinearGradient>
            <View style={{flex:9,backgroundColor:'#fafafa'}}>
            <Text style={{color:'#f22a2a',marginLeft:8,marginTop:5,marginBottom:8,fontWeight:'bold'}}>Categorías</Text>
            <ListView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        } style={{flex:1,flexDirection:'column'}}  dataSource={this.state.dataSource} renderRow ={this.renderRows.bind(this)}/>
            </View>
            </View>
         )
      }else{
         return(
            <View style={{flex:10,flexDirection:'column'}}>
            <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1}}>

            </LinearGradient>
            <View style={{flex:9,backgroundColor:'#fafafa'}}>
            <Text style={{color:'#f22a2a',marginLeft:8,marginTop:5,marginBottom:8,fontWeight:'bold'}}>Categoría</Text>
            </View>
            </View>
         )
      }
   }
}
