import { openingHours } from '../../utils/opening-hours.js'
import dayjs from 'dayjs'

const listHours = document.getElementById('hours')

export function hoursLoad({ date }) {
    const opening = openingHours.map((hour) => {
        // Recupera somente a hora
        const [scheduleHour] = hour.split(':')

        // Adiciona a hora na data e verifica se está no passado
        const isHourPast = dayjs(date).add(scheduleHour, 'hour').isAfter(dayjs())

        // Define se o horário está disponível
        return {
            hour,
            available: isHourPast
        }
    })    

    // Renderiza os horários
    opening.forEach(({hour, available}) => {
        const li = document.createElement('li')

        li.classList.add('hour')
        li.classList.add(available ? 'hour-available' : 'hour-unavailable')

        li.textContent = hour
        listHours.append(li)        
    })
}