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
import { Container, Spinner } from "react-bootstrap";
import IconTemp from "../../utilities/Helpers/iconTemp";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../services/identityService";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useEffect } from "react";
import { getUserDetailById } from "../../store/user/userSlice";

const Sidebar = () => {
  const userId = getUserId();
  const dispatch = useDispatch<AppDispatch>();

  // user ve loading durumlarını redux state'inden alıyoruz
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailById(userId));
    }
  }, [dispatch, userId]);

  return (
    <SidebarMenu>
      <SidebarMenuHeader>
        {/* <SidebarMenu.Toggle />  */} {/* open-close */}
      </SidebarMenuHeader>
      <SidebarMenuBody>
        <div className="sidebar-menu-body-items">
          {/* Loading durumuna göre Spinner veya içerik gösterme */}
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              <img
                src={user?.imageUrl || "/images/profile-image.png"}
                className="img-fluid rounded-circle"
              />
              <SidebarMenu.Nav.Title>
                {user && user.firstName} {user && user.lastName}
              </SidebarMenu.Nav.Title>
              <SidebarMenu.Nav.Item>{user && user.schoolName}</SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Item>
                {user?.classroomName}. Sınıf
              </SidebarMenu.Nav.Item>
            </>
          )}
        </div>
        {!loading && (
          <Container>
            <SidebarMenu.Nav>
              <IconTemp mainClassName="iconHeader" {...userIcon} pathName="/information" />
              <IconTemp mainClassName="iconHeader" {...onlineLessonIcon} />
              <IconTemp mainClassName="iconHeader" {...assignmentsIcon} />
              <IconTemp mainClassName="iconHeader" {...examResultIcon} pathName="/grades" />
              <IconTemp mainClassName="iconHeader" {...attendanceIcon} />
              <IconTemp mainClassName="iconHeader" {...calendar} />
              {/* Sınav Tarihleri ekle */}
            </SidebarMenu.Nav>
          </Container>
        )}
      </SidebarMenuBody>
    </SidebarMenu>
  );
};

export default Sidebar;
