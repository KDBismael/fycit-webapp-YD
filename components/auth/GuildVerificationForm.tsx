'use client';

import { GuildsType } from '@/types/collections';
import {
  Box,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import React, { useState } from 'react';
import { VerificationTimeline } from '../../components/Timeline';
import { useVerificationStore } from '../../stores/verificationStore';
import { StepInstructionAlert } from './StepInstructionAlert';
import { VerificationDateInput } from './verification inputs/DateInput';
import { VerificationFIleInput } from './verification inputs/FileInput';
import { VerificationTextInput } from './verification inputs/TextInput';

// Définition des types comme dans votre code original

interface GuildVerificationFormProps {
  selectedGuild: GuildsType;
  onNext: (data: any) => Promise<void>;
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
  onBack,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verificationData, updateVerificationData, completeStep } = useVerificationStore();

  // Pour ce formulaire, nous sommes à l'étape 2 (Verification)
  const currentStep = 2;

  const handleSubmit = async () => {

    // La logique de soumission est conservée
    setIsSubmitting(true)
    await onNext(verificationData);
    completeStep(currentStep);
    setIsSubmitting(false)
  };

  const isFormValid = selectedGuild.fields!.filter((f) => f.required && f.enabled).every((f) => {
    const value = verificationData[f.id];
    return value != null && value != undefined && value != ''
  });

  // Définir les couleurs personnalisées pour Mantine (ajuster si vous utilisez un thème personnalisé)
  const brandColor = '#A98D34'; // Un jaune-doré proche du bouton "Next"
  const stepActiveColor = '#D4B75C'; // Un jaune plus clair pour les cercles de progression

  const handleFileDrop = (key: string, files: File[]) => {
    if (files[0]) {
      updateVerificationData({ [key]: files[0] });
    }
  };

  const removeFile = (fieldKey: string) => {
    updateVerificationData({ [fieldKey]: null });
  };

  return (
    <Box p="lg" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <Group justify="space-between" mb="md">
        <BrandLogo />
        {/* <Button variant="subtle" color="gray" style={{ width: 20, height: 20, padding: 0 }}>
          <Text size="md" fw={300} c="dark">
            ×
          </Text>
        </Button> */}
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
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <Group gap="lg" style={{ display: "grid", gridTemplateColumns: '0.45fr 0.55fr', alignItems: 'start' }}  >
          {/* Verification Instruction steps */}
          <Stack>
            <StepInstructionAlert steps={selectedGuild?.instructionsSteps ?? []} />
          </Stack>

          {/* Right Column - Form */}
          <Stack gap="md">
            {/* Guild Name Banner */}
            <Paper
              p="sm"
              radius="md"
              style={{ backgroundColor: '#FDFBEF', border: '1px solid #EDE6D2' }}
            >
              <Text fw={600} c="dark" size="sm">
                {selectedGuild.longName}
              </Text>
            </Paper>

            {
              selectedGuild.fields?.map((field) => {
                return <div key={field.id}>
                  {field.type == 'text' && field.enabled ? <VerificationTextInput required={field.required} type={field.type} label={field.label} onChange={(e) => updateVerificationData({ [field.id]: e })} value={verificationData[field.id] as string ?? ''} /> : null}
                  {field.type == 'number' && field.enabled ? <VerificationTextInput required={field.required} type={field.type} label={field.label} onChange={(e) => updateVerificationData({ [field.id]: e })} value='' /> : null}
                  {field.type == 'date' && field.enabled ? <VerificationDateInput required={field.required} label={field.label} onChange={(e) => updateVerificationData({ [field.id]: e })} value={(verificationData[field.id] as Date)?.valueOf()} /> : null}
                  {field.type == 'image' && field.enabled ? <VerificationFIleInput required={field.required} label={field.label} value={verificationData[field.id] as File ?? null} onRemoveFile={() => removeFile(field.id)} handleFileDrop={(files) => handleFileDrop(field.id, files)} /> : null}
                </div>
              })
            }
          </Stack>
        </Group>

        {/* Action Button - Placé en bas à droite comme dans l'image */}
        <Group justify="flex-end" mt="md">
          <Button
            loading={isSubmitting}
            type='submit'
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
      </form>
    </Box>
  );
};


