import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

module.exports = class Welcome extends Component{
   constructor(props) {
      super(props);
      this.state = {
         description:''
      }
   }

   navSecond(){
      this.props.navigator.push({
         id: 'seleccion'
      })
   }

   componentDidMount(){
      self = this;
      var categorias = {};
      //firebase.database().ref('/intro').once('value',function(snap) {
         //self.setState({description:snap.val()});
      //})
      api.intro(function(intro) {
         self.setState({description:intro.intro,saludo:intro.saludo});
      })
   }

   render(){
      return(
         <LinearGradient colors={['#f22a2a','#ed6767']} style={stylesWelcome.container}>
            <Image style={stylesWelcome.description,{width:200,height:100}} source={require('.../img/oxxo.png')}/>
               <Text style={[stylesWelcome.description,{fontWeight:'600'}]}>
                  {this.state.saludo}
               </Text>
               <Text style={stylesWelcome.description}>
                  {this.state.description}
               </Text>
               <Button onPress={this.navSecond.bind(this)}>CONTINUAR</Button>
         </LinearGradient>
      )
   }
}
