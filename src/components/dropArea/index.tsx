import React, { useEffect, useState } from 'react';
import {
    Box,
    Image,
    Input,
    Button,
    useBreakpointValue,
    Tooltip,
    Text,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import GetViewSuporte from '@/actions/solicitacoes/service/getViewSuporte';
import UploadImage from '@/actions/solicitacoes/service/uploadImageService';

interface FileUploadProps {
    id: number;
}

export default function FileUpload({ id }: FileUploadProps) {
   

    
    return (
        <Box textAlign="center">
            <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                p={5}
                cursor="pointer"
                _hover={{ borderColor: 'gray.500' }}
            >
                <Input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleChange}
                    display="none"
                />
                <Text fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })}>
                    Arraste arquivos aqui ou clique para selecionar
                </Text>
            </Box>
            
            <Box display="flex" flexWrap="wrap" justifyContent="center" mt={4}>
                {imagePreviews.map((preview, index) => (
                    <Box key={index} position="relative" mr={2} mb={2}>
                        <Tooltip label="Excluir" placement="top" hasArrow>
                            <Button
                                size="xs"
                                colorScheme="red"
                                onClick={(event) => handleRemove(index, event)}
                                position="absolute"
                                top={1}
                                right={1}
                                zIndex={1}
                            >
                                x
                            </Button>
                        </Tooltip>
                        <Image
                            src={preview}
                            alt={`Preview ${index}`}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.2)' }}
                            onClick={() => handleDownload(preview)}
                        />
                    </Box>
                ))}
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="center" mt={4}>
                {storedImages.map((image, index) => (
                    <Box key={index} position="relative" mr={2} mb={2}>
                        <Tooltip label="Baixar" placement="top" hasArrow>
                            <Button
                                size="xs"
                                colorScheme="blue"
                                onClick={() => handleDownload(image.urlDownload)} 
                                position="absolute"
                                top={1}
                                right={1}
                                zIndex={1}
                            >
                                Download
                            </Button>
                        </Tooltip>
                        <Image
                            src={image.urlView}
                            alt={`Stored Preview ${index}`}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.2)' }}
                            onClick={() => handleDownload(image.urlDownload)} 
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
