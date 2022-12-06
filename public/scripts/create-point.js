function populateUF () {
    const ufselect = document.querySelector("select[name=UF]")

    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() )
    .then ( states => {

        for(const state of states) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUF()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufvalue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch (url)
    .then ( res => res.json() )
    .then ( cities => {
//Por padrão, os muncípios são ordenados pela propriedade id, que corresponde ao respectivo identificador do município. Se desejar ordenar alfabeticamente pelo nome do município, use o parâmetro orderBy com o valor nome
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled  = false;

    } )
}

document
    .querySelector("select[name=UF]")
    .addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected");
    const itemId = event.target.dataset.id; //add ou remover classes com js

    //pegar itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item) {
        const itemFound = item == itemId //retorna true ou false
        return itemFound
    })

    //se já estiver selecionado
    if(alreadySelected >= 0) {

        //remover itens selecionados
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
    
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}





