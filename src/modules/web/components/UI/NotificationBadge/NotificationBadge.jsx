// import * as React from "react"
// import Badge from "@mui/material/Badge"
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
// import notificationsIcon from "../../../assets/image/svg/notification.svg"

// export default function Notification({ count = 1 }) {
//   return (
//     <Badge badgeContent={count} color="primary" variant="dot">
//       {/* <NotificationsNoneOutlinedIcon color="action" /> */}
//       <img src={notificationsIcon} alt="notificationsIcon" />
//     </Badge>
//   )
// }

import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import MailIcon from "@mui/icons-material/Mail"
import notificationsIcon from "../../../assets/image/svg/notification.svg"

import { styled } from "@mui/material/styles"

const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#ff5722",
    color: "#ffffff",
  },
}))

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications"
  }
  if (count > 99) {
    return "more than 99 notifications"
  }
  return `${count} notifications`
}

export default function AccessibleBadges() {
  return (
    <IconButton aria-label={notificationsLabel(100)}>
      <CustomBadge badgeContent={1}>
        <img src={notificationsIcon} alt="notificationsIcon" />
      </CustomBadge>
    </IconButton>
  )
}
