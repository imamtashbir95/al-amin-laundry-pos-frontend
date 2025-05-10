import { Divider, Typography } from "@mui/material";

const FootBar = () => {
    return (
        <>
            <footer className="z-10 flex flex-col bg-white">
                <Divider flexItem />
                <div className="relative flex h-[4.167rem] flex-row items-center justify-center px-[2.083rem] text-gray-500 shadow-xl">
                    <Typography sx={{ fontSize: "0.85rem" }}>
                        Copyright © 2025{" "}
                        <a
                            className="underline"
                            aria-label="LinkedIn Profile"
                            href="https://www.linkedin.com/in/imam-tashbir/"
                            rel="nofollow"
                            target="_blank"
                        >
                            Imam Arrahman
                        </a>
                    </Typography>
                </div>
            </footer>
        </>
    );
};

export default FootBar;
