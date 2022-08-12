import * as React from "react";
import { ModalBase } from "#shared/components/ModalBase";

import ConfirmPNG from '#assets/reserve-cask/confirm.png';

import { useTranslation } from "react-i18next";
import axios from 'axios';

import {
    ModalContainer,
    ModalTitle,
    ModalContent,
    ModalFooter,
    modalBaseStyles,
    TableContainer,
    Input,
    Button,
    FormGroup,
    Label,
    AmountInput,
    InputBox
} from './styled';

const HowMuchForm = (props) => {
    const {
        handleChangeStep,
        amount,
        setAmount
    } = props;
    return (
        <>
            <FormGroup className={'row'}
                style={{ marginBottom: '40px' }}
            >
                <Label>
                    Amount
                </Label>
                <InputBox>
                    <span>$</span>
                    <AmountInput type='number'
                        placeholder="amount"
                        min={0}
                        value={amount}
                        onChange={(event) => {
                            setAmount(event.target.value);
                        }}
                    />
                </InputBox>

            </FormGroup>

            <Button
                type="button"
                color={amount == 0 ? "transparent" : "active"}
                onClick={() => handleChangeStep('verification')}
            >
                <div>{"Continue"}</div>
            </Button>
        </>
    )
}

const SuccessConfirm = (props) => {
    const {
        closeModal
    } = props;

    const handleSuccess = () => {
        window.open("https://www.vinovest.co/signup");
        closeModal();
    }
    return (
        <>
            <div style={{ fontSize: '20px' }}>
                Our team will be in touch shortly.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <img src={ConfirmPNG} />
            </div>
            <Button
                onClick={handleSuccess}
            >
                Complete your account step
            </Button>
        </>
    )
}

const CongratsConfirm = (props) => {
    const {
        closeModal
    } = props;

    const handleSuccess = () => {
        closeModal(true);
    }

    return (
        <>
            <div style={{ fontSize: '20px' }}>
                You qualify to become one of our VIP investors. To skip the line, please schedule a call directly with our team.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <img src={ConfirmPNG} />
            </div>
            <Button onClick={handleSuccess}>
                book a call
            </Button>


        </>
    )
}


const Verification = (props) => {

    const {
        handleChangeStep,
        amount
    } = props;

    const verifyData = {
        "fname": '',
        "lname": '',
        "email": '',
        "phone": ''
    }

    const [verifyList, setVerifyList] = React.useState(verifyData);

    const handleChange = key => (event) => {
        let temp = verifyList;
        temp[key] = event.target.value;
        setVerifyList({ ...temp });
    }
    return (
        <>
            <FormGroup>
                <Label>First name</Label>
                <Input type='text' value={verifyList.fname} onChange={handleChange('fname')}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Last name</Label>
                <Input type='text' value={verifyList.lname} onChange={handleChange('lname')}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type='email' value={verifyList.email} onChange={handleChange('email')}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Phone Number</Label>
                <Input type='text' value={verifyList.phone} onChange={handleChange('phone')}></Input>
            </FormGroup>
            <Button
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    if (verifyList.fname.length != 0 && verifyList.lname.length != 0 && verifyList.email.length != 0 && verifyList.phone.length != 0) {
                        let state = {
                            "First Name": verifyList.fname,
                            "Last Name": verifyList.lname,
                            "Email": verifyList.email,
                            "Phone Number": verifyList.phone,
                            "Investment Amount": amount,
                        }
                        axios.post('https://sheet.best/api/sheets/4ae4e321-3686-4de4-b4b6-0355734b8ad0', state)
                            .then(response => {
                                if (response.status == 200) {
                                    if (amount >= 5000) {
                                        handleChangeStep('congrats')
                                    } else {
                                        handleChangeStep('success')
                                    }
                                }

                            })

                    }

                }}
            >
                <div>{"Continue"}</div>
            </Button>
            <Button
                color='transparent'
                onClick={() => handleChangeStep('how_much')}
            >
                <div>{"Back"}</div>
            </Button>
        </>
    )
}

const InvestModal = ({ closeModal }) => {

    const [step, setStep] = React.useState('how_much');

    const { t } = useTranslation("reserve-cask");

    const [amount, setAmount] = React.useState(0);

    return (
        <>
            <ModalBase isOpen onClose={closeModal} borderRadius={20} additionalStyles={modalBaseStyles}>
                <ModalContainer>
                    <ModalTitle>
                        {t(`reserve_modals.${step}.title`)}
                    </ModalTitle>
                    <ModalContent>
                        {step === 'how_much' && <HowMuchForm
                            handleChangeStep={setStep}
                            amount={amount}
                            setAmount={setAmount}
                        />}
                        {step === 'verification' && <Verification
                            amount={amount}
                            handleChangeStep={setStep}
                        />}
                        {step === 'success' && <SuccessConfirm
                            closeModal={closeModal}
                        />}
                        {
                            step === 'congrats' && <CongratsConfirm
                                closeModal={closeModal}
                            />
                        }
                    </ModalContent>
                </ModalContainer>
            </ModalBase>
        </>
    )
}

export default InvestModal;
