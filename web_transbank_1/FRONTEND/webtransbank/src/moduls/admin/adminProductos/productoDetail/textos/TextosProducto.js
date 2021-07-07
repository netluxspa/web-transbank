
import React, { useState } from 'react';
import { connect } from 'react-redux';

import TextoCreate from './textoCreate/TextosCreate';
import TextoEdit from './textoEdit/TextoEdit';
import TextosList from './textosList/TextosList';
import TextoDetail from './textoDetail/TextoDetail';


const TextosProducto = ({productoSelected}) => {

    const [selectedComponent, setSelectedComponent] = useState(1)
    const [textoEdit, setTextoEdit] = useState(null)
    const [textoDetail, setTextoDetail] = useState(null)

    const components = {
        1: <TextosList 
                go={c=>setSelectedComponent(c)} 
                edit={t=>{setTextoEdit(t); setSelectedComponent(3)}} 
                producto={productoSelected} 
                goDetail={t=>{setTextoDetail(t); setSelectedComponent(4)}}
            />,
        2: <TextoCreate go={c=>setSelectedComponent(c)} producto={productoSelected} />,
        3: <React.Fragment>{ textoEdit ? <TextoEdit go={c=>setSelectedComponent(c)} texto={textoEdit}   /> : null}</React.Fragment>,
        4: <React.Fragment>{ textoDetail ? <TextoDetail go={c=>setSelectedComponent(c)} texto={textoDetail}   /> : null}</React.Fragment>
    }


    return (
        <div>
           
            <div>
                {components[selectedComponent]}
            </div>
        </div>
        )
}


const mapStateToProps = state => {
    return {
        productoSelected: state.productoAdmin
    }
}

export default connect(mapStateToProps, {})(TextosProducto);