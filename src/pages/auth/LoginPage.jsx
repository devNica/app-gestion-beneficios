import './auth.css'
import userIcon from '../../assets/usermen.png'
import Card from '../../Components/Card/Card'
import { useManageCredential } from '../../hooks/useAuth'
import LoginForm from '../../Forms/auth/LoginForm'


export default function LoginPage() {

    const { setCredential } = useManageCredential()

    function handleOnSubmit (data)  {
        setCredential(data)
    }

    return (
        <div className="signin">

            <div className="wave"></div>

            <div className="content">
                <Card
                    Component={LoginForm}
                    urlIcon={userIcon}
                    mageneticIcon={true}
                    handleOnSubmit={handleOnSubmit}
                />
            </div>
        </div>
    )
}