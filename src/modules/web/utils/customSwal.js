import Swal from "sweetalert2"
import swalSuccessIcon from "../assets/image/png/custom-success-icon.png"


const DEFAULT_CLASSES = {
    popup: "custom-swal-popup",
    confirmButton: "swal-confirm-text-black",
};

const BASE_CONFIG = {
    confirmButtonText: "OK",
    showCancelButton: false,
    cancelButtonText: "Cancel",
    backdrop: true,
};

const TYPES = {
    success: {
        icon: "success",
        confirmButtonColor: "#FFD500",
        color: "#fff",
        background: "#000",
        customClass: DEFAULT_CLASSES,
    },
    successIcon: {
        imageUrl: swalSuccessIcon, // adjust path as needed
        imageAlt: "Success Icon",
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonColor: "#FFD500",
        color: "#fff",
        background: "#000",
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: 'swal-confirm-text-black'
            // icon: "custom-swal-icon"
        }
    },
    error: {
        icon: "error",
        confirmButtonColor: "#d33",
        color: "#fff",
        background: "#000",
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: 'swal-confirm-text-black'
            // icon: "custom-swal-icon"
        }
    },
    warning: {
        icon: "warning",
        confirmButtonColor: "#f0ad4e",
        color: "#fff",
        background: "#000",
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: 'swal-confirm-text-black'
            // icon: "custom-swal-icon"
        }
    },
    info: {
        icon: "info",
        confirmButtonColor: "#3085d6",
        color: "#fff",
        background: "#000",
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: 'swal-confirm-text-black'
            // icon: "custom-swal-icon"
        }
    },
};


const showAlert = (type, props = {}, callBack = null) => {
    const { title = "", text = "", ...customConfig } = props;
    const typeConfig = TYPES[type] || TYPES.info;

    return Swal.fire({
        title,
        text,
        ...BASE_CONFIG,
        ...typeConfig,
        ...customConfig,
    }).then((result) => {

        if (result.isConfirmed && callBack) {
            callBack?.();
        }
    });


};


const CustomSwal = {
    success: (props, promiseCall = null) => showAlert("success", props, promiseCall),
    successIcon: (props, promiseCall = null) => showAlert("successIcon", props, promiseCall),
    error: (props, promiseCall = null) => showAlert("error", props, promiseCall),
    warning: (props, promiseCall = null) => showAlert("warning", props, promiseCall),
    info: (props, promiseCall = null) => showAlert("info", props, promiseCall),
};

export default CustomSwal;

// export const customSwal = (props, promiseCall = null) => {
//     const { type, title, text, ...config } = props
//     const options = ICONS[type] || ICONS.info; // Default to info if type is not recognized

//     return Swal.fire({
//         title: title,
//         text: text,
//         ...options,
//         showCancelButton: false,
//         confirmButtonText: "OK",
//         backdrop: true,
//         ...config
//     }).then(((result) => {
//         if (config?.showCancelButton && result.isConfirmed && promiseCall) {
//             return promiseCall?.();
//         } else {
//             return promiseCall?.()
//         }
//     }));
// }