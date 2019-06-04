import React from 'react';
import PublicTemplate from 'components/common/PublicTemplate'
import Editor from 'components/main/Editor';
const PublicPage = ({match}) => {
  return (
    <PublicTemplate>
         <Editor key={match.params.uuid} note={match.params.uuid}/>
    </PublicTemplate>
  );
};

export default PublicPage;