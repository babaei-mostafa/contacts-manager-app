import { useContext } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../";
import { ContactContext } from "../../context/contactContext";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { contactSchema } from "../../validations/contactSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const AddContact = ({}) => {
  const { loading, groups, createContact } = useContext(ContactContext);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Add Contact</title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-3">
          <img
            src={require("../../assets/man-taking-note.png")}
            height="400px"
            style={{
              position: "absolute",
              zIndex: "-1",
              top: "130px",
              left: "100px",
              opacity: "50%",
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 fw-bold text-center" style={{ color: GREEN }}>
                  ساخت مخاطب جدید
                </p>
              </div>
            </div>
            <hr style={{ backgroundColor: GREEN }} />
            <div className="row mt-5">
              <div className="col-md-4">
                <Formik
                  initialValues={{
                    fullname: "",
                    photo: "",
                    number: "",
                    email: "",
                    occupation: "",
                    group: "",
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    createContact(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="photo"
                        type="text"
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                      <ErrorMessage
                        name="photo"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="number"
                        type="number"
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                      <ErrorMessage
                        name="number"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="occupation"
                        type="text"
                        className="form-control"
                        placeholder="شغل"
                      />
                      <ErrorMessage
                        name="occupation"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field as="select" name="group" className="form-control">
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="group"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ساخت مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </section>
      )}
    </HelmetProvider>
  );
};
