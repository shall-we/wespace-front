import React from 'react';
import NoteTemplate from '../components/common/NoteTemplate';
import DirectoryContainer from '../containers/main/DirectoryContainer';
import ContextContainer from '../containers/main/ContextContainer';
import NoteToolContainer from '../containers/main/NoteToolContainer';
const MainPage = ({match}) => {
  
  return (
    <NoteTemplate>
      <div style={{display:'flex'}}>
        <DirectoryContainer/>
        <ContextContainer key={match.params.uuid} note={match.params.uuid}/>
        <NoteToolContainer note_uuid={match.params.uuid}/>
      </div>
    </NoteTemplate>
  );
};

export default MainPage;