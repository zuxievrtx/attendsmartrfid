import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import {
  Row, Col, CardBody, Card, Alert, Container, Form, Input, Label, Spinner
} from "reactstrap";
import profile from "../../assets/images/profile-img.png";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.VITE_API_URL, // Your Laravel API base URL
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true
});

const AuthService = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", `Bearer ${token}`);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },

  removeToken: () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      setError("Email is required");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/login', formData);

      if (response.data?.success && response.data?.data?.token) {
        const { token, name } = response.data.data;

        AuthService.setToken(token);

        const userData = {
          name: sanitizeInput(name),
          email: sanitizeInput(formData.email)
        };

        sessionStorage.setItem("user", JSON.stringify(userData));

        // Navigate to dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        throw new Error(response.data?.message || "Invalid response from server");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "The provided credentials are incorrect.";
      setError(sanitizeInput(errorMessage));
      AuthService.removeToken();
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
                        {error && (
                            <Alert color="danger" fade={false}> {/* Changed here */}
                              {error}
                            </Alert>
                        )}

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
                              autoComplete="email"
                              maxLength={100}
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
                              autoComplete="current-password"
                              maxLength={100}
                          />
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              disabled={loading}
                          >
                            {loading ? (
                                <>
                                  <Spinner size="sm" className="me-2" />
                                  Logging in...
                                </>
                            ) : (
                                "Log In"
                            )}
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
                    <Link to="/admin/register" className="fw-medium text-primary">
                      Signup now
                    </Link>
                  </p>
                  <p>© {new Date().getFullYear()} AttendSmart.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
  );
};

export default Login;