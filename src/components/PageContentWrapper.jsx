import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const PageContentWrapper = ({ children }) => {
    const { t } = useTranslation();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();

        let message;
        if (hour >= 0 && hour < 12) {
            message = t("pageContentWrapper.time1");
        } else if (hour >= 12 && hour < 15) {
            message = t("pageContentWrapper.time2");
        } else if (hour >= 15 && hour < 18) {
            message = t("pageContentWrapper.time3");
        } else if (hour >= 18 && hour < 21) {
            message = t("pageContentWrapper.time4");
        } else {
            message = t("pageContentWrapper.time5");
        }

        setGreeting(message);
    }, []);

    return (
        <main className="mt-[4.167rem] ml-[14.5rem] min-h-screen w-[calc(100%-14.5rem)] p-[2.083rem] max-lg:ml-0 max-lg:w-full">
            <div className="flex flex-col items-center gap-[1rem]">
                <div className="w-full">
                    <Typography gutterBottom variant="h5" sx={{ fontWeight: "light", m: 1 }}>
                        {greeting}
                    </Typography>
                </div>
                {children}
            </div>
        </main>
    );
};

PageContentWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageContentWrapper;
