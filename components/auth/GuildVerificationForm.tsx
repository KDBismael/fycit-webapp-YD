'use client';

import { Box, Button, Group, Image, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconCheck, IconUpload } from '@tabler/icons-react';
import React, { useState } from 'react';

interface Guild {
  id: string;
  name: string;
  fullName: string;
}

interface GuildVerificationFormProps {
  selectedGuild: Guild;
  currentStep: number;
  totalSteps: number;
  onNext: (data: VerificationData) => void;
  onBack: () => void;
}

interface VerificationData {
  memberId: string;
  validThrough: string | null;
  memberCardFile: File | null;
}

export const GuildVerificationForm: React.FC<GuildVerificationFormProps> = ({
  selectedGuild,
  currentStep,
  totalSteps,
  onNext,
  onBack,
}) => {
  const [memberId, setMemberId] = useState('');
  const [validThrough, setValidThrough] = useState<string | null>(null);
  const [memberCardFile, setMemberCardFile] = useState<File | null>(null);

  const handleSubmit = () => {
    const data: VerificationData = {
      memberId,
      validThrough,
      memberCardFile,
    };
    onNext(data);
  };

  const isFormValid = memberId.trim() && validThrough && memberCardFile;

  return (
    <Box style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Group gap="sm">
          <Image src="/logo.svg" alt="FYCit Logo" width={40} height={40} />
        </Group>
        <Button variant="subtle" color="gray">
          <Text size="lg" fw={500}>
            ×
          </Text>
        </Button>
      </Group>

      {/* Title */}
      <Stack gap="xs" align="center" mb="xl">
        <Title order={2} fw={700} c="gray.9">
          Let's verify your association
        </Title>
        <Text size="md" c="gray.7" ta="center">
          You can edit all the details below to update your profile
        </Text>
      </Stack>

      {/* Progress Indicator */}
      <Group gap="xs" justify="center" mb="xl">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <Box
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor:
                  index + 1 === currentStep
                    ? 'var(--mantine-color-brand-8)'
                    : index + 1 < currentStep
                      ? 'var(--mantine-color-brand-8)'
                      : 'var(--mantine-color-gray-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border:
                  index + 1 === currentStep ? '2px solid var(--mantine-color-brand-8)' : 'none',
              }}
            >
              <Text size="sm" c={index + 1 <= currentStep ? 'white' : 'gray.7'} fw={700}>
                {index + 1}
              </Text>
            </Box>
            {index < totalSteps - 1 && (
              <Box
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor:
                    index + 1 < currentStep
                      ? 'var(--mantine-color-brand-8)'
                      : 'var(--mantine-color-gray-3)',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Group>

      {/* Main Content - Two Columns */}
      <Group gap="xl" align="flex-start">
        {/* Left Column - Instructions */}
        <Stack gap="md" style={{ flex: 1 }}>
          <Title order={4} fw={600} c="gray.8">
            To Validate {selectedGuild.name}, we will take you through the following 5 steps.
          </Title>

          <Text size="sm" c="gray.7">
            1. Browse to{' '}
            <Text component="span" td="underline" c="brand.8">
              {selectedGuild.name}.com
            </Text>
          </Text>

          {/* Video/Image Placeholder */}
          <Box
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: 'var(--mantine-color-gray-1)',
              borderRadius: 'var(--mantine-radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              border: '1px solid var(--mantine-color-gray-3)',
            }}
          >
            <Group gap="sm">
              <Button
                variant="filled"
                color="brand"
                radius="xl"
                size="lg"
                style={{ width: '60px', height: '60px' }}
              >
                ▶
              </Button>
            </Group>
          </Box>

          <Button
            variant="outline"
            color="brand"
            size="md"
            radius="md"
            onClick={onBack}
            style={{ alignSelf: 'flex-end' }}
          >
            Next &gt;
          </Button>
        </Stack>

        {/* Right Column - Form */}
        <Stack gap="md" style={{ flex: 1 }}>
          {/* Guild Name */}
          <Paper p="md" radius="md" style={{ backgroundColor: 'var(--mantine-color-yellow-0)' }}>
            <Text fw={600} c="brand.8">
              {selectedGuild.fullName}
            </Text>
          </Paper>

          {/* Member ID */}
          <Stack gap="xs">
            <Text size="sm" fw={500} c="gray.8">
              Member ID
            </Text>
            <TextInput
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter member id"
              radius="md"
              size="md"
              styles={{
                input: {
                  borderColor: 'var(--mantine-color-gray-3)',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                  },
                },
              }}
            />
          </Stack>

          {/* Valid Through */}
          <Stack gap="xs">
            <Text size="sm" fw={500} c="gray.8">
              Valid Through
            </Text>
            <DatePicker value={validThrough} onChange={setValidThrough} size="md" allowDeselect />
          </Stack>

          {/* File Upload */}
          <Stack gap="xs">
            <Text size="sm" fw={500} c="gray.8">
              Please upload a screenshot of your Member Card with valid through date shown
            </Text>
            <Dropzone
              onDrop={(files: File[]) => setMemberCardFile(files[0] || null)}
              onReject={() => {}}
              maxSize={5 * 1024 * 1024} // 5MB
              accept={IMAGE_MIME_TYPE}
              maxFiles={1}
              radius="md"
              styles={{
                root: {
                  borderColor: 'var(--mantine-color-gray-3)',
                  backgroundColor: 'var(--mantine-color-gray-0)',
                  '&:hover': {
                    borderColor: 'var(--mantine-color-brand-8)',
                  },
                },
              }}
            >
              <Group justify="center" gap="xl" mih={120} style={{ pointerEvents: 'none' }}>
                <IconUpload size={32} color="var(--mantine-color-gray-6)" />
                <div>
                  <Text size="xl" inline>
                    Drag image here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach a screenshot of your member card
                  </Text>
                </div>
              </Group>
            </Dropzone>

            {memberCardFile && (
              <Group gap="xs" mt="xs">
                <IconCheck size={16} color="var(--mantine-color-success-6)" />
                <Text size="sm" c="success.6">
                  {memberCardFile.name} uploaded successfully
                </Text>
              </Group>
            )}
          </Stack>
        </Stack>
      </Group>

      {/* Action Button */}
      <Group justify="flex-end" mt="xl">
        <Button
          onClick={handleSubmit}
          size="lg"
          radius="md"
          bg="brand.8"
          disabled={!isFormValid}
          styles={{
            root: {
              '&:hover': {
                backgroundColor: 'var(--mantine-color-brand-7)',
              },
            },
          }}
        >
          Next
        </Button>
      </Group>
    </Box>
  );
};
