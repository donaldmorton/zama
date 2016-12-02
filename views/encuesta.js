import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

module.exports = class Encuestas extends Component{
   constructor(props) {
      super(props)
   }

   navSecond(encuesta,index){
      this.props.navigator.push({
         id: 'preguntas',
         encuesta:encuesta,
         index:index
      });
   }

   render(){
      return(
         <Navigator renderScene={(route, navigator) =>
            <View style={{flex:10,flexDirection:'column'}}>
            <LinearGradient colors={['#f22a2a','#ed6767']} style={{flex:1}}></LinearGradient>
            <LinearGradient colors={['#ffc34d','#ffdd99']} style={{flex:9,alignItems:'center',padding:15}}>
               <View style={{marginTop:20}}>
                  <Icon name={this.props.encuesta.icono} size={100} color="rgb(255, 255, 255)" />
               </View>
               <Text style={{fontSize:28,color:'#ffffff'}}>
                  {this.props.encuesta.name}
               </Text>
               <Text style={{color:'#b37700',marginBottom:20}}>
                  {this.props.encuesta.preguntas.length} Preguntas
               </Text>
               <Text style={{marginBottom: 20,fontSize: 18,textAlign: 'justify',color: '#f4efef',}}>
                  {this.props.encuesta.descripcion}
               </Text>
               <Button onPress={()=>{this.navSecond(this.props.encuesta,0)}}>COMENZAR</Button>
            </LinearGradient>
            </View>
         }/>
      )
   }
}
