import React from 'react';
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  MenuItem,
} from '@chakra-ui/react';
import { useChangeMePasswordMutation } from '../../services/userApi';
import { RiLockPasswordLine } from 'react-icons/ri';

const ChangeMePassword: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [credentials, setCredentials] = React.useState({
    oldPassword: '',
    newPassword: '',
  });
  const [confirmDisabled, setConfirmDisabled] = React.useState(true);

  const [changePassword, { isLoading }] = useChangeMePasswordMutation();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearCredentialsState = () => {
    setCredentials({
      oldPassword: '',
      newPassword: '',
    });
  };

  const handleCancel = () => {
    clearCredentialsState();
    onClose();
  };

  const handleConfirm = async () => {
    try {
      await changePassword({ ...credentials }).unwrap();
      clearCredentialsState();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (credentials.oldPassword && credentials.newPassword) {
      setConfirmDisabled(false);
    } else {
      setConfirmDisabled(true);
    }
  }, [credentials]);

  return (
    <>
      <MenuItem onClick={onOpen} icon={<RiLockPasswordLine fill="teal" size="16" />}>
        Change Password
      </MenuItem>

      <Modal
        size={{ base: 'xs', md: 'md' }}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <Input
              type="password"
              ref={initialRef}
              name="oldPassword"
              placeholder="Old Password"
              value={credentials.oldPassword}
              onChange={handleChangeInput}
            />
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              mt="4"
              value={credentials.newPassword}
              onChange={handleChangeInput}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={confirmDisabled}
              isLoading={isLoading}
              colorScheme="teal"
              mr="4"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button colorScheme="gray" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeMePassword;
