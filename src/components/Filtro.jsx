import { memo } from "react";

const Filtro = ({filtro, onChange, marcado}) => {
    return (
        <>
            <label htmlFor={filtro}>{filtro} <input type="radio" name="filtro" id={filtro} checked={marcado == filtro ? true : false} onChange={() => onChange(filtro)} /></label>
            
        </>
    );
};

export default memo(Filtro);