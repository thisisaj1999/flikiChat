import React from 'react';
import { Modal } from 'antd';
import styles from './Modal.module.scss'

import { useGlobalStore } from '../../utils/store';

const index = () => {

  const State = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.checkModal),
		},
	};

  const Update = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.setCheckModal),
		},
	};

  const handleOk = () => {
    Update.GlobalStore.checkModal({
      isOpen: false,
      name: ""
    });
  };
  
  const handleCancel = () => {
    Update.GlobalStore.checkModal({
      isOpen: false,
      name: ""
    });
  };

  return (
    <Modal title={State.GlobalStore.checkModal.name} open={State.GlobalStore.checkModal.isOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
export default index;