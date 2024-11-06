import React, { useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validation = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string().email("Invalid email format").required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      confirm_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required("Please Confirm Your Password")
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://attendsmartbe.test/api/register', values);

        if (response.data.success) {
          setSuccess(response.data.message);
          // Store token if needed
          localStorage.setItem('token', response.data.data.token);
          // Redirect after successful registration
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred during registration");
      }
    }
  });

  return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logoImg} alt="" className="rounded-circle" height="34" />
                        </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      {success && <Alert color="success">{success}</Alert>}
                      {error && <Alert color="danger">{error}</Alert>}

                      <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                      >
                        <div className="mb-3">
                          <Label className="form-label">Name</Label>
                          <Input
                              name="name"
                              type="text"
                              placeholder="Enter name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={validation.touched.name && validation.errors.name ? true : false}
                          />
                          {validation.touched.name && validation.errors.name ? (
                              <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                              name="email"
                              type="email"
                              placeholder="Enter email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={validation.touched.password && validation.errors.password ? true : false}
                          />
                          {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Confirm Password</Label>
                          <Input
                              name="confirm_password"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.confirm_password || ""}
                              invalid={validation.touched.confirm_password && validation.errors.confirm_password ? true : false}
                          />
                          {validation.touched.confirm_password && validation.errors.confirm_password ? (
                              <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          <button className="btn btn-primary btn-block" type="submit">
                            Register
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <p>
                            Already have an account?{" "}
                            <Link to="/login" className="font-weight-medium text-primary">
                              Login
                            </Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
  );
};

export default Register;