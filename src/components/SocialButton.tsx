import { Badge, Button, ButtonProps, Icon } from '@chakra-ui/react';

import { IconType } from 'react-icons';

interface SocialButtonProps extends ButtonProps {
  icon: IconType;
}

const SocialButton = ({ icon, ...rest }: SocialButtonProps) => (
  <Button
    variant="outline"
    bg="themeGray.100"
    borderColor="border"
    _hover={{ borderColor: 'primary', color: 'primary' }}
    {...rest}
  >
    <Icon as={icon} />
  </Button>
);

export default SocialButton;
