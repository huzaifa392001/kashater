import React, { useEffect, useState } from "react";
import classes from "./Subscription.module.css";
import CustomTable from "../../components/UI/Table/TablePage";
import Slecter from "../../components/UI/Dropdown/Select";
import SearchExpand from "../../components/UI/SearchExpand/SearchExpand";
import CustomButton from "../../components/UI/Button/Button";
import DropDownFile from "../../components/UI/DropDownFile/DropDownFile";
import FromToDatePicker from "../../components/UI/DatePicker/FromToDatePicker";
import { currentDate } from "../../utils/helper";
import dayjs from "dayjs";
import CustomDialog from "../../components/UI/Dialog/Dialog";
import CustomTextField from "../../components/UI/TextFiled/TextFiled";
import {
  validateEmail,
  validatePhoneNumber,
  validateTextInput,
} from "../../utils/validation";
import PhoneNumInput from "../../components/UI/PhoneNumInput/PhoneNumInput";
import useInput from "../../utils/use-input";
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter";
import { useDispatch } from "react-redux";
import useApiHttp from "../../hooks/ues-http";
import Swal from "sweetalert2";
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox";
import axios from "axios";
import { InputAdornment, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";

const RecommendBook = styled((props) => (
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

const Subscription = () => {
  const dispatch = useDispatch();
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp();
  const {
    isLoading: addRoleLoading,
    success: addRoleSuccess,
    error: addRoleError,
    sendRequest: addSubscriptionPlan,
  } = useApiHttp();

  const {
    isLoading: updateeditRoleLoading,
    success: updateeditRoleSuccess,
    error: updateeditRoleError,
    sendRequest: updateSubscriptionPlan,
  } = useApiHttp();
  const {
    isLoading: DeleteRoleLoading,
    success: DeleteRoleSuccess,
    error: DeleteRoleError,
    sendRequest: deleteSubscriptionPlan,
  } = useApiHttp();

  // Pagination and Sorting states for Ready To Use
  const [page, setPage] = useState(1);
  const [sortDirectionData, setSortDirectionData] = useState("DESC");
  const [perPage, setPerPage] = useState(10);
  const [column, setColumn] = useState(0);
  const [totalReporting, setTotalReporting] = useState(0);
  const [openAdduser, setOpenAdduser] = useState(false);
  const [type, setType] = useState("");

  // Search state
  const [searchValue, setSearchValue] = useState("");

  const [data, setData] = useState([]);
  const [editPlanData, setEditPlanData] = useState({});

  // Form states
  const [price, setPrice] = useState("");
  const [planName, setPlanName] = useState("");
  const [bookQty, setBookQty] = useState("");
  const [bonusBooks, setBonusBooks] = useState("");
  const [validity, setValidity] = useState("");
  const [recommended, setRecommended] = useState(false);

  // Form validation
  const [errors, setErrors] = useState({
    price: false,
    planName: false,
    bookQty: false,
    bonusBooks: false,
    validity: false,
  });

  const subscriptionListData = [
    {
      name: "S.No",
      selector: (row) => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "Plan Name",
      selector: (row) => row.name,

      // cell: row => (
      //   <>
      //     <p
      //       className="action_text action_text_pointer flex"
      //     // onClick={() => actionHandleClick(row)}
      //     >
      //       {row.name}
      //     </p>
      //   </>
      // ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "validity",
      selector: (row) => row.valid_months,
      sortable: false,
      sortField: 5,
    },

    {
      name: "No of Books",
      selector: (row) => row.number_of_books_per_month,
      // selector: row => (
      //   <p className="action_text action_text_pointer">{row.number_of_books_per_month}</p>
      // ),
      sortable: false,
      sortField: 1,
    },
    {
      name: "Bonus Books",
      selector: (row) => row.bonus_books_per_month,
      sortField: 2,
      sortable: false,
      maxWidth: "150px",
      minWidth: "150px",
    },

    {
      name: "Pricing INR",
      selector: (row) => <span>₹ {row.price}</span>,
      sortable: false,
      sortField: 4,
    },

    {
      name: "",
      cell: (row) => (
        <>
          <div className="action_btn">
            <button
              className="action_edit"
              onClick={() => handlerAddAndEdit("edit", row)}
            >
              Update Plan
            </button>
            <button
              className="action_delete"
              style={{ color: "red" }}
              onClick={() => deleteSubscriptionPlanAction(row.id)}
            >
              Delete Plan
            </button>
          </div>
        </>
      ),
      sortable: false,
      sortField: 7,
      maxWidth: "250px",
      minWidth: "250px",
    },
  ];
  // Sorting and pagination handlers for Ready To Use table
  const handleSort = (column, sortDirection) => {
    setSortDirectionData(sortDirection || "DESC");
    setColumn(column.sortField || 0);
  };

  const handlePageChange = (page) => {
    setPage(page || 1);
  };

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage || 10);
  };

  const onDownloadItemClick = (fileType) => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken;

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "");

    axios({
      method: "post",
      url: `${baseUrl}/admin/finance-management/subscription/subscription-plan-list-download`,
      data: {
        type: fileType,
        search: searchValue,
        // filter: {
        //   from_date: fromDate, // d-m-Y
        //   to_date: toDate,
        // },
      },
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: "blob", // Important for binary data
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the response headers (optional)
        const contentDisposition = response.headers["content-disposition"];
        let fileName = `${"subscription_list"}.${fileType}`; // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1];
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"subscription_list"}.${fileType}`;
        }

        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove(); // cleanup
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false);
    handleClearInput();
  };

  const handlerAddAndEdit = (type, rows = null) => {
    if (type === "add") {
      handleClearInput();
    } else {
      setEditPlanData(rows);
      setPrice(rows?.price);
      setPlanName(rows?.name);
      setBookQty(rows?.number_of_books_per_month);
      setBonusBooks(rows?.bonus_books_per_month);
      setValidity(
        String(rows?.valid_months || "")
          .replace(/\D/g, "")
          .trim()
      );
      setRecommended(rows?.recommended);
    }
    setType(type);
    setOpenAdduser(true);
  };
  const handleClearInput = () => {
    setPrice("");
    setPlanName("");
    setBookQty("");
    setBonusBooks("");
    setValidity("");
    setRecommended(false);
    setEditPlanData({});
  };

  const validateForm = () => {
    // Reset date errors

    const newErrors = {
      price: !price.trim() || isNaN(price),
      planName: !planName.trim(),
      bookQty: !bookQty || isNaN(bookQty),
      bonusBooks: !bonusBooks.trim() || isNaN(bonusBooks),
      validity: !validity.trim() || isNaN(validity),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddSubscription = () => {
    if (!validateForm()) return;
    const planData = {
      name: planName.trim(),
      valid_month: validity.trim(),
      no_of_book: bookQty.trim(),
      bonus_book: bonusBooks.trim(),
      is_recommended: recommended ? "1" : "0",
      price: price.trim(),
    };
    addSubscriptionPlan(
      {
        url: `admin/finance-management/subscription/add-subscription-plan`,
        method: "POST",
        body: planData,
      },
      (data) => {
        handleClosesetOpenAddUser();
        viewList();
        Swal.fire({
          title: "Success",
          text: "Subscription added successfully",
          // icon: "warning",
          icon: "success",

          //   confirmButtonColor: "#3085d6",

          confirmButtonText: "Ok",
        });
      }
    );
  };
  const handleEditUser = () => {
    updateSubscriptionPlan(
      {
        url: `admin/finance-management/subscription/update-subscription-plan`,
        method: "POST",
        body: {
          id: editPlanData?.id,
          name: planName.trim(),
          valid_month: validity.trim(),
          no_of_book: String(bookQty).trim(),
          bonus_book: String(bonusBooks).trim(),
          is_recommended: recommended ? "1" : "0",
          price: String(price).trim(),
        },
      },
      (data) => {
        handleClosesetOpenAddUser();

        Swal.fire("Success!", data.message, "success").then(() => {
          viewList(); // reload list
        });
      }
    );
  };

  const deleteSubscriptionPlanAction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be delete this plan.",
      // icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubscriptionPlan(
          {
            url: `admin/finance-management/subscription/remove-subscription`,
            method: "POST",
            body: {
              id: id,
            },
          },
          (data) => {
            Swal.fire("Success!", data.message, "success").then(() => {
              viewList(); // reload list
            });
          }
        );
      }
    });
  };
  const handleSubmit = () => {
    if (type === "add") {
      handleAddSubscription();
    } else {
      handleEditUser();
    }
  };
  const viewList = () => {
    sendRequest(
      {
        url: `admin/finance-management/subscription/subscription-plan-list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          // filter: {
          //   from_date: fromDate, // d-m-Y
          //   to_date: toDate,
          // },
        },
      },
      (data) => {
        setData(data?.data?.aaData);
        setTotalReporting(data?.data?.iTotalRecords);
      }
    );
  };

  useEffect(() => {
    viewList();
  }, [page, perPage, searchValue]);

  const handlePlanNameChange = (e) => {
    const value = e.target.value;

    // if (discountType === "percent") {
    //   // Allow only 2-digit numbers (0-99)
    //   if (/^\d{0,2}$/.test(value)) {
    //     setDiscountValue(value)
    //   }
    // } else {
    // Allow any numeric value for flat amount
    setPlanName(value);
    // }
  };

  const bookrecommendationChange = (e) => {
    if (recommended) {
      setRecommended(e.target.checked);
    } else {
      sendRequest(
        { url: "admin/finance-management/subscription/recommended-subs" },
        (response) => {
          if (response.data !== 0) {
            toast.error(response.message);
          } else {
            setRecommended(true);
            console.log("else");
          }
        }
      );
    }
  };

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Subscriptions</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>
                {totalReporting} Subscriptions
              </p>
              {/* <Slecter
                data={
                  slectdata?.map(sub => ({
                    label: sub.name,
                    value: sub.token,
                  })) || []
                }
                label="Choose Status"
                title="All Status"
                width={"170"}
                value={status}
                onChange={e => setStatus(e.target.value)}
                // borders={true}
              /> */}
              {/* <FromToDatePicker
                label={"From Date"}
                format="DD-MM-YYYY"
                value={dayjs(fromDate)}
                onChange={handleFromDateChange}
                error={false}
                borders={false}
                width={"0px"}
                height={"30px"}
              />

              <FromToDatePicker
                label={"To Date"}
                format="DD-MM-YYYY"
                value={dayjs(toDate)}
                minDate={dayjs(fromDate)}
                onChange={handleToDateChange}
                disabled={!fromDate}
                error={false}
                borders={false}
                width={"0px"}
                height={"40px"}
              /> */}
            </div>
            <div className={classes.header_table_right}>
              <DropDownFile handleFileDownload={onDownloadItemClick} />
              <div className={classes.filters}></div>
              <SearchExpand
                placeholder="Search User..."
                onSearchChange={(value) => setSearchValue(value)}
                searchValue={searchValue}
                maxWidth="500px"
              />

              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "5px 2px",
                  width: "120px",
                  fontSize: "13px",
                }}
                onClick={() => handlerAddAndEdit("add")}
              >
                Add New
              </CustomButton>
            </div>
          </div>
        </div>
        <CustomTable
          data={data}
          columns={subscriptionListData}
          loader={false}
          onSort={handleSort}
          paginationTotalRows={totalReporting}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          subHeader={false}
          children={false}
        />
      </div>
      {openAdduser && (
        <CustomDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">
                  {type === "add" ? "Add Plan" : "Edit Plan"}
                </h3>

                <div className={classes.dialog_loyout_main}>
                  {/* <div className={classes.CheckBox_Set}>
                    <p className={classes.Discount}>Discount Type</p>
                    <div className={classes.CheckBox_Loyout}>
                      <CheckBox
                        label={`Percentage(%)`}
                        checked={discountType === "percent"}
                        onChange={() => setDiscountType("percent")}
                      />
                      <CheckBox
                        label={`Flat(₹)`}
                        checked={discountType === "amount"}
                        onChange={() => setDiscountType("amount")}
                      />
                    </div>
                  </div> */}
                  <CustomTextField
                    id="name"
                    placeholder="Enter Name"
                    variant="outlined"
                    label="Plan Name"
                    // type="number"
                    value={planName}
                    onChange={handlePlanNameChange}
                    error={errors.planName}
                    // helperText={errors.discountValue && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // inputProps={{
                    //   max: discountType === "percent" ? 99 : undefined,
                    //   min: 0,
                    // }}
                    required
                  />

                  {/* <CustomeSlecter
                    data={
                      []
                    }
                    title="Choose Validity" // Dropdown title
                    lable="Validity(Months)"
                    width={"100%"}
                    value={validity}
                    onChange={e => setValidity(e.target.value)}
                    borders={true}
                    error={!!errors.category}
                  // helperText={errors.category}
                  /> */}

                  <CustomTextField
                    id="validity"
                    placeholder="Enter months"
                    variant="outlined"
                    label="Validity"
                    type="number"
                    value={validity}
                    onChange={(e) => {
                      if (/^\d{0,2}$/.test(e.target.value)) {
                        setValidity(e.target.value);
                      } else {
                        return false;
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData("text");
                      if (!/^\d{1,2}$/.test(pasted)) {
                        e.preventDefault();
                      }
                    }}
                    error={errors.validity}
                    // helperText={errors.minOrderValue && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                  <CustomTextField
                    id="qty"
                    placeholder="Enter Qty"
                    variant="outlined"
                    label="Number of Books"
                    type="number"
                    value={bookQty}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setBookQty(e.target.value);
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData("text");
                      if (!/^\d+$/.test(pasted)) {
                        e.preventDefault(); // ✅ Prevent pasting "1e5", "1-2", etc.
                      }
                    }}
                    error={errors.bookQty}
                    // helperText={errors.minOrderValue && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                  <CustomTextField
                    id="bonus_qty"
                    placeholder="Enter Qty"
                    variant="outlined"
                    label="Bonus Books"
                    type="number"
                    value={bonusBooks}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setBonusBooks(e.target.value);
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData("text");
                      if (!/^\d+$/.test(pasted)) {
                        e.preventDefault(); // ✅ Prevent pasting "1e5", "1-2", etc.
                      }
                    }}
                    error={errors.bonusBooks}
                    // helperText={errors.usageLimit && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
                <div
                  style={{ marginBottom: "10px" }}
                  className={classes.dialog_Coupon_input}
                >
                  <CustomTextField
                    id="price"
                    label="Price(INR)"
                    placeholder="Enter Price"
                    variant="outlined"
                    type="number"
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment
                            style={{ marginLeft: "10px" }}
                            position="start"
                          >
                            ₹
                          </InputAdornment>
                        ),
                      },
                    }}
                    value={price}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setPrice(e.target.value);
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData("text");
                      if (!/^\d+$/.test(pasted)) {
                        e.preventDefault(); // ✅ Prevent pasting "1e5", "1-2", etc.
                      }
                    }}
                    error={errors.price}
                    // helperText={errors.couponCode && "Required field"}
                    fullWidth
                    required
                  />
                </div>
                <div
                  style={{ marginBottom: "10px" }}
                  className={classes.dialog_Coupon_input}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bolder",
                    }}
                  >
                    <p>Mark this Plan as Recommended</p>

                    <RecommendBook
                      checked={recommended}
                      onChange={bookrecommendationChange}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                  </div>
                </div>
                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser}
                  >
                    Cancel
                  </button>
                  <button className="btn_submit" onClick={handleSubmit}>
                    {type === "add" ? "Add Plan" : "Update Plan"}
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default Subscription;
