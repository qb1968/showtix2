import { Modal, Form, FormSelect, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import LoadingButton from "../ui/LoadingButton";

const ScreeningModal = ({
  options,
  show,
  onClose,
  isLoading,
  error,
  onSubmit,
}) => {
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const selectedCinema = useRef();
  const selectedMovie = useRef();
  const selectedWeekday = useRef();

  const addScreening = () => {
    const screening = {
      cinema: selectedCinema.current.value,
      movie: selectedMovie.current.value,
      weekday: selectedWeekday.current.value,
      time: selectedTime,
    };
    onSubmit(screening);
  };

  const movieOptions = options?.movies?.map((m, i) => (
    <option key={i}>{m.title}</option>
  ));

  const cinemaOptions = options?.cinemas?.map((c, i) => (
    <option key={i}>{c.title}</option>
  ));

  const errorMsg = error && <p className="text-danger">{error}</p>;
  
  
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Show</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="movie">
          <Form.Label>Show</Form.Label>
          <FormSelect ref={selectedMovie} required={true}>
            {movieOptions}
          </FormSelect>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cinema">
          <Form.Label>Theater</Form.Label>
          <FormSelect ref={selectedCinema} required={true}>
            {cinemaOptions}
          </FormSelect>
        </Form.Group>
        <Form.Group className="mb-3" controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(ev) => setSelectedTime(ev.target.value)}
            required={true}
            value={selectedTime}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="weekday">
          <Form.Label>Date</Form.Label>
          <FormSelect ref={selectedWeekday} required={true}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </FormSelect>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column align-items-stretch">
        {errorMsg}
        <div className="d-flex gap-3 flex-fill">
          <Button variant="secondary" className="flex-fill" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="success"
            className="flex-fill"
            onClick={addScreening}
            isLoading={isLoading}
          >
            Add
          </LoadingButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ScreeningModal;
