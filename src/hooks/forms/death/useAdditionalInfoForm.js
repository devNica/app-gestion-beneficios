import { useState, useEffect } from 'react'
import { useDeathRequestManagement } from "../../useDeath.js"
import { formatNumberWithCommas } from "../../../utils/number.util.js"

export const useAdditionalInfoForm = ({ updateCurrentIndex, currentIndex, internalExchange }) => {
    
    const {
        states: {
            generalInfoReq: gnral,
            relativesList,
            additionalInfo: info },
        actions } = useDeathRequestManagement()
    
    const { typeRegister } = gnral
    
    const [relativesConfirmed, setRelativesConfirmed] = useState(relativesList)
    const [amountInCS, setAmountInCS] = useState('')
    const [amountInUS, setAmountInUS] = useState('')
    const [supportsConfirmed, setSupportConfirmed] = useState(actions.getRequiredSupportsByTypeRegister({ typeRegister }))
   
    
    useEffect(() => {
        if (info.relativesConfirmed !== null) {
            setRelativesConfirmed(info.relativesConfirmed)
        }
        if (info.supportsConfirmed !== null) {
            setSupportConfirmed(info.supportsConfirmed)
        }
        setAmountInCS(info.amountInCS)
        setAmountInUS(info.amountInUS)
    }, [])
    
    function updateAmounts(current) {
        let accAmountInUs = 0.00

        for (let index in current) {
            if (current[index].selected) {
                accAmountInUs += current[index].amount
            }
        }

        const amountInCs = accAmountInUs * Number(internalExchange.toFixed(2))

        setAmountInUS(`U$ ${formatNumberWithCommas(accAmountInUs)}`)
        setAmountInCS(`C$ ${formatNumberWithCommas(amountInCs)}`)
    }

    function handleBackStep() {
        actions.setAdditionalInfo({
            relativesConfirmed: relativesConfirmed,
            hasSupport: false,
            amountInCS: amountInCS,
            amountInUS: amountInUS,
            supportsConfirmed
        })
        updateCurrentIndex(currentIndex - 1)
    }

    function handleSelectItem(id) {

        if (typeRegister === 'F') {
            const current = relativesConfirmed.map((ele) => {
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
            setRelativesConfirmed(current)
        } else {
            const current = relativesConfirmed.map((ele) => {
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
            setRelativesConfirmed(current)
        }
    }


    function handleDate(e) {
        const keys = e.target.name.split('-')
        const currData = { [keys[1]]: e.target.value }

        const updateRecord = relativesConfirmed.map(rel => {
            if (rel.id === Number(keys[0])) {
                return { ...rel, ...currData }
            } else return rel
        })
        setRelativesConfirmed(updateRecord)
    }
    
    function handleSupportConfirmation(e) {
       const name = e.target.name
        const updateConfirmed = supportsConfirmed.map(el => {
            if(el.name === name) {
                return {
                    ...el,
                    selected: !el.selected
                }
            } else return el
        })
        
        setSupportConfirmed(updateConfirmed)
    }
    
    
    return {
        states: {
            typeRegister,
            amountInCS,
            amountInUS,
            relativesConfirmed,
            supportsConfirmed
        },
        actions: {
            handleBackStep,
            handleSelectItem,
            handleDate,
            handleSupportConfirmation
        }
    }
}