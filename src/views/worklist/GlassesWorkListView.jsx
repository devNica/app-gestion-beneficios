import { useState } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import CustomNotification from '../../Components/Notification/CustomNotification'
import { useGlassesRequestManagement } from '../../hooks/useGlass'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ReactTooltip from 'react-tooltip'

import { approvedRequestStatusAPI, archiveRequestStatusAPI, confirmedRequestStatusAPI, rejectedRequestStatusAPI, servedRequestStatusAPI, updGlassesRequestRefAPI } from '../../service/glasses.api'
import { setNotification } from '../../redux/notification.slice'

import { loadRequestsInProcess } from '../../redux/glass.slice'

import CustomDialog from '../../Components/Dialog/Dialog'
import { useTrackingProps } from '../../hooks/useTracking'
import { getCurrentDateString } from '../../utils/date.util'
import { isEmpty } from 'lodash'

import './work-list-view.css'
import PaymentPlanForm from '../../Forms/GlassesBenefit/PaymentPlanForm'
import Modal from '../../Components/Modal/Modal'
import { fetchPaymentPlanPropsAPI } from '../../service/payments.api'
import { loadPaymentPlanProps } from '../../redux/payment.slice'

const GlassesWorkListView = () => {

    CustomNotification()
    const { states } = useGlassesRequestManagement()
    const { user } = useSelector(state => state.auth)

    const [record, setRecord] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [letterRef, setLetterRef] = useState('')
    const [hashDate, setHashDate] = useState(getCurrentDateString('.', new Date().toISOString().slice(0, 10)))
    const [paymentModal, setPaymentModal] = useState(false)

    const navigate = useNavigate()
    const { actions: trackingAct } = useTrackingProps()

    const dispatch = useDispatch()

    const editingProcess = 'GL-EDIT'
    const registeringProcess = 'GL-REG'

    async function generarPDF() {
        fetch(`${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_API_PREFIX}/glasses/download/letter-to-optician`, {
            body: JSON.stringify({ requestId: record.id, username: user.username, typeSerie: record.typeSerie }), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res => {
            return res
                .arrayBuffer()
                .then(res => {
                    const blob = new Blob([res], { type: 'application/pdf' })
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'report.pdf'
                    link.click();
                })
                .catch(e => alert(e)).finally(() => {
                    // updateRecordStatus(currentRecord.recordId)
                })
        }).catch(err => {
            console.log(err);
        })
    }

    function onDialog(choose) {
        if (choose) {
            trackingAct.trackingUpdate({
                typeAction: 'freeUpSpace',
                space: 'glass'
            })
            setIsOpen(false)
            goToEdit()
        } else {
            setIsOpen(false)
        }
    }

    function goToEdit() {

        trackingAct.trackingUpdate({
            typeAction: 'add',
            data: {
                message: '',
                space: 'glass',
                mode: 'edit',
                procIdentity: editingProcess
            },
            space: 'glass'
        })

        navigate(`/glasses/edit/${record.id}`)

    }

    function handleEditRecord() {
        if (record.reqStatusId === 6) {
            dispatch(setNotification({
                message: 'Este registro no admite edicion',
                type: 'info',
                delay: 1500
            }))
        } else {
            if (trackingAct.findTrack({ procIdentity: registeringProcess })) {
                setIsOpen(true)
            } else {
                goToEdit()
            }
        }
    }


    function handleRecordSelection(data) {
        console.log(data)
        setRecord(data)
        setLetterRef(data.letterRef)
    }

    async function approvedRequest() {
        await approvedRequestStatusAPI(record.id).then(res => {

            dispatch(loadRequestsInProcess(res.data))

            dispatch(setNotification({
                message: 'Solicitud Aprobada Satisfactoriamente',
                type: 'success',
                delay: 1500
            }))

            setRecord(null)


        }).catch(err => {
            dispatch(setNotification({
                message: String(err),
                type: 'danger',
                delay: 1500
            }))
        })

    }

    async function confirmedRequest() {
        await confirmedRequestStatusAPI(record.id).then(res => {

            dispatch(loadRequestsInProcess(res.data))

            dispatch(setNotification({
                message: 'Solicitud Confirmada Satisfactoriamente',
                type: 'success',
                delay: 1500
            }))

            setRecord(null)


        }).catch(err => {
            dispatch(setNotification({
                message: String(err),
                type: 'danger',
                delay: 1500
            }))
        })

    }

    async function archiveRequest() {
        await archiveRequestStatusAPI(record.id).then(res => {

            dispatch(loadRequestsInProcess(res.data))

            dispatch(setNotification({
                message: 'Solicitud Archivada',
                type: 'info',
                delay: 1500
            }))

            setRecord(null)


        }).catch(err => {
            dispatch(setNotification({
                message: String(err),
                type: 'danger',
                delay: 1500
            }))
        })
    }

    async function servedRequest() {
        await servedRequestStatusAPI(record.id).then(res => {
            if (res.data?.error) {
                console.log(res.data)
                dispatch(setNotification({
                    message: res.data.message,
                    type: 'error',
                    delay: 1500
                }))
                return 
            } else {
                dispatch(loadRequestsInProcess(res.data))

                dispatch(setNotification({
                    message: 'Solicitud Atendida',
                    type: 'info',
                    delay: 1500
                }))

                setRecord(null)
            }
        }).catch(err => {
            dispatch(setNotification({
                message: String(err),
                type: 'danger',
                delay: 1500
            }))
        })

    }


    async function rejectedRequest() {
        await rejectedRequestStatusAPI(record.id).then(res => {

            dispatch(loadRequestsInProcess(res.data))

            dispatch(setNotification({
                message: 'Solicitud Rechazada',
                type: 'info',
                delay: 1500
            }))

            setRecord(null)

        }).catch(err => {
            dispatch(setNotification({
                message: String(err),
                type: 'danger',
                delay: 1500
            }))
        })

    }

    async function updateRequestReference() {
        await updGlassesRequestRefAPI(record.id, { letterRef }).then(res => {

            dispatch(loadRequestsInProcess(res.data))

            dispatch(setNotification({
                message: 'Referencia Actualizada',
                type: 'info',
                delay: 1500
            }))

            setRecord(null)


        }).catch(err => {
            dispatch(setNotification({
                message: String(err),
                type: 'danger',
                delay: 1500
            }))
        })
    }


    function handleKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setLetterRef(prev => {
                const hash = prev.slice(0, (prev.length - 11))
                if (hash.length === 0 || hash.length === 1) {
                    return ''
                } else if (hash.length > 1) {
                    return hash
                }
            })
        }
    }

    function updateDocumentRefs(value) {
        setLetterRef(prev => {
            if (isEmpty(prev)) {
                return value + '.' + hashDate
            } else {
                return value.replace(`.${hashDate}`, '') + '.' + hashDate
            }
        })
    }

    async function openPaymentPlanForm() {
        await fetchPaymentPlanPropsAPI(record.id)
            .then(res => {
                dispatch(loadPaymentPlanProps(res.data))
            })
            .catch(err => console.error(err))

        setTimeout(() => {
            setPaymentModal(true)
        }, 100);
    }

    return (
        <div className="worklist__view">

            <CustomDialog
                isOpen={isOpen}
                positiveActionTitle="Continuar"
                negativeActionTitle="Cancelar"
                onDialog={onDialog}
                showIcons={true}
                message="Tiene pendiente una solicitud sin salvar"
                question="¿Desea perder los cambios realizados?"
            />

            <div className="form__options">

                <div className="header">
                    <div className="header-left">
                        <span className="applicant">{record !== null ? `${record.reqSerie} -|- ${record.fullname}` : '-/-/-/-'}</span>
                        {
                            record !== null && (record.reqStatus === 'SF3' || record.reqStatus === 'SF4') ?
                                <div className="form__group">
                                    <input
                                        id="letterRef"
                                        name="letterRef"
                                        label="Carta con Ref:"
                                        type="text"
                                        value={letterRef !== null ? letterRef : ''}
                                        onKeyDown={handleKeyDown}
                                        onChange={(e) => updateDocumentRefs(e.target.value)}
                                        className='letter__ref'
                                        autoComplete='off'
                                    />
                                    <button type="button" className="btn btn__update-ref" data-tip data-for='btn-ref' onClick={updateRequestReference}>
                                        <i className="bi bi-braces-asterisk"></i>
                                    </button>
                                    <ReactTooltip id='btn-ref' place='bottom'>
                                        Actualizar Referencia
                                    </ReactTooltip>


                                </div>
                                : <></>
                        }
                    </div>

                    {record !== null ?
                        <div className="header-right">

                            {
                                record.reqStatus === 'SF3' && record.hasReference ?
                                    <>
                                        <button className="btn btn__confirmed" data-tip data-for='btn-confirmed' onClick={confirmedRequest}>
                                            <i className="bi bi-lightning-fill"></i>
                                        </button>

                                        <ReactTooltip id='btn-confirmed' place='bottom'>
                                            Confirmar Solicitud
                                        </ReactTooltip>

                                    </> : <></>

                            }


                            {
                                record.reqStatus === 'SF4' && record.hasReference ?
                                    <>
                                        <button className="btn btn__print" data-tip data-for='btn-print' onClick={generarPDF}>
                                            <i className="bi bi-printer-fill"></i>
                                        </button>

                                        <ReactTooltip id='btn-print' place='bottom'>
                                            Imprimir Carta
                                        </ReactTooltip>

                                    </> : <></>
                            }

                            {
                                record.typeSerie !== 'CVN' && record.reqStatus === 'SF5' && record.hasReference ?
                                    <>
                                        <button
                                            onClick={openPaymentPlanForm}
                                            type="button"
                                            className="btn btn__payment"
                                            data-tip data-for='btn-payment-plan'>
                                            <i className="bi bi-calendar-plus-fill"></i>
                                        </button>
                                        <ReactTooltip id='btn-payment-plan' place='bottom'>
                                            Agregar Plan de Pago
                                        </ReactTooltip>


                                    </> :
                                    record.reqStatus === 'SF4' ?
                                        <>
                                            <button
                                                onClick={servedRequest}
                                                type='button'
                                                className='btn btn__served'
                                                data-tip data-for='btn-served'>
                                                <i className="bi bi-patch-check-fill"></i>
                                            </button>
                                            <ReactTooltip id='btn-served' place='bottom'>
                                                Atendida
                                            </ReactTooltip>
                                        </> : <></>
                            }


                            {
                                record.typeSerie !== 'CVN' && record.reqStatus === 'SF1' ? <>

                                    <button className="btn btn__approved" data-tip data-for='btn-approved' onClick={approvedRequest}>
                                        <i className="bi bi-file-earmark-check-fill"></i>
                                    </button>
                                    <ReactTooltip id='btn-approved' place='bottom'>
                                        Aprobar Solicitud
                                    </ReactTooltip>

                                    <button className="btn btn__rejected" data-tip data-for='btn-rejected' onClick={rejectedRequest}>
                                        <i className="bi bi-file-earmark-x-fill"></i>
                                    </button>

                                    <ReactTooltip id='btn-rejected' place='bottom'>
                                        Rechazar Solicitud
                                    </ReactTooltip>
                                </> : <></>
                            }

                            {
                                record.reqStatus !== 'SF2' && record.reqStatus !== 'SF5' ?
                                    <>
                                        <button className="btn btn__edit" data-tip data-for='btn-edit' onClick={handleEditRecord}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>

                                        <ReactTooltip id='btn-edit' place='bottom'>
                                            Editar Solicitud
                                        </ReactTooltip>
                                    </> : <></>
                            }

                            {
                                record.reqStatus !== 'SF1' ?
                                    <>
                                        <button className="btn btn__archive" data-tip data-for='btn-archive' onClick={archiveRequest}>
                                            <i className="bi bi-box-seam-fill"></i>
                                        </button>
                                        <ReactTooltip id='btn-archive' place='bottom'>
                                            Archivar Solicitud
                                        </ReactTooltip>
                                    </>
                                    : <></>
                            }

                        </div> : <></>
                    }

                </div>

            </div>



            <DataTable
                dataSource={states.requestsInProcess}
                columnSizes={[10, 15, 10, 15, 40, 10]}
                showColumns={['reqSerie', 'reqDate', 'reqStatus', 'applicantId', 'fullname', 'typeSerie']}
                labels={["Serie", "Fecha", "Estado", 'No. Emp', 'Solicitante', 'Tipo']}
                entries={[15, 30, 50]}
                enableSearch={true}
                enableEntries={true}
                onSelectedRow={handleRecordSelection}
            />

            <Modal
                title={`Plan de Pago - ${record !== null ? record.fullname : ''}`}
                isOpen={paymentModal}
                onClose={() => setPaymentModal(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <PaymentPlanForm />
                }
            />

            <div className={'definitions'}>

                <div className={'status'}>
                    <p><strong>SF1:</strong>Sol. Pendiente de Aprobacion</p>
                    <p><strong>SF2:</strong>Sol. No Aprobada</p>
                    <p><strong>SF3:</strong>Sol. Aprobada</p>
                    <p><strong>SF4:</strong>Sol. Confirmada para Atencion</p>
                    <p><strong>SF5:</strong>Sol. Atendida por la Optica</p>
                </div>

                <div className={'types'}>
                    <p><strong>CVN:</strong>Sufragado por Convenio</p>
                    <p><strong>SPA:</strong>Sufragado por Convenio y Solicitante</p>
                    <p><strong>SPB:</strong>Sufragado por el Solicitante</p>
                </div>


            </div>

        </div>
    )
}

export default GlassesWorkListView