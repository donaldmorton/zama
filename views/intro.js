import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

module.exports = class oxxodueno extends Component {
  render() {
      return (
         <LinearGradient colors={['#f22a2a','#ed6767']} style={styles.linearGradient}>
            <Image style={{width:100,height:100}} source={require('./img/calisto.png')}/>
         </LinearGradient>
      );
   }
}
