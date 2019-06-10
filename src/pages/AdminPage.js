import React from "react";
import AdminTemplate from "components/common/AdminTemplate";
import AdminContainer from 'containers/admin/AdminContainer';

const AdminPage = () => {
  return (
    <AdminTemplate>
      <AdminContainer />
    </AdminTemplate>
  );
};

export default AdminPage;
