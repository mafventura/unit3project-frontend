import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";

export default function Sidebar({ handleLogout, user }) {

  const location = useLocation();

  const pathname = location.pathname;
  const parts = pathname.split('/')
  const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1))
  const formattedPath = capitalizedParts.join(' ')
  console.log(formattedPath)

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#F4F4F1" backgroundColor="#3C7D54">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
            <Link to='/'>
            <img
              src={"https://i.imgur.com/oVyooXT.png"}
              alt=""
              style={{ width: "150px" }}
              className="mb-2"
            />
            </Link>
            <p
              style={{
                color: "#F4F4F1",
                margin: "5px 0 0",
                fontFamily: "PT Serif, serif",
              }}
            >
              Hello, {user?.given_name}
            </p>
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}  >
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/dailies" className={location.pathname === '/dailies' ? 'active' : ''}>
              <CDBSidebarMenuItem icon="calendar-plus">
                All Daily's
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/todos" className={location.pathname === '/todos' ? 'active' : ''}>
              <CDBSidebarMenuItem icon="calendar-check">
                All To Do's
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/schedule" activeClassName="active">
              <CDBSidebarMenuItem icon="calendar-week">
                Schedule
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper">
            <Button
              variant="secondary"
              onClick={handleLogout}
              style={{
                width: "100%",
                background: "rgb(233, 237, 200, 0.2)",
                border: "none",
                borderRadius: "0",
              }}
            >
              <CiLogout style={{ marginRight: "5px" }} />
            </Button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
