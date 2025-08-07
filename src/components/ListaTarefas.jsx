import { useContext, useState, useRef, useCallback, useEffect, memo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Tarefas from "./Tarefas";
import { TarefaContext } from "../contexts/TarefaContext";

const ListaTarefas = () => {

    const mock = [
        {id:1 , tarefa:'Fazer um script de lista de tarefas.', marcada: false},
        {id:2 , tarefa:'Entregar a lista de tarefas até hoje.', marcada: false},
        {id:3 , tarefa:'Fazer um bolo para a Ana minha esposa.', marcada: false},
    ];
    const [tarefas, setTarefas] = useState([]);
    const [nomeTarefa,useNomeTarefa] = useState('');
    const carregado = useRef(false);
    const {filtroAtivo} = useContext(TarefaContext);
    const storage = useLocalStorage();

    const handlerSubmit = (e) => {
        e.preventDefault();
        
        if (!nomeTarefa.trim()){
        alert("Insira um nome valido para a tarefa!")
        return;
        }

        setTarefas(prev => [...prev, {id: prev.length+1, tarefa: nomeTarefa.trim(), marcada: false}])
        
        useNomeTarefa('');
    };

    const handlerDeleteTarefa = useCallback((id) => {
        setTarefas(prev => prev.filter(t => t.id !== id));
        setTarefas(prev => prev.map((t, index) => ({ ...t, id: index+1})));
    },[]);
    
    const handlerCheckbox = useCallback((id) => {
        setTarefas(prev => prev.map(t =>  t.id === id ? { ...t, marcada: !t.marcada} : t));
    },[]);

    useEffect(() => {
        if (carregado.current){
            storage.setData('lista', tarefas);
        };
    },[tarefas]);

    useEffect(() => {
        const tarefaStorage = storage.getData('lista') || mock;
        setTarefas(tarefaStorage);
        carregado.current = true;
    },[]);

    return (
        <div className='lista'>
            <form onSubmit={handlerSubmit}>
                <p className="titulo">Adicionar tarefa</p>

                <label htmlFor='nome' className="titulo">Tarefa: </label>
                <input type='text' id='nome' onChange={(e) => useNomeTarefa(e.target.value)} value={nomeTarefa}/>
                <button type='submit' className="botao">Enviar Tarefa</button>
            </form>

            <h2 className="titulo">Tarefas</h2>

            <ul>
                {tarefas.length != 0 ? tarefas
                .filter((tarefa) => {
                switch(filtroAtivo){
                    case 'Todos':
                    return true; 

                    case 'Concluídas':
                    return tarefa.marcada;
                    
                    case 'Pendentes':
                    return !tarefa.marcada;
                }
                })
                .map((tarefa) => (
                <Tarefas 
                    key={tarefa.id} 
                    tarefa={tarefa} 
                    onToggle={handlerCheckbox}
                    onDelete={handlerDeleteTarefa}
                    filtro={filtroAtivo}
                />
                )) : <h1>Sem tarefas</h1>}
            </ul>
        </div>
    );
};

export default memo(ListaTarefas);