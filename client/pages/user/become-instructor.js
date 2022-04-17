
import {useContext, useState} from 'react';
import {Context} from '../../context';
import {Button} from 'antd';
import axios from 'axios';
import {SettingOutlined, UserSwitchOutlined, LoadingOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import Link from "next/link";
import UserRoute from '../../components/routes/UserRoute';

const becomeInstructor = () => {
    const [loading, setLoading] = useState(false);
    const {
        state: {user},
    } = useContext(Context);

    const becomeInstructor = () => {
        setLoading(true);
        // http://localhost:3000/stripe/callback
        axios.post('/api/make-instructor').then(res => {
        // axios.post('/stripe/callback').then(res => {
            console.log(res);
            window.location.href = res.data;
        })
        .catch(err => {
            console.log(err.response.status);
            toast("Stripe onboarding failed. Try again.");
            setLoading(false);
        });
    };
    // className="mb-3" type="primary" block shape="round" icon={loading ? <LoadingOutlined/> : <SettingOutlined/>} 
    //             size="large"
    //size="large" onClick={becomeInstructor} disabled={(user && user.role && user.role.includes("Instructor")) || loading}
    return (
        <>
        <h1 className="jumbotron text-center square">Become An Instructor</h1>

        <div className="container">
          <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
              <div className="pt-4">
                <UserSwitchOutlined className="display-1 pb-3"/>
                <br/>
                <h3>Setup payout to publish courses on eduARN</h3>
                <p className="lead text-success"><strong>EduARN partners with stripe to transfer earnings to your bank account</strong></p>
                <br/>
                <Button className="mb-3" type="primary" block shape="round" size="large" disabled={(user && user.role && user.role.includes("Instructor")) || loading}> 
                {/* {loading ? "processing..." : "Payout Setup"} */}
                <Link href="/stripe/callback">
                <a><strong>Payout Setup</strong></a>
                 </Link>
                </Button>
                <p><strong>You will be redirected to stripe to complete onboarding process.</strong></p>
              </div>
          </div>
          </div>
        </div>
        </>
    );
};

export default becomeInstructor;
