import React from "react"
import CustomInput from "../../Components/CustomInput/CustomInput"
import Select from "../../Components/Select/Select"
import FakeInput from "../../Components/FakeInput/FakeInput"
import CustomCheckOption from "../../Components/CustomCheckOption/CustomCheckOption"

import { useHandleApplicationSupportForm } from "../../hooks/forms/glasses/useApplicationSupportsForm"
import { formatNumberWithCommas } from "../../utils/number.util"

import PropTypes from "prop-types"

import './application-supports-form.css'


const options = [
    { id: 1, value: 'C$', },
    { id: 2, value: '$' },
]

const installments = [
    { id: 1, value: '1 Cuota' },
    { id: 2, value: '3 Cuotas' },
    { id: 3, value: '5 Cuotas' },
    { id: 4, value: '7 Cuotas' },
    { id: 5, value: '10 Cuotas' },
    { id: 6, value: '12 Cuotas' }
]

const ApplicationSupportsForm = ({
    currentIndex,
    updateCurrentIndex,
    mode,
    orderId
}) => {

    const { states, actions } = useHandleApplicationSupportForm({ updateCurrentIndex, currentIndex, options, mode, orderId })

    const { invoiceAmountInCS, invoiceCurrency, invoiceDate, invoiceAmount,
        invoiceExchangeRate, invoiceNumber,
        proformaAmountInCS, proformaCurrency, proformaDate, proformaAmount,
        proformaExchangeRate, proformaNumber, docInEdition, applicationType,
        installment
    } = states

    const { handleAmount, handleBackStep, handleExchangeRate, handleNextStep,
        setInvoiceCurrency, setInvoiceDate, setInvoiceNumber, setInvoiceAmountInCS,
        setProformaCurrency, setProformaNumber, setproformaDate, setproformaAmountInCS,
        handleDocInEditionSelection, verifyRequirementsForAuthorizationOfAmount,
        handleFocusExchangeField, handleInstallmentSelection
    } = actions

    return (
        <div className="form__application__supports">
            <div className="form__title">
                <h2>Detalle de Soportes Extendidos al Solicitante</h2>
            </div>

            <div className="form__group-top">

                <CustomCheckOption
                    id={'onlyProform'}
                    name={'onlyProform'}
                    isCheckBox={false}
                    value={'P'}
                    currentValue={docInEdition}
                    onChange={handleDocInEditionSelection}
                    label="Proforma:"
                />
                <CustomCheckOption
                    id={'onlyInvoice'}
                    name={'onlyInvoice'}
                    isCheckBox={false}
                    value={'I'}
                    currentValue={docInEdition}
                    onChange={handleDocInEditionSelection}
                    label="Factura:"
                />


            </div>

            <div className="form__group-middle">
                <div className="proform__detail">

                    <CustomInput
                        id={'dateProform'}
                        name={'dateProform'}
                        label="Fecha Proforma:"
                        type="date"
                        value={proformaDate}
                        onChange={(e) => setproformaDate(e.target.value)}
                    />

                    <CustomInput
                        id={'proformNumber'}
                        name={'proformNumber'}
                        label="No. Proforma:"
                        type="text"
                        value={proformaNumber}
                        onChange={(e) => setProformaNumber(e.target.value)}
                    />

                    <CustomInput
                        id={'proformAmount'}
                        name={'proformAmount'}
                        label="Monto Proforma:"
                        type="text"
                        customStyles="has-child"
                        placeHolder="0.00"
                        value={proformaAmount}
                        onChange={handleAmount}
                        attachmentElement={
                            <Select
                                options={options}
                                currentValue={proformaCurrency}
                                onChange={(v) => {
                                    setProformaCurrency(v)
                                    if (v.id === 1) {
                                        const pfAmountInCS = 'C$ ' + formatNumberWithCommas(1 * Number(proformaAmount.replace(/,/g, '')))
                                        setproformaAmountInCS(pfAmountInCS)
                                        verifyRequirementsForAuthorizationOfAmount(Number(proformaAmount.replace(/,/g, '')), v.id)
                                    } else {
                                        const pfAmountInCS = 'C$ ' + formatNumberWithCommas(Number(proformaExchangeRate) * Number(proformaAmount.replace(/,/g, '')))
                                        setproformaAmountInCS(pfAmountInCS)
                                        verifyRequirementsForAuthorizationOfAmount(Number(proformaAmount.replace(/,/g, '')), v.id)
                                    }

                                }}
                            />
                        }
                    />

                    <div className="group__inputs">

                        <CustomInput
                            id={'proformaAmountInCS'}
                            name={'proformaAmountInCS'}
                            editable={false}
                            customStyles="disabled"
                            defaultValue={proformaAmountInCS}
                            placeHolder="0.00"
                            label="Monto C$:"
                            type="text"
                        />
                        {
                            proformaCurrency.id === 1 ?
                                <FakeInput
                                    title={"T/C Pro:"}
                                    defaultValue={"1.00"}
                                /> :
                                <CustomInput
                                    id={'proformExchangeRate'}
                                    name={'proformExchangeRate'}
                                    label="T/C Pro:"
                                    type="text"
                                    value={proformaExchangeRate}
                                    onChange={handleExchangeRate}
                                    handleOnBlur={() => handleFocusExchangeField('proforma')}
                                />
                        }

                    </div>
                </div>


                <div className="invoice__detail">
                    <CustomInput
                        id={'dateInvoice'}
                        name={'dateInvoice'}
                        label="Fecha Factura:"
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                    />

                    <CustomInput
                        id={'invoiceNumber'}
                        name={'invoiceNumber'}
                        label="No. de Factura:"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                    />

                    <CustomInput
                        id={'invoiceAmount'}
                        name={'invoiceAmount'}
                        label="Monto Factura:"
                        type="text"
                        customStyles="has-child"
                        placeHolder="0.00"
                        value={invoiceAmount}
                        onChange={handleAmount}
                        attachmentElement={
                            <Select
                                id={'ivAmountSel'}
                                options={options}
                                currentValue={invoiceCurrency}
                                onChange={(v) => {
                                    setInvoiceCurrency(v)

                                    if (v.id === 1) {
                                        const ivAmountInCS = 'C$ ' + formatNumberWithCommas(1 * Number(invoiceAmount.replace(/,/g, '')))
                                        setInvoiceAmountInCS(ivAmountInCS)
                                    } else {
                                        const ivAmountInCS = 'C$ ' + formatNumberWithCommas(Number(invoiceExchangeRate) * Number(invoiceAmount.replace(/,/g, '')))
                                        setInvoiceAmountInCS(ivAmountInCS)
                                    }

                                }}
                            />
                        }
                    />

                    <div className="group__inputs">

                        <CustomInput
                            id={'invoiceAmountInCS'}
                            name={'invoiceAmountInCS'}
                            editable={false}
                            customStyles="disabled"
                            defaultValue={invoiceAmountInCS}
                            placeHolder="0.00"
                            label="Monto C$:"
                            type="text"
                        />
                        {

                            invoiceCurrency.id === 1 ?
                                <FakeInput
                                    title={"T/C Fac:"}
                                    defaultValue={"1.00"}
                                /> :
                                <CustomInput
                                    id='invoiceExchangeRate'
                                    name='invoiceExchangeRate'
                                    label="T/C Fac:"
                                    editable={true}
                                    type="text"
                                    value={invoiceExchangeRate}
                                    onChange={handleExchangeRate}
                                    handleOnBlur={() => handleFocusExchangeField('invoice')}
                                />
                        }

                    </div>
                </div>


                {/* this element is a fake layer on others component.*/}
                <div
                    className={`hide-element ${docInEdition === 'P' ?
                        'right' : docInEdition === 'I' ? 'left' : 'none'}`}>
                </div>

            </div>

            <div className="form__validations">

                <CustomInput
                    id="applicationType"
                    name="applicationType"
                    label="Tipo Aplicacion:"
                    editable={false}
                    defaultValue={applicationType.value}
                    customStyles="disabled"
                    onChange={() => { }}
                />

                {
                    applicationType.id > 1
                    ?
                        <Select
                            id="numberDeductions"
                            name="numberDeductions"
                            label="No. Cuotas:"
                            placeHolder="Numero de Cuotas a Deducir del Salario"
                            options={installments}
                            currentValue={installment}
                            onChange={handleInstallmentSelection}
                        />
                    :
                        <CustomInput
                            id="numberDeductions"
                            name="numberDeductions"
                            label="No. Cuotas:"
                            type="text"
                            editable={false}
                            defaultValue={'No aplica'}
                            customStyles="disabled"
                        />
                }
            </div>

            <div className="form__group-actions">
                <div className="prev"
                    onClick={handleBackStep}
                >
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>

                <div className="done"
                    onClick={handleNextStep}
                >
                    <button type='button' className='btn btn__done'>Listo</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ApplicationSupportsForm)

ApplicationSupportsForm.propTypes = {
    currentIndex: PropTypes.number,
    updateCurrentIndex: PropTypes.func,
    mode: PropTypes.string,
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}