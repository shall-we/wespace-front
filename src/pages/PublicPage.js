import React from 'react';
import PublicTemplate from 'components/common/PublicTemplate'
import PublicNoteContainer from '../containers/main/PublicNoteContainer';
const PublicPage = ({match}) => {
  return (
    <PublicTemplate>
        <PublicNoteContainer key={match.params.uuid} note={match.params.uuid}/>
    </PublicTemplate>
  );
};

export default PublicPage;