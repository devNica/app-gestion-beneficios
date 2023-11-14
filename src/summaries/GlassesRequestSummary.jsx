import './glasses-request-summary.css'
import {useGlassesRequestManagement} from "../hooks/useGlass.js";
import {useEffect, useState} from "react";
import {convertDateFromISOFormatToLocal} from "../utils/date.util.js";

const fieldName = ['ESF', 'CIL', 'EJE', 'D.P', 'PRISMA', 'BASE', 'ADICION', 'AV']

const GlassesRequestSummary = () => {
    
    const { states: { generalInfoReq, ophthalmicInfoReq, supportsReq} } = useGlassesRequestManagement()
    const [diagnosis, setDiagnosis] = useState('')
    
    
    useEffect(()=>{
        const diagnosis = ophthalmicInfoReq.diagnosis.map(r => (r.value))
        setDiagnosis(diagnosis.join(', '))
    },[])
        
    const RightEye = ophthalmicInfoReq.rightEye.map((data, index) => {
        return (
            <div className={'oph-info'} key={`reye-${index}`}>
                <span className={'title'}>{fieldName.at(index)}: </span>{Object.values(data)[0]}
            </div>
        )
    })
    
    const LeftEye = ophthalmicInfoReq.leftEye.map((data, index) => {
        return (
            <div className={'oph-info'} key={`leye-${index}`}>
                <span className={'title'}>{fieldName.at(index)}: </span>{Object.values(data)[0]}
            </div>
            )
    })
    
    return (
        <div className='glasses__request-summary'>
            <h1 className={'main-title'}>Resumen de Solicitud</h1>
            <div className='summary'>
                <div className='summary__gnral-info'>
                    <span><h3 className='title'>Fecha Solicitud:</h3>{convertDateFromISOFormatToLocal(generalInfoReq.registerDate)}</span>
                    <span><h3 className='title'>Beneficiario:</h3>{`${generalInfoReq.beneficiary.name} ${generalInfoReq.beneficiary.surname}`}</span>
                    <span><h3 className='title'>Notas:</h3>{generalInfoReq.notes}</span>
                    <span><h3 className='title'>Monto Autorizado:</h3>{generalInfoReq.authorizedAmount.currency}</span>
                    <span><h3 className='title'>Tipo de Pago:</h3>{generalInfoReq.paymentType.value}</span>
                </div>
                <div className='summary__oph-info'>
                    <span><h3 className='title'>Clinica:</h3>{generalInfoReq.clinic.value}</span>
                    <div className='exam__summary'>
                        <div className={'reye'}>
                            <span className={'oph__main-title'}>Derecho</span>
                            { RightEye }
                        </div>
                        <div className={'leye'}>
                            <span className={'oph__main-title'}>Izquierdo</span>
                            { LeftEye }
                        </div>
                        
                    </div>
                    <span><h3 className='title'>Diagnostico:</h3>{diagnosis}</span>
                </div>
                
                <div className={'summary__glass-info'}>
                    <div className={'spec'}>
                        <span><h3 className='title'>Tipo:</h3>{ophthalmicInfoReq.lenType.value}</span>
                        <span><h3 className='title'>Material:</h3>{ophthalmicInfoReq.lenMaterial.value}</span>
                        <span><h3 className='title'>Detalle:</h3>{ophthalmicInfoReq.lenDetail.value}</span>
                    </div>
                   
                    <div className={'supports'}>
                        {
                            supportsReq.hasProform ?
                                 <div className={'proforma'}>
                                     <h3 className={'support-title'}>Proforma</h3>
                                     <span><h3 className='title'>Fecha:</h3>{convertDateFromISOFormatToLocal(supportsReq.proforma.date)}</span>
                                     <span><h3 className='title'>Numero:</h3>{supportsReq.proforma.serie}</span>
                                     <span><h3 className='title'>Monto:</h3>{supportsReq.proforma.amountInCS}</span>
                                 </div>
                                : <></>
                                
                        }
                       
                        {
                            supportsReq.hasInvoice ?
                                <div className={'invoice'}>
                                    <h3 className={'support-title'}>Factura</h3>
                                    <span><h3 className='title'>Fecha:</h3>{convertDateFromISOFormatToLocal(supportsReq.invoice.date)}</span>
                                    <span><h3 className='title'>Numero:</h3>{supportsReq.invoice.serie}</span>
                                    <span><h3 className='title'>Monto:</h3>{supportsReq.invoice.amountInCS}</span>
                                </div>
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlassesRequestSummary