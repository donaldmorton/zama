import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

module.exports = class Home extends Component{

   constructor(props) {
      super(props)
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         categorias:{},
         dataSource: ds.cloneWithRows(catDef),
         compleated:[]
      }
   }
     navSecond(categorie){
      this.props.navigator.push({
         id: 'categories',
         categorie:categorie
      })
   }

   componentDidMount(){
      updateKeys()
      self = this;
      var cate = []
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      api.categorias(function(json){
         var x = 0;
         self.setState({dataSource:ds.cloneWithRows(json)});
      })
   }

   renderRows(row,s,index){
      return(
         <TouchableOpacity onPress={()=>this.navSecond(row)}>
            <View style={{ elevation:2,shadowColor: "#000000",shadowOpacity: 0.1,shadowRadius: 2,shadowOffset: {height: 1,width: 0},flexDirection:'row',justifyContent:'center',alignItems:'center',height:140,marginBottom:10,padding:10,backgroundColor:'rgb(255, 255, 255)',borderRadius:0}}>
               <Text style={{fontSize:30,flex:2,fontWeight:'800',color:'rgb(255, 215, 73)'}}>
                  {row.name}
               </Text>
               <View style={{backgroundColor:'rgb(255, 215, 73)',height:100,width:2}}>

               </View>
               <Text style={{fontSize:50,textAlign:'center',fontWeight:'800',flex:1,color:'rgb(255, 109, 83)'}}>
                  {index}/{row.encuestas.length}
               </Text>
            </View>
         </TouchableOpacity>
      )
   }

   render(){
      return(
        <Navigator renderScene={(route, navigator) =>
          <View style={{flex:10,flexDirection:'column'}}>
          <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1}}>

          </LinearGradient>
             <View style={{flex:9,backgroundColor:'#fafafa'}}>
                <Text style={{color:'#f22a2a',marginLeft:8,marginTop:5,marginBottom:8,fontWeight:'bold'}}>Categorías</Text>
                <ListView style={{flex:1,flexDirection:'column'}}  dataSource={this.state.dataSource} renderRow ={this.renderRows.bind(this)}/>
             </View>
          </View>
          }
        />
      )
   }
}
