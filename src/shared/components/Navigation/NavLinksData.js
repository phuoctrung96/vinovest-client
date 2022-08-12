import i18n from "i18next";
import { ROUTE_PATHS } from "../../../screens/route-paths";

export const isMatch = (match) => match;

export const NAVIGATION_LINKS_USER = [
    {
        to: ROUTE_PATHS.managedPortfolio,
        href: true,
        label: i18n.t("common:managed"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.trading,
        label: i18n.t("common:trading"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.community,
        label: i18n.t("common:community"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.invite,
        label: i18n.t("common:invite"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.help,
        label: i18n.t("common:help"),
        exact: true,
        isActive: isMatch,
    },
];

export const NAVIGATION_SUB_LINKS = [
    {
        to: ROUTE_PATHS.aboutUs,
        label: i18n.t("common:about"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.blog,
        label: i18n.t("common:blog"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.help,
        label: i18n.t("common:help"),
        exact: true,
        isActive: isMatch,
    },
    ,
];

export const NAVIGATION_LINKS_GUEST = [
    {
        to: ROUTE_PATHS.whyWine,
        label: i18n.t("common:why-wine"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.howItWorks,
        label: i18n.t("common:how-it-works"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.marketPlace,
        label: i18n.t("common:marketPlace"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.whiskeyVest,
        label: i18n.t("common:whiskey-vest"),
        exact: true,
        isActive: isMatch,
    },
    ,
];
