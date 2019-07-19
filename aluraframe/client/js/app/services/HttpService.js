class HttpService {
  
    _handleErros(res){

       if(!res.ok) throw new Error(res.statusText1)
       return res
    }



    get(url) 
    {
       return fetch(url)
        .then(res => this._handleErros(res))
        .then(res =>  res.json())
       
    }
}