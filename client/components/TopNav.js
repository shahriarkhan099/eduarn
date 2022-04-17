
import { useState, useEffect, useContext } from 'react';
import { Menu } from "antd";
import Link from "next/link";
import {
    LoginOutlined, 
    UserAddOutlined,
    HomeOutlined,
    LogoutOutlined,
    CoffeeOutlined,
    CarryOutOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import {Context} from '../context';
import axios from 'axios';
import {useRouter} from "next/router";
import { toast } from 'react-toastify';

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useRouter();
    
    useEffect(() => {
      process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname]);

    const signout = async () => {
       dispatch({ type: "SIGNOUT" });
       window.localStorage.removeItem("user");
       const { data } = await axios.get("/api/signout");
       toast(data.message);
       router.push("/signin");
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
           <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<HomeOutlined />}>
               <Link href="/">
                   <a>eduARN</a>
               </Link>
           </Item>

           {user && user.role && user.role.includes("Instructor") ? (
             <Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}>
             <Link href="/instructor/course/create">
             <a>Create Course</a>
             </Link>
             </Item>
           ) : (
            <Item key="/user/become-instructor" onClick={(e) => setCurrent(e.key)} icon={<TeamOutlined />}>
            <Link href="/user/become-instructor">
            <a>Become An Instructor</a>
            </Link>
            </Item>
           )}

        {user === null && (
            <>
              <Item key="/signin" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
              <Link href="/signin">
              <a>SignIn</a>
              </Link>
              </Item>

              <Item key="/signup" onClick={(e) => setCurrent(e.key)} icon={<UserAddOutlined />}>
              <Link href="/signup">
              <a>SignUp</a>
              </Link>
              </Item>
            </>
        )}


           {user !== null && (
            <>
                <Item  icon={<CoffeeOutlined/>} title={user && user.name} className="float-right">
                 <Link href="/user">
                     <a>{user.name}</a>
                 </Link>
                   {/* <Item  onClick={signout} icon={<LogoutOutlined />} className="float-right">
                    SignOut
                    </Item> */}
                </Item>
                <Item  key="/user">
                 <Link href="/user">
                     <a>Dashboard</a>
                 </Link>
                </Item>
                <Item  onClick={signout} icon={<LogoutOutlined />}>
                Sign Out
                </Item>
            </>

            
           )}
        </Menu>
    );
};

export default TopNav;
