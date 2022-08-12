/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavLink, LinkHtml } from "#shared/ui";
import { NavUpdates } from "#shared/components/Navigation/Navigation.styled";
import { DepositButton } from "#shared/components/Deposit";
import { useCreateRoutingCallback, useRootStore } from "#shared/hooks";
import { checkHasToken } from "#utils/shared";
import userSvg from "#assets/shared/user.svg";
import { LinksRow, AccountSection, DesktopNavBarContainer, WelcomeText, Beta } from "../Navigation.styled";
import { NAVIGATION_LINKS_USER, NAVIGATION_LINKS_GUEST } from "../NavLinksData";
import { ACCOUNT_LINK } from "../utils";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import { ROUTE_PATHS } from "#screens/route-paths.js";

interface DesktopNavigationBarProps {
    authenticated: boolean;
    linkClassName: string;
    isSticky: boolean;
    setOpenSubLink: boolean;
}

export const DesktopNavBar: React.FC<DesktopNavigationBarProps> = observer(
    ({ authenticated, linkClassName, isSticky, setOpenSubLink }) => {
        const s = useRootStore();
        const { t } = useTranslation(["common"]);
        const { pathname, search } = useLocation();
        const [userInformation, setUserInformation] = useState(null);
        const routeToDeposit = useCreateRoutingCallback(ROUTE_PATHS.deposit, {
            refresh: true,
            posthogId: DepositEvent.AddFunds,
        });
        const accountPage = pathname.includes(ROUTE_PATHS.account);
        const pendingDepositsCount = s.transfer.pendingDeposits.length;
        const hasToken = checkHasToken();
        const NAVIGATION_LINKS = authenticated || hasToken ? NAVIGATION_LINKS_USER : NAVIGATION_LINKS_GUEST;

        useEffect(() => {
            setUserInformation(s.user.userInformationEntity.data);
        }, [s.user.userInformationEntity]);

        return (
            <DesktopNavBarContainer authenticated={authenticated ? 1 : 0}>
                {authenticated && (
                    <WelcomeText>
                        {t("common:welcome")}
                        {userInformation && userInformation.firstName && <span>{userInformation.firstName}!</span>}
                    </WelcomeText>
                )}
                {!accountPage && (
                    <LinksRow authenticated={authenticated}>
                        {NAVIGATION_LINKS.map(({ label, withHref, ...props }) => (
                            <React.Fragment key={label}>
                                {withHref ? (
                                    <LinkHtml href={props.to} className={isSticky ? "" : linkClassName}>
                                        {label}
                                    </LinkHtml>
                                ) : (
                                    <NavLink
                                        to={{ pathname: props.to, search }}
                                        isActive={props.isActive}
                                        exact={props.exact}
                                        className={isSticky ? "" : linkClassName}
                                        authenticated={authenticated ? 1 : 0}
                                        isTrading={label === "trade" ? 1 : 0}
                                    >
                                        {label === "Transactions" && pendingDepositsCount ? (
                                            <NavUpdates>{pendingDepositsCount}</NavUpdates>
                                        ) : null}

                                        <span
                                            className={label === "HOW IT WORKS" ? "_xto_" : ""}
                                            onMouseOver={() => {
                                                if (label === "HOW IT WORKS") {
                                                    setOpenSubLink(true);
                                                }
                                            }}
                                            onMouseOut={() => {
                                                if (label === "HOW IT WORKS") {
                                                    setOpenSubLink(false);
                                                }
                                            }}
                                        >
                                            {label}
                                        </span>
                                        {label === "WHISKEYVEST" && <Beta>NEW</Beta>}
                                    </NavLink>
                                )}
                            </React.Fragment>
                        ))}
                    </LinksRow>
                )}

                <AccountSection>
                    {authenticated ? (
                        <>
                            <DepositButton className="deposit-btn" onClick={routeToDeposit}>
                                {t("common:navigation.funds")}{" "}
                            </DepositButton>
                            <NavLink {...ACCOUNT_LINK} className="account">
                                <img src={userSvg} alt="account" />
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to=""
                                className={`login ${isSticky ? "" : linkClassName}`}
                                onClick={() => window.location.assign("/login")}
                            >
                                {t("login:login")}
                            </NavLink>
                            <DepositButton id="nav-deposit-button" onClick={() => window.location.assign("/signup")}>
                                {t("common:get-started")}
                            </DepositButton>
                        </>
                    )}
                </AccountSection>
            </DesktopNavBarContainer>
        );
    },
);
