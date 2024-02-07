import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import AllToDos from './todos/AllToDos';
import { Routes, Route } from 'react-router-dom'

export default function Sidebar({ handleLogout, user }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#3C7D54">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            JOURNEY
          </a>
          <p style={{
            color: 'rgb(233,237,200,0.7)',
            margin: '5px 0 0',
            fontFamily: 'fantasy'
            }}>
              Hello, {user.given_name}
          </p>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink>
              <CDBSidebarMenuItem icon="calendar-plus">All Daily's</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/todos">
              <CDBSidebarMenuItem icon="calendar-check">To Do's</CDBSidebarMenuItem>
            </NavLink>
            <NavLink>
              <CDBSidebarMenuItem icon="calendar-week">Schedule</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            
          >
            <Button variant="secondary" onClick={handleLogout} 
              style={{
                width: '100%',
                background: 'rgb(233, 237, 200, 0.2)',
                border: 'none',
                borderRadius: '0'
            }}>
              logout
            </Button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  )
}
