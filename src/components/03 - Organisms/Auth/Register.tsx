import { TabsContext } from "@/contexts/TabsContext"
import { NavLink } from "react-router-dom"
import { useContext, useState } from 'react'

import Heading from "@/components/01 - Atoms/Heading/Heading"
import MultiStepsForm from "@/components/02 -  Molecules/MultiStepsForm/MultiStepsForm"

import './Register.scss'
import Label from "@/components/01 - Atoms/Label/Label"
import Input from "@/components/01 - Atoms/Input/Input"


export default function Register() {

    const { updateTabs } = useContext(TabsContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    return (
        <div className='register transition'>
            <div>
                <Heading
                    tag='h1'
                    type="primary"
                >
                    Create an account
                </Heading>

                <p className='register__subtitle'>
                    Already have account ?
                    <button
                        type="button"
                        style={{ padding: '0 0.5rem' }}
                        onClick={() => updateTabs(0)}
                    > Log in here </button>
                </p>
            </div>

            <MultiStepsForm
                steps={[
                    {
                        btnText: 'Continue !',
                        formContent:
                            <div className="register__form">
                                <div>
                                    <Label name="email" required={true}>email</Label>
                                    <Input
                                        type="text"
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
                                        placeholder="ABC123def456!?#"
                                        required={true}
                                        value={password}
                                        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label name="confirmPassword" required={true}>Confirm password</Label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Password again"
                                        required={true}
                                        value={confirmPassword}
                                        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                    />
                                    <div style={{ padding: '1rem 1.5rem' }}>
                                        <p className='register__form__subtitle'>
                                            By creating an account, you accept the
                                        </p>
                                        <NavLink
                                            to={"/cgu"}
                                            className="register__form__cgu"
                                        >
                                            general condition of use
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                    },
                    {
                        btnText: 'Register !',
                        formContent: <div>pipi</div>
                    }
                ]}
            />

        </div >
    )
}
