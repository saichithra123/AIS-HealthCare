import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import "./App.css";
import { Suspense, lazy, useState } from "react";
import { theme } from "./components/global/theme";
import Layout from "./components/global/Layout";
import { SnackProvider } from "./components/global/SnackProvider";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import { HeaderProvider } from "./components/mobile/HeaderContext";
import MobileDashboard from "./components/mobile/dashboard/MobileDashboard";
import Footer from "./components/mobile/footer/Footer";
import LoginComponent from "./components/mobile/login/LoginComponent";
import PolicyHolders from "./components/healthcare/CSR/PolicyHolders";
import AddEditPolicy from "./components/healthcare/CSR/AddEditPolicy";
import Claimant from "./components/healthcare/CSR/Claimant";

const NewCase = lazy(() => import("./components/cases/NewCase"));
const Cases = lazy(() => import("./components/cases/Cases"));
const Inspection = lazy(() => import("./components/inspection/Inspection"));
const CasesComponent = lazy(() => import("./components/mobile/cases/CasesComponent"));
const CaseDetails = lazy(() => import("./components/mobile/cases/CaseDetails"));
const NewCaseComponent = lazy(() => import("./components/mobile/cases/NewCase"));
const CreateEntity = lazy(() => import("./components/mobile/map/CreateEntity"));
const RouteOptimization = lazy(() => import("./components/inspector/RouteOptimization"));
const PreInspection = lazy(() => import("./components/preInspection/PreInspection"));
const MobileInspection = lazy(() => import("./components/mobile/inspection/MobileInspection"));
const MobilePreInspection = lazy(() => import("./components/mobile/preinspection/MobilePreInspection"));
const ChecklistCategoryView = lazy(() => import("./components/mobile/inspection/CategoryView"));

import AdminDashboard from "./components/dashboard/AdminDashboard";
import SkeletonLoader from "./components/global/SkeletonLoader";
import InspectionPlan from "./components/manager/InspectionPlan";
import AddInspectionPlan from "./components/manager/AddInspectionPlan";
import ReactFormIO from "./components/admin/formio/ReactFormIO";
const UserGroup = lazy(() => import("./components/admin/UserManagement/UserGroup"));
const AddGroup = lazy(() => import("./components/admin/UserManagement/AddGroup"));
const ReportCaseDetails = lazy(() => import("./components/reports/generalInquiry/CaseDetails"));
const Reports = lazy(() => import("./components/reports/Reports"));
const UserManagement = lazy(() => import("./components/admin/UserManagement/UserManagement"));
const UserRegistration = lazy(() => import("./components/admin/UserManagement/UserRegistration"));
const EntityManagement = lazy(() => import("./components/admin/entity/EntityManagement"));
const ChecklistManagement = lazy(() => import("./components/admin/ChecklistManagement/ChecklistManagement"));
const ChecklistItems = lazy(() => import("./components/admin/ChecklistManagement/ChecklistItems"));
const AdminChecklistCategory = lazy(() => import("./components/admin/ChecklistManagement/ChecklistCategory"));
const Templates = lazy(() => import("./components/admin/ChecklistManagement/Templates"));
const PreInspectionChecklist = lazy(() => import("./components/admin/ChecklistManagement/PreInspectionChecklist"));
const Configurations = lazy(() => import("./components/admin/Configurations/Configurations"));
const AdminInspection = lazy(() => import("./components/admin/Configurations/AdminInspection"));
const Skills = lazy(() => import("./components/admin/Configurations/Skills"));
const WorkflowSettings = lazy(() => import("./components/admin/Configurations/WorkflowSettings"));
const ZoneManagement = lazy(() => import("./components/admin/ZoneManagement/ZoneManagement"));
const EmailTemplate = lazy(() => import("./components/admin/notification/EmailTemplate"));
const TemplatePage = lazy(() => import("./components/admin/notification/TemplatePage"));
const NotificationTemplate = lazy(() => import("./components/admin/notification/NotificationTemplate"));
const NotificationSetup = lazy(() => import("./components/admin/Configurations/NotificationSetup"));
const AnswerOptions = lazy(() => import("./components/admin/Configurations/AnswerOptions"));
const ValueTable = lazy(() => import("./components/admin/Configurations/ValueTable"));
const AddUser = lazy(() => import("./components/admin/UserManagement/AddUser"));
const AddZone = lazy(() => import("./components/admin/ZoneManagement/AddZone"));
const AddNewInspection = lazy(() => import("./components/admin/Configurations/AddNewInspection"));
const AddSkills = lazy(() => import("./components/admin/Configurations/AddSkills"));
const AddChecklist = lazy(() => import("./components/admin/ChecklistManagement/AddChecklist"));
const AddNewCategory = lazy(() => import("./components/admin/ChecklistManagement/AddNewCategory"));
const AddEntity = lazy(() => import("./components/admin/entity/AddEntity"));
const AddTemplate = lazy(() => import("./components/admin/ChecklistManagement/AddTemplate"));
const AddPreInspectionChecklist = lazy(() => import("./components/admin/ChecklistManagement/AddPreInspectionChecklist"));
const AddAnswerOption = lazy(() => import("./components/admin/Configurations/AddAnswerOption"));
const AddValueTable = lazy(() => import("./components/admin/Configurations/AddValueTable"));
const ControlType = lazy(() => import("./components/admin/Configurations/ControlType"));
const AddControlType = lazy(() => import("./components/admin/Configurations/AddControlType"));

