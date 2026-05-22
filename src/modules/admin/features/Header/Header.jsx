import classes from "./Header.module.css"
import ProfileMenu from "../../../admin/components/UI/ProfileMenu/ProfileMenu"
function Header() {
  return (
    <div className={classes.header}>
      <div className={classes["user-profile"]}>
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
