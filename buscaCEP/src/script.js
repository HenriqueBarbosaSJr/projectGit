// Referências do DOM-HTML
const inpCEP = document.getElementById('inpCEP');
const pLogradouro = document.getElementById('pLogradouro');
const pBairro = document.getElementById('pBairro');
const pLocalidade = document.getElementById('pLocalidade');
const btnConsultar = document.getElementById('btnConsultar');


//lógica

function linpaDados(){
    pLogradouro.innerHTML = '';
    pBairro.innerHTML = '';
    pLocalidade.innerHTML ='';
    
}
// aula
const api = axios.create({
    baseURL:'http://viacep.com.br/ws/'
});


async function buscaCEP(CEP){
    try {
        
        if(CEP.length == 8){
            const response = await api.get(CEP + '/json/');    
            console.log(response);
            const { logradouro, bairro, localidade, erro } = response.data;
            console.log(erro);
            if (erro != 'true'){
                pLogradouro.innerHTML = logradouro;
                pBairro.innerHTML = 'Bairro: ' + bairro;
                pLocalidade.innerHTML ='Cidade: ' + localidade;
            }else{
                console.log(`CEP: ${CEP} não encontrado !`);
            }
        }else{

            console.log(`Digite o CEP: ${CEP} corretamente !`);
        }
              
        
    } catch (error) {
        console.log(`Digite o CEP: ${CEP} corretamente !!`);        
    }
}

btnConsultar.onclick = (e) =>{
    e.preventDefault(); // Desabilita o comportamento padrão do form 
                        // Evita o recarregamento da página
    linpaDados();
    let CEP = inpCEP.value.replace('-', '');
    console.log(CEP);
    buscaCEP(CEP);
};