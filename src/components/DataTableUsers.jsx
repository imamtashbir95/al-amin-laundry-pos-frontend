import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardActions, CardContent, Pagination, Typography } from "@mui/material";
import SortBy from "./SortyBy";
import SearchField from "./SearchField";
import { useUser } from "../contexts/useUser";
import TruncatedTooltipText from "./TruncatedTooltipText";

const DataTableUsers = ({ onRegisterUser, onDeleteUser }) => {
    const { t } = useTranslation();
    const { users } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("created-at-asc");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredUsers = useMemo(() => {
        let filtered = Array.isArray(users) ? users : [];

        if (searchTerm) {
            filtered = filtered.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (sortBy === "name-asc") {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "created-at-desc") {
            filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "created-at-asc") {
            filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return filtered;
    }, [users, searchTerm, sortBy]);

    const pageCount = useMemo(() => Math.ceil(filteredUsers.length / itemsPerPage), [filteredUsers, itemsPerPage]);

    const paginatedUsers = useMemo(
        () => filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage),
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
                            padding: "0.625rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {t("dataTableUsers.title")}
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button onClick={() => onRegisterUser(null)} size="small" variant="contained">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon icon={faFileImport} />
                                            {t("dataTableUsers.addButton")}
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <SearchField setSearchTerm={setSearchTerm} />
                                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {["userName", "email", "username", "editOrDelete"].map((title) => (
                                    <div className="w-[25%]" key={title}>
                                        <CardContent>
                                            <Typography fontWeight={500} gutterBottom variant="body1">
                                                {t(`dataTableUsers.${title}`)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div data-testid="user-table">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <div className="flex px-[0.83rem]" key={user.id}>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={user.name} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={user.email} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={user.username} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            <Button
                                                onClick={() => onRegisterUser(user)}
                                                size="small"
                                                variant="contained"
                                            >
                                                {t("dataTableUsers.editButton")}
                                            </Button>
                                            <Button
                                                onClick={() => onDeleteUser(user.id)}
                                                size="small"
                                                variant="outlined"
                                            >
                                                {t("dataTableUsers.deleteButton")}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">{t("dataTableUsers.blank")}</Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </section>
            {filteredUsers.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}
        </>
    );
};

DataTableUsers.propTypes = {
    onRegisterUser: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
};

export default DataTableUsers;
