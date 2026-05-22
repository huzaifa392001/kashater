import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const uploadFile = async (file, path, name) => {
  const AdminbearerToken = secureLocalStorage.getItem('dealerBearerToken');

  try {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("path", path);
    // formData.append("file_name", name);


    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/dealer/raise-complaint/upload-file`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${AdminbearerToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error(error);
  }
};
