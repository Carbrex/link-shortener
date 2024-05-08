import React from "react";
import EditUrl from "./EditUrl";
import { EditUrlProps } from "../types";
import ShowUrl from "./ShowUrl";

function ShowAndEdit({
  _id,
  editUrl,
  setEditUrl,
  loadDashboard,
  urlData,
}: EditUrlProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  if (isEditing) {
    return (
      <>
        <EditUrl
          _id={_id}
          editUrl={editUrl}
          setEditUrl={setEditUrl}
          loadDashboard={loadDashboard}
          urlData={urlData}
          setIsEditing={setIsEditing}
        />
      </>
    );
  }
  return (
    <ShowUrl
      _id={_id}
      editUrl={editUrl}
      setEditUrl={setEditUrl}
      loadDashboard={loadDashboard}
      urlData={urlData}
      setIsEditing={setIsEditing}
    />
  );
}

export default ShowAndEdit;
