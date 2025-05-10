import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

const SortBy = ({ sortBy, setSortBy }) => {
    const { t } = useTranslation();

    return (
        <div className="absolute top-1/2 right-[2.583rem] flex w-[12rem] -translate-y-1/2 flex-col gap-[0.5rem]">
            {t("sortBy.label")}
            <Select
                id="sort-by"
                labelId="sort-by-label"
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                }}
                value={sortBy}
            >
                <MenuItem value="created-at-desc">{t("sortBy.newest")}</MenuItem>
                <MenuItem value="created-at-asc">{t("sortBy.oldest")}</MenuItem>
                <MenuItem value="name-asc">{t("sortBy.nameAsc")}</MenuItem>
            </Select>
        </div>
    );
};

SortBy.propTypes = {
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
};

export default SortBy;
