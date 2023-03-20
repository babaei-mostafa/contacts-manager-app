import { SearchContact } from "./Contacts/SearchContact";
import { useLocation } from "react-router-dom";

import { BACKGROUND, PURPLE } from "../helpers/colors";

export const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expand-xm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i
                class="fa fa-id-badge"
                aria-hidden="true"
                style={{ color: PURPLE }}
              />{" "}
              وب اپلیکیشن مدیریت{"  "}
              <span style={{ color: PURPLE }}>مخاطبین</span>
            </div>
          </div>
          <div className="col">
            {location.pathname === "/contacts" ? (
              <SearchContact />
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
