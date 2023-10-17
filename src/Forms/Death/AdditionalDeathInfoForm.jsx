import { useEffect, useState } from 'react'
import CustomCheckOption from '../../Components/CustomCheckOption/CustomCheckOption'
import CustomInput from '../../Components/CustomInput/CustomInput'
import { useDeathRequestManagement } from '../../hooks/useDeath'
import FamilyDetail from './FamilyDetail'

import './additional-death-info-form.css'
import { formatNumberWithCommas } from '../../utils/number.util'

export default function AdditionalDeathInfoForm({
    updateCurrentIndex,
    currentIndex
}) {

    const { states: { additionalInfo: info }, actions } = useDeathRequestManagement()
    const { states: { generalInfoReq: gnral, relativesList } } = useDeathRequestManagement()
    

    const [relativesSelInCard, setRelativesSelInCard] = useState(relativesList)
    const [amountInCS, setAmountInCS] = useState('')
    const [amountInUS, setAmountInUS] = useState('')
    const [hasSupport, setHasSupport] = useState(false)

    const { typeRegister } = gnral

    useEffect(() => {
        if (info.relativesSelected !== null) {
            setRelativesSelInCard(info.relativesSelected)
        }
        setAmountInCS(info.amountInCS)
        setAmountInUS(info.amountInUS)
    }, [])

    function handleBackStep() {
        actions.setAdditionalInfo({
            relativesSelected: relativesSelInCard,
            hasSupport: false,
            amountInCS: amountInCS,
            amountInUS: amountInUS
        })
        updateCurrentIndex(currentIndex - 1)
    }


    function updateAmounts(current) {
        let accAmountInUs = 0.00

        for (let index in current) {
            if (current[index].selected) {
                accAmountInUs += current[index].amount
            }
        }

        const amountInCs = accAmountInUs * 36.78

        setAmountInUS(`U$ ${formatNumberWithCommas(accAmountInUs)}`)
        setAmountInCS(`C$ ${formatNumberWithCommas(amountInCs)}`)
    }

    function handleSelectItem(id) {
        
        if (typeRegister === 'F') {
            const current = relativesSelInCard.map((ele) => {
                if (ele.id === id) {
                    return {
                        ...ele,
                        selected: !ele.selected
                    }
                } else {
                    return { ...ele }
                }
            })

            updateAmounts(current)
            setRelativesSelInCard(current)
        } else {
            const current = relativesSelInCard.map((ele) => {
                if (ele.id === id) {
                    return {
                        ...ele,
                        selected: true
                    }
                } else {
                    return {
                        ...ele,
                        selected: false
                    }
                }
            })

            updateAmounts(current)
            setRelativesSelInCard(current)
        }
    }


    function handleDate(e) {
        const keys = e.target.name.split('-')
        const currData = { [keys[1]]: e.target.value }

        const updateRecord = relativesSelInCard.map(rel => {
            if (rel.id === Number(keys[0])) {
                return { ...rel, ...currData }
            } else return rel
        })
        setRelativesSelInCard(updateRecord)
    }


    return (
        <div className="additional__death__info-form">
            <div className="form__title">
                <h2>Informacion Adicional</h2>
            </div>

            <div className="form__group-middle">
                <div className="row-1">
                    <CustomCheckOption
                        id={'deathSupport'}
                        name={'deathSupport'}
                        label="Certificado de Defuncion"
                        checked={hasSupport}
                        onChange={() => setHasSupport(prev => !prev)}
                    />

                    <div className="amounts">
                        <CustomInput
                            label='Monto Autorizado U$:'
                            type='text'
                            name={'amountInUS'}
                            defaultValue={amountInUS}
                            editable={false}
                            customStyles='disabled'
                        />
                        <CustomInput
                            label='Monto Autorizado C$:'
                            type='text'
                            defaultValue={amountInCS}
                            editable={false}
                            customStyles='disabled'
                        />
                    </div>
                </div>


                <div className="row-2">
                    <table className='family__table'>
                        <thead>
                            <tr className='row-headers'>
                                <th>Sel</th>
                                <th>Parentezco:</th>
                                {typeRegister === 'F' ? <th>En favor de:</th> : <th>Extendido a:</th>}
                                {typeRegister === 'F' ? <th>Fallecido el:</th> : <th>Entregado el:</th>}
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                <FamilyDetail
                                    data={relativesSelInCard}
                                    // compareData={compareData}
                                    typeRegister={typeRegister}
                                    onChange={handleSelectItem}
                                    handleDate={handleDate}
                                />
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="form__group-actions">
                <div className="prev" onClick={handleBackStep}>
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>
                <div className="netx">
                    <button type='button' className='btn btn__done'>Listo</button>
                </div>
            </div>

        </div>
    )
}
