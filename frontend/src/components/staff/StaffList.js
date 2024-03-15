import Table from "react-bootstrap/Table";
import { Trash3Fill } from "react-bootstrap-icons";
import styles from "./StaffList.module.css";

const StaffList = ({ data, onDelete }) => {
  const tableItems = data?.map((el, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{el.firstName}</td>
      <td>{el.lastName}</td>
      <td>{el.username}</td>
      <td>{el.email}</td>
      <td className="d-flex justify-content-center align-items-center">
        <Trash3Fill size={24} onClick={() => onDelete(el)} />
      </td>
    </tr>
  ));

  return (
    <Table className={styles.table} striped bordered hover responsive>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(!tableItems || tableItems.length <= 0) && (
          <tr>
            <td colSpan={6} className="text-center text-muted">
              No employees available
            </td>
          </tr>
        )}
        {tableItems?.length > 0 && tableItems}
      </tbody>
    </Table>
  );
};

export default StaffList;
