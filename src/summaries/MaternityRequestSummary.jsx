import './maternity-request-summary.css'
import {useMaternityRequestManagement} from "../hooks/useMaternity.js";
import {convertDateFromISOFormatToLocal} from "../utils/date.util.js";

const MaternitySummaryRequest = () => {
    
    const { states: { generalInfoReq, newBornInfoReq, markedChildren } } = useMaternityRequestManagement()
    
    const children = markedChildren.map((child)=>(
        <tr key={child.id} className={'tbody__children-data'}>
           <td>{child.relationship}</td>
            <td>{child.fullname}</td>
            <td>{convertDateFromISOFormatToLocal(child.birthdate)}</td>
            <td>{child.sex}</td> 
        </tr>
    ))
    
    return(
        <div className={'maternity__resquest-summary'}>
                <div className={'summary'}>
                    <div className='summary__gnral-info'>
                        <span><h3 className='title'>Fecha Solicitud:</h3>{convertDateFromISOFormatToLocal(generalInfoReq.registerDate)}</span>
                        <span><h3 className='title'>Beneficiario:</h3>{`${generalInfoReq.beneficiary.name} ${generalInfoReq.beneficiary.surname}`}</span>
                        <span><h3 className='title'>Notas:</h3>{generalInfoReq.notes}</span>
                        <span><h3 className='title'>Monto Autorizado:</h3>{newBornInfoReq.amountInUS}</span>
                        <span><h3 className='title'>Tipo de Pago:</h3>{generalInfoReq.paymentType.value}</span>
                    </div>
                    
                    <div className={'summary__parental-info'}>
                        <table className={'table__children'}>
                            <thead className={'thead__children'}>
                                <tr className={'thead__children-title'}>
                                    <th>Parentesco</th>
                                    <th>Nombre</th>
                                    <th>Fecha Nac</th>
                                    <th>Sexo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    )
}


export default MaternitySummaryRequest