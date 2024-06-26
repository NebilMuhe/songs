import { FormEvent, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { addSongsRequest } from "../slice/slice";
import { css } from "@emotion/react";
import { closeAddModal } from "../slice/modalSlice";
import { Link, useNavigate } from "react-router-dom";

const addButton = css`
  background: blue;
`;
const cancelButton = css`
  background: gray;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-left: 10px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  display: block;
  width: 60vw;
  height: 20px;
  padding: 0.5rem;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    border-color: #7db0fb;
    outline: 0;
    box-shadow: 0 0 0 4px rgba(24, 117, 255, 0.25);
  }
`;

const Select = styled.select`
  border: 1px solid #ccc;
  display: block;
  width: 62vw;
  height: 40px;
  padding: 0.5rem;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    border-color: #7db0fb;
    outline: 0;
    box-shadow: 0 0 0 4px rgba(24, 117, 255, 0.25);
  }
`;

const Button = styled.button`
  background: #0d6efd;
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

const Aside = styled.aside`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  background: #fff;
  width: 80vw;
  max-width: 900px;
  border-radius: 0.25rem;
`;

const H4 = styled.h4`
  font-size: 1.5rem;
  margin-left: 10px;
`;

const SongsForm = () => {
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(addSongsRequest(song));
    navigate("/");
  };

  return (
    <Aside>
      <Div>
        <H4>Add Song</H4>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={song.title}
                onChange={(e) => setSong({ ...song, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="artist">Artist</Label>
              <Input
                type="text"
                id="artist"
                value={song.artist}
                onChange={(e) => {
                  setSong({ ...song, artist: e.target.value });
                }}
              />
            </div>
            <div>
              <Label htmlFor="album">Album</Label>
              <Input
                type="number"
                id="album"
                value={song.album}
                onChange={(e) => {
                  setSong({ ...song, album: e.target.value });
                }}
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select
                name=""
                id="genre"
                value={song.genre}
                onChange={(e) => setSong({ ...song, genre: e.target.value })}
              >
                <option value=""></option>
                <option value="reggae">Reggae</option>
                <option value="rock">Rock</option>
                <option value="classical">Classical</option>
                <option value="hip hop">HipHop</option>
                <option value="pop">Pop</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Button css={addButton} type="submit">
                Add
              </Button>
              <Link to="/">
                <Button css={cancelButton}>Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </Div>
    </Aside>
  );
};

export default SongsForm;
