import { PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

export const SearchContact = () => {
  const {contactSearch} = useContext(ContactContext)
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i class="fa fa-search" aria-hidden="true" />
      </span>
      <input
        dir="rtl"
        type="text"
        onChange={e => contactSearch(e.target.value)}
        style={{ backgroundColor: "gray", borderColor: PURPLE }}
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
