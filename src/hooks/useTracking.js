import { useSelector } from "react-redux"

export const useTrackingProps = () => {
    const {
        pendingNumbers,
    } = useSelector(state => state.tracking)

    return {
        pendingNumbers,
    }
}