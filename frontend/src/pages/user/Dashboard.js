import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../constants";
import DashboardListItem from "../../components/dashboard/DashboardListItem";
import styles from "./Dashboard.module.css";
import {
  BorderAll,
  Film,
  PeopleFill,
  PersonVcardFill,
  ProjectorFill,
  QrCodeScan,
  TagFill,
  TicketFill,
} from "react-bootstrap-icons";

const Dashboard = (props) => {
  const { user } = useAuth();

  return (
    <Container style={{minHeight: "75vh"}}>
      <Content className={styles.content}>
        <h1>Dashboard</h1>
        {user && (
          <>
            <h4>
              Welcome, {user.firstName} {user.lastName}!
            </h4>

            <div className="d-flex flex-column gap-2 mb-3 mt-5">
              {user.role === ROLES.ADMIN && (
                <>
                  <DashboardListItem linkTo="/admin/movies">
                    <Film /> Show Management
                  </DashboardListItem>
                  <DashboardListItem linkTo="/admin/cinemas">
                    <BorderAll /> Theater Management
                  </DashboardListItem>
                  <DashboardListItem linkTo="/admin/seattypes">
                    <TagFill /> Seat Management
                  </DashboardListItem>
                  <DashboardListItem linkTo="/admin/screenings/edit">
                    <ProjectorFill /> Add Show
                  </DashboardListItem>
                  <DashboardListItem linkTo="/admin/staff">
                    <PeopleFill /> Employee Management
                  </DashboardListItem>
                </>
              )}

              {(user.role === ROLES.ADMIN || user.role === ROLES.STAFF) && (
                <DashboardListItem linkTo="/tickets/validation">
                  <QrCodeScan /> Ticket Scanner
                </DashboardListItem>
              )}

              <DashboardListItem linkTo="/user/tickets">
                <TicketFill />  Tickets
              </DashboardListItem>
              <DashboardListItem linkTo="/user/account">
                <PersonVcardFill /> Edit Account
              </DashboardListItem>
            </div>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;
