import React, { useState } from 'react';
import { Modal } from 'antd';
import CreateForm from './CreateForm';

const CreateModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <button className="zhigh fixed bottom-5 right-10 bg-orange-500 hover:bg-orange-800  font-bold p-4 rounded-md" onClick={showModal}>
        Create
      </button>
      <Modal
        title="Title"
        open={open}
        footer={[<></>]}
        onCancel={handleCancel}
      >
        <CreateForm />
      </Modal>
    </>
  );
};

export default CreateModal;