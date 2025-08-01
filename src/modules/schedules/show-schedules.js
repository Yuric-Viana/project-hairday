import dayjs from "dayjs";

const periodMorning = document.getElementById('period-morning')
const periodAfternoon = document.getElementById('period-afternoon')
const periodNight = document.getElementById('period-night')

export function showSchedules({ dailySchedules }) {
    try {
        periodMorning.innerHTML = ''
        periodAfternoon.innerHTML = ''
        periodNight.innerHTML = ''

        dailySchedules.forEach((schedule) => {
            const item = document.createElement('li')
            const time = document.createElement('strong')
            const name = document.createElement('span')

            // Adiciona o id gerado na API no agendamento
            item.setAttribute('data-id', schedule.id)

            time.textContent = dayjs(schedule.when).format('HH:mm')
            name.textContent = schedule.name

            // Cria o ícone de cancelar o agendamento
            const cancelIcon = document.createElement('img')
            cancelIcon.classList.add('cancel-icon')
            cancelIcon.setAttribute('src', './src/assets/cancel.svg')
            cancelIcon.setAttribute('alt', 'Cancelar')

            item.append(time, name, cancelIcon)

            // Obtém somente a hora
            const hour = dayjs(schedule.when).hour()

            // Renderiza o agendamento na seção (manhâ, tarde, noite)
            if(hour <= 12) {
                periodMorning.appendChild(item)
            } else if(hour > 12 && hour <= 18) {
                periodAfternoon.appendChild(item)
            } else {
                periodNight.appendChild(item)
            }

        });
        
    } catch (error) {
        console.log(error);
        alert('Não foi possível exibir os agendamentos.')
    }
}