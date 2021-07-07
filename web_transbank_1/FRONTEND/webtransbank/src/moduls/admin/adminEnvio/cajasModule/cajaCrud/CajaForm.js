import { TextField } from "@material-ui/core";

const CajaForm = ({data, sendData}) => {

    const form = data =>  {
        return (
            <div
                style= {{display: 'grid', gap: '20px', gridTemplateColumns:'1fr'}}
            >
                <div>
                    <TextField 
                        style={{width:'100%'}}
                        size='small'
                        label='etiqueta'
                        variant='outlined'
                        value={data.titulo}
                        onChange={e=>sendData({titulo: e.target.value})}
                    />

                </div>



                <div>

                    <TextField 
                        style={{width:'100%'}}
                        size='small'
                        label='largo'
                        variant='outlined'
                        value={data.largo}
                        onChange={e=>sendData({largo: e.target.value})}
                    />

                </div>


                <div>
                    <TextField 
                            style={{width:'100%'}}
                            size='small'
                            label='ancho'
                            variant='outlined'
                            value={data.ancho}
                            onChange={e=>sendData({ancho: e.target.value})}
                        />
                </div>


                <div>
                    <TextField 
                        style={{width:'100%'}}
                        size='small'
                        label='alto'
                        variant='outlined'
                        value={data.alto}
                        onChange={e=>sendData({alto: e.target.value})}
                    />
                </div>


            </div>
        )
    }


    return (
        <div>
            {
                data ?
                form(data)
                :
                null
            }
        </div>
    );
}

export default CajaForm;