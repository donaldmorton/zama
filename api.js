import {AsyncStorage} from 'react-native';

module.exports = {
   track:function(encuesta,data) {
    fetch('http://api.keen.io/3.0/projects/57a7f7dc80a7bd1d18b5259b/events/encuestas?api_key=154cb1bf4b92371008e0721f9283f31944ebf102f2f1eec03892c32ad7a52e2da194dd3f9e48d1eff5a9951f0a41aed28b8831d45ed8d197689474f104f68ca1dae8a9741b7a4b31728122b90d9406fb72f5e8040f86de33aec23ee2035a0763',{
      method: 'POST',
      headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
         },
         body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson,'RESPONSE');
      })
      .catch((error) => {
        console.error(error);
      });
   },
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
