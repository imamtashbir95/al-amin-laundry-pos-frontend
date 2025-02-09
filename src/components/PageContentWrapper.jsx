import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const PageContentWrapper = ({ children }) => {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();

        let message;
        if (hour >= 0 && hour < 12) {
            message = "Selamat pagi!";
        } else if (hour >= 12 && hour < 15) {
            message = "Selamat siang!";
        } else if (hour >= 15 && hour < 18) {
            message = "Selamat sore!";
        } else {
            message = "Selamat malam!";
        }

        setGreeting(message);
    }, []);

    return (
        <div className="absolute top-[4.167rem] left-[17.5rem] z-10 w-[calc(100%-17.5rem)] p-[2.083rem] max-lg:left-0 max-lg:w-full">
            <div className="flex flex-col items-center gap-[1rem] pb-[1rem]">
                <div className="w-full">
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "light", m: 1 }}
                    >
                        {greeting}
                    </Typography>
                </div>
                {children}
            </div>
        </div>
    );
};

PageContentWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageContentWrapper;
