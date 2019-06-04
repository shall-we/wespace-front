import React from 'react';
import NoteTemplate from '../components/common/NoteTemplate';
import DirectoryContainer from '../containers/main/DirectoryContainer';
import ContextContainer from '../containers/main/ContextContainer';
import NoteToolContainer from '../containers/main/NoteToolContainer';
const MainPage = () => {
  
  return (
    <NoteTemplate>
      <div style={{display:'flex'}}>
        <DirectoryContainer/>
        <ContextContainer/>
        <NoteToolContainer/>
      </div>
    </NoteTemplate>
  );
};

export default MainPage;