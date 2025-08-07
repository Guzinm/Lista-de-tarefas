import { memo } from "react"

const Tarefas = ({tarefa, onToggle, onDelete}) => {
    return (
        <>
            <li className="tarefa"> {tarefa.tarefa} <input type='checkbox' onChange={() => onToggle(tarefa.id)} checked={tarefa.marcada}/> <button onClick={() => onDelete(tarefa.id)}>Excluir tarefa</button> </li>   
        </>
    )
};

export default memo(Tarefas);