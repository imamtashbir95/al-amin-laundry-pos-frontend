import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const SortBy = ({ sortBy, setSortBy }) => {
    return (
        <div className="absolute top-1/2 right-[2.583rem] flex w-[12rem] -translate-y-1/2 flex-col gap-[0.5rem]">
            Urutkan Berdasarkan
            <Select
                labelId="sort-by-label"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
                size="small"
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                }}
            >
                <MenuItem value="Terbaru">Terbaru</MenuItem>
                <MenuItem value="Terlama">Terlama</MenuItem>
                <MenuItem value="Nama">Nama</MenuItem>
            </Select>
        </div>
    );
};

SortBy.propTypes = {
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
};

export default SortBy;
