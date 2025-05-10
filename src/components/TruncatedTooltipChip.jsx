import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip, Tooltip } from "@mui/material";

const TruncatedTooltipChip = ({ text }) => {
    // const textRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const el = text;
        if (el) {
            setIsTruncated(el.scrollWidth > el.clientWidth);
        }
        console.log(el);
    }, [text]);

    return (
        <Tooltip disableHoverListener={!isTruncated} title={isTruncated ? text : ""}>
            <Chip label={text} size="small" />
        </Tooltip>
    );
};

TruncatedTooltipChip.propTypes = {
    text: PropTypes.string.isRequired,
}

export default TruncatedTooltipChip;