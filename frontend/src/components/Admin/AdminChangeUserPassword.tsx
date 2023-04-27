import React from 'react';
import {
  Input,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useChangeUserPasswordMutation } from '../../services/userApi';
import { FaKey } from 'react-icons/fa';

const AdminChangeUserPassword: React.FC<{ userId: number }> = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [credentials, setCredentials] = React.useState({
    newPassword: '',
  });
  const [confirmDisabled, setConfirmDisabled] = React.useState(true);

  const [changePassword, { isLoading }] = useChangeUserPasswordMutation();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearCredentialsState = () => {
    setCredentials({
      newPassword: '',
    });
  };

  const handleCancel = () => {
    clearCredentialsState();
    onClose();
  };

  const handleConfirm = async () => {
    try {
      await changePassword({ userId, ...credentials }).unwrap();
      clearCredentialsState();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (credentials.newPassword) {
      setConfirmDisabled(false);
    } else {
      setConfirmDisabled(true);
    }
  }, [credentials]);

  return (
    <>
      <IconButton
        rounded="xl"
        colorScheme="yellow"
        size="sm"
        icon={<FaKey />}
        aria-label="Change Password"
        variant="outline"
        onClick={onOpen}
      />

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
              name="newPassword"
              placeholder="New Password"
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

export default AdminChangeUserPassword;
