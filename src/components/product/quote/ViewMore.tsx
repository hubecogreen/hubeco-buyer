import React from 'react';
import { Box, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button } from '@chakra-ui/react';

interface ViewMoreProps {
  text: string;
  length?: number;
  className?: string;
  maxHeight?: string | number;  // Optional max height for scrollable content
}

const ViewMore: React.FC<ViewMoreProps> = ({ text, length = 25, className, maxHeight = "1000px" }) => {
  const isTextLong = text?.length > length;
  const displayedText = isTextLong ? `${text.slice(0, length)}...` : text;

  return (
    <Box className={className}>
      <Text display="inline">{displayedText}</Text>
      {isTextLong && (
        <Popover trigger="hover" placement="top-start">
          <PopoverTrigger>
            <Button variant="link" className='!text-primary font-normal' colorScheme="blue" size="sm" marginLeft="1">
              Read More
            </Button>
          </PopoverTrigger>
          <PopoverContent maxHeight={maxHeight}>
            <PopoverArrow />
            <PopoverBody>{text}</PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Box>
  );
};

export default ViewMore;
