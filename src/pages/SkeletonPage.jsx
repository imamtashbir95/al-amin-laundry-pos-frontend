import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

const SkeletonPage = () => {
    return (
        <>
            <div className="relative flex flex-col">
                <TopBar />
                <Sidebar />
                <div
                    className="absolute top-[4.167rem] left-[18.75rem] z-10 p-[2.083rem]"
                    style={{ width: "calc(100% - 18.75rem)" }}
                >
                    <div className="flex flex-col items-center gap-[1rem] pb-[1rem]">
                        <Card
                            sx={{
                                width: "100%",
                                height: "100%",
                                overflow: "auto",
                            }}
                        >
                            <div className="sticky top-0 z-10 bg-white">
                                <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                    <CardContent>
                                        <Skeleton
                                            variant="rounded"
                                            width={"20rem"}
                                            height={"2rem"}
                                        />
                                    </CardContent>
                                    <CardActions className="absolute right-[2.083rem]">
                                        <Skeleton
                                            variant="rounded"
                                            width={128.5}
                                            height={30.75}
                                        />
                                    </CardActions>
                                </div>
                                <div className="flex px-[0.83rem]">
                                    <div className="w-[25%]">
                                        <CardContent>
                                            <Skeleton
                                                variant="text"
                                                width={"10rem"}
                                                sx={{ fontSize: "1rem" }}
                                            />
                                            {/* <Typography
                                                variant="body1"
                                                gutterBottom
                                            >
                                                Nama Produk
                                            </Typography> */}
                                        </CardContent>
                                    </div>
                                    <div className="w-[25%]">
                                        <CardContent>
                                            <Skeleton
                                                variant="text"
                                                width={"10rem"}
                                                sx={{ fontSize: "1rem" }}
                                            />
                                        </CardContent>
                                    </div>
                                    <div className="w-[25%]">
                                        <CardContent>
                                            <Skeleton
                                                variant="text"
                                                width={"10rem"}
                                                sx={{ fontSize: "1rem" }}
                                            />
                                        </CardContent>
                                    </div>
                                    <div className="w-[25%]">
                                        <CardContent>
                                            <Skeleton
                                                variant="text"
                                                width={"10rem"}
                                                sx={{ fontSize: "1rem" }}
                                            />
                                        </CardContent>
                                    </div>
                                </div>
                            </div>
                            <div className="flex px-[0.83rem]">
                                <div className="flex w-[25%] items-center justify-center">
                                    <Skeleton
                                        variant="rounded"
                                        width={66}
                                        height={19.5}
                                    />
                                </div>
                                <div className="w-[25%]">
                                    <CardContent>
                                        <Skeleton
                                            variant="text"
                                            width={"5rem"}
                                            sx={{ fontSize: "1rem" }}
                                        />
                                    </CardContent>
                                </div>
                                <div className="w-[20%]">
                                    <CardContent>
                                        <Skeleton
                                            variant="text"
                                            width={"5rem"}
                                            sx={{ fontSize: "1rem" }}
                                        />
                                    </CardContent>
                                </div>
                                <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                    <Skeleton
                                        variant="rounded"
                                        width={64}
                                        height={30.75}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={64}
                                        height={30.75}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="h-[12rem] w-[18.75rem]"></div>
                <FootBar />
            </div>
        </>
    );
};

export default SkeletonPage;
