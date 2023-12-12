import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Center from './components/Center';
import EmptyBoard from './components/EmptyBoard';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from './redux/boardSlice';

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  useEffect(() => {
    // Eğer aktif bir board yoksa ve boards dizisi doluysa ilk boardı aktif yapıyo
    if (!activeBoard && boards.length > 0) {
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    }
  }, [activeBoard, boards, dispatch]);

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div className='App'>
      {boards.length > 0 ? (
        <>
          <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
          <Center />
        </>
      ) : (
        <EmptyBoard type='add' />
      )}
    </div>
  );
}

export default App;
