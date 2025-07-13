import { openingHours } from '../../utils/opening-hours.js'
import dayjs from 'dayjs'
import { hourClick } from './hour-click.js'

const listHours = document.getElementById('hours')

export function hoursLoad({ date, dailySchedules }) {
    listHours.innerHTML = ''

    const unavailableHours = dailySchedules.map((hour) => dayjs(hour.when).format('HH:mm')) 

    const opening = openingHours.map((hour) => {
        listHours.innerHTML = ''

        // Recupera somente a hora
        const [scheduleHour] = hour.split(':')

        // Adiciona a hora na data e verifica se está no futuro
        const isHourPresent = dayjs(date).add(scheduleHour, 'hour').isBefore(dayjs())

        const available = !String(unavailableHours).includes(hour) && !isHourPresent        

        // Define se o horário está disponível
        return {
            hour,
            available
        }
    })

    // Renderiza os horários
    opening.forEach(({ hour, available }) => {
        const li = document.createElement('li')

        li.classList.add('hour')
        li.classList.add(available ? 'hour-available' : 'hour-unavailable')
        li.textContent = hour

        if (hour === '9:00') {
            hourHeaderAdd('Manhã')
        } else if (hour === '13:00') {
            hourHeaderAdd('Tarde')
        } else if (hour === '19:00') {
            hourHeaderAdd('Noite')
        }

        listHours.append(li)
    })

    hourClick()
}

function hourHeaderAdd(title) {
    const header = document.createElement('li')
    header.classList.add('hour-period')
    header.textContent = title

    listHours.append(header)
}