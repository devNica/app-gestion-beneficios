import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import { useGlassesRequestManagement } from "../../useGlass"

import CustomNotification from "../../../Components/Notification/CustomNotification"
import { setNotification } from "../../../redux/notification.slice"

import { useDispatch } from "react-redux"
import { useTrackingProps } from '../../useTracking'

import { formatNumberWithCommas } from "../../../utils/number.util"
import { isNull } from "../../../utils/object.util"
import { registerGlassesRequestThunk, updateGlassesRequestThunk } from "../../../redux/glass.slice"
import { isEmpty } from "lodash"


export const useHandleApplicationSupportForm = ({ updateCurrentIndex, currentIndex, options, mode, orderId }) => {

    const { actions, states: glassStates } = useGlassesRequestManagement()
    const { actions: trackingAct } = useTrackingProps()

    const { supportsReq: { proforma, invoice, installmentDeduction }, generalInfoReq, applicationTypes, requestStatus } = glassStates

    const dispatch = useDispatch()
    /** Notifications Controller */
    CustomNotification()

    const navigate = useNavigate()

    const [invoiceDate, setInvoiceDate] = useState('')
    const [proformaDate, setproformaDate] = useState('')

    const [proformaCurrency, setProformaCurrency] = useState(options[0])
    const [invoiceCurrency, setInvoiceCurrency] = useState(options[0])

    const [proformaNumber, setProformaNumber] = useState('')
    const [invoiceNumber, setInvoiceNumber] = useState('')

    const [proformaExchangeRate, setProformExchangeRate] = useState(proformaCurrency.id === 1 ? '1.00' : '0.00')
    const [invoiceExchangeRate, setInvoiceExchangeRate] = useState(invoiceCurrency.id === 1 ? '1.00' : '0.00')
    const [proformaAmount, setProformaAmount] = useState('')
    const [invoiceAmount, setInvoiceAmount] = useState('')

    const [proformaAmountInCS, setproformaAmountInCS] = useState('')
    const [invoiceAmountInCS, setInvoiceAmountInCS] = useState('')

    const [docInEdition, setDocInEdition] = useState(null)
    // const [docInEdition, setDocInEdition] = useState(mode === 'register' ? 'P' : 'I')
    const [applicationType, setApplicationType] = useState({ id: 0, value: 'procesando' })
    const [installment, setInstallment] = useState(null)

    /**Se garantiza que los datos obtenidos del store solo se seteen una unica vez */
    useEffect(() => {
        setproformaDate(proforma.date || new Date().toISOString().slice(0, 10))
        setInvoiceDate(invoice.date || new Date().toISOString().slice(0, 10))
        setProformaCurrency(proforma.currency || options[0])
        setInvoiceCurrency(invoice.currency || options[0])
        setProformaNumber(proforma.serie !== null ? proforma.serie : '')
        setInvoiceNumber(invoice.serie !== null ? invoice.serie : '')
        if (proforma.exchangeRate !== null) {
            setProformExchangeRate(proforma.exchangeRate)
        }
        if (invoice.exchangeRate !== null) {
            setInvoiceExchangeRate(invoice.exchangeRate)
        }
        setProformaAmount(proforma.amount)
        setInvoiceAmount(invoice.amount)
        setproformaAmountInCS(proforma.amountInCS)
        setInvoiceAmountInCS(invoice.amountInCS)

        if (installmentDeduction !== null) {
            setInstallment(installmentDeduction)
        }

        if (mode === 'register') {
            setDocInEdition('P')
        }

        if (mode === 'edit' && requestStatus.value !== 'SF4') {
            setDocInEdition('P')
        }

        if (mode === 'edit' && requestStatus.value === 'SF4') {
            setDocInEdition('I')
        }

        verifyRequirementsForAuthorizationOfAmount(Number(proforma.amount.replace(/,/g, '')), proforma.currency.id)

    }, [])

    function handleBackStep() {
        updateCurrentIndex(currentIndex - 1)
        actions.setApplicationSupports({
            installmentDeduction: installment,
            applicationType: null,
            hasProforma: proformaAmount !== '' && proformaNumber !== '' ? true : false,
            proforma: {
                date: proformaDate,
                serie: proformaNumber,
                amount: proformaAmount,
                currency: proformaCurrency,
                amountInCS: proformaAmountInCS,
                exchangeRate: proformaExchangeRate
            },
            hasInvoice: invoiceAmount !== '' && invoiceNumber !== '' ? true : false,
            invoice: {
                date: invoiceDate,
                serie: invoiceNumber,
                amount: invoiceAmount,
                currency: invoiceCurrency,
                amountInCS: invoiceAmountInCS,
                exchangeRate: invoiceExchangeRate
            }
        })
    }

    function registerNewRequets() {
        dispatch(registerGlassesRequestThunk())

        dispatch(setNotification({
            message: 'Registro Exitoso',
            type: 'success',
            delay: 1500
        }))

        trackingAct.removeTrack({
            procIdentity: 'GL-REG',
            space: 'glass'
        })
    }

    function editRequest() {
        dispatch(updateGlassesRequestThunk(orderId))

        dispatch(setNotification({
            message: 'Edicion Exitosa',
            type: 'success',
            delay: 1500
        }))

        trackingAct.removeTrack({
            procIdentity: 'GL-EDIT',
            space: 'glass'
        })
    }

    function handleNextStep() {

        if (mode === 'register') {
            if (!isNull(proformaNumber) || proformaNumber === '') {
                dispatch(setNotification({
                    message: 'No se ha digitado el numero de la proforma',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }

            if (proformaAmount === '') {
                dispatch(setNotification({
                    message: 'No se ha digitado el monto de la proforma',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }


            if (installment === null && applicationType.id > 1) {
                dispatch(setNotification({
                    message: 'El tipo de solicitud requiere se indique el numero de cuotas',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }
        }

        if (mode === 'edit') {

            if (!isNull(proformaNumber) || proformaNumber === '') {
                dispatch(setNotification({
                    message: 'No se ha digitado el numero de la proforma',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }

            if (proformaAmount === '') {
                dispatch(setNotification({
                    message: 'No se ha digitado el monto de la proforma',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }

            if (docInEdition === 'I') {
                if (!isNull(invoiceNumber) || invoiceNumber === '') {
                    dispatch(setNotification({
                        message: 'No se ha digitado el numero de la factura',
                        type: 'warning',
                        delay: 1500
                    }))

                    return
                }

                if (invoiceAmount === '') {
                    dispatch(setNotification({
                        message: 'No se ha digitado el monto de la factura',
                        type: 'warning',
                        delay: 1500
                    }))

                    return
                }
            }
        }

        actions.setApplicationSupports({
            installmentDeduction: installment,
            applicationType: applicationType,
            hasProforma: proformaAmount !== '' && proformaNumber !== '' ? true : false,
            proforma: {
                date: proformaDate,
                serie: proformaNumber,
                amount: proformaAmount,
                currency: proformaCurrency,
                amountInCS: proformaAmountInCS,
                exchangeRate: proformaExchangeRate
            },
            hasInvoice: invoiceAmount !== '' && invoiceNumber !== '' ? true : false,
            invoice: {
                date: invoiceDate,
                serie: invoiceNumber,
                amount: invoiceAmount,
                currency: invoiceCurrency,
                amountInCS: invoiceAmountInCS,
                exchangeRate: invoiceExchangeRate
            }
        })

        try {
            if (mode === 'register') {
                registerNewRequets()
            } else if (mode === 'edit') {
                editRequest()
            }


            setTimeout(() => {
                navigate('/home')
            }, 1700);


        } catch (error) {
            dispatch(setNotification({
                message: mode === 'register' ? 'Registro Fallido' : 'Edicion Fallida',
                type: 'danger',
                delay: 1500
            }))
        }
    }


    function handleExchangeRate(e) {

        let value = e.target.value

        value = value.replace(/[^0-9.]/g, '')

        // Asegúrate de que solo haya un punto decimal
        const dots = value.split('.').length - 1;
        if (dots > 1) {
            value = value.slice(0, value.lastIndexOf('.'));
        }

        const inputValue = String(value).replace(/,/g, '')
        const exchangeRate = formatNumberWithCommas(inputValue)


        if (e.target.name === 'proformExchangeRate') {
            setProformExchangeRate(exchangeRate)
            const v = Number(proformaAmount.replace(/,/g, '')) * Number(inputValue)
            const x = 'C$ ' + formatNumberWithCommas(v.toFixed(2))
            setproformaAmountInCS(x)
        }
        else if (e.target.name === 'invoiceExchangeRate') {
            setInvoiceExchangeRate(exchangeRate)
            const v = Number(invoiceAmount.replace(/,/g, '')) * Number(inputValue)
            const x = 'C$ ' + formatNumberWithCommas(v.toFixed(2))
            setInvoiceAmountInCS(x)
        }

    }

    function handleAmount(e) {

        let value = e.target.value

        value = value.replace(/[^0-9.]/g, '')

        // Asegúrate de que solo haya un punto decimal
        const dots = value.split('.').length - 1;
        if (dots > 1) {
            value = value.slice(0, value.lastIndexOf('.'));
        }

        const inputValue = String(value).replace(/,/g, '')
        if (e.target.name === 'proformAmount') {
            setProformaAmount(formatNumberWithCommas(inputValue))
            const x = 'C$ ' + formatNumberWithCommas((Number(inputValue) * Number(proformaExchangeRate)).toFixed(2))
            setproformaAmountInCS(x)

            verifyRequirementsForAuthorizationOfAmount(inputValue, proformaCurrency.id)
        }
        else if (e.target.name === 'invoiceAmount') {
            setInvoiceAmount(formatNumberWithCommas(inputValue))
            const x = 'C$ ' + formatNumberWithCommas((Number(inputValue) * Number(invoiceExchangeRate)).toFixed(2))
            setInvoiceAmountInCS(x)
        }

    }

    function verifyRequirementsForAuthorizationOfAmount(value, currencyId) {

        const { beneficiary, initialOption } = generalInfoReq

        const authAmountInCs = 50

        if (initialOption === 'E' && beneficiary.range === 'Dentro' && beneficiary.received === 0) {
            // verificar montos vs monto autorizado

            const currProformaAmountInUsd = currencyId === 1 ?
                Number(value) / 36.56 :
                Number(value)

            // cuando el monto de la proforma esta en cordobas
            if (Number(value) === 0) {
                setApplicationType({ id: 0, value: 'Procesando...' })
            }
            else if (authAmountInCs >= currProformaAmountInUsd) {
                setApplicationType(applicationTypes[0])
            } else if (authAmountInCs < currProformaAmountInUsd) {
                setApplicationType(applicationTypes[1])
            }
        }
        else if (initialOption === 'E' && beneficiary.range === 'Dentro' && beneficiary.received > 0) {
            setApplicationType(applicationTypes[3])
        }
        else if (initialOption === 'E' && beneficiary.range === 'Fuera') {
            setApplicationType(applicationTypes[2])
        } else if (initialOption === 'P') {
            setApplicationType(applicationTypes[2])
        }
    }


    function handleFocusExchangeField(source) {
        if (source === 'proforma') {
            if (isEmpty(proformaExchangeRate)) {
                setProformExchangeRate('1.00')
                const x = 'C$ ' + formatNumberWithCommas(proformaAmount)
                setproformaAmountInCS(x)
            }
        } else if (source === 'invoice') {
            if (isEmpty(invoiceExchangeRate)) {
                setInvoiceExchangeRate('1.00')
                const x = 'C$ ' + formatNumberWithCommas(invoiceAmount)
                setInvoiceAmountInCS(x)
            }
        }
    }

    function handleDocInEditionSelection(v) {
        if (mode === 'register' && v === 'I') {
            dispatch(setNotification({
                message: 'No se puede editar la factura en este paso',
                type: 'info',
                delay: 1500
            }))

            return
        } else if (mode === 'edit' && v === 'P' && requestStatus.value === 'SF4') {
            dispatch(setNotification({
                message: 'No se puede editar la proforma cuando la solcitud ya fue confirmada',
                type: 'info',
                delay: 1500
            }))
        } else if (mode === 'edit' && v === 'I' && requestStatus.value !== 'SF4') {
            dispatch(setNotification({
                message: 'No se puede editar la factura cuando la solicitud no ha sido confirmada',
                type: 'info',
                delay: 1500
            }))
        }
        else if (mode === 'edit') {
            setDocInEdition(v)
        }
    }

    function handleInstallmentSelection(data) {
        if (requestStatus.value !== 'SF4') {
            setInstallment(data)
        } else {
            dispatch(setNotification({
                message: 'No se puede modificar el numero de cuotas cuando la solicitud ya fue confirmada',
                type: 'info',
                delay: 1500
            }))
        }

    }


    return {
        states: {
            proformaDate,
            invoiceDate,
            proformaCurrency,
            invoiceCurrency,
            proformaNumber,
            invoiceNumber,
            proformaExchangeRate,
            invoiceExchangeRate,
            proformaAmount,
            invoiceAmount,
            proformaAmountInCS,
            invoiceAmountInCS,
            docInEdition,
            applicationType,
            installment
        },
        actions: {
            handleNextStep,
            handleBackStep,
            handleExchangeRate,
            handleAmount,
            setproformaDate,
            setInvoiceDate,
            setProformaCurrency,
            setInvoiceCurrency,
            setProformaNumber,
            setInvoiceNumber,
            setproformaAmountInCS,
            setInvoiceAmountInCS,
            setInstallment,
            handleDocInEditionSelection,
            verifyRequirementsForAuthorizationOfAmount,
            handleFocusExchangeField,
            handleInstallmentSelection
        }
    }

}