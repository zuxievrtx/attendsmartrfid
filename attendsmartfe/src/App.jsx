import PropTypes from "prop-types";
import React from "react";

import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { useSelector } from "react-redux";

// Import Routes all
import { publicRoutes } from "./routes";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

import {createSelector} from "reselect";

const App = (props) => {
    const selectLayoutState = (state) => state.Layout;
    const LayoutProperties = createSelector(
        selectLayoutState,
        (layout) => ({
            layoutType: layout.layoutType,
        })
    );

    const {
        layoutType
    } = useSelector(LayoutProperties);

    function getLayout(layoutType) {
        let layoutCls = VerticalLayout;
        switch (layoutType) {
            case "horizontal":
                layoutCls = HorizontalLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    }

    const Layout = getLayout(layoutType);

    return (
        <React.Fragment>
            <Routes>
                {publicRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                        key={idx}
                        exact={true}
                    />
                ))}

                {/*{authProtectedRoutes.map((route, idx) => (*/}
                {/*    <Route*/}
                {/*        path={route.path}*/}
                {/*        element={*/}
                {/*            <NonAuthLayout>*/}
                {/*                <Layout>{route.component}</Layout>*/}
                {/*            </NonAuthLayout>*/}
                {/*        }*/}
                {/*        key={idx}*/}
                {/*        exact={true}*/}
                {/*    />*/}
                {/*))}*/}
            </Routes>
        </React.Fragment>
    );
};

App.propTypes = {
    layout: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        layout: state.Layout,
    };
};

export default connect(mapStateToProps, null)(App);

