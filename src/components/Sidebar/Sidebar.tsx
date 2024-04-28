import SidebarMenu, {
  SidebarMenuBody,
  SidebarMenuHeader,
} from "react-bootstrap-sidebar-menu";
import "./sidebar.css";
import { assignmentsIcon, attendanceIcon, calendar, examResultIcon, onlineLessonIcon, userIcon } from "../../utilities/Constants/iconsList";
import { Container } from "react-bootstrap";
import IconTemp from "../../utilities/Helpers/iconTemp";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state:any) => state.user.user);
  return (
    <SidebarMenu>
      <SidebarMenuHeader>
        {/* <SidebarMenu.Toggle />  */} {/* open-close */}
      </SidebarMenuHeader>
      <SidebarMenuBody>
          <div className="sidebar-menu-body-items">
            <img
              src={user && user.imageUrl}
              className="img-fluid rounded-circle"
            />
            <SidebarMenu.Nav.Title>{user && user.firstName} {user && user.lastName}</SidebarMenu.Nav.Title>
            <SidebarMenu.Nav.Title>OkulAdı</SidebarMenu.Nav.Title>
          </div>
          <Container>
          <SidebarMenu.Nav>
              <IconTemp {...userIcon} pathName="/" />
              <IconTemp {...onlineLessonIcon} />
              <IconTemp {...assignmentsIcon} />
              <IconTemp {...examResultIcon} pathName="/grades" />
              <IconTemp {...attendanceIcon} />
              <IconTemp {...calendar} />
              {/* Sınav Tarihleri ekle */}
          </SidebarMenu.Nav>
          </Container>
      </SidebarMenuBody>
    </SidebarMenu>
  );
};

export default Sidebar;
