import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import SeatTypesList from "../../components/seattypes/SeatTypesList";
import SeatTypeModal from "../../components/modals/SeatTypeModal";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import MainButton from "../../components/ui/MainButton";
import useFlash from "../../hooks/useFlash";

const SeatTypes = (props) => {
  const [types, setTypes] = useState([]);
  const [showSeatTypeModal, setShowSeatTypeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSeatType, setSelectedSeatType] = useState();
  const [isNew, setIsNew] = useState(true);
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();
  const { createMessage } = useFlash();

  useEffect(() => {
    fetchPage.get(`${BACKEND_URL}/seattypes`).then(async (res) => {
      if (res.status !== 200) return;
      setTypes(res.data);
    });
  }, []);

  const addSeatType = () => {
    clearErrorMsg();
    setSelectedSeatType();
    setIsNew(true);
    setShowSeatTypeModal(true);
  };

  const deleteSeatType = (selected) => {
    clearErrorMsg();
    setSelectedSeatType(selected);
    setShowDeleteModal(true);
  };

  const editSeatType = (selected) => {
    clearErrorMsg();
    setIsNew(false);
    setSelectedSeatType(selected);
    setShowSeatTypeModal(true);
  };

  const submitHandler = async (type) => {
    try {
      if (isNew) {
        const res = await fetch.post(`${BACKEND_URL}/seattypes`, type);
        if (res.status !== 200) return;

        setTypes((prevTypes) => [...prevTypes, res.data]);
        setShowSeatTypeModal(false);
        createMessage({
          text: "Seat Type was created",
          variant: "success",
        });
      } else {
        const res = await fetch.put(
          `${BACKEND_URL}/seattypes/${type._id}`,
          type
        );
        if (res.status !== 200) return;

        setTypes((prevTypes) => {
          const index = prevTypes.findIndex(
            (prevType) => prevType._id === type._id
          );
          const newTypes = prevTypes;
          newTypes[index] = type;
          return [...newTypes];
        });
        setShowSeatTypeModal(false);
        createMessage({
          text: "Seat type was updated",
          variant: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch.delete(
        `${BACKEND_URL}/seattypes/${selectedSeatType._id}`
      );
      if (res.status !== 200) return;
      setShowDeleteModal(false);
      createMessage({
        text: "Seat type was deleted",
        variant: "success",
      });
      setTypes((prevTypes) => [
        ...prevTypes.filter((type) => type._id !== selectedSeatType._id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Content style={{minHeight: "70vh"}}>
          <h1>Seat Type</h1>
          <hr />
          <MainButton className="mb-4" onClick={addSeatType}>
            Add New
          </MainButton>
          {isFetchingPage && <LoadingSpinner />}
          {!isFetchingPage && (
            <>
              {types.length > 0 && (
                <SeatTypesList
                  data={types}
                  onDelete={deleteSeatType}
                  onEdit={editSeatType}
                />
              )}
              {types.length <= 0 && (
                <h2 className="text-muted text-center">
                 
                </h2>
              )}
            </>
          )}
        </Content>
      </Container>
      <SeatTypeModal
        show={showSeatTypeModal}
        isNew={isNew}
        onClose={() => setShowSeatTypeModal(false)}
        onSubmit={submitHandler}
        selected={selectedSeatType}
        error={errorMsg}
        isLoading={isFetching}
      />
      <DeleteModal
        show={showDeleteModal}
        title={selectedSeatType?.title}
        text="Do you want to delete seat type?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteHandler}
        isLoading={isFetching}
        error={errorMsg}
      />
    </>
  );
};

export default SeatTypes;
