'use client';

import React, { useState } from 'react';
import { ActionIcon, Box, Button, Grid, Group, Image, Select, Stack, Text, TextInput } from '@mantine/core';
import { IconUpload, IconMail, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CountryPicker } from '../CountryPicker/CountryPicker';

export default function MyInfoTab() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (newFiles: File[]) => {
    // eslint-disable-next-line no-console
    console.log('Files dropped:', newFiles);
    setFiles(newFiles);
  };

  const removeFile = (index: number) => {
    // eslint-disable-next-line no-console
    console.log('Removing file at index:', index);
    // eslint-disable-next-line no-console
    console.log('Current files:', files);
    const newFiles = files.filter((_, i) => i !== index);
    // eslint-disable-next-line no-console
    console.log('New files after filter:', newFiles);
    setFiles(newFiles);
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        alt={`Preview ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 'var(--mantine-radius-md)',
        }}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const handleReject = (fileRejections: any[]) => {
    // eslint-disable-next-line no-console
    console.log('Files rejected:', fileRejections);
  };

  return (
    <Stack gap="xl">
      {/* Profile Picture Section */}
      <Stack gap="md">
        <Text size="lg" fw={600} c="gray.9">
          Profile picture
        </Text>
        
        <Box style={{ display: 'flex', justifyContent: 'flex-start', position: 'relative' }}>
          {files.length > 0 ? (
            <Box
              style={{
                border: '2px dashed #D1D5DB',
                backgroundColor: '#F9FAFB',
                borderRadius: 'var(--mantine-radius-md)',
                width: '300px',
                height: '220px',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {previews}
              <ActionIcon
                color="red"
                variant="filled"
                radius="xl"
                size="sm"
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 10,
                }}
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('ActionIcon clicked');
                  removeFile(0);
                }}
              >
                <IconX size={14} />
              </ActionIcon>
            </Box>
          ) : (
            <Dropzone
              onDrop={handleDrop}
              onReject={handleReject}
              accept={IMAGE_MIME_TYPE}
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
              multiple={false}
              styles={{
                root: {
                  border: '2px dashed #D1D5DB',
                  backgroundColor: '#F9FAFB',
                  borderRadius: 'var(--mantine-radius-md)',
                  width: '300px',
                  height: '220px',
                  maxWidth: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }
              }}
            >
              <Group justify="center" gap="xl" style={{ padding: '1rem' }}>
                <Dropzone.Accept>
                  <IconUpload size={40} color="var(--mantine-color-green-6)" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={40} color="var(--mantine-color-red-6)" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size={40} color="var(--mantine-color-gray-6)" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="sm" c="gray.6" ta="center">
                    Click to upload or drag and drop
                  </Text>
                </div>
              </Group>
            </Dropzone>
          )}
        </Box>
      </Stack>

      {/* Form Fields */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="md">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F5F5F5',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                    backgroundColor: 'white',
                  },
                },
              }}
            />
            
            <TextInput
              label="Email address"
              placeholder="Enter your email"
              leftSection={<IconMail size={16} color="#6B7280" />}
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F5F5F5',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                    backgroundColor: 'white',
                  },
                },
              }}
            />
            
            <Box>
              <Text size="sm" fw={500} c="gray.9" mb="xs">
                My Country
              </Text>
              <Box
                style={{
                  display: 'flex',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#F5F5F5',
                }}
              >
                <Select
                  placeholder="Select country"
                  data={[
                    { value: 'usa', label: '🇺🇸 USA' },
                    { value: 'canada', label: '🇨🇦 Canada' },
                    { value: 'france', label: '🇫🇷 France' },
                    { value: 'uk', label: '🇬🇧 United Kingdom' },
                    { value: 'germany', label: '🇩🇪 Germany' },
                  ]}
                  defaultValue="usa"
                  size="md"
                  styles={{
                    input: {
                      border: 'none',
                      borderRadius: 0,
                      backgroundColor: '#F5F5F5',
                      '&:focus': {
                        backgroundColor: 'white',
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="md">
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F5F5F5',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                    backgroundColor: 'white',
                  },
                },
              }}
            />
            
            <Box>
              <Text size="sm" fw={500} c="gray.9" mb="xs">
                Phone no (optional)
              </Text>
              <Box
                style={{
                  display: 'flex',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#F5F5F5',
                }}
              >
                <CountryPicker
                  value="+1"
                  onChange={() => {}}
                />
                <Box style={{ width: '1px', backgroundColor: '#E5E7EB' }} />
                <TextInput
                  placeholder="Phone no"
                  radius="md"
                  size="md"
                  styles={{
                    input: {
                      border: 'none',
                      borderRadius: 0,
                      backgroundColor: '#F5F5F5',
                      '&:focus': {
                        backgroundColor: 'white',
                      },
                    },
                  }}
                />
              </Box>
            </Box>
            
            <TextInput
              label="Zip/Postal Code (Optional)"
              placeholder="Enter postal code"
              defaultValue="95624"
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F5F5F5',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                    backgroundColor: 'white',
                  },
                },
              }}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Save Button */}
      <Group justify="flex-end">
        <Button
          size="md"
          radius="md"
          style={{
            backgroundColor: '#BAAD3E',
            '&:hover': {
              backgroundColor: '#A98A13',
            },
          }}
        >
          Save
        </Button>
      </Group>
    </Stack>
  );
}
