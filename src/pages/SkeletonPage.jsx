import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { Card, CardActions, CardContent, Skeleton } from "@mui/material";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";

const SkeletonText = ({ width }) => (
    <CardContent>
        <Skeleton variant="text" width={width} sx={{ fontSize: "1rem" }} />
    </CardContent>
);

SkeletonText.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const SkeletonButton = ({ width, height }) => (
    <Skeleton variant="rounded" width={width} height={height} />
);

SkeletonButton.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

const SkeletonPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <>
            <div className="relative flex flex-col bg-[#fafafa]">
                <TopBar />
                {isDesktop && <Sidebar />}
                <div className="z-10 ml-[14.5rem] min-h-screen w-[calc(100%-14.5rem)] p-[2.083rem] max-lg:ml-0 max-lg:w-full">
                    <div className="flex flex-col items-center gap-[1rem]">
                        <div className="h-full w-full max-lg:overflow-x-scroll">
                            <div className="h-full max-lg:w-[58.33rem]">
                                <Card sx={{ backgroundColor: "#ffffff" }}>
                                    <div className="">
                                        <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                            <CardContent>
                                                <SkeletonButton
                                                    width={"20rem"}
                                                    height={"2rem"}
                                                />
                                            </CardContent>
                                            <CardActions className="absolute right-[2.083rem]">
                                                <SkeletonButton
                                                    width={128.5}
                                                    height={30.75}
                                                />
                                            </CardActions>
                                        </div>
                                        <div className="flex px-[0.83rem]">
                                            {[...Array(4)].map((_, index) => (
                                                <div
                                                    className="w-[25%]"
                                                    key={index}
                                                >
                                                    <SkeletonText
                                                        width={"10rem"}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex px-[0.83rem]">
                                        <div className="flex w-[25%] items-center justify-center">
                                            <SkeletonButton
                                                width={66}
                                                height={19.5}
                                            />
                                        </div>
                                        <div className="w-[25%]">
                                            <SkeletonText width={"5rem"} />
                                        </div>
                                        <div className="w-[20%]">
                                            <SkeletonText width={"5rem"} />
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            {[...Array(2)].map((_, index) => (
                                                <SkeletonButton
                                                    key={index}
                                                    width={64}
                                                    height={30.75}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <FootBar />
            </div>
        </>
    );
};

export default SkeletonPage;