function App() {
    const [user, setUser] = useState({});
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <>
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <SnackProvider>
                        <HeaderProvider>
                            {!localStorage.getItem("userEmail") ? (
                                <>{isNonMobile ? <Login setUser={setUser} /> : <LoginComponent setUser={setUser} />}</>
                            ) : (
                                <>
                                    <Suspense fallback={<SkeletonLoader />}>
                                        <Routes>
                                            <Route element={<Layout user={user} setUser={setUser} />}>
                                                <Route path="load" element={<SkeletonLoader />} />
                                                {localStorage.getItem("userRole") !== "ADMIN" && (
                                                    <>
                                                        <Route index element={<Navigate to="/dashboard" />} />
                                                        <Route
                                                            path="dashboard"
                                                            element={
                                                                !isNonMobile &&
                                                                    localStorage.getItem("userRole") === "INSPECTOR" ? (
                                                                    <MobileDashboard />
                                                                ) : (
                                                                    <Dashboard />
                                                                )
                                                            }
                                                        />
                                                        <Route
                                                            path="cases"
                                                            element={
                                                                !isNonMobile &&
                                                                    localStorage.getItem("userRole") === "INSPECTOR" ? (
                                                                    <CasesComponent />
                                                                ) : (
                                                                    <Cases />
                                                                )
                                                            }
                                                        />
                                                        <Route
                                                            path="cases/new"
                                                            element={
                                                                !isNonMobile &&
                                                                    localStorage.getItem("userRole") === "INSPECTOR" ? (
                                                                    <NewCaseComponent />
                                                                ) : (
                                                                    <NewCase />
                                                                )
                                                            }
                                                        />
                                                        <Route
                                                            path="cases/inspection"
                                                            element={
                                                                !isNonMobile &&
                                                                    localStorage.getItem("userRole") === "INSPECTOR" ? (
                                                                    <MobileInspection />
                                                                ) : (
                                                                    <Inspection />
                                                                )
                                                            }
                                                        />
                                                        <Route path="cases/categories" element={<ChecklistCategoryView />} />
                                                        <Route
                                                            path="cases/pre-inspection"
                                                            element={
                                                                !isNonMobile &&
                                                                    localStorage.getItem("userRole") === "INSPECTOR" ? (
                                                                    <MobilePreInspection />
                                                                ) : (
                                                                    <PreInspection />
                                                                )
                                                            }
                                                        />
                                                        <Route path="cases/details" element={<CaseDetails />} />
                                                        <Route path="cases/create-entity" element={<CreateEntity />} />
                                                        <Route path="route" element={<RouteOptimization />} />
                                                        <Route path="inspection-plan" element={<InspectionPlan />} />
                                                        <Route path="inspection-plan/add" element={<AddInspectionPlan />} />
                                                    </>
                                                )}

                                                {/* Admin */}
                                                {localStorage.getItem("userRole") === "ADMIN" && (
                                                    <>
                                                        <Route index element={<Navigate to="/admin" />} />
                                                        <Route path="admin" element={<AdminDashboard />} />

                                                        {/* User management */}
                                                        <Route path="user-management" element={<UserManagement />} />
                                                        <Route
                                                            path="user-management/registration"
                                                            element={<UserRegistration />}
                                                        />
                                                        <Route path="user-management/add" element={<AddUser />} />
                                                        <Route path="user-management/group" element={<UserGroup />} />
                                                        <Route path="user-management/group/add" element={<AddGroup />} />

                                                        {/* Checklist management */}
                                                        <Route path="checklist-management" element={<ChecklistManagement />} />
                                                        <Route path="checklist-management/items" element={<ChecklistItems />} />
                                                        <Route path="checklist-management/items/add" element={<AddChecklist />} />
                                                        <Route
                                                            path="checklist-management/category"
                                                            element={<AdminChecklistCategory />}
                                                        />
                                                        <Route
                                                            path="checklist-management/category/add"
                                                            element={<AddNewCategory />}
                                                        />
                                                        <Route path="checklist-management/template" element={<Templates />} />
                                                        <Route
                                                            path="checklist-management/template/add"
                                                            element={<AddTemplate />}
                                                        />
                                                        <Route
                                                            path="checklist-management/pre-inspection-checklist"
                                                            element={<PreInspectionChecklist />}
                                                        />
                                                        <Route
                                                            path="checklist-management/pre-inspection-checklist/add"
                                                            element={<AddPreInspectionChecklist />}
                                                        />
                                                        <Route
                                                            path="checklist-management/form-builder"
                                                            element={<ReactFormIO />}
                                                        />

                                                        {/* Zone management */}
                                                        <Route path="zone-management" element={<ZoneManagement />} />
                                                        <Route path="AddZone" element={<AddZone />} />

                                                        {/* Entity management */}
                                                        <Route path="entity-management" element={<EntityManagement />} />
                                                        <Route path="entity-management/add" element={<AddEntity />} />

                                                        {/* Configuration */}
                                                        <Route path="configurations" element={<Configurations />} />
                                                        <Route
                                                            path="configurations/workflow-settings"
                                                            element={<WorkflowSettings />}
                                                        />
                                                        <Route
                                                            path="configurations/inspection-type"
                                                            element={<AdminInspection />}
                                                        />
                                                        <Route
                                                            path="configurations/inspection-type/add"
                                                            element={<AddNewInspection />}
                                                        />
                                                        <Route path="configurations/skills" element={<Skills />} />
                                                        <Route path="configurations/skills/add" element={<AddSkills />} />
                                                        <Route
                                                            path="configurations/notification-setup"
                                                            element={<NotificationSetup />}
                                                        />
                                                        <Route path="configurations/answer-options" element={<AnswerOptions />} />
                                                        <Route
                                                            path="configurations/answer-options/add"
                                                            element={<AddAnswerOption />}
                                                        />
                                                        <Route path="configurations/value-table" element={<ValueTable />} />
                                                        <Route
                                                            path="configurations/value-table/add"
                                                            element={<AddValueTable />}
                                                        />

                                                        <Route path="configurations/control-type" element={<ControlType />} />
                                                        <Route
                                                            path="configurations/control-type/add"
                                                            element={<AddControlType />}
                                                        />

                                                        {/* Email/notification templates */}
                                                        <Route path="templates/email" element={<EmailTemplate />} />
                                                        <Route path="templates" element={<TemplatePage />} />
                                                        <Route path="templates/notification" element={<NotificationTemplate />} />
                                                    </>
                                                )}

                                                {/* Reports */}
                                                <Route path="reports" element={<Reports />} />
                                                <Route path="reports/case-details" element={<ReportCaseDetails />} />
                                                <Route path="/policy-holders" element={<PolicyHolders />} />
                                                <Route path="/addeditpolicy" element={<AddEditPolicy />} />
                                                <Route path="/claimant" element={<Claimant />} />


                                            </Route>
                                        </Routes>
                                    </Suspense>
                                    {!isNonMobile ? <Footer setUser={setUser} /> : <></>}
                                </>
                            )}
                        </HeaderProvider>
                    </SnackProvider>
                </ThemeProvider>
            </div>
        </>
    );
}

export default App;
