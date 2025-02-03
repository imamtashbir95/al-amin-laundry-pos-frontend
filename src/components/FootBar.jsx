import { Divider } from "@mui/material";

const FootBar = () => {
    return (
        <>
            <div className="z-15">
                <div className="flex h-auto w-auto flex-col bg-white">
                    <Divider flexItem />
                    <div className="relative flex h-[4.167rem] flex-row items-center justify-center px-[2.083rem] text-gray-500 shadow-xl">
                        Copyright © 2025 Imam Arrahman
                    </div>
                </div>
            </div>
        </>
    );
};

export default FootBar;
