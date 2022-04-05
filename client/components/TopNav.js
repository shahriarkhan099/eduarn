
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreAddOutlined, 
    LoginOutlined, 
    UserAddOutlined,
    HomeOutlined
} from '@ant-design/icons';

const { Item } = Menu;

const TopNav = () => {
    return (
        <Menu mode="horizontal">
           <Item icon={<HomeOutlined />}>
               <Link href="/">
                   <a>eduARN</a>
               </Link>
           </Item>

           <Item icon={<LoginOutlined />}>
               <Link href="/signin">
                   <a>SignIn</a>
               </Link>
           </Item>

           <Item icon={<UserAddOutlined />}>
               <Link href="/signup">
                   <a>SignUp</a>
               </Link>
           </Item>
        </Menu>
    )
}

export default TopNav;
