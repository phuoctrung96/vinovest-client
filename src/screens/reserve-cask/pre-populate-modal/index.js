import * as React from "react";
import { ModalBase } from "#shared/components/ModalBase";

import ConfirmPNG from '#assets/reserve-cask/confirm.png';
import { useTranslation } from "react-i18next";
import { numberWithCommas } from '#utils/numberUtils';
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
    DisableDiv
} from './styled';

const ReservationForm = (props) => {
    const { t } = useTranslation("reserve-cask");

    const {
        handleChangeStep,
        quantityList,
        setQuantityList
    } = props;

    const headFields = [
        "WHISKEY PACKAGES",
        "QUANTITY",
        "EST. PRICE"
    ]

    let totalquantity = 0;
    let totalprice = 0;

    quantityList.forEach((entry) => {
        totalquantity += parseInt(entry.quantity);
        totalprice += parseInt(entry.quantity) * parseInt(entry.price);
    });

    const handleChange = key => (event) => {
        let temp = [...quantityList];
        quantityList.map((entry, index) => {
            if (entry.key == key) {
                temp[index].quantity = event.target.value;
            }
        })
        setQuantityList([...temp]);
    }


    return (
        <>
            <TableContainer>
                <table >
                    <thead>
                        <tr>
                            {headFields.map((head, index) => (
                                <td key={index}>
                                    {head}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quantityList.map((qValue, index) => (
                                <tr key={index}>
                                    <td>{t(`reserve_modals.whiskey_list.${qValue.key}.name`)}</td>
                                    <td>
                                        <Input
                                            type='number'
                                            min="0"
                                            defaultValue={qValue.quantity}
                                            onChange={handleChange(qValue.key)}
                                        />
                                    </td>
                                    <td>${numberWithCommas(qValue.quantity * qValue.price)}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td>{`Total`}</td>
                            <td>
                                {totalquantity}
                            </td>
                            <td>${numberWithCommas(totalprice)}</td>
                        </tr>
                    </tbody>
                </table>
            </TableContainer>
            <Button
                onClick={() => {
                    if (totalquantity > 0) {
                        handleChangeStep('checkout')
                    }
                }}
            >
                <div>{"Continue"}</div>
            </Button>
        </>
    )
}

const CheckOut = (props) => {
    const { t } = useTranslation("reserve-cask");
    const headFields = [
        "WHISKEY PACKAGES",
        "QUANTITY",
        "EST. PRICE"
    ]

    const {
        handleChangeStep,
        quantityList
    } = props;

    let totalquantity = 0;
    let totalprice = 0;

    quantityList.forEach((entry) => {
        totalquantity += parseInt(entry.quantity);
        totalprice += parseInt(entry.quantity) * parseInt(entry.price);
    });

    return (
        <>
            <TableContainer>
                <table >
                    <thead>
                        <tr>
                            {headFields.map((head, index) => (
                                <td key={index}>
                                    {head}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quantityList.map((qValue, index) => (
                                qValue.quantity != 0 ? <tr key={index}>
                                    <td>{t(`reserve_modals.whiskey_list.${qValue.key}.name`)}</td>
                                    <td>{qValue.quantity}
                                    </td>
                                    <td>${numberWithCommas(qValue.quantity * qValue.price)}</td>
                                </tr> :
                                    <DisableDiv key={index}>
                                        <td>{t(`reserve_modals.whiskey_list.${qValue.key}.name`)}</td>
                                        <td>{qValue.quantity}
                                        </td>
                                        <td>${numberWithCommas(qValue.quantity * qValue.price)}</td>
                                    </DisableDiv>
                            ))
                        }
                        <tr>
                            <td>{`Total`}</td>
                            <td>
                                {totalquantity}
                            </td>
                            <td>${numberWithCommas(totalprice)}</td>
                        </tr>
                    </tbody>
                </table>
            </TableContainer>
            <Button
                style={{ marginBottom: '10px' }}
                onClick={() => handleChangeStep('verification')}
            >
                <div>{"Continue"}</div>
            </Button>
            <Button
                color='transparent'
                onClick={() => handleChangeStep('whiskey_reservation')}
            >
                <div>{"Back"}</div>
            </Button>
        </>
    )
}

const SuccessConfirm = (props) => {
    const {
        handleChangeStep,
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
                DONE
            </Button>
        </>
    )
}

const CongratsConfirm = (props) => {
    const {
        handleChangeStep,
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
        quantityList
    } = props;

    let totalprice = 0;

    quantityList.forEach((entry) => {
        totalprice += parseInt(entry.quantity) * parseInt(entry.price);
    });

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
                            "American Whiskey": quantityList[0].quantity,
                            "New Age Scotch (Lightly Peated)": quantityList[1].quantity,
                            "New Age Scotch (Heavily Peated)": quantityList[2].quantity,
                            "Total": totalprice,
                        }
                        axios.post('https://sheet.best/api/sheets/4ae4e321-3686-4de4-b4b6-0355734b8ad0', state)
                            .then(response => {
                                if (response.status == 200) {
                                    if (totalprice >= 5000) {
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
                onClick={() => handleChangeStep('checkout')}
            >
                <div>{"Back"}</div>
            </Button>
        </>
    )
}

const PrePopulateModal = ({ closeModal }) => {

    const [step, setStep] = React.useState('whiskey_reservation');

    const { t } = useTranslation("reserve-cask");

    const whiskyList = [
        {
            key: 'american',
            quantity: 0,
            price: 1200
        },
        {
            key: 'new_age_scotch_light',
            quantity: 0,
            price: 4000
        },
        {
            key: 'new_age_scotch_heavy',
            quantity: 0,
            price: 6000
        }
    ]

    const [quantityList, setQuantityList] = React.useState(whiskyList);



    return (
        <>
            <ModalBase isOpen onClose={closeModal} borderRadius={20} additionalStyles={modalBaseStyles}>
                <ModalContainer>
                    <ModalTitle>
                        {t(`reserve_modals.${step}.title`)}
                    </ModalTitle>

                    <ModalContent>
                        {
                            step === 'whiskey_reservation' && <ReservationForm handleChangeStep={setStep} quantityList={quantityList} setQuantityList={setQuantityList} />
                        }
                        {
                            step === 'checkout' && <CheckOut
                                handleChangeStep={setStep}
                                quantityList={quantityList}
                            />
                        }
                        {
                            step === 'verification' && <Verification
                                handleChangeStep={setStep}
                                quantityList={quantityList}
                            />
                        }
                        {
                            step === 'success' && <SuccessConfirm
                                handleChangeStep={setStep}
                                closeModal={closeModal}
                            />
                        }
                        {
                            step === 'congrats' && <CongratsConfirm
                                handleChangeStep={setStep}
                                closeModal={closeModal}
                            />
                        }
                    </ModalContent>
                </ModalContainer>
            </ModalBase>
        </>
    )
}

export default PrePopulateModal;
