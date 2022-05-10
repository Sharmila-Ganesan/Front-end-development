import React , { Suspense, lazy } from 'react'; 
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';


import NavBar from './components/navbar';
import Footer from './screens/Footer';
import Loader from './utils/Loader';

const Home = lazy(() => import('./screens/Home'));
const NotFound = lazy(() => import('./components/NotFound'));
const Signup = lazy(() => import('./screens/Signup'));
const Login = lazy(() => import('./screens/Login'));
const About = lazy(() => import('./screens/About'));
const Contact = lazy(() => import('./screens/Contact'));
const Terms = lazy(() => import('./screens/TermsConditions'));
const Privacy = lazy(() => import('./screens/PrivacyPolicy'));
const Refund = lazy(() => import('./screens/RefundPolicy'));

const MyDetails = lazy(() => import('./components/myprofile'));
const PayBill = lazy(() => import('./components/PayBill'));
const GenerateId = lazy(() => import('./components/GenerateId'));
const CollectBill = lazy(() => import('./components/CollectBill'));
const ManageUser = lazy(() => import('./components/ManageUser'));
const ViewUsers = lazy(()=> import('./components/ViewUsers'))
const PaymentHistory = lazy(() => import('./components/history'));
const Deposit = lazy(()=>import('./components/Deposit'));
const UserControl = lazy(()=>import('./components/userControl'));
const DeleteUser = lazy(()=>import('./components/deleteUser'));
const PendingBills = lazy(()=>import('./components/pendingBills'));
const PurchaseStatement = lazy(() => import('./components/PurchaseStatement'));
const PayOut = lazy(()=> import ('./components/PayOut'));
const Salary = lazy(()=>import('./components/SalaryDetails'));
const ProcessFlow = lazy(()=>import('./components/ProcessFlow'));
const SearchBranch = lazy(()=>import('./components/SearchBranch'));
const ThanksComponent = lazy(()=>import('./components/thanks'));
const FailedComponent = lazy(()=>import('./components/failed'));
const PendingComponent = lazy(()=>import('./components/pending'));
const AddNewBranch = lazy(()=>import('./components/branch/AddBranch'));
const ManageBranch = lazy(()=>import('./components/branch/ManageBranch'));
const ViewBranch = lazy(()=>import('./components/branch/ViewBranch'));
const Notification = lazy(()=>import('./components/notification'));
const EmptyCan = lazy(() => import('./components/sales/EmptyCan'));
const TestSale = lazy(() => import('./components/sales/TestSale'));
const WelcomeOffer = lazy(()=>import('./components/WelcomeOffer'));
const DeleteSales = lazy(()=>import('./components/DeleteSales'));

export default class WebRoutes extends React.Component {
    render() {
        return (
            <Router>
                    <NavBar />
                    <Footer />
                    <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route exact path = "/" component = {Home} />
                        <Route exact path = "/home" component = {Home} />
                        <Route exact path = "/about" component = {About} />
                        <Route exact path = "/contact" component = {Contact} />
                        <Route exact path = "/login" component={Login} />
                        <Route exact path = "/profile" component={MyDetails} />
                        <Route exact path = "/paybill" component={PayBill} />
                        <Route exact path = "/statement" component={PurchaseStatement} />
                        <Route exact path = "/history" component={PaymentHistory} />
                        <Route exact path = "/register" component={Signup} />
                        <Route exact path = "/collectbill" component={CollectBill} />
                        <Route exact path = "/generateid" component={GenerateId} />
                        <Route exact path = "/manageuser" component={ManageUser} />
                        <Route exact path = "/deposit" component={Deposit} />
                        <Route exact path = "/control" component={UserControl} />
                        <Route exact path = "/delete" component={DeleteUser} />
                        <Route exact path = "/view" component={ViewUsers} />
                        <Route exact path = "/pending" component={PendingBills} />
                        <Route exact path = "/terms" component={Terms} />
                        <Route exact path = "/privacy" component={Privacy} />
                        <Route exact path = "/refund" component={Refund} />
                        <Route exact path = "/payout" component={PayOut} />
                        <Route exact path = "/salary" component={Salary} />
                        <Route exact path="/process" component={ProcessFlow}/>
                        <Route exact path="/searchbranch" component={SearchBranch}/> 
                        <Route exact path="/paymentthanks" component={ThanksComponent}/> 
                        <Route exact path="/paymentfailed" component={FailedComponent}/> 
                        <Route exact path="/paymentpending" component={PendingComponent}/>
                        <Route exact path="/addbranch" component={AddNewBranch}/>
                        <Route exact path="/managebranch" component={ManageBranch}/>
                        <Route exact path="/viewbranch" component={ViewBranch}/>
                        <Route exact path="/notification" component={Notification}/>
                        <Route exact path="/emptycan" component={EmptyCan}/>
                        <Route exact path="/testsale" component={TestSale}/>
                        <Route exact path="/addwelcome" component={WelcomeOffer}/> 
                        <Route exact path="/deletesales" component={DeleteSales}/> 
                        <Route exact path="/*" component={NotFound} />
                    </Switch>  
                    </Suspense>
            </Router>
        )
    }
}

