
export function loadDataServer(){
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response)=>response.json())
    .then((dataServer)=>{
      console.log(dataServer);
    });
}
