import * as React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useConfig } from "#shared/hooks";

import PrePopulateModal from "../pre-populate-modal";
import InvestModal from "../invest-modal";

import AmericanPNG from "#assets/reserve-cask/american.png";
import NewAgeScotchPNG from "#assets/reserve-cask/new_age_scotch.png";
import UltraRareScotchPNG from "#assets/reserve-cask/ultra_rare_scotch.png";
import StairPNG from "#assets/reserve-cask/stair.png";

const ReserveList = () => {
    const config = useConfig();
    const { t } = useTranslation("reserve-cask");

    const cardList = [
        {
            key: "american",
            img: AmericanPNG,
        },
        {
            key: "new_age_scotch",
            img: NewAgeScotchPNG,
        },
        {
            key: "ultra_rare_scotch",
            img: UltraRareScotchPNG,
        },
    ];

    const [openPrePopulate, setOpenPrePopulate] = React.useState(false);
    const [openInvest, setOpenInvest] = React.useState(false);
    const [openCalender, setOpenOpenCalender] = React.useState(false);

    React.useEffect(() => {
        if (openCalender) {
            const node = document.querySelector(".calendly-popup-close");
            node.addEventListener("click", listener);

            function listener() {
                node.removeEventListener("click", listener);
                setOpenOpenCalender(false);
            }
        }
    }, [openCalender]);

    const handleOpenCalendly = React.useCallback(() => {
        window.Calendly.initPopupWidget({
            url: config.calendly.whiskeyvestUrl,
        });
        setOpenOpenCalender(true);
    }, [config.calendly.whiskeyvestUrl, setOpenOpenCalender]);

    const closePrePopulate = (flag) => {
        setOpenPrePopulate(!openPrePopulate);
    };

    const closeInvest = (flag) => {
        setOpenInvest(!openInvest);
    };

    return (
        <>
            <ReserveListDiv>
                <ReserveListWrapper>
                    {cardList.map((card) => (
                        <ReserveCard key={card.key} className={card.key === "ultra_rare_scotch" ? "active" : ""}>
                            <ReserveCardTitle className={card.key === "ultra_rare_scotch" ? "active" : ""}>
                                {t(`reserve_cask.reserve_list.${card.key}.name`)}
                            </ReserveCardTitle>
                            <ReserveThumnail>
                                <img src={card.img} />
                            </ReserveThumnail>
                            <ReservePrice className={card.key === "ultra_rare_scotch" ? "active" : ""}>
                                {t(`reserve_cask.reserve_list.${card.key}.price`)}
                            </ReservePrice>
                            <ReserveBtn
                                onClick={() => {
                                    if (card.key === "ultra_rare_scotch") {
                                        handleOpenCalendly();
                                    } else {
                                        setOpenPrePopulate(true);
                                    }
                                }}
                            >
                                {t(`reserve_cask.reserve_list.${card.key}.btn_label`)}
                            </ReserveBtn>
                            <ReserveDescription className={card.key === "ultra_rare_scotch" ? "active" : ""}>
                                {t(`reserve_cask.reserve_list.${card.key}.description`)}
                            </ReserveDescription>
                        </ReserveCard>
                    ))}
                </ReserveListWrapper>
                <BrandDiv>
                    <BrandImageDiv>
                        <img src={StairPNG} />
                    </BrandImageDiv>
                    <BrandQuestion>{t("reserve_cask.reserve_list.brand.question")}</BrandQuestion>
                    <BrandDescription>{t("reserve_cask.reserve_list.brand.description")}</BrandDescription>
                    <BrandButton
                        onClick={() => {
                            setOpenInvest(true);
                        }}
                    >
                        {t("reserve_cask.reserve_list.brand.btn_label")}
                    </BrandButton>
                </BrandDiv>
            </ReserveListDiv>

            {openPrePopulate && <PrePopulateModal isModal={openPrePopulate} closeModal={closePrePopulate} />}

            {openInvest && <InvestModal isModal={openInvest} closeModal={closeInvest} />}
        </>
    );
};

const ReserveListDiv = styled.div`
    display: flex;
    justify-content: center;

    flex-direction: column;

    position: relative;
    z-index: 5;

    width: 100%;
`;

const ReserveListWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;

    flex-wrap: wrap;
`;

const ReserveCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: white;

    gap: 20px;

    padding: 20px;
    border: 2px solid #242e35;

    width: 370px;
    min-width: 370;

    &.active {
        background: #191b1c;
    }

    cursor: pointer;

    @media screen and (max-width: 384px) {
        width: 100%;
    }
`;

const ReserveCardTitle = styled.div`
    padding-top: 20px;
    font-size: 48px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-weight: 500;
    color: black;

    &.active {
        color: #fae8d1;
    }

    @media screen and (max-width: 380px) {
        font-size: 32px;
    }
`;

const ReserveThumnail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 300px;
`;

const ReservePrice = styled.div`
    font-family: VinovestMedium, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;

    text-align: center;
    letter-spacing: 0.005em;

    color: #242e35;

    &.active {
        color: #fae8d1;
    }
`;

const ReserveBtn = styled.div`
    width: 310px;
    height: 60px;
    left: 434px;
    top: 409px;

    background: #a86d37;
    border-radius: 3px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover {
        background: #87572c;
    }
`;

const ReserveDescription = styled.div`
    font-family: VinovestMedium, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.005em;

    color: #242e35;

    &.active {
        color: #fae8d1;
    }
`;
const BrandImageDiv = styled.div`
    display: none;
    @media screen and (max-width: 1110px) {
        display: flex;
        justify-content: flex-end;
    }

    & img {
        @media screen and (max-width: 590px) {
            width: 100%;
        }
    }
`;

const BrandDiv = styled.div`
    margin-top: 50px;

    background: #3c400c;

    background-image: url(${StairPNG});
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 300px 220px;

    @media screen and (max-width: 1110px) {
        background-image: none;
    }
`;

const BrandQuestion = styled.div`
    font-size: 40px;
    font-weight: 700;
    text-align: left;
    font-family: RoslindaleDisplayCondensed;

    width: fit-content;

    padding-top: 50px;
    padding-left: 50px;

    @media screen and (max-width: 1110px) {
        font-size: 32px;
    }

    @media screen and (max-width: 385px) {
        padding-left: 10px;
        padding-right: 10px;

        text-align: center;

        width: 100%;
    }
`;

const BrandDescription = styled.div`
    font-size: 40px;
    font-weight: 700;
    text-align: left;
    font-family: RoslindaleDisplayCondensed;

    width: fit-content;
    padding-left: 50px;

    @media screen and (max-width: 1110px) {
        font-size: 32px;
    }

    @media screen and (max-width: 385px) {
        padding-left: 10px;
        padding-right: 10px;

        text-align: center;

        width: 100%;
    }
`;

const BrandButton = styled.div`
    margin-top: 40px;
    margin-left: 50px;
    margin-bottom: 50px;

    cursor: pointer;
    border: 1px solid #fae8d1;
    display: flex;
    justify-content: center;
    align-items: center;

    text-transform: uppercase;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    width: fit-content;

    @media screen and (max-width: 385px) {
        padding-left: 10px;
        padding-right: 10px;

        margin-left: 10px;
        margin-right: 10px;

        text-align: center;

        width: auto;
    }
`;

export default ReserveList;
