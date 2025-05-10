import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";

const SettingsContext = createContext();

/**
 * The SettingsProvider component provides the settings context to its children.
 *
 * The SettingsProvider fetches the current user on mount and exposes the
 * getCurrentUser, updateCurrentUser, and updateCurrentUserPassword functions
 * to its children.
 *
 * @param {Object} props The props object.
 * @param {ReactNode} props.children The children components.
 * @returns {ReactElement} The SettingsProvider component.
 */
const SettingsProvider = ({ children }) => {
    const { t } = useTranslation();
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async () => {
        try {
            const response = await axiosInstance.get("/settings/me");
            setCurrentUser(response.data.data);
        } catch {
            toast.error(t("settings.getCurrentUser.error"));
        }
    };

    const updateCurrentUser = async (updatedCurrentUser) => {
        try {
            await axiosInstance.put("/settings/me", updatedCurrentUser);
            toast.success(t("settings.updateCurrentUser.ok"));
            getCurrentUser();
        } catch (error) {
            if (error.response) {
                if (error.response.data.error === "User not found") {
                    toast.error(t("settings.updateCurrentUser.notFound"));
                }
                if (error.response.data.error === "Username or email already exists") {
                    toast.error(t("settings.updateCurrentUser.conflict"));
                }
            } else {
                toast.error(t("settings.updateCurrentUser.error"));
            }
        }
    };

    const updateCurrentUserPassword = async (updatedCurrentUserPassword) => {
        try {
            await axiosInstance.put("/settings/me/password", updatedCurrentUserPassword);
            toast.success(t("settings.updateCurrentUserPassword.ok"));
        } catch (error) {
            if (error.response) {
                if (error.response.data.error === "User not found") {
                    toast.error(t("settings.updateCurrentUserPassword.notFound"));
                }
                if (error.response.data.error === "Old password is wrong") {
                    toast.error(t("settings.updateCurrentUserPassword.forbidden"));
                }
            } else {
                toast.error(t("settings.updateCurrentUserPassword.error"));
            }
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                currentUser,
                updateCurrentUser,
                updateCurrentUserPassword,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

SettingsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SettingsContext, SettingsProvider };
