
import React, { useEffect, useState } from "react"
import classes from "../ConfigureBanner/ConfigureBanner.module.css"
import { toast } from "react-toastify"
import CustomButton from "../../components/UI/Button/Button"
import useApiHttp from "../../hooks/ues-http"
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const AutoRenewalSwitch = styled((props) => (
    <Switch
        size="small"
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 32,
    height: 16,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#65C466",
                opacity: 1,
                border: 0,
                ...theme.applyStyles("dark", {
                    backgroundColor: "#2ECA45",
                }),
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color: theme.palette.grey[100],
            ...theme.applyStyles("dark", {
                color: theme.palette.grey[600],
            }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.7,
            ...theme.applyStyles("dark", {
                opacity: 0.3,
            }),
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 12,
        height: 12,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: "#E9E9EA",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
        ...theme.applyStyles("dark", {
            backgroundColor: "#39393D",
        }),
    },
}));

const ConfigureBanner = () => {
    const [initialData, setInitialData] = useState(null)
    const [bannerText, setBannerText] = useState("");
    const [activeBanner, setactiveBanner] = useState(false);
    const [conversionRateAmount, setConversionRateAmount] = useState("")
    const [minPoints, setMinPoints] = useState("")
    const [maxPoints, setMaxPoints] = useState("")
    const [hasChanges, setHasChanges] = useState(false) // New state to track changes
    const charsLeft = bannerText.length

    const { isLoading, sendRequest } = useApiHttp()
    const {
        isLoading: updateLoading,
        error: updateError,
        sendRequest: updateRequest,
    } = useApiHttp()

    const viewList = () => {
        sendRequest({ url: `admin/configure-website-banner/website-banner-list` }, data => {
            const config = data?.data?.[0] || {}

            setInitialData({ bannerText: config.description, activeBanner: config.active_banner, id: config.id })
            // setConversionRate(config.points?.toString() || "")
            setBannerText(config.description?.toString() || "")
            setactiveBanner(config?.active_banner || false)

        })
    }

    useEffect(() => {
        viewList()
    }, [])

    // Check for changes whenever any input changes
    useEffect(() => {
        if (!initialData) return

        const changesDetected =
            bannerText !== (initialData?.bannerText?.toString() || "") ||
            activeBanner !== (initialData?.activeBanner || false)


        setHasChanges(changesDetected)
    }, [bannerText, activeBanner, initialData])



    const handleSave = () => {
        // Only proceed if there are actual changes
        if (!hasChanges) {
            toast.info("No changes to update")
            return
        }

        const bannerTextString = bannerText.trim()


        // Validation logic remains the same
        const errors = []
        if (bannerText !== '')
            errors.push("Banner Text cannot be empty")


        updateRequest(
            {
                url: `admin/configure-website-banner/banner-update`,
                method: "POST",
                body: { description: bannerTextString, active_banner: activeBanner, id: initialData.id },
            },
            () => {
                toast.success("Banner config has been updated")
                viewList() // Refresh data after update
            }
        )
    }

    useEffect(() => {
        if (updateError) toast.error(updateError)
    }, [updateError])

    const handleChange = event => {
        const { name, value } = event.target
        const maxChar = 1000
        const truncatedValue = value.slice(0, maxChar)
        setBannerText(truncatedValue)
    }

    const autoRenewalSwitchChange = (e) => {

        setactiveBanner(e.target.checked)

    };

    return (
        <div>
            <div className={classes.header_table}>
                <h3>Configure Website Banner </h3>
            </div>

            <div className={classes.configContainer}>
                <h2 className={classes.main_page_header}>
                    Configure Banner Text
                </h2>

                <div className={classes.conversionRate_section}>
                    <MinHeightTextarea
                        maxLength="1000"
                        label="Banner Text"
                        title="Banner Text"
                        name="Banner Text"
                        rows={8}

                        value={bannerText}
                        placeholder="Enter Banner Text"
                        showpertext={`${charsLeft}/1000`}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.autoRenewal}>
                    <div className={classes.switchSection}>
                        <h4 className={classes.fieldHeader}>Show Banner </h4>
                        <AutoRenewalSwitch
                            checked={activeBanner}
                            onChange={autoRenewalSwitchChange}
                            // disabled={true}
                            inputProps={{ "aria-label": "ant design" }}
                        />
                    </div>
                </div>

                {/* <div className={classes.section}>
                    <div className={classes.pointsRow}>
                        <label className={classes.pointsLabel}>
                            Minimum Points for Redemption
                        </label>
                        <div className={classes.pointsInput}>
                            <input
                                type="number"
                                min="1"
                                value={minPoints}
                                onChange={handleMinPointsChange}
                                className={classes.inputField}
                            />
                            <span className={classes.pointsText}>Points</span>
                        </div>
                    </div>

                    <div className={classes.pointsRow}>
                        <label className={classes.pointsLabel}>
                            Maximum Points for Redemption Limit Per Order
                        </label>
                        <div className={classes.pointsInput}>
                            <input
                                type="number"
                                min="0"
                                value={maxPoints}
                                onChange={handleInputChange(setMaxPoints)}
                                className={classes.inputField}
                            />
                            <span className={classes.pointsText}>Points</span>
                        </div>
                    </div>
                </div> */}

                <div className={classes.footr}>
                    <CustomButton
                        variant="contained"
                        customColor="#000000"
                        customBgColor="#F3C11D"
                        custmstyle={{
                            padding: "10px 5px",
                            width: "150px",
                            fontSize: "13px",
                        }}
                        onClick={handleSave}
                        disabled={updateLoading || !hasChanges || !initialData}
                    >
                        {updateLoading ? "Updating..." : "Update Changes"}
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default ConfigureBanner
