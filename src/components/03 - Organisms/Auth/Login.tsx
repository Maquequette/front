import { TabsContext } from '@/contexts/TabsContext'
import { FormEvent, useContext, useState } from 'react'
import useAuth from '@/hooks/useAuth'

import Heading from '@/components/01 - Atoms/Heading/Heading'
import Label from '@/components/01 - Atoms/Label/Label'
import Input from '@/components/01 - Atoms/Input/Input'
import Button from '@/components/01 - Atoms/Button/Button'
import Checkbox from '@/components/01 - Atoms/Checkbox/Checkbox'
import Svg from '@/components/01 - Atoms/Svg/Svg'

import './Login.scss'
import Error from '@/components/01 - Atoms/Error/Error'

export default function Login() {

    const { updateTabs } = useContext(TabsContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [stayConnected, setStayConnected] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const { onLogin, onForgotPassword } = useAuth()

    const submitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onLogin({ email, password })
    }

    const forgotPassword = () => {
        if (!email) {
            setErrors({
                ...errors,
                email: 'you have to fill an email adresse to get a new password'
            })
        } else {
            onForgotPassword({ email })
        }
    }

    return (
        <div className='login'>
            <div>
                <Heading
                    tag='h1'
                    level="secondary"
                >
                    Log In to your account
                </Heading>

                <p className='login__subtitle'>
                    Don't have account ?
                    <button
                        type="button"
                        style={{ padding: '0 0.5rem' }}
                        onClick={() => updateTabs(1)}
                    > Register here </button>
                </p>
            </div>

            <form className='login__form' onSubmit={(e) => submitLogin(e)}>
                <div>
                    <Label
                        name="email"
                        required={true}
                        error={errors.email && <Error>{errors.email}</Error>}
                    >
                        email
                    </Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="example@mail.com..."
                        required={true}
                        value={email}
                        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <Label name="password" required={true}>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                        value={password}
                        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>

                <div style={{ padding: '0rem 1rem', display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        name="stayConnected"
                        theme={'primary'}
                        value={stayConnected}
                        isChecked={stayConnected}
                        style={{}}
                        handleClick={() => {
                            setStayConnected(!stayConnected)
                        }}
                    />

                    <Label
                        name="stayConnected"
                        classes="label--checkbox"
                        styles={{ padding: '1rem' }}
                    >Stay connected ?</Label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className='login__form__subtitle'>
                        <button type="button" onClick={() => forgotPassword()}>Forgot your password ?</button>
                    </p>

                    <Button theme={'primary'} type="submit" btnStyles={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                        <Svg id="arrow" styles={{ width: '4.5rem', height: '3.3rem', strokeWidth: 'initial' }} />
                        Connect !
                    </Button>
                </div>

            </form>
        </div>
    )
}
