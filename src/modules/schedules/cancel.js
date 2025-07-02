import { scheduleCancel } from "../../services/schedule-cancel.js"
import { schedulesDay } from "./load.js"

const periods = document.querySelectorAll('.period')

periods.forEach((period) => {
    period.addEventListener('click', async (event) => {     
        try {
            if (event.target.classList.contains('cancel-icon')) {
                const item = event.target.closest('li')
                
                const { id } = item.dataset
                console.log(item, id);
    
                if(id) {
                    const isConfirm = confirm('Tem certeza que deseja cancelar o agendamento ?')
    
                    if(isConfirm) {
                        await scheduleCancel({ id })
                        
                        schedulesDay()
                    }
                }
            }
                
        } catch (error) {
            console.log(error);
            alert('Não foi possível cancelar o agendamento. Entre em contato com um de nossos colaboradores.')
        }   

    })
})