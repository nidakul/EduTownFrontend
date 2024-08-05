import SidebarMenu, {
  SidebarMenuBody,
  SidebarMenuHeader,
} from "react-bootstrap-sidebar-menu";
import "./sidebar.css";
import {
  assignmentsIcon,
  attendanceIcon,
  calendar,
  examResultIcon,
  onlineLessonIcon,
  userIcon,
} from "../../utilities/Constants/iconsList";
import { Container } from "react-bootstrap";
import IconTemp from "../../utilities/Helpers/iconTemp";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../services/identityService";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useEffect } from "react";
import { getUserDetailById } from "../../store/user/userSlice";

const Sidebar = () => {
  const userId = getUserId();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.items);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailById(userId));
    }
  }, [dispatch, userId, user]);

  return (
    <SidebarMenu>
      <SidebarMenuHeader>
        {/* <SidebarMenu.Toggle />  */} {/* open-close */}
      </SidebarMenuHeader>
      <SidebarMenuBody>
        <div className="sidebar-menu-body-items">
          <img
            src={user?.imageUrl}
            className="img-fluid rounded-circle"
          />
          <SidebarMenu.Nav.Title>
            {user && user.firstName} {user && user.lastName}
          </SidebarMenu.Nav.Title>
          <SidebarMenu.Nav.Item>{user && user.schoolName}</SidebarMenu.Nav.Item>
          <SidebarMenu.Nav.Item>
            {user?.classroomName}. Sınıf
          </SidebarMenu.Nav.Item>
        </div>
        <Container>
          <SidebarMenu.Nav>
            <IconTemp mainClassName="iconHeader" {...userIcon} pathName="/" />
            <IconTemp mainClassName="iconHeader" {...onlineLessonIcon} />
            <IconTemp mainClassName="iconHeader" {...assignmentsIcon} />
            <IconTemp mainClassName="iconHeader"{...examResultIcon} pathName="/grades" />
            <IconTemp mainClassName="iconHeader" {...attendanceIcon} />
            <IconTemp mainClassName="iconHeader" {...calendar} />
            {/* Sınav Tarihleri ekle */}
          </SidebarMenu.Nav>
        </Container>
      </SidebarMenuBody>
    </SidebarMenu>
  );
};

export default Sidebar;
