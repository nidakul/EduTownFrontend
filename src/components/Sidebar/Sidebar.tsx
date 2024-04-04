import SidebarMenu, {
  SidebarMenuBody,
  SidebarMenuHeader,
} from "react-bootstrap-sidebar-menu";
import "./sidebar.css";
import { Container } from "react-bootstrap";

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
            <h5 className="mt-2 mb-0">isim soyisim</h5>
            <SidebarMenu.Nav.Title>Okul adı</SidebarMenu.Nav.Title>
          </div>
          <Container>
          <SidebarMenu.Nav>
            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* <img className="sidebar-menu-toggle-icon2" src= /> */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Bilgilerim</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>

            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* <img className="sidebar-menu-toggle-icon2" src= /> */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Canlı Dersler</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>

            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* <img className="sidebar-menu-toggle-icon2" src= /> */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Ödevler</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>

            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* <img className="sidebar-menu-toggle-icon2" src= /> */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Sayfam</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>

            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* <img className="sidebar-menu-toggle-icon2" src= /> */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Sayfam</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>

            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* <img className="sidebar-menu-toggle-icon2" src= /> */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Sayfam</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
          </SidebarMenu.Nav>
          </Container>
      </SidebarMenuBody>
    </SidebarMenu>
  );
};

export default Sidebar;
