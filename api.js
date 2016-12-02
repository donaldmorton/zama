import {AsyncStorage} from 'react-native';

module.exports = {
   puestos:function(callback) {
    fetch('http://zama.webhook.org/puestos')
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
   },
   categorias:function(callback) {
    fetch('http://zama.webhook.org/categoria')
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
   },
   intro:function(callback) {
    fetch('http://zama.webhook.org/home')
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
   },
   encuestas:function(cat,callback) {
    fetch('http://zama.webhook.org/'+cat+'/encuestas')
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
   }
}
