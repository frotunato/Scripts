var world = require("./world.js")

function gestor(order, postData, response, callback) {
  console.log('A punto de gestionar ' + order);
  
 	if(order == 'createWorld'){
 	world.init(postData, function(){
		console.log('Petición' + order + ' gestionada') 	
		});
 	}
    callback();
  }


exports.gestor = gestor;

