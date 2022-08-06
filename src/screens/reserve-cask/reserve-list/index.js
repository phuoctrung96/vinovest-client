import * as React from 'react' ;
import styled from 'styled-components';

import AmericanPNG from './assets/american.png' ;
import NewAgeScotchPNG from './assets/new_age_scotch.png' ;
import UltraRareScotchPNG from './assets/ultra_rare_scotch.png' ;
import StairPNG from "./assets/stair.png";

import { useTranslation } from 'react-i18next';
import PrePopulateModal from '../pre-populate-modal';

const ReserveList = () => {
    const { t } = useTranslation("reserve-cask");

    const cardList = [
        {
            key : 'american' ,
            img : AmericanPNG
        },
        {
            key : 'new_age_scotch',
            img : NewAgeScotchPNG
        },
        {
            key : 'ultra_rare_scotch',
            img : UltraRareScotchPNG
        }
    ]

    const [openPrePopulate, setOpenPrePopulate] = React.useState(true) ;

    const closePrePopulate = () => {
        setOpenPrePopulate(!openPrePopulate) ;
    }

    return (
        <>
            <ReserveListDiv>
                <ReserveListWrapper>
                    {
                        cardList.map(card => (
                            <ReserveCard key={card.key}
                                className={card.key === 'ultra_rare_scotch' ? 'active' : ''}
                            >
                                <ReserveCardTitle
                                    className={card.key === 'ultra_rare_scotch' ? 'active' : ''}
                                >
                                    {t(`reserve_cask.reserve_list.${card.key}.name`)}
                                </ReserveCardTitle>
                                <ReserveThumnail>
                                    <img src={card.img} />
                                </ReserveThumnail>
                                <ReservePrice
                                    className={card.key === 'ultra_rare_scotch' ? 'active' : ''}
                                >
                                    {t(`reserve_cask.reserve_list.${card.key}.price`)}
                                </ReservePrice>
                                <ReserveBtn>
                                    {t(`reserve_cask.reserve_list.${card.key}.btn_label`)}
                                </ReserveBtn>
                                <ReserveDescription
                                    className={card.key === 'ultra_rare_scotch' ? 'active' : ''}
                                >
                                    {t(`reserve_cask.reserve_list.${card.key}.description`)}
                                </ReserveDescription>
                            </ReserveCard>
                        ))
                    }
                </ReserveListWrapper>
                <BrandDiv
                >
                    <BrandQuestion>
                        {t(`reserve_cask.reserve_list.brand.question`)}
                    </BrandQuestion>
                    <BrandDescription>
                        {t(`reserve_cask.reserve_list.brand.description`)}
                    </BrandDescription>
                    <BrandButton>
                        {t(`reserve_cask.reserve_list.brand.btn_label`)}
                    </BrandButton>
                </BrandDiv>
            </ReserveListDiv>

            <PrePopulateModal
                isModal={openPrePopulate}
                closeModal={closePrePopulate}
                title='Whiskey Reservation'
                footer={
                    <button>

                    </button>
                }
            />
        </>
    )
}

const ReserveListDiv = styled.div`
    display : flex ;
    justify-content : center ;

    flex-direction : column ;

    position : relative ;
    z-index : 5 ;
`

const ReserveListWrapper = styled.div`
    display : flex ;
    justify-content : center ;
    gap : 30px ;
`

const ReserveCard = styled.div`
    display : flex ;
    flex-direction : column ;
    align-items : center;

    background : white ;

    gap : 20px ;

    padding : 20px;
    border: 2px solid #242E35;

    max-width : 370px ;

    &.active {
        background : #191B1C;
    }

    cursor : pointer ;
`

const ReserveCardTitle  = styled.div`
    padding-top : 20px ;
    font-size : 48px ;
    font-family: Roslindaledisplaycondensed,sans-serif;
    font-weight: 500;
    color : black ;

    &.active {
        color : #FAE8D1;
    }
`

const ReserveThumnail = styled.div`
    display : flex ;
    justify-content : center ;
    align-items : center ;

    height : 300px;
`

const ReservePrice = styled.div`
    font-family: 'Vinovest';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;

    text-align: center;
    letter-spacing: 0.005em;

    color: #242E35;

    &.active {
        color : #FAE8D1 ;
    }
`

const ReserveBtn = styled.div`
    width: 310px;
    height: 60px;
    left: 434px;
    top: 409px;

    background: #A86D37;
    border-radius: 3px;
    color : white;

    display : flex;
    justify-content : center ;
    align-items : center ;

    cursor : pointer ;

    &:hover {
        background : #87572c ;
    }
`

const ReserveDescription = styled.div`
    font-family: VinovestMedium,sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.005em;

    color: #242E35;

    &.active {
        color : #FAE8D1 ;
    }
`

const BrandDiv = styled.div`
    margin-top : 50px ;

    background : #3C400C;

    padding : 50px;
    
    background-image: url(${StairPNG});
    background-repeat: no-repeat;
    background-position: top right;
    background-size : 300px 220px ;
`

const BrandQuestion = styled.div`
    font-size : 40px ;
    font-weight : 700;
    text-align : left ;
    font-family : RoslindaleDisplayCondensed ;

    width : fit-content ;
`

const BrandDescription = styled.div`
    font-size : 40px ;
    font-weight : 700;
    text-align : left ;
    font-family : RoslindaleDisplayCondensed ;

    width : fit-content ;
`

const BrandButton = styled.div`
    margin-top : 40px ;

    cursor : pointer ;
    border : 1px solid #FAE8D1;
    display : flex ;
    justify-content : center ;
    align-items : center ;

    text-transform : uppercase ;

    padding-left : 20px;
    padding-right : 20px ;
    padding-top : 10px;
    padding-bottom : 10px ;

    width : fit-content ;
`

export default ReserveList ;