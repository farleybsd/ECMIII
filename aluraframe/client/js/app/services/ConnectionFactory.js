
// Funcao Auto Invocada


var ConnectionFactory= (function (){

    const stores = ['negociacoes']
    const version = 4
    const dbname = 'aluraframe'
    
    var connection = null;
    
    var close = null;
   return class ConnectionFactory{
    
        constructor(){
            throw new Error('Não é possível criar instâncias de ConnectionFactory')
        }
        static getConnection(){
    
            return new Promise((resolve,reject)=>{
    
                let openRequest = window.indexedDB.open(dbname,version)
    
                openRequest.onupgradeneeded = e =>{
    
                   ConnectionFactory._createStores(e.target.result)
                }
    
                openRequest.onsuccess = e => {
    
                    if(!connection) connection = e.target.result 
                    close = connection.close.bind(connection)
                    // sobrescrever uma funcao
                    connection.close = function(){
                        throw new Error('Você não pode fechar diretamente a conexão')
                    }              
                    resolve(connection);
    
                }
    
                openRequest.onerror = e => {
    
                    console.log(e.target.error)
                    reject(e.target.error.name);
                    
                }
            })
            
        }
    
        static _createStores(connection){
            stores.forEach( store =>{
    
                if(connection.objectStoreNames.contains(store))
                {
                    connection.deleteObjectStore(store)
                    
                }
                connection.createObjectStore(store,{autoIncrement:true})
            })
    
    
        }
        static closeConnection(){
        
            if(connection){
               close()
                connection = null
            }
        }
    }
}
)();
//ConnectionFactory
//ConnectionFactory.getConnection().then( connection => console.log(connection))




