

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    this.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });

    let isValid = true;

    this.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    const userType = document.getElementById("userType").value;
    switch(userType) {
        case "alunoFAC":
        case "alunoETTD":
            window.location.href = "index.html";
            break;
        case "alunoCOL":
            window.location.href = "login_ALUNO_COL.html";
            break;
        case "professor":
            window.location.href = "login_PROF.html";
            break;
        default:
            alert("Tipo de usuário inválido");
    }
});

function Verificacao(){

    let todosPreenchidos = true;

    document.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            todosPreenchidos = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    const requiredSelects = ["inputSEXO", "inputEST_CIV"];
    requiredSelects.forEach(id => {
    const select = document.getElementById(id);
    if (!select || select.value === "") {
        select.classList.add('is-invalid');
        todosPreenchidos = false;
    } else {
            select.classList.remove('is-invalid');
        }
});


    const birthDateInput = document.getElementById("inputDTA_NASC");
    if (!birthDateInput.value) {
        birthDateInput.classList.add("is-invalid");
        todosPreenchidos = false;
    } else {
        const minValidDate = new Date();
        minValidDate.setFullYear(minValidDate.getFullYear() - 18);
        
        if (new Date(birthDateInput.value) > minValidDate) {
            birthDateInput.classList.add("is-invalid");
            alert("Idade mínima: 18 anos completos");
            todosPreenchidos = false;
        } else {
            birthDateInput.classList.remove("is-invalid");
        }
    }

    const termos = document.getElementById("Termos")

    if(!termos || !termos.checked){
        todosPreenchidos = false;
    }

    if(todosPreenchidos){
        alert("Formulário enviado.")
    }
    else{
        alert("Por favor preencha todos os campos.")
        return false;
    }
}

function switchSel(selectedId) {
    const valores = ['COL_TEC', 'GRAD_FAC', 'POS_GRAD'];
    
    
    valores.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });
    
   
    if (selectedId !== 'TEC_AGRO' && document.getElementById(selectedId)) {
        document.getElementById(selectedId).style.display = 'block';
    }
}


document.querySelector('button[type="reset"]').addEventListener('click', function() {
      
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        

        document.querySelectorAll('.radio-container.is-invalid, .checkbox-container.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
    });

function limpa_formulário_cep() 
{

    document.getElementById('inputENDERECO').value=("");
    document.getElementById('inputBAIRRO').value=("");
    document.getElementById('inputCIDADE').value=("");
    document.getElementById('inputUF').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('inputENDERECO').value=(conteudo.logradouro);
    document.getElementById('inputBAIRRO').value=(conteudo.bairro);
    document.getElementById('inputCIDADE').value=(conteudo.localidade);
    document.getElementById('inputUF').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('inputENDERECO').value="...";
        document.getElementById('inputBAIRRO').value="...";
        document.getElementById('inputCIDADE').value="...";
        document.getElementById('inputUF').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

/* FIM FUNCAO CEP */