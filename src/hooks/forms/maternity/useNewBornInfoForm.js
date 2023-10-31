import { useEffect, useState } from "react"
import { useMaternityRequestManagement } from "../../useMaternity"
import { formatNumberWithCommas } from "../../../utils/number.util"

export default function useNewBornInfoForm({
    updateCurrentIndex,
    currentIndex, typesBirth,
    authorizedAmountsMathernity,
    internalExchange
}) {

    const { states: { newBornInfoReq: info, childrenOfBeneficiary }, actions } = useMaternityRequestManagement()

    const [support, setSupport] = useState(info.supports)
    const [typeBirth, setTypeBirth] = useState('')

    const [amountInUS, setAmountInUS] = useState('')
    const [amountInCS, setAmountInCS] = useState('')
    const [confirmedChildren, setConfirmedChildren] = useState(childrenOfBeneficiary)

    useEffect(()=>{
        if (info.confirmedChildren !== null) setConfirmedChildren(info.confirmedChildren)
        if (info.amountInUS !== null) setAmountInUS(info.amountInUS)
        if (info.amountInCS !== null) setAmountInCS(info.amountInCS)
        if (info.typeBirth !== null) setTypeBirth(info.typeBirth)
    }, [])

    function handleBackStep() {

        actions.setNewBornInfo({
            supports: support,
            typeBirth: typeBirth,
            amountInUS: amountInUS,
            amountInCS: amountInCS,
            confirmedChildren: confirmedChildren
        })

        updateCurrentIndex(currentIndex - 1)
    }

    function updateAmounts(current) {
        let authAmountInUs = 0.00

        const confirmed = current.filter(child => child.selected === true)

        if(confirmed.length === 1 ) {
            authAmountInUs = authorizedAmountsMathernity.find(ele => ele.relative === 'Normal').amount_usd
            setTypeBirth(typesBirth[0])
        } else if (confirmed.length === 2 ){
            authAmountInUs = authorizedAmountsMathernity.find(ele => ele.relative === 'Gemelar').amount_usd
            setTypeBirth(typesBirth[1])
        } else if (confirmed.length > 2) {
            setTypeBirth(typesBirth[2])
            authAmountInUs = authorizedAmountsMathernity.find(ele => ele.relative === 'Multiple').amount_usd
        }

        const authAmountInCs = authAmountInUs * Number(internalExchange.toFixed(2))

        setAmountInUS(`U$ ${formatNumberWithCommas(authAmountInUs)}`)
        setAmountInCS(`C$ ${formatNumberWithCommas(authAmountInCs)}`)
    }

    function handleSelectItem(id) {
            const current = confirmedChildren.map((ele) => {
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
            setConfirmedChildren(current)
    }


    return {
        states: {
            support,
            typeBirth,
            amountInUS,
            amountInCS,
            confirmedChildren
        },
        actions: {
            handleBackStep,
            handleSelectItem,
            setSupport,
            setTypeBirth
        }
    }
}