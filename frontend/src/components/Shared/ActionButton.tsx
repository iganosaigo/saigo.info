import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

const ActionButton = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    colorScheme="teal"
    variant="outline"
    size="sm"
    rounded="md"
    ref={ref}
    {...props}
  />
));

export default ActionButton;
