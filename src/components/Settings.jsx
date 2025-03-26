import {
    Autocomplete,
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import default_profile_pic from "../assets/default-profile-pic.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faKey, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getCSSVariable } from "../utils/getCSSVariable";

const timezones = ["Asia/Jakarta", "Asia/Bangkok", "Asia/Singapore", "Asia/Tokyo", "America/New_York", "Europe/London"];

const Settings = () => {
    const [timezone, setTimezone] = useState(null);

    return (
        <>
            <section className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center bg-linear-to-r from-[var(--brand-1)] to-[var(--brand-2)] p-[2.083rem]"></div>
                        </div>
                        <div className="flex flex-col gap-[1rem] p-[2.083rem]">
                            <div>
                                <CardContent className="flex gap-[2rem]">
                                    <div className="flex">
                                        <a href="/">
                                            <Avatar
                                                id="profile"
                                                alt="profile"
                                                src={default_profile_pic}
                                                className=""
                                                // onClick={handleClick}
                                                sx={{
                                                    cursor: "pointer",
                                                    height: "100px",
                                                    width: "auto",
                                                }}
                                            ></Avatar>
                                        </a>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <Typography variant="h6" gutterBottom>
                                            Nisrina Sara
                                        </Typography>
                                        <Typography gutterBottom>saranisrina123@gmail.com</Typography>
                                    </div>
                                    <CardActions className="absolute right-[calc(2.583rem+2.083rem)] flex h-[6.25rem] w-[6.25rem] items-center justify-center">
                                        <Button variant="contained" size="small">
                                            <div className="flex items-center gap-[0.5rem]">
                                                <FontAwesomeIcon icon={faPencil} />
                                                Ubah
                                            </div>
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <div className="flex w-[50%] flex-col gap-4">
                                            <InputLabel id="text-name">Nama</InputLabel>
                                            <TextField disabled placeholder="Nama" value="Nisrina Sara" size="small" />
                                            <InputLabel id="text-username">Username</InputLabel>
                                            <TextField
                                                disabled
                                                placeholder="Username"
                                                value="nisrinasara"
                                                size="small"
                                            />
                                            <InputLabel id="select-language-label">Bahasa</InputLabel>
                                            <Select
                                                disabled
                                                displayEmpty
                                                labelId="select-language-label"
                                                id="select-language"
                                                value="indonesia"
                                                size="small"
                                            >
                                                <MenuItem disabled value="">
                                                    Pilih Bahasa
                                                </MenuItem>
                                                <MenuItem value="indonesia">Indonesia</MenuItem>
                                                <MenuItem value="inggris">Inggris</MenuItem>
                                            </Select>
                                        </div>
                                        <div className="flex w-[50%] flex-col gap-4">
                                            <InputLabel id="text-email">E-mail</InputLabel>
                                            <TextField
                                                disabled
                                                size="small"
                                                placeholder="E-mail"
                                                value="saranisrina123@gmail.com"
                                            />
                                            <InputLabel id="select-gender-label">Jenis Kelamin</InputLabel>
                                            <Select
                                                disabled
                                                displayEmpty
                                                labelId="select-gender-label"
                                                id="select-gender"
                                                value="perempuan"
                                                size="small"
                                            >
                                                <MenuItem disabled value="">
                                                    Pilih Jenis Kelamin
                                                </MenuItem>
                                                <MenuItem value="laki_laki">Laki-laki</MenuItem>
                                                <MenuItem value="perempuan">Perempuan</MenuItem>
                                            </Select>
                                            <InputLabel id="select-timezone-label">Zona Waktu</InputLabel>
                                            <Select
                                                disabled
                                                displayEmpty
                                                labelId="select-timezone-label"
                                                id="select-timezone"
                                                onChange={(e) => setTimezone(e.target.value)}
                                                value=""
                                                size="small"
                                            >
                                                <MenuItem disabled value="">
                                                    Pilih Zona Waktu
                                                </MenuItem>
                                                {timezones.map((timezone) => (
                                                    <MenuItem key={timezone} value={timezone}>
                                                        {timezone}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        <Typography variant="h6" gutterBottom>
                                            Kata Sandi
                                        </Typography>
                                        <div className="flex gap-4">
                                            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-[var(--brand-1)]">
                                                <FontAwesomeIcon
                                                    icon={faKey}
                                                    size="xl"
                                                    color={getCSSVariable("--background")}
                                                ></FontAwesomeIcon>
                                            </div>
                                            <div className="flex flex-col justify-center gap-1">
                                                <Typography variant="h6">•••••••••••••</Typography>
                                                <Typography gutterBottom>1 bulan yang lalu</Typography>
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="contained" size="small">
                                                <div className="flex items-center gap-[0.5rem]">
                                                    <FontAwesomeIcon icon={faPencil} />
                                                    Ubah Kata Sandi
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Settings;
