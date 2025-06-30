import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";

const form = document.querySelector('form')
const selectedDate = document.getElementById('date')
const clientName = document.getElementById('client')

// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')

// Carrega a data atual e define a data mínima com base na data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
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
        
        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, 'hour')
        
        const id = new Date().getTime()
    
        await scheduleNew({
            id,
            name,
            when
        })

    } catch (error) {
        alert('Não foi possível realizar o agendamento.')
        console.log(error);
    }
}