import { useState, useCallback } from 'react'
import { TarefaContext } from './contexts/TarefaContext';
import Filtro from './components/Filtro';
import ListaTarefas from './components/listaTarefas';
import './App.css';

function App() {

  const filtros = [
    'Todos','Concluídas','Pendentes'
  ];
  
  const [filtroAtivo, setFiltro] = useState('Todos');
  
  const handlerFilterChange = useCallback((nome) => {
    setFiltro(nome);
  },[]);
  
  return (
    <TarefaContext.Provider value={{filtroAtivo}}>

      <ul className='filtros'>
        <p className='titulo'>Filtro:</p>
        {filtros.map((tipo) => (
          <Filtro key={tipo} filtro={tipo} marcado={filtroAtivo} onChange={handlerFilterChange}/>
        ))}
      </ul>

      <ListaTarefas/>

    </TarefaContext.Provider>
  );
};

export default App;