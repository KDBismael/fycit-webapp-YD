'use client';

import React, { useState } from 'react';
import { IconMail, IconPhoto, IconUpload, IconX, IconTrash, IconKey, IconEdit } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Select,
  Stack,
  Text,
  TextInput,
  Modal,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';

export default function MyInfoTab() {
  const [files, setFiles] = useState<File[]>([]);
  const [changeEmailOpened, { open: openChangeEmail, close: closeChangeEmail }] = useDisclosure(false);
  const [resetPasswordOpened, { open: openResetPassword, close: closeResetPassword }] = useDisclosure(false);
  const [deleteAccountOpened, { open: openDeleteAccount, close: closeDeleteAccount }] = useDisclosure(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

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

  const handleChangeEmail = () => {
    // eslint-disable-next-line no-console
    console.log('Change email requested');
    closeChangeEmail();
  };

  const handleResetPassword = () => {
    // eslint-disable-next-line no-console
    console.log('Reset password requested');
    closeResetPassword();
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() === 'delete') {
      // eslint-disable-next-line no-console
      console.log('Account deletion confirmed');
      closeDeleteAccount();
      setDeleteConfirmation('');
    }
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
                },
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

            <Box>
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
              <Button
                variant="subtle"
                size="xs"
                leftSection={<IconEdit size={12} />}
                onClick={openChangeEmail}
                style={{
                  color: '#6B7280',
                  marginTop: '4px',
                  padding: '2px 8px',
                }}
              >
                Change email
              </Button>
            </Box>

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
                    root: {
                      width: '100%',
                    },
                    input: {
                      border: 'none',
                      borderRadius: 0,
                      backgroundColor: '#F5F5F5',
                      '&:focus': {
                        backgroundColor: '#F5F5F5',
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

            <Button
              variant="subtle"
              size="sm"
              leftSection={<IconKey size={14} />}
              onClick={openResetPassword}
              style={{
                color: '#6B7280',
                alignSelf: 'flex-start',
                padding: '8px 12px',
              }}
            >
              Reset password
            </Button>

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

            <Stack gap="md">
              <Button
                fullWidth
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
              
              <Button
                fullWidth
                variant="subtle"
                color="red"
                size="md"
                leftSection={<IconTrash size={14} />}
                onClick={openDeleteAccount}
                style={{
                  color: '#DC2626',
                }}
              >
                Delete account
              </Button>
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Change Email Modal */}
      <Modal opened={changeEmailOpened} onClose={closeChangeEmail} title="Change Email Address" centered>
        <Stack gap="md">
          <Text size="sm" c="gray.6">
            Enter your new email address. You will receive a verification email to confirm the change.
          </Text>
          <TextInput
            label="New email address"
            placeholder="Enter new email"
            type="email"
            size="md"
          />
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={closeChangeEmail}>
              Cancel
            </Button>
            <Button onClick={handleChangeEmail}>
              Send verification
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Reset Password Modal */}
      <Modal opened={resetPasswordOpened} onClose={closeResetPassword} title="Reset Password" centered>
        <Stack gap="md">
          <Text size="sm" c="gray.6">
            You will receive an email with instructions to reset your password.
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={closeResetPassword}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>
              Send reset email
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Account Modal */}
      <Modal opened={deleteAccountOpened} onClose={closeDeleteAccount} title="Delete Account" centered>
        <Stack gap="md">
          <Text size="sm" c="red.6" fw={500}>
            This action cannot be undone. This will permanently delete your account and remove all your data.
          </Text>
          <Text size="sm" c="gray.6">
            To confirm, type "DELETE" in the box below:
          </Text>
          <TextInput
            placeholder="Type DELETE to confirm"
            value={deleteConfirmation}
            onChange={(event) => setDeleteConfirmation(event.currentTarget.value)}
            size="md"
          />
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={closeDeleteAccount}>
              Cancel
            </Button>
            <Button 
              color="red" 
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation.toLowerCase() !== 'delete'}
            >
              Delete account
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
