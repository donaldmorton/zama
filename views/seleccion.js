import {AppRegistry,StyleSheet,Text,Image,StatusBar,Dimensions,Navigator,ListView,TouchableOpacity,TouchableHighlight,TextInput,AsyncStorage,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

module.exports = class Seleccion extends Component{
   constructor(props) {
      super(props)
      this.state = {
         options:[]
      }
   }
      _getOptionList() {
      return this.refs['OPTIONLIST'];
     }

      _canada(province) {
         this.setState({selected:province})
     }

     navSecond(){
        if(this.state.selected){
           AsyncStorage.setItem('puesto',this.state.selected)
           this.props.navigator.push({
             puesto:this.state.selected,
             id: 'home'
          })
        }
     }

     componentWillMount(){
        this.opciones()
     }

     opciones(){
         self = this;

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
            <Image style={stylesWelcome.description,{width:200,height:100,marginBottom:80}} source={require('./img/oxxo.png')}/>
            <Text style={stylesWelcome.description}>
               Elige tu puesto:
            </Text>
            <Select style={stylesWelcome.select} width={250} ref="SELECT1" optionListRef={this._getOptionList.bind(this)} defaultValue="Asesor de tienda" onSelect={this._canada.bind(this)}>
               {this.state.options}
            </Select>
            <OptionList ref="OPTIONLIST" overlayStyles={{backgroundColor:'rgba(249, 24, 24, 0)'}}/>
            <Button onPress={this.navSecond.bind(this)}>CONTINUAR</Button>
         </LinearGradient>
      )
   }
}
