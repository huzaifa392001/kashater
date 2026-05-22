import React from "react"
import styles from "./Addres.module.css"
import remove from "../../../assets/image/svg/remove.svg"
import edit from "../../../assets/image/svg/edit.svg"
import delete_address_ic from "../../../../website/assets/image/delete-address-ic.png";
import edit_address_ic from "../../../../website/assets/image/edit-address-ic.png";

const AddresItem = ({ item, selected, onToggle, onEdit, onRemove }) => {
  return (
    <>
      <div className="d-flex gap-2 mb-5">
        <div
          className={`customCheckbox  ${selected ? 'checked' : ""
            }`}
          onClick={onToggle}
        >
          {selected && <span className={'checkmark'}>✓</span>}
        </div>
        <div className="d-flex justify-content-between w-100">
          <div className="default-address-cont w-95" style={{ width: '95%' }}>
            <h4 className="text-dark">{item?.contact_name}</h4>
            <p className="text-dark">
              {[
                item?.address_line,
                item?.landmark,
                item?.city,
                item?.state,
                item?.pincode,
              ]
                .filter(Boolean) // removes null, undefined, and empty string
                .join(', ')}</p>
            <div className="d-ac" role="button" onClick={onEdit}>
              <img src={edit_address_ic} alt="" />
              <span>Edit Address</span>
            </div>
          </div>
          <div className="address-del w-5" style={{ width: '5%' }} onClick={onRemove}>
            <img src={delete_address_ic} alt="" />
          </div>
        </div>
      </div>
      {/* <div className={styles.itemContainer}>
        <div
          className={`${styles.customRadio} ${selected ? styles.radioSelected : ""
            }`}
          onClick={onToggle}
        >
          {selected && <div className={styles.radioDot} />}
        </div>

        {/* <img src={item.img} alt={item.title} /> *
        <div className={styles.details}>
          <h4>
            <span>{item?.contact_name}</span>
          </h4>
          <p
            style={{ marginTop: "10px" }}
          >{[
            item?.address_line,
            item?.landmark,
            item?.city,
            item?.state,
            item?.pincode,
          ]
            .filter(Boolean) // removes null, undefined, and empty string
            .join(', ')}</p>
          <p
            style={{ marginTop: "10px" }}
          >{`${item?.contact_email} | ${item?.contact_number}`}</p>

          <div className={styles.btn_group}>
            <p className={styles.delete}>
              <img src={remove} alt="remove" style={{ width: "13px" }} />{" "}
              <a onClick={onRemove}>Remove</a>
            </p>
            <p className={styles.edite}>
              <img src={edit} alt="remove" style={{ width: "13px" }} />{" "}
              <a onClick={onEdit}>Edit</a>
            </p>
          </div>
        </div>
      </div> */}
    </>

  )
}

export default AddresItem
