import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingButton from "../ui/LoadingButton";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import ListGroupStyled from "../lists/ListGroupStyled";
import { ListGroupItem } from "react-bootstrap";

const TicketValidationModal = ({ ticket, onClose, show }) => {
  const { fetch, errorMsg, isFetching } = useFetch();

  const validateHandler = async () => {
    const res = await fetch.patch(
      `${BACKEND_URL}/tickets/validate/${ticket.id}`
    );

    if (res.status === 200) {
      onClose();
    }
  };

  const seats = ticket?.seats.map((seat, i) => (
    <ListGroupItem key={i}>
      Row: {seat.row} / Place: {seat.col} [{seat.type.title}]
    </ListGroupItem>
  ));

  const title = ticket?.checked ? (
    <span className="text-danger">Ticket has already been used</span>
  ) : (
    <span className="text-success">Ticket is valid</span>
  );

  const errorInfo = errorMsg && <p className="text-danger">{errorMsg}</p>;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ticket && (
          <>
            <h4>TicketID:</h4>
            <p> {ticket.id}</p>
            <h4>Show:</h4>
            <p> {ticket.movie}</p>
            <h4>Theater:</h4>
            <p> {ticket.cinema}</p>
            <h4>Time:</h4>
            <p> {new Date(ticket.datetime).toLocaleString()}</p>
            <h4>Kunde:</h4>
            <p>
              {" "}
              {ticket.customer.name} {`<${ticket.customer.email}>`}
            </p>
            <h4>Seating:</h4>
            <ListGroupStyled>{seats}</ListGroupStyled>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center flex-column align-items-stretch">
        {errorInfo}
        <div className="d-flex gap-3 flex-fill">
          <Button className="flex-fill" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {!ticket?.checked && (
            <LoadingButton
              className="flex-fill"
              isLoading={isFetching}
              variant="success"
              onClick={validateHandler}
            >
              Stamping
            </LoadingButton>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketValidationModal;
