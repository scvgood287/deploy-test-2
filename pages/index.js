import styled from "styled-components";
import React from "react";
import AddGameModal from "./AddGameModal";
import { useAtom } from "jotai";
import { addGameModalToggleAtom, fetchDataSetAtom } from "../state/state";
import RenderAllGames from "./RenderAllGames";

const SepDivLeft = styled.div`
  & > h1 {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.5px;
    margin: 0;
    margin-bottom: 8px;
  }
  & > p {
    font-size: 12px;
    font-weight: light;
    letter-spacing: -0.5px;
    margin: 0;
  }
`;
const SepDivRight = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;
`;
const ToggleArea = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;
const SettingArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
`;
const SettingBtn = styled.button`
  width: 24px;
  height: 24px;
  background: #f7f8f9;
`;
const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const GameListItem = styled.div`
  width: 291px;
  height: 103px;
  padding: 16px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;

  & > SepDivLeft {
    display: flex;
    flex: 1;
  }
  & > SepDivRight {
    display: flex;
    flex: 1;
  }
`;

const ToggleBtn = styled.input.attrs((props) => ({
  type: "checkbox",
}))`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + label {
    background: #bada55;
  }
  &:checked + label:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;
const ToggleLabel = styled.label.attrs((props) => ({}))`
  cursor: pointer;
  text-indent: -9999px;
  width: 37px;
  height: 20px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  &:active:after {
    width: 18px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-auto-rows: minmax(102px, auto);
  grid-template-columns: repeat(3, 291px);
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
`;

const CreateGameBtn = styled.button`
  width: 291px;
  height: 102px;
`;

const GameSettingModal = styled.div`
  width: 400px;
  height: 500px;
  display: fixed;
  position: absolute;
  z-index: 999;
  border: 1px solid #000;
  background: #fff;
`;

const Home = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  const [test] = useAtom(fetchDataSetAtom);

  console.log(test);

  return (
    <>
      {addGameToggle ? <AddGameModal /> : null}
      {test ? (
        <Grid>
          <CreateGameBtn
            onClick={() => {
              setToggle(!addGameToggle);
            }}
          />
          <RenderAllGames />
        </Grid>
      ) : (
        console.log("render Fail")
      )}
    </>
  );
};
export default Home;

// const GameSchema = new Schema({
//   _id
//   isPlayable: { type: Number, default: 0, min: 0, max: 1, },
//   playCount: { type: Number, default: 0, min: 0, },
//   updated: { type: Date, default: Date.now(), index: 1 },
//   name: { type: String, required: true, unique: true, },
//   imagesCount: { type: Number, default: 0, min: 0, },
//   tagNames: {
//     main: { type: String, required: true, },
//     sub: { type: String, required: true, },
//     optional: { type: String, },
//   },
// });
