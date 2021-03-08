import {
  ExternalLinkIcon,
  QuestionOutlineIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Spacer,
  Tag,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import settings from '../settings';

type Props = {}

const Footer: React.FunctionComponent<Props> = (props) => {
  return (
    <footer
      className={'footer'}
      css={css`
        height: ${settings.layout.footer.height}px;

        .svg-inline--fa {
          margin-right: 5px;
        }
      `}
    >
      <Flex>
        <Box p="2">
          Demo:
          <Tooltip
            label="This demo showcases Reaflow with a single document that is stored in the browser local storage."
            fontSize="md"
          >
            <Tag>
              <b><TagLabel>With Local storage</TagLabel></b>
            </Tag>
          </Tooltip>
        </Box>
        <Spacer />
        <Box p="2">
          <FontAwesomeIcon
            icon={['fas', 'heart']}
          />
          Made with
          <ChakraLink
            href={'https://nextjs.org/'}
            isExternal
            color="teal.500"
          >
            {' '}Next.js{' '}
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
          {' '}and{' '}
          <ChakraLink
            href={'https://github.com/reaviz/reaflow'}
            isExternal
            color="teal.500"
          >
            {' '}Reaflow{' '}
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </Box>

        <Spacer />

        <Box p="2">
          <ChakraLink
            href={'https://github.com/Vadorequest/poc-nextjs-reaflow'}
            isExternal
            color="teal.500"
          >
            <FontAwesomeIcon
              icon={['fab', 'github']}
            />
            {' '}
            GitHub
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </Box>
      </Flex>
    </footer>
  );
};

export default Footer;
