import { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Pagination,
    Typography,
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";

const DataTableUsers = ({ onRegisterUser, onDeleteUser }) => {
    const { users } = useContext(UserContext);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const userData = useMemo(
        () => (Array.isArray(users) ? users : []),
        [users],
    );

    const pageCount = useMemo(
        () => Math.ceil(userData.length / itemsPerPage),
        [userData.length, itemsPerPage],
    );

    const paginatedUsers = useMemo(
        () => userData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [userData, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card sx={{ backgroundColor: "#f5f5f5" }}>
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Daftar Karyawan
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="hanPurple"
                                        onClick={onRegisterUser}
                                    >
                                        Tambah Karyawan
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex px-[0.83rem]">
                                {[
                                    "Nama Karyawan",
                                    "E-mail",
                                    "Username",
                                    "Ubah/Hapus",
                                ].map((title) => (
                                    <div className="w-[25%]" key={title}>
                                        <CardContent>
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                                fontWeight={500}
                                            >
                                                {title}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div data-testid="user-table">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <div
                                        className="flex px-[0.83rem]"
                                        key={user.id}
                                    >
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {user.name}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {user.email}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {user.username}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="hanPurple"
                                                onClick={() =>
                                                    onRegisterUser(user)
                                                }
                                            >
                                                Ubah
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="hanPurple"
                                                onClick={() =>
                                                    onDeleteUser(user.id)
                                                }
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">
                                    Belum ada pelanggan.
                                </Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            {userData.length > itemsPerPage && (
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="hanPurple"
                />
            )}
        </>
    );
};

DataTableUsers.propTypes = {
    onRegisterUser: PropTypes.func,
    onDeleteUser: PropTypes.func,
};

export default DataTableUsers;
