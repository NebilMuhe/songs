import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { getSongsRequest } from "./components/slice/slice";
import ListSong from "./components/templates/ListSong";
import { RootState } from "./components/store/store";
import { EditItem } from "./components/slice/editSlice";
import EditModal from "./components/templates/EditForm";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ModalItem, openModal } from "./components/slice/modalSlice";
import SongsForm from "./components/templates/SongForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/templates/Home";
import DeleteModal from "./components/templates/DeleteModal";
import EditForm from "./components/templates/EditForm";
import SongStats from "./components/templates/SongStats";

function App() {
  const dispatch = useDispatch();

  const { isEditOpen }: EditItem = useSelector<RootState, EditItem>(
    (state) => state.edit
  );

  const { isOpen, id }: ModalItem = useSelector<RootState, ModalItem>(
    (state) => state.add
  );

  const Button = styled.button`
    color: #fff;
    border: 0;
    padding: 0.5rem 0.7rem;
    border-radius: 5px;
    outline: 0;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 10px;
    cursor: pointer;
  `;

  const addButton = css`
    background: #0d6efd;
  `;

  useEffect(() => {
    dispatch(getSongsRequest());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<SongsForm />} />
        <Route path="/stats" element={<SongStats />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
      {/* <Button css={addButton} onClick={() => dispatch(openAddModal())}>
        Add
      </Button> */}

      {isOpen && <DeleteModal props={id} />}
      {/*{isEditOpen && <EditModal />} */}
    </>
  );
}

export default App;
