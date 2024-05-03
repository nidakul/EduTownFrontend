import { Col } from "react-bootstrap";
import SidebarMenu from "react-bootstrap-sidebar-menu";

type Props = {
  className: string;
  image: string;
  valueHeader?: string;
  pathName?: string;
};
const iconTemp = (props: Props) => {
  return (
    <>
    {/* SidebarMenu.Nav.Link yerine link ya da navLink dene */}
      <SidebarMenu.Nav.Link href={props.pathName} className="iconHeader">
        <Col lg="12">
          <img className={props.className} src={props.image} />
          <span>{props.valueHeader}</span>
        </Col>
      </SidebarMenu.Nav.Link>
    </>
  );
};

export default iconTemp;
