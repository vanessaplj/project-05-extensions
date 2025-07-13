/*--COLORS---------------------------------------------------------------------------------------*/
const button = document.getElementById('colorbtn');
const lmode = document.getElementById('lightmode');

button.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        lmode.src = './img/icon-moon.svg';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        lmode.src = './img/icon-sun.svg';
    }
});
/*--FILTERS---------------------------------------------------------------------------------------*/
const container = document.getElementById('filters'); //Seleciona a div
const buttons = container.querySelectorAll('.radio-btn'); //Seleciona os botoes na div

buttons.forEach(button => { //Percorre os botões
    button.addEventListener('click', () => { //Espera o click
        buttons.forEach(btn => btn.classList.remove('active')); //Desativa todos os botões
        button.classList.add('active'); //Ativa somente o botão clicado
        load();
    });
});
/*--CARDS---------------------------------------------------------------------------------------*/
const dbpath = './db/data.json';
let state = {
    div: document.getElementById("resultado")
}
function load() {
    state.div.innerHTML = ''
    fetch('./db/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const activeButton = document.querySelector('#filters .radio-btn.active');
                const cardremove = sessionStorage.getItem(`removed-${i}`);
                if(cardremove!==`true`){
                
                const savedState = localStorage.getItem(`switchState-${i}`);
                let check;
                if(savedState!== null){
                    check = savedState === "true" ? "checked" : "";
                } else {
                    check = data[i].isActive ? "checked" : "";
                }
    /*--ALL-------------------------------------------------------------------------*/                
                if (activeButton && activeButton.textContent === "All") {
                    state.div.innerHTML += `
                    <div class="fakecard shadow">
                        <div class="card-top">
                            <div>
                                <img src="${data[i].logo}" class="logo" alt="Extension icon">
                            </div>
                            <div class="card-body">
                                <h2>${data[i].name}</h2>
                                <p>${data[i].description}</p>
                            </div>
                        </div>
                        <div class="card-bottom">
                            <button type="button" class="btn botao" data-bs-toggle="button" id="remove-${i}">Remove</button>
                            <div class="form-check form-switch" id="dataswitch">
                                <input class="form-check-input" type="checkbox" role="switch" id="switch-${i}"  ${check}>
                            </div>
                        </div>
                    </div>`
    /*--ACTIVE------------------------------------------------------------------*/                    
                } else if (activeButton && activeButton.textContent === "Active") {
                    if (check) {
                        state.div.innerHTML += `
                        <div class="fakecard shadow">
                            <div class="card-top">
                                <div>
                                    <img src="${data[i].logo}" class="logo" alt="Extension icon">
                                </div>
                                <div class="card-body">
                                    <h2>${data[i].name}</h2>
                                    <p>${data[i].description}</p>
                                </div>
                            </div>
                            <div class="card-bottom">
                                <button type="button" class="btn botao" data-bs-toggle="button" id="remove-${i}">Remove</button>
                                <div class="form-check form-switch" id="dataswitch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="switch-${i}" ${check}>
                                </div>
                            </div>
                        </div>`
                    };
    /*--INACTIVE----------------------------------------------------------------*/                    
                } else if (activeButton && activeButton.textContent === "Inactive") {
                    if (!check) {
                        state.div.innerHTML += `
                        <div class="fakecard shadow">
                            <div class="card-top">
                                <div>
                                    <img src="${data[i].logo}" class="logo" alt="Extension icon">
                                </div>
                                <div class="card-body">
                                    <h2>${data[i].name}</h2>
                                    <p>${data[i].description}</p>
                                </div>
                            </div>
                            <div class="card-bottom">
                                <button type="button" class="btn botao" data-bs-toggle="button" id="remove-${i}">Remove</button>
                                <div class="form-check form-switch" id="dataswitch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="switch-${i}" ${check}>
                                </div>
                            </div>
                        </div>`
                    };
                }
            }
                
            }
            for(let i=0; i<data.length; i++){
                const checkbox = document.getElementById(`switch-${i}`);
                if (checkbox) {
                    checkbox.addEventListener("change", () => {
                    localStorage.setItem(`switchState-${i}`, checkbox.checked);
                    });
                }
                const remover = document.getElementById(`remove-${i}`);
                if (remover) {
                    remover.addEventListener("click", () => {
                    sessionStorage.setItem(`removed-${i}`, `true`);
                    const card = remover.closest(".fakecard");
    if (card) {
        card.remove();
    }
                    });
                }
            }    
        })
        .catch(error => {
            console.error('There was a problem:', error);
        });
}
load();
/*--------------------------------------------------------------------------------------------------*/
