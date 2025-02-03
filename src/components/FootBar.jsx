import { Divider, Typography } from "@mui/material";

const FootBar = () => {
    return (
        <>
            <div className="z-15 flex flex-col bg-white">
                <Divider flexItem />
                <div className="relative flex h-[4.167rem] flex-row items-center justify-center px-[2.083rem] text-gray-500 shadow-xl">
                    <Typography sx={{ fontSize: "0.85rem" }}>
                        Copyright © 2025 Imam Arrahman
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default FootBar;
