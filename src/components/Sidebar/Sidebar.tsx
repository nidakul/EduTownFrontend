import SidebarMenu, {
  SidebarMenuBody,
  SidebarMenuHeader,
} from "react-bootstrap-sidebar-menu";
import "./sidebar.css";
import { assignmentsIcon, attendanceIcon, calendar, examResultIcon, onlineLessonIcon, userIcon } from "../../utilities/Constants/iconsList";
import { Container } from "react-bootstrap";
import IconTemp from "../../utilities/Helpers/iconTemp";

const Sidebar = () => {
  return (
    <SidebarMenu>
      <SidebarMenuHeader>
        {/* <SidebarMenu.Toggle />  */} {/* open-close */}
      </SidebarMenuHeader>
      <SidebarMenuBody>
          <div className="sidebar-menu-body-items">
            <img
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              className="img-fluid rounded-circle"
            />
            <SidebarMenu.Nav.Title>İsim soyisim</SidebarMenu.Nav.Title>
            <SidebarMenu.Nav.Title>OkulAdı</SidebarMenu.Nav.Title>
          </div>
          <Container>
          <SidebarMenu.Nav>
              <IconTemp {...userIcon} pathName="/"></IconTemp> 
              <IconTemp {...onlineLessonIcon} ></IconTemp>
              <IconTemp {...assignmentsIcon}></IconTemp>
              <IconTemp {...examResultIcon} pathName="/grades"></IconTemp>
              <IconTemp {...attendanceIcon}></IconTemp>
              <IconTemp {...calendar}></IconTemp>
              {/* Sınav Tarihleri ekle */}
          </SidebarMenu.Nav>
          </Container>
      </SidebarMenuBody>
    </SidebarMenu>
  );
};

export default Sidebar;
