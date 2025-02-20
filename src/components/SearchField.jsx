import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const SearchField = ({ setSearchTerm }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={`absolute top-1/2 right-[15.583rem] flex -translate-y-1/2 transition-all duration-10000 ${isFocused ? "w-[calc(100%-18.166rem)]" : "w-[12-rem]"} flex-col gap-[0.5rem]`}
        >
            Cari
            <TextField
                size="small"
                placeholder="Cari..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                }}
            />
        </div>
    );
};

SearchField.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
};

export default SearchField;
