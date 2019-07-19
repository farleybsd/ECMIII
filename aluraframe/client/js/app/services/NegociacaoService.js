class NegociacaoService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    obterNegociacoesDaSemana() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('http://localhost:3000/negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  
       });        
    }
    
    obterNegociacoesDaSemanaAnterior() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('http://localhost:3000/negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  
       }); 
       
        
    }
    
    obterNegociacoesDaSemanaRetrasada() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('http://localhost:3000/negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  
       }); 
    }    
    
    
    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }  
    
    cadastra(negociacao)
    {
      return  ConnectionFactory
              .getConnection()
              .then(conection => new NegociacaoDao(conection))  
              .then(dao => dao.adiciona(negociacao))
              .then(()=>'Negociacao Adiconada com Sucesso')
              .catch(() =>{
                        throw new Error ( 'Nao foi possivel adiconar uma negociacao')
                    }) 
    }

    lista(){

        return  ConnectionFactory
                .getConnection()
                .then(conection => new NegociacaoDao(conection))  
                .then(dao => dao.listaTodos())
                .catch(erro => {
                    console.log(erro)
                    throw new Error('Nao Foi Possivel Adicionar uma negociação')
                })
                
        
    }

    apaga(){

        ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagatodos())
        .then(() => 'Negociacoes apagada com sucesso')
        .catch(erro =>{
            console.log(erro)
            throw new Error('Não foi possivel apagar as negociaçoes')
        })

    }
}

