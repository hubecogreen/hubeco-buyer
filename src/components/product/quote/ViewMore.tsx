import React from 'react';
import { Box, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button } from '@chakra-ui/react';

interface ViewMoreProps {
  text: string;
  length?: number;
  className?: string;
  maxHeight?: string | number;  // Optional max height for scrollable content
}

const ViewMore: React.FC<ViewMoreProps> = ({ text, length = 25, className, maxHeight = "300px" }) => {
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
          <PopoverContent 
            maxHeight={maxHeight} 
            maxWidth="400px"
            overflow="hidden"
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          >
            <PopoverArrow />
            <PopoverBody 
              maxHeight={maxHeight}
              overflowY="auto"
              className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
            >
              {text}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Box>
  );
};

export default ViewMore;
