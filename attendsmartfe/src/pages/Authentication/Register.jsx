import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Spinner } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

import { api, AuthService } from "../../hooks/authService.js"; // Buat file terpisah untuk service

import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cek if already logged in
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  // Sanitize input
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  };

  const validation = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
          .required("Please Enter Your Name")
          .min(3, "Name must be at least 3 characters")
          .max(50, "Name must not exceed 50 characters")
          .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
      email: Yup.string()
          .email("Invalid email format")
          .required("Please Enter Your Email")
          .max(255, "Email must not exceed 255 characters"),
      password: Yup.string()
          .required("Please Enter Your Password")
          .min(8, "Password must be at least 8 characters")
          .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
          ),
      confirm_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required("Please Confirm Your Password")
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Sanitize inputs
        const sanitizedValues = {
          name: sanitizeInput(values.name),
          email: sanitizeInput(values.email),
          password: values.password,
          confirm_password: values.confirm_password
        };

        const response = await api.post('/api/register', sanitizedValues);

        if (response.data?.success) {
          const { token, name } = response.data.data;

          // Set token
          AuthService.setToken(token);

          // Store minimal user data
          const userData = {
            name: sanitizeInput(name),
            email: sanitizeInput(sanitizedValues.email)
          };

          sessionStorage.setItem("user", JSON.stringify(userData));

          setSuccess(response.data.message || "Registration successful!");

          // Redirect after delay
          setTimeout(() => {
            navigate('/admin/dashboard', { replace: true });
          }, 1500);
        } else {
          throw new Error(response.data?.message || "Registration failed");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "An error occurred during registration";
        setError(sanitizeInput(errorMessage));
        AuthService.removeToken();
      } finally {
        setLoading(false);
      }
    }
  });

  return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Registrasi Akun</h5>
                          <p>Dapatkan Akun Anda Sekarang Juga!</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="p-2">
                      {success && <Alert color="success" fade={false}>{success}</Alert>}
                      {error && <Alert color="danger" fade={false}>{error}</Alert>}

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

                        <div className="mt-4 d-grid">
                          <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              disabled={loading}
                          >
                            {loading ? (
                                <>
                                  <Spinner size="sm" className="me-2" />
                                  Registering...
                                </>
                            ) : (
                                "Register"
                            )}
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <p>
                            Already have an account?{" "}
                            <Link to="/admin/login" className="font-weight-medium text-primary">
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