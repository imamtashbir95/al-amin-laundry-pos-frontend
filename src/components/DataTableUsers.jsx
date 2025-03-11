import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Pagination,
    Typography,
} from "@mui/material";
import SortBy from "./SortyBy";
import SearchField from "./SearchField";
import { useUser } from "../contexts/useUser";

const DataTableUsers = ({ onRegisterUser, onDeleteUser }) => {
    const { users } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("created-at-asc");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredUsers = useMemo(() => {
        let filtered = Array.isArray(users) ? users : [];

        if (searchTerm) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (sortBy === "name-asc") {
            filtered = [...filtered].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
        } else if (sortBy === "created-at-desc") {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
        } else if (sortBy === "created-at-asc") {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
        }

        return filtered;
    }, [users, searchTerm, sortBy]);

    const pageCount = useMemo(
        () => Math.ceil(filteredUsers.length / itemsPerPage),
        [filteredUsers, itemsPerPage],
    );

    const paginatedUsers = useMemo(
        () =>
            filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [filteredUsers, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setPage(1);
    }, [searchTerm, sortBy]);

    return (
        <>
            <section className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                        }}
                    >
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
                                        onClick={() => onRegisterUser(null)}
                                    >
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon
                                                icon={faFileImport}
                                            />
                                            Tambah Karyawan
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <SearchField setSearchTerm={setSearchTerm} />
                                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
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
                                        <div className="flex w-[25%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {user.name}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {user.email}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {user.username}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() =>
                                                    onRegisterUser(user)
                                                }
                                            >
                                                Ubah
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
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
                                    Belum ada karyawan.
                                </Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </section>
            {filteredUsers.length > itemsPerPage && (
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
    onRegisterUser: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
};

export default DataTableUsers;
