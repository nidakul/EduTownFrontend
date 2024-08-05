import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  mainClassName: string;
  className: string;
  image: string;
  valueHeader?: string;
  pathName?: string;
};
const iconTemp = (props: Props) => {
  // console.log("link", props.pathName);
  return (
    <>
      {/* SidebarMenu.Nav.Link yerine link ya da navLink dene */}
      <Link to={props.pathName || ""} className={props.mainClassName}>
        <Col>
          <img className={props.className} src={props.image} />
          <span>{props.valueHeader}</span>
        </Col>
      </Link>
    </>
  );
};

export default iconTemp;
