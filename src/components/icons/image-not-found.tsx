import { Icon } from '@chakra-ui/react';

const ImageNotFoundIcon = (props) => (
  <Icon
    width="300"
    height="300"
    fontFamily="Bitstream Vera Sans,Liberation Sans, Arial, sans-serif"
    fontSize="72"
    textAnchor="middle"
    viewBox="-300 -300 600 600"
    {...props}
  >
    <circle r="280" fill="#FFF" stroke="#AAA" strokeWidth="10"></circle>
    <text fill="#444">
      <tspan x="0" y="-8">
        NO IMAGE
      </tspan>
      <tspan x="0" y="80">
        AVAILABLE
      </tspan>
    </text>
  </Icon>
);

export default ImageNotFoundIcon;
