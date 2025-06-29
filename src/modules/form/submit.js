import dayjs from "dayjs";

const form = document.querySelector('form')
const selectedDate = document.getElementById('date')
const clientName = document.getElementById('client')

// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')

// Carrega a data atual e define a data mínima com base na data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = (event) => {
    event.preventDefault()

    try {
        // Recupera o nome do cliente
        const name = clientName.value.trim()

        if(!name) {
            return alert('Insira o nome do cliente!')
        }

        // Recupera o horário selecionado
        const hourSelected = document.querySelector('.hour-selected')
        
        // Recupera o horário selecionado
        if(!hourSelected) {
            return alert('Você deve selecionar um horário!')
        }

        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(':')
        console.log(hour);
        
        // Insere a hora na data
        const when = dayjs(selectedDate.value).format('DD/MM/YYYY').add(hour, 'hour')
        console.log(when);
        
        const id = new Date().getTime()
        
        console.log({
            id,
            name,
            when
        });

    } catch (error) {
        alert('Não foi possível realizar o agendamento.')
        console.log(error);
    }
}