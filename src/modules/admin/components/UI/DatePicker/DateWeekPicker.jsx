import { styled, TextField } from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useState } from "react"
import dayjs from "dayjs"
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

const StyledDatePicker = styled(DatePicker)({})
dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary.light,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.light,
        },
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.primary.dark,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 6 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
}));

const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}

const CustomDateWeekPicker = props => {
    const [hoveredDay, setHoveredDay] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={["DatePicker"]}
                sx={{
                    overflow: "hidden !important",
                    width: "294px",
                }}
            >
                <StyledDatePicker
                    displayWeekNumber
                    slots={{ day: Day }}
                    {...props}
                    slotProps={{
                        day: (ownerState) =>
                        ({
                            selectedDay: props?.value || null,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }),
                        textField: {
                            onBlur: props.onBlur || null,
                            error: props.error,
                            helperText: props.error ? props.helperText : null,
                            sx: {
                                width: "150px", // Custom width of DatePicker
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "4px",
                                    height: "40px", // Custom height of DatePicker
                                },
                                "& .MuiInputLabel-root": {
                                    paddingBottom: "8px",
                                    border: "1px solid black",
                                },
                                "& .MuiInputLabel-root": {
                                    transform: "translate(14px, 12px) scale(1)",
                                    transition: "all 0.3s ease",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    transform: "translate(14px, -6px) scale(0.75)",
                                },
                                "& .MuiInputLabel-root.MuiFormLabel-filled": {
                                    transform: "translate(14px, -6px) scale(0.75)",
                                },
                                "& .MuiOutlinedInput-input": {
                                    paddingTop: "12px",
                                    paddingBottom: "8px",
                                },
                            },
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default CustomDateWeekPicker
