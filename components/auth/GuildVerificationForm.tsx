'use client';

import React from 'react';
import { IconCalendar, IconChevronRight, IconUpload, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import { VerificationTimeline } from '../../components/Timeline';
import { useVerificationStore } from '../../stores/verificationStore';

// Définition des types comme dans votre code original
interface Guild {
  id: string;
  name: string;
  fullName: string;
}

interface GuildVerificationFormProps {
  selectedGuild: Guild;
  onNext: (data: any) => void;
  onBack: () => void;
}

const IMAGE_SIZE = 32;

// Composant pour l'icône de la Marque (FYCit) - Assurez-vous d'avoir l'image à /FYCit.png ou utilisez un placeholder
const BrandLogo = () => (
  <Group gap="sm">
    <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
  </Group>
);

export const GuildVerificationForm: React.FC<GuildVerificationFormProps> = ({
  selectedGuild,
  onNext,
}) => {
  const { verificationData, updateVerificationData, completeStep } = useVerificationStore();

  // Pour ce formulaire, nous sommes à l'étape 2 (Verification)
  const currentStep = 2;

  const handleSubmit = () => {
    // La logique de soumission est conservée
    completeStep(currentStep);
    onNext(verificationData);
  };

  const isFormValid =
    verificationData.memberId?.trim() &&
    verificationData.validThrough &&
    verificationData.memberCardFile;

  // Définir les couleurs personnalisées pour Mantine (ajuster si vous utilisez un thème personnalisé)
  const brandColor = '#A98D34'; // Un jaune-doré proche du bouton "Next"
  const stepActiveColor = '#D4B75C'; // Un jaune plus clair pour les cercles de progression

  const handleFileDrop = (files: File[]) => {
    if (files[0]) {
      updateVerificationData({ memberCardFile: files[0] });
    }
  };

  const removeFile = () => {
    updateVerificationData({ memberCardFile: null });
  };

  const renderFilePreview = () => {
    if (!verificationData.memberCardFile) {
      return null;
    }

    const imageUrl = URL.createObjectURL(verificationData.memberCardFile);
    return (
      <Image
        src={imageUrl}
        alt="Member Card Preview"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 'var(--mantine-radius-md)',
        }}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  };

  return (
    <Box p="lg" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <Group justify="space-between" mb="md">
        <BrandLogo />
        <Button variant="subtle" color="gray" style={{ width: 20, height: 20, padding: 0 }}>
          <Text size="md" fw={300} c="dark">
            ×
          </Text>
        </Button>
      </Group>

      {/* Title */}
      <Stack gap="xs" align="center" mb="md">
        <Title order={3} fw={600} c="dark" size="h3">
          Let's verify your association
        </Title>
        <Text size="sm" c="gray.7" ta="center">
          You can edit all the details below to update your profile
        </Text>
      </Stack>

      {/* Progress Timeline */}
      <Box mb="md">
        <VerificationTimeline
          currentStep={currentStep}
          brandColor={brandColor}
          stepActiveColor={stepActiveColor}
          size="sm"
        />
      </Box>

      {/* Main Content - Two Columns */}
      <Group gap="lg" align="flex-start" wrap="nowrap">
        {/* Left Column - Instructions with Image/Video Placeholder */}
        <Paper
          p="lg"
          radius="md"
          style={{
            flex: 1,
            backgroundColor: '#FDFBEF', // Fond très clair, proche du design
            border: '1px solid #EDE6D2',
          }}
        >
          <Stack gap="md">
            <Title order={5} fw={600} c="dark" size="h5">
              To Validate **{selectedGuild.name}**, we will take you through the following 5 steps.
            </Title>

            {/* Instructions */}
            <Stack gap="xs">
              <Text size="sm" c="dark" fw={500}>
                1. Browse to{' '}
                <Text component="span" fw={600} style={{ color: brandColor }}>
                  {selectedGuild.name}.com
                </Text>
              </Text>
              {/* Ajoutez les étapes 2 à 5 ici si nécessaire, mais l'image n'en montre qu'une */}
            </Stack>

            {/* Video/Image Placeholder - Utilise le chemin de l'image du prompt si possible, sinon un placeholder stylisé */}
            <Box
              style={{
                width: '100%',
                borderRadius: 'var(--mantine-radius-md)',
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '4 / 3', // Ajuster l'aspect ratio pour correspondre à l'image
              }}
            >
              {/* Placeholder stylisé pour correspondre à l'image fournie */}
              <Image
                src="/images/ProfileCard.png" // Utilise le nom de l'image uploadée pour le placeholder visuel
                alt="Validation steps"
                style={{
                  filter: 'grayscale(10%) brightness(1.1) contrast(1.1)', // Légers ajustements pour un look similaire
                  objectFit: 'cover',
                }}
              />
              <Button
                variant="filled"
                color="dark"
                radius="xl"
                style={{
                  width: '40px',
                  height: '40px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                  opacity: 0.8,
                }}
              >
                ▶
              </Button>
            </Box>
          </Stack>

          {/* Boutons de navigation internes (ajusté pour ne laisser que Next) */}
          <Group justify="flex-end" mt="md">
            <Button
              variant="subtle"
              color="dark"
              size="sm"
              onClick={onNext}
              style={{ color: brandColor }}
              rightSection={<IconChevronRight size={16} />}
            >
              Next
            </Button>
          </Group>
        </Paper>

        {/* Right Column - Form */}
        <Stack gap="md" style={{ flex: 1.2 }}>
          {/* Guild Name Banner */}
          <Paper
            p="sm"
            radius="md"
            style={{ backgroundColor: '#FDFBEF', border: '1px solid #EDE6D2' }}
          >
            <Text fw={600} c="dark" size="sm">
              {selectedGuild.fullName}
            </Text>
          </Paper>

          {/* Member ID */}
          <Stack gap={5}>
            <Text size="sm" fw={500} c="dark">
              Member ID
            </Text>
            <TextInput
              value={verificationData.memberId || ''}
              onChange={(e) => updateVerificationData({ memberId: e.target.value })}
              placeholder="Enter member id"
              radius="md"
              size="sm"
              styles={{
                input: {
                  borderColor: '#E0E0E0',
                  '&:focus': {
                    borderColor: brandColor,
                  },
                },
              }}
            />
          </Stack>

          {/* Valid Through */}
          <Stack gap={5}>
            <Text size="sm" fw={500} c="dark">
              Valid Through
            </Text>
            {/* Utilisation de DatePickerInput pour un look plus proche du design Mantine par défaut */}
            <DatePickerInput
              value={verificationData.validThrough}
              onChange={(value) =>
                updateVerificationData({ validThrough: value ? new Date(value) : null })
              }
              placeholder="Choose your validation date"
              radius="md"
              size="sm"
              clearable
              styles={{
                input: {
                  borderColor: '#E0E0E0',
                  '&:focus': {
                    borderColor: brandColor,
                  },
                },
              }}
              rightSection={<IconCalendar size={16} />}
              valueFormat="DD MMMM YYYY"
              popoverProps={{
                withinPortal: true,
                zIndex: 10000,
              }}
            />
          </Stack>

          {/* File Upload with Preview */}
          <Stack gap={5}>
            <Text size="xs" fw={500} c="dark">
              Please upload a screenshot of your Member Card with valid through date shown
            </Text>

            {verificationData.memberCardFile ? (
              <Box
                style={{
                  border: '2px dashed #E0E0E0',
                  backgroundColor: '#F7F7F7',
                  borderRadius: 'var(--mantine-radius-md)',
                  width: '100%',
                  height: '180px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {renderFilePreview()}
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
                  onClick={removeFile}
                >
                  <IconX size={14} />
                </ActionIcon>
              </Box>
            ) : (
              <Dropzone
                onDrop={handleFileDrop}
                onReject={() => {}}
                accept={['image/png', 'image/jpeg', 'image/webp']}
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
                multiple={false}
                styles={{
                  root: {
                    border: '2px dashed #E0E0E0',
                    backgroundColor: '#F7F7F7',
                    borderRadius: 'var(--mantine-radius-md)',
                    minHeight: 180,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    transition: 'border-color 0.2s',
                    '&:hover': {
                      borderColor: brandColor,
                    },
                  },
                }}
              >
                <Group justify="center" gap="lg" style={{ padding: '0.75rem' }}>
                  <Dropzone.Accept>
                    <IconUpload size={32} color="var(--mantine-color-green-6)" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={32} color="var(--mantine-color-red-6)" stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size={32} style={{ opacity: 0.5 }} stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xs" c="gray.6" ta="center">
                      Click to upload or drag and drop
                    </Text>
                    <Text size="xs" c="gray.5" ta="center" mt="xs">
                      PNG, JPG or WEBP (max 5MB)
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            )}
          </Stack>
        </Stack>
      </Group>

      {/* Action Button - Placé en bas à droite comme dans l'image */}
      <Group justify="flex-end" mt="md">
        <Button
          onClick={handleSubmit}
          size="md"
          radius="md"
          disabled={!isFormValid}
          style={{
            backgroundColor: '#BAAD3E',
            '&:hover': {
              backgroundColor: '#A98A13',
            },
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
          }}
        >
          Next
        </Button>
      </Group>
    </Box>
  );
};
