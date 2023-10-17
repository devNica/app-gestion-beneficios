import { useEffect, useState } from "react"
import { useMaternityRequestManagement } from "../../useMaternity"
import { formatNumberWithCommas } from "../../../utils/number.util"


export default function useNewBornInfoForm ({ 
    updateCurrentIndex, 
    currentIndex, typesBirth,
    authorizedAmountsMathernity,
    internalExchange
}) {

    const { states: { newBornInfoReq }, actions } = useMaternityRequestManagement()

    const [support, setSupport] = useState(newBornInfoReq.supports)
    const [typeBirth, setTypeBirth] = useState(typesBirth[0])
    const [childrensInfo, setChildrensInfo] = useState([{
        id: 0,
        firstname: '--',
        lastname: '--',
        sex: 'M',
        birthdate: ''
    }])

    const [authorizedAmount, setAuthorizedAmount] = useState(authorizedAmountsMathernity[0])
    const [amountInUS, setAmountInUS] = useState('')
    const [amountInCS, setAmountInCS] = useState('')


    useEffect(() => {
        if (newBornInfoReq.amountInUS !== null) {
            setAmountInUS(newBornInfoReq.amountInUS)
        } else {
            setAmountInUS(`U$ ${authorizedAmountsMathernity[0].value}`)
        }

        if (newBornInfoReq.amountInCS !== null) {
            setAmountInCS(newBornInfoReq.amountInCS)
        } else {
            const amountInCs = authorizedAmount.value * internalExchange
            setAmountInCS(`C$ ${formatNumberWithCommas(amountInCs.toFixed(2))}`)
        }


        if (newBornInfoReq.typeBirth !== null) {
            setTypeBirth(newBornInfoReq.typeBirth)
        }
        setChildrensInfo(newBornInfoReq.childrens)
    }, [])



    function handleNewBornInfo(e) {
        const keys = e.target.name.split('-')
        const currData = { [keys[1]]: e.target.value, id: Number(keys[0]) }

        const recordFound = childrensInfo.filter(nb => nb.id === Number(keys[0]))


        /** entra aca cuando hay mas de un registro */
        if (childrensInfo.length > 1) {

            const diff = childrensInfo.filter(nb => nb.id !== Number(keys[0]))

            if (recordFound.length > 0) {
                const recordUpdated = recordFound.map(rf => ({ ...rf, ...currData }))
                const newSet = [...diff, ...recordUpdated].sort((a, b) => a.id - b.id)
                setChildrensInfo(newSet)
            }
            else {
                const newSet = [...childrensInfo, {
                    firstname: '',
                    lastname: '',
                    sex: '',
                    birthdate: '',
                    ...currData
                }].sort((a, b) => a.id - b.id)

                setChildrensInfo(newSet)
            }

        }
        
        else {

            if (recordFound.length > 0) {
                const recordUpdated = recordFound.map(rf => ({ ...rf, ...currData }))
                setChildrensInfo(recordUpdated)
            } else {
                const newSet = [...childrensInfo, {
                    firstname: '',
                    lastname: '',
                    sex: '',
                    birthdate: '',
                    ...currData
                }].sort((a, b) => a.id - b.id)

                setChildrensInfo(newSet)
            }
        }

    }

    function addNewChild(qty) {
        if (qty > 0) {
            const elements = []
            for (let index = 0; index < qty; index++) {
                elements.push({
                    id: (childrensInfo.length + index),
                    firstname: '--',
                    lastname: '--',
                    sex: 'M',
                    birthdate: ''
                })

            }
            let newSet = [...childrensInfo, ...elements]
            setChildrensInfo(newSet)
        }
    }


    function handleAddChild() {
        addNewChild(1)
    }


    function handleRemoveChild() {
        if (childrensInfo.length > 3) {
            const newSet = childrensInfo.slice(0, (childrensInfo.length - 1))
            setChildrensInfo(newSet)
        }
    }


    function handleBackStep() {
        actions.setNewBornInfo({
            supports: support,
            typeBirth: typeBirth,
            amountInUS: amountInUS,
            amountInCS: amountInCS,
            childrens: childrensInfo
        })
        updateCurrentIndex(currentIndex - 1)

    }


    function handleTypeBirth(v) {
        if (v.id === 1) {
            setChildrensInfo(prev => prev.slice(0, 1))

            setAuthorizedAmount(authorizedAmountsMathernity[0])
            const amount = authorizedAmountsMathernity[0].value * internalExchange
            setAmountInCS(`C$ ${formatNumberWithCommas(amount.toFixed(2))}`)
            setAmountInUS(`U$ ${authorizedAmountsMathernity[0].value}`)

        } else if (v.id === 2) {
            addNewChild(v.id - childrensInfo.length)
            if (childrensInfo.length > 2) {
                const newSet = childrensInfo.slice(0, 2)
                setChildrensInfo(newSet)
            }

            setAuthorizedAmount(authorizedAmountsMathernity[1])
            const amount = authorizedAmountsMathernity[1].value * internalExchange
            setAmountInCS(`C$ ${formatNumberWithCommas(amount.toFixed(2))}`)
            setAmountInUS(`U$ ${authorizedAmountsMathernity[1].value}`)

            
        } else if (v.id === 3) {
            addNewChild(v.id - childrensInfo.length)
            if (childrensInfo.length > 3) {
                const newSet = childrensInfo.slice(0, 3)
                setChildrensInfo(newSet)
            }

            setAuthorizedAmount(authorizedAmountsMathernity[2])
            const amount = authorizedAmountsMathernity[2].value * internalExchange
            setAmountInCS(`C$ ${formatNumberWithCommas(amount.toFixed(2))}`)
            setAmountInUS(`U$ ${authorizedAmountsMathernity[2].value}`)

        }
        setTypeBirth(v)

    }

    function handleSubmit() {

    }

    return {
        states: {
            support,
            typeBirth,
            childrensInfo,
            authorizedAmount,
            amountInCS,
            amountInUS
        },

        actions: {
            setSupport,
            handleNewBornInfo,
            handleAddChild,
            handleRemoveChild,
            handleBackStep,
            handleTypeBirth,
            handleSubmit
        }
    }
}