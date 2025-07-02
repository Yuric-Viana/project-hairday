export function hourClick() {
    const hours = document.querySelectorAll('.hour-available')

    // Percorre todos os horários disponíveis
    hours.forEach((available) => {
        // Adiciona um evento de clique a cada horário
        available.addEventListener('click', (selected) => {
            // Remove a classe 'hour-selected' de todos os horários
            hours.forEach((hour) => {
                hour.classList.remove('hour-selected')
            })

            // Adiciona a classe 'hour-selected' ao horário clicado
            selected.target.classList.add('hour-selected')
        })
    })
}
