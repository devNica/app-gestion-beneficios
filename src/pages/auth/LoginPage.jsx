import './auth.css'
import userIcon from '../../assets/usermen.png'
import Card from '../../Components/Card/Card'
import LoginForm from '../../Forms/auth/LoginForm'

export default function LoginPage() {

    return (
        <div className="signin">

            <div className="wave"></div>

            <div className="content">
                <Card
                    Component={LoginForm}
                    urlIcon={userIcon}
                    mageneticIcon={true}
                />
            </div>
        </div>
    )
}