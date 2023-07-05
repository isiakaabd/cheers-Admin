import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotificationMenu({ menuList }) {
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        size="large"
        aria-label={notificationsLabel(100)}
        id="fade-button"
        aria-haspopup="true"
        onClick={() => navigate("messages")}
      >
        <Badge
          badgeContent={4}
          color="primary"
          sx={{ fontSize: "2rem" }}
          showZero
        >
          <MailIcon color="action" sx={{ fontSize: "2.5rem" }} />
        </Badge>
      </IconButton>
    </div>
  );
}
