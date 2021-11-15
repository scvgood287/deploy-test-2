import React, { useRef } from 'react'
import Link from 'next/link'
import uuid from 'react-uuid'
import { useAtom } from 'jotai'
import { addGameModalToggleAtom, gameListAtom,currentGameAtom } from '../state/state'
import { SepDivLeft, SepDivRight, ToggleArea, SettingArea, SettingBtn, ToggleBtn, ToggleLabel, RightWrap, GameListItem } from '../styles/RenderAllGames'
import axios from 'axios'

const RenderAllGames = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  const [gameList, setGameList] = useAtom(gameListAtom);
  const [current, setCurrentGame] = useAtom(currentGameAtom);
  const clickToLink = useRef(null);


  const removeGame = async (key) => {
    console.log(key);
    // const a = data.splice(id,1)
    // console.log(data);
    // setDataSet(a);
    const newGames = [...gameList];
    const findItem = newGames.find(game => game._id === key);
    const idx = newGames.indexOf(findItem);
    newGames.splice(idx, 1);
    setGameList(newGames);
    const response = await axios.delete(`/games/${key}`);
  }

  const handleToggleChange = async (game) => {
    const { _id, isPlayable } = game;
    const games = document.getElementById(_id);
    // setGameList([{
    //   ...game,
    //   isPlayable: !isPlayable
    // }, ...gameList.filter(({ _id: gameId }) => gameId !== _id)]);
    game['isPlayable'] = !isPlayable;
    games.checked = !isPlayable;
    const response = await axios.patch(`/games/${_id}`, { isPlayable: isPlayable ? 0 : 1 });
    console.log(response);
  }

  const settingGame = (currentGame) => {
    setCurrentGame(currentGame);
  }

  return (
    <>
      {
          (gameList ? gameList : []).map((game, i) => {
            const { _id, name, tagNames, imagesCount, isPlayable, updated } = game;
            let maxRound = imagesCount <= 2 ? 0 : 2;
            if (maxRound) {
              while (maxRound * 2 <= imagesCount) {
                maxRound = maxRound * 2;
              }
            }
            return (
              <GameListItem key={uuid()}>
                <SepDivLeft>
                  {console.log(maxRound)}
                  <h1>{name}</h1>
                  <p>최대 라운드 : <strong>{maxRound}</strong></p>
                  <p>전체 이미지 : <strong>{imagesCount}</strong></p>
                </SepDivLeft>
  
                <SepDivRight>
                  <RightWrap>
                    <ToggleArea>
                      <ToggleBtn key={uuid()} id={_id} onClick={(e) => { handleToggleChange(game) }} defaultChecked={isPlayable} /><ToggleLabel htmlFor={_id}></ToggleLabel>
                    </ToggleArea>
                    <SettingArea>
                      <Link href={{
                        pathname: `/editgame/[gameId]`,
                        query: {
                          name: _id
                        }
                      }} as={`/editgame/${[_id]}`} style='display: none'><SettingBtn key={uuid()} id="setting" onClick={() => settingGame(game)}></SettingBtn></Link>
                      <SettingBtn key={uuid()} id="remove" onClick={() => { removeGame(_id) }} />
                    </SettingArea>
                  </RightWrap>
                </SepDivRight>
              </GameListItem>
            )
          })
      }
    </>
  );

}


export default RenderAllGames;
