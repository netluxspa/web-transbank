
const Errores_Transaction = {
    '0': 'Pago exitoso',
    '-1': 'Tarjeta inválida',
    '-2': 'Error de conexión',
    '-3': 'Excede monto máximo',
    '-4': 'Fecha de expiración inválida',
    '-5': 'Problema en autenticación',
    '-6': 'Rechazo general',
    '-7': '	Tarjeta bloqueada',
    '-8': 'Tarjeta vencida',
    '-9': 'Transacción no soportada',
    '-10': 'Problema en la transacción'
}

const Errores_Autenticacion = {
    'TSY': 'Autenticación exitosa',
    'TSN': 'Autenticación fallida',
    'TO': 'Tiempo máximo excedido para autenticación',
    'ABO': 'Autenticación abortada por tarjetahabiente',
    'U3': 'Error interno en la autenticación',
    'NP': 'No Participa, probablemente por ser una tarjeta extranjera que no participa en el programa 3DSecure)',
    'ACS2': 'Autenticación fallida extranjera',
    '': 'No hubo Autenticación'
}

const Tipos_Targeta = {
    'VD': 'Venta Débito',
    'VN': 'Venta Normal',
    'VC': 'Venta en cuotas',
    'SI': '3 cuotas sin interés',
    'S2': '2 cuotas sin interés',
    'NC': 'N Cuotas sin interés',
    'VP': 'Venta Prepago',
} 

export const ErroresTransaction = ({num}) => {
    return `${Errores_Transaction[num]}` ;
}

export const ErroresAutenticacion = ({code}) => {
    return `${Errores_Autenticacion[code]}` ;
}

export const TiposTargeta = ({code}) => {
    return `${Tipos_Targeta[code]}` ;
}

