import * as React from "react";
import { ModalBase } from "#shared/components/ModalBase";

import ConfirmPNG from './confirm.png' ;

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
    Label
} from './styled' ;

const PriceForm = () => {
    const headFields = [
        "WHISKEY PACKAGES",
        "QUANTITY",
        "EST. PRICE"
    ]

    return (
        <>
            <TableContainer>
                <table >
                    <tr>
                        {headFields.map((head, index) => (
                            <td key={index}>
                                {head}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>American Whiskey</td>
                        <td>
                            <Input
                                type='number'
                            />
                        </td>
                        <td>$1,200</td>
                    </tr>
                    <tr>
                        <td>{`New Age Scotch (Lightly Peated)`}</td>
                        <td>
                            <Input
                                type='number'
                            />
                        </td>
                        <td>$0</td>
                    </tr>
                    <tr>
                        <td>{`New Age Scotch (Heavily Peated)`}</td>
                        <td>
                            <Input
                                type='number'
                            />
                        </td>
                        <td>${0}</td>
                    </tr>
                    <tr>
                        <td>{`Total`}</td>
                        <td>
                        {`1`}
                        </td>
                        <td>$1,200</td>
                    </tr>
                </table>
            </TableContainer>
            <Button>
                <div>{"Continue"}</div>
            </Button>
        </>
    )
}

const CheckOut = () => {
    const headFields = [
        "WHISKEY PACKAGES",
        "QUANTITY",
        "EST. PRICE"
    ]

    return (
        <>
            <TableContainer>
                <table >
                    <tr>
                        {headFields.map((head, index) => (
                            <td key={index}>
                                {head}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>American Whiskey</td>
                        <td>
                            0
                        </td>
                        <td>$1,200</td>
                    </tr>
                    <tr>
                        <td>{`New Age Scotch (Lightly Peated)`}</td>
                        <td>
                            0
                        </td>
                        <td>$0</td>
                    </tr>
                    <tr>
                        <td>{`New Age Scotch (Heavily Peated)`}</td>
                        <td>
                            0
                        </td>
                        <td>${0}</td>
                    </tr>
                    <tr>
                        <td>{`Total`}</td>
                        <td>
                        {`1`}
                        </td>
                        <td>$1,200</td>
                    </tr>
                </table>
            </TableContainer>
            <Button
                style={{marginBottom : '10px'}}
            >
                <div>{"Continue"}</div>
            </Button>
            <Button
                color='transparent'
            >
                <div>{"Back"}</div>
            </Button>
        </>
    )
}

const SuccessConfirm = () => {
    return (
        <>
            <div style={{fontSize : '20px'}}>
                Our team will be in touch shortly.
            </div>
            <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', height : '300px'}}>
                <img src={ConfirmPNG} />
            </div>
            <Button>
                Complete your account step
            </Button>
        </>
    )
}

const CongratsConfirm = () => {
    return (
        <>
            <div style={{fontSize : '20px'}}>
                You qualify to become one of our VIP investors. To skip the line, please schedule a call directly with our team.
            </div>
            <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', height : '300px'}}>
                <img src={ConfirmPNG} />
            </div>
            <Button>
                book a call
            </Button>
        </>
    )
}

const Verification = () => {
    return (
        <>
            <FormGroup>
                <Label>First name</Label>
                <Input></Input>
            </FormGroup>
            <FormGroup>
                <Label>Last name</Label>
                <Input></Input>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input></Input>
            </FormGroup>
            <FormGroup>
                <Label>Phone Number</Label>
                <Input></Input>
            </FormGroup>
            <Button
                style={{marginBottom : '10px'}}
            >
                <div>{"Continue"}</div>
            </Button>
            <Button
                color='transparent'
            >
                <div>{"Back"}</div>
            </Button>
        </>
    )
}

const InvestModal = ({ closeModal, title, content, footer }) => {

    const [step, setStep] = React.useState() ;

    
    return (
        <>
            <ModalBase isOpen onClose={closeModal} borderRadius={20} additionalStyles={modalBaseStyles}>
                <ModalContainer>
                    <ModalTitle>
                        {title}
                    </ModalTitle>
                    <ModalContent>
                        {}
                    </ModalContent>
                </ModalContainer>
            </ModalBase>
        </>
    )
}

export default InvestModal;
