import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";
import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import "./App.css";
import { confirmAlert } from "react-confirm-alert";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";
import { ContactContext } from "./context/contactContext";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoding) => !prevLoding);

      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد");
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading((prevLoding) => !prevLoding);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoding) => !prevLoding);
    }
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                handleDeleteContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const handleDeleteContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);

      const { status } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد");

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (error) {
      console.log(error.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  let filterTimeout;

  const contactSearch = (query) => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
      setFilteredContacts(
        contacts.filter((contact) => {
          return contact.fullname.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, 1000);
  };

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        setContacts,
        filteredContacts,
        setFilteredContacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
