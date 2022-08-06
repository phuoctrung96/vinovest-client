import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Quality } from "#shared/ui/QualityValueList";

import InsuredPNG from "../assets/Insured.png";
import SamplePNG from "../assets/Sample.png";
import RecessionPNG from "../assets/RecessionProof.png";
import VisitPNG from "../assets/Visit.png";
import BottledPNG from "../assets/Bottled.png";
import HistoricalPNG from "../assets/Historical.png";


const valueProps = [
    {
        description: i18n.t("reserve-cask:reserve_cask.benefits.description_1"),
        svg: InsuredPNG,
    },
    {
        description: i18n.t("reserve-cask:reserve_cask.benefits.description_2"),
        svg: SamplePNG,
    },
    {
        description: i18n.t("reserve-cask:reserve_cask.benefits.description_3"),
        svg: RecessionPNG,
    },
    {
        description: i18n.t("reserve-cask:reserve_cask.benefits.description_4"),
        svg: VisitPNG,
    },
    {
        description: i18n.t("reserve-cask:reserve_cask.benefits.description_5"),
        svg: BottledPNG,
    },
    {
        description: i18n.t("reserve-cask:reserve_cask.benefits.description_6"),
        svg: HistoricalPNG,
    },
];

const QualityWrapper = () => {
    const { t } = useTranslation("reserve-cask");
    return (
        <Quality
            valueProps={valueProps}
            title={t("reserve_cask.benefits.title")}
        />
    );
};

export default QualityWrapper;