// {/* Member ID */ }
// <Stack gap={5}>
//   <Text size="sm" fw={500} c="dark">
//     Member ID
//   </Text>
//   <TextInput
//     value={verificationData.memberId || ''}
//     onChange={(e) => updateVerificationData({ memberId: e.target.value })}
//     placeholder="Enter member id"
//     radius="md"
//     size="sm"
//     styles={{
//       input: {
//         borderColor: '#E0E0E0',
//         '&:focus': {
//           borderColor: brandColor,
//         },
//       },
//     }}
//   />
// </Stack>

// {/* Valid Through */ }
// <Stack gap={5}>
//   <Text size="sm" fw={500} c="dark">
//     Valid Through
//   </Text>
//   {/* Utilisation de DatePickerInput pour un look plus proche du design Mantine par défaut */}
//   <DatePickerInput
//     value={verificationData.validThrough}
//     minDate={new Date()}
//     onChange={(value) =>
//       updateVerificationData({ validThrough: value ? new Date(value) : null })
//     }
//     placeholder="Choose your validation date"
//     radius="md"
//     size="sm"
//     clearable
//     styles={{
//       input: {
//         borderColor: '#E0E0E0',
//         '&:focus': {
//           borderColor: brandColor,
//         },
//       },
//     }}
//     rightSection={<IconCalendar size={16} />}
//     valueFormat="DD MMMM YYYY"
//     popoverProps={{
//       withinPortal: true,
//       zIndex: 10000,
//     }}
//   />
// </Stack>

// {/* File Upload with Preview */ }
// <Stack gap={5}>
//   <Text size="xs" fw={500} c="dark">
//     Please upload a screenshot of your Member Card with valid through date shown
//   </Text>

//   {verificationData.memberCardFile ? (
//     <Box
//       style={{
//         border: '2px dashed #E0E0E0',
//         backgroundColor: '#F7F7F7',
//         borderRadius: 'var(--mantine-radius-md)',
//         width: '100%',
//         height: '180px',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {renderFilePreview()}
//       <ActionIcon
//         color="red"
//         variant="filled"
//         radius="xl"
//         size="sm"
//         style={{
//           position: 'absolute',
//           top: 8,
//           right: 8,
//           zIndex: 10,
//         }}
//         onClick={removeFile}
//       >
//         <IconX size={14} />
//       </ActionIcon>
//     </Box>
//   ) : (
//     <Dropzone
//       onDrop={handleFileDrop}
//       onReject={() => { }}
//       accept={['image/png', 'image/jpeg', 'image/webp']}
//       maxFiles={1}
//       maxSize={5 * 1024 * 1024}
//       multiple={false}
//       styles={{
//         root: {
//           border: '2px dashed #E0E0E0',
//           backgroundColor: '#F7F7F7',
//           borderRadius: 'var(--mantine-radius-md)',
//           minHeight: 180,
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: 0,
//           transition: 'border-color 0.2s',
//           '&:hover': {
//             borderColor: brandColor,
//           },
//         },
//       }}
//     >
//       <Group justify="center" gap="lg" style={{ padding: '0.75rem' }}>
//         <Dropzone.Accept>
//           <IconUpload size={32} color="var(--mantine-color-green-6)" stroke={1.5} />
//         </Dropzone.Accept>
//         <Dropzone.Reject>
//           <IconX size={32} color="var(--mantine-color-red-6)" stroke={1.5} />
//         </Dropzone.Reject>
//         <Dropzone.Idle>
//           <IconUpload size={32} style={{ opacity: 0.5 }} stroke={1.5} />
//         </Dropzone.Idle>

//         <div>
//           <Text size="xs" c="gray.6" ta="center">
//             Click to upload or drag and drop
//           </Text>
//           <Text size="xs" c="gray.5" ta="center" mt="xs">
//             PNG, JPG or WEBP (max 5MB)
//           </Text>
//         </div>
//       </Group>
//     </Dropzone>
//   )}
// </Stack>