import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// import images
import profile from "../../assets/images/profile-img.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://attendsmartbe.test/api/login", formData);

      if (response.data.success) {
        // Simpan token ke localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify({
          name: response.data.data.name
        }));

        // Redirect ke dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

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
                      <Col xs={7}>
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome Back!</h5>
                          <p>Sign in to continue.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="p-2">
                      <Form className="form-horizontal" onSubmit={handleSubmit}>
                        {error && <Alert color="danger">{error}</Alert>}

                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                          />
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                          />
                        </div>

                        <div className="form-check">
                          <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                          />
                          <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              disabled={loading}
                          >
                            {loading ? "Logging in..." : "Log In"}
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock me-1" />
                            Forgot your password?
                          </Link>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-medium text-primary">
                      Signup now
                    </Link>
                  </p>
                  <p>
                    © {new Date().getFullYear()} AttendSmart.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
  );
};

export default Login;