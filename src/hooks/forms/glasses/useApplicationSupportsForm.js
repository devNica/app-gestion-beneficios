import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import { useGlassesRequestManagement } from "../../useGlass"

import CustomNotification from "../../../Components/Notification/CustomNotification"
import { setNotification } from "../../../redux/notification.slice"

import { useDispatch } from "react-redux"
import { useTrackingProps } from '../../useTracking'

import { formatNumberWithCommas } from "../../../utils/number.util"
import { isNull } from "../../../utils/object.util"
import { registerGlassesRequestThunk } from "../../../redux/glass.slice"


export const useHandleApplicationSupportForm = ({ updateCurrentIndex, currentIndex, options }) => {

    const { actions, states: glassStates } = useGlassesRequestManagement()
    const { actions: trackingAct } = useTrackingProps()

    const { supportsReq: { proforma, invoice, currentMode } } = glassStates

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

    const [mode, setMode] = useState(currentMode)


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

    }, [])

    function handleBackStep() {
        updateCurrentIndex(currentIndex - 1)
        actions.setApplicationSupports({
            currentMode: mode,
            hasProforma: mode !== 'OIV' ? true : false,
            proforma: {
                date: proformaDate,
                serie: proformaNumber,
                amount: proformaAmount,
                currency: proformaCurrency,
                amountInCS: proformaAmountInCS,
                exchangeRate: proformaExchangeRate
            },
            hasInvoice: mode !== 'OPF' ? true : false,
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

    function handleNextStep() {

        if (mode === 'OPF') {
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


        }

        if (mode === 'OIV') {
            if (!isNull(invoiceNumber)) {
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

        if (mode === 'PWI') {
            if (!isNull(proformaNumber)) {
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

            if (!isNull(invoiceNumber)) {
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

        actions.setApplicationSupports({
            currentMode: mode,
            hasProforma: mode !== 'OIV' ? true : false,
            proforma: {
                date: proformaDate,
                serie: proformaNumber,
                amount: proformaAmount,
                currency: proformaCurrency,
                amountInCS: proformaAmountInCS,
                exchangeRate: proformaExchangeRate
            },
            hasInvoice: mode !== 'OPF' ? true : false,
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
            
            setTimeout(() => {
                navigate('/home')
            }, 1700);


        } catch (error) {
            dispatch(setNotification({
                message: 'Registro Fallido',
                type: 'danger',
                delay: 1500
            }))
        }        
    }


    function handleExchangeRate(e) {

        const inputValue = String(e.target.value).replace(/,/g, '')
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
        const inputValue = String(e.target.value).replace(/,/g, '')
        if (e.target.name === 'proformAmount') {
            setProformaAmount(formatNumberWithCommas(inputValue))
            const x = 'C$ ' + formatNumberWithCommas((Number(inputValue) * Number(proformaExchangeRate)).toFixed(2))
            setproformaAmountInCS(x)
        }
        else if (e.target.name === 'invoiceAmount') {
            setInvoiceAmount(formatNumberWithCommas(inputValue))
            const x = 'C$ ' + formatNumberWithCommas((Number(inputValue) * Number(invoiceExchangeRate)).toFixed(2))
            setInvoiceAmountInCS(x)
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
            mode
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
            setMode

        }
    }

}