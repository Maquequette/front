import { TabsContext } from "@/contexts/TabsContext"
import { NavLink } from "react-router-dom"
import { FormEvent, useContext, useState } from 'react'

import Heading from "@/components/01 - Atoms/Heading/Heading"
import MultiStepsForm from "@/components/02 - Molecules/MultiStepsForm/MultiStepsForm"
import Label from "@/components/01 - Atoms/Label/Label"
import Input from "@/components/01 - Atoms/Input/Input"
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect"

import './Register.scss'
import Tooltip from "@/components/01 - Atoms/Tooltip/Tooltip"
import useAuth from "@/hooks/useAuth"
import clsx from "clsx"


export default function Register() {

    const { updateTabs } = useContext(TabsContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    const { onRegister } = useAuth()
    const submitRegister = () => {
        onRegister({
            name: `${firstName} ${lastName}`,
            email,
            password,
            password_confirmation: confirmPassword
        })
    }


    return (
        <div className='register'>
            <div>
                <Heading
                    tag='h1'
                    level="secondary"
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
                handleSubmit={submitRegister}
                steps={[
                    {
                        btnText: 'Continue !',
                        stepSubmit: () => password === confirmPassword,
                        formContent:
                            <div className="register__form">
                                <div>
                                    <Label name="email" required={true}>email</Label>
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
                                    <Label
                                        name="password"
                                        required={true}
                                        tooltip={
                                            <Tooltip>
                                                Your password must contain : <br />
                                                <span className={clsx(/[A-Z]/.test(password) && 'tooltip__popup__span--success')}>** At least one capital letter </span><br />
                                                <span className={clsx(/\d/.test(password) && 'tooltip__popup__span--success')}>** At least one number </span><br />
                                                <span className={clsx(password.length >= 8 && 'tooltip__popup__span--success')}>** At least 8 characters </span><br />
                                            </Tooltip>
                                        }
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="ABC123def456!?#"
                                        required={true}
                                        value={password}
                                        pattern="^(?=.*[A-Z])(?=.*\d).{8,}$"
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
                                            to="/cgu"
                                            className="register__form__cgu"
                                        >
                                            general condition of use
                                        </NavLink>
                                    </div>
                                </div>
                            </div >

                    },
                    {
                        btnText: 'Register !',
                        stepSubmit: () => true,
                        formContent:
                            <div className="register__form">
                                <div className="register__form__inline">
                                    <div>
                                        <Label name="firstName" required={true}>First Name</Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            placeholder="John"
                                            required={true}
                                            value={firstName}
                                            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setFirstName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label name="lastName" required={true}>Last Name</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            placeholder="Doe"
                                            required={true}
                                            value={lastName}
                                            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setLastName(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label name="profileType">What type of profile are you ?</Label>
                                    <Multiselect options={[
                                        { label: "Student", value: "student" },
                                        { label: "Developer", value: "developer" },
                                        { label: "Web Designer", value: "webdesigner" },
                                        { label: "suceur de biteeeeuuuh MACROOOON ENCUuULEEEE", value: "macron" }
                                    ]} theme={"primary"}></Multiselect>
                                </div>
                            </div>
                    }
                ]}
            />

        </div >
    )
}
