import React, { useEffect, useState, } from 'react'
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, Typography } from "@mui/material";
import classes from './viewModal.module.css'

const ViewModal = (props) => {
    const { customStyle = {}, modalOpen } = props;
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        borderRadius: "5px",
        p: 4,
        ...customStyle
    };
    const handleModalOpenClose = (e, reason) => {
        if (reason && reason === "backdropClick")
            return;
        props?.trigger?.((prev) => !prev)
    }
    return (
        <Modal
            open={modalOpen}
            onClose={handleModalOpenClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={modalStyle}>
                <Box>

                    <h4
                        className={classes.modal_title}
                    >
                        {props?.title}
                    </h4>
                    {props?.modalContent?.(props?.modalData)}
                    <Stack direction={"row"} justifyContent={"flex-end"}>

                        <Button onClick={() => props?.trigger?.((prev) => !prev)} className={classes.button_style}>Okay</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default ViewModal