'use client';

import { GuildVerificationForm } from '@/components/auth/GuildVerificationForm';
import { GuildVerificationModal } from '@/components/auth/GuildVerificationModal';
import { MembershipSummaryModal } from '@/components/auth/MembershipSummaryModal';
import { sendGuildVerificationRequestNew } from '@/firebase/verifications';
import { useAuthStore } from '@/stores/authStore';
import { useGuildsStore } from '@/stores/guildsStore';
import { useUserStore } from '@/stores/userStore';
import { useVerificationStore } from '@/stores/verificationStore';
import { GuildsType } from '@/types/collections';
import { Box, Card, Checkbox, Grid, Group, Image, Select, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconRosetteDiscountCheck } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { StartVerificationCard } from '../../../components/StartVerificationCard';
import VerificationCard from '../../../components/VerificationCard';
import classes from './VerificationPage.module.css';


export default function VerificationPage() {
  const { userVerificationGuilds, fetchUserVerificationGuilds } = useAuthStore();
  const { updateVerificationData, verificationData } = useVerificationStore();
  const { user } = useUserStore();
  const { guilds } = useGuildsStore();
  const verifiedOrPending = userVerificationGuilds.filter((v) => v.tag == 'approved' || v.tag == 'pending');
  const verifiable = guilds.filter((g) => g.isVerifiable && user?.guild.includes(g.longName) && !verifiedOrPending.map((v) => v.guilds[0]).includes(g.longName))
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModal, setActiveModal] = useState<
    | 'welcome'
    | 'awards'
    | 'guildConfirmation'
    | 'guildVerification'
    | 'verificationForm'
    | 'verificationSummary'
    | 'notVerifiable'
    | null
  >(null);
  const openModal = (key: typeof activeModal) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);
  const [selectedGuild, setSelectedGuild] = useState<GuildsType | null>(null);
  const [submittedMembershipData, setSubmittedMembershipData] = useState(false);

  const handleRestartVerification = (id: string) => {
    // eslint-disable-next-line no-console
    console.log(`clicked for ${id}`);
  };
  // Guild Verification Modal Handlers
  const handleVerificationModalNext = () => {
    updateVerificationData(null);
    openModal("verificationForm");
  };

  const handleVerificationFormNext = async (data: any) => {
    console.log('Verification data submitted:', data);
    await sendGuildVerificationRequestNew([selectedGuild?.longName ?? ''], verificationData, user!);
    await fetchUserVerificationGuilds();
    setSubmittedMembershipData(true);
    // eslint-disable-next-line no-console
    const verifiableGuilds = getVerifiableGuilds();
    const pendingOrApproved = useAuthStore.getState().userVerificationGuilds.filter((v) => v.tag == 'pending' || v.tag == 'approved').map((v) => v.guilds[0]);
    const verifiable = verifiableGuilds.map((v) => v.longName).filter((v) => !pendingOrApproved.includes(v));

    if (verifiable.length > 0) {
      updateVerificationData(null);
      setSelectedGuild(verifiableGuilds.find((v) => v.longName == verifiable[0]) ?? null)
      //set the right guild
      setSubmittedMembershipData(false);
      console.log("guildVerification")
      openModal('guildVerification');
    } else {
      console.log("verificationSummary")
      openModal('verificationSummary');
    }
  };

  const handleVerificationFormBack = () => {

  };

  // Summary Modal Handlers
  const handleSummaryGoToDashboard = () => {
    closeModal();
  };

  const handleModalClose = () => {
    closeModal();
  };

  function handleSelectedGuild(data: string) {
    setSelectedGuild(guilds.find((g) => g.longName == data) ?? null);
  }

  const getVerifiableGuilds = () => {
    if (!user?.guild) return [];
    return guilds.filter((g) => user?.guild.includes(g.longName) && g.isVerifiable);
  };

  const getNotVerifiableGuilds = () => {
    if (!user?.guild) return [];
    return guilds.filter((g) => user?.guild.includes(g.longName) && !g.isVerifiable);
  };

  return (
    <Stack gap="xl">
      {/* Header */}
      <Group justify="space-between" align="center">
        {/* Filter Select */}
        <Select
          placeholder="Select filter"
          data={[
            { value: 'all', label: 'All' },
            { value: 'verified', label: 'Verified' },
            { value: 'available', label: 'Available for verification' },
            { value: 'pending', label: 'Pending' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'not-available', label: 'Verification not available' },
          ]}
          value={selectedFilter}
          onChange={(value) => setSelectedFilter(value || 'all')}
          size="md"
          radius="md"
          rightSection={
            <Checkbox
              checked
              size="sm"
              onChange={() => { }}
              classNames={{
                input: classes.checkboxInput,
                icon: classes.checkboxIcon,
              }}
            />
          }
          renderOption={({ option, checked }) => (
            <Group gap="sm" style={{ padding: '8px 12px' }}>
              <Checkbox
                checked={checked}
                size="sm"
                onChange={() => { }}
                classNames={{
                  input: classes.checkboxInput,
                  icon: classes.checkboxIcon,
                }}
              />
              <Text size="sm" c={checked ? '#374151' : '#6B7280'} fw={checked ? 500 : 400}>
                {option.label}
              </Text>
            </Group>
          )}
          classNames={{
            wrapper: classes.filterSelect,
            input: classes.filterSelectInput,
            section: classes.filterSelectSection,
            dropdown: classes.filterSelectDropdown,
            options: classes.filterSelectOptions,
            option: classes.filterSelectOption,
          }}
        />
      </Group>

      {/* Verification Cards Grid */}
      <Box className={classes.verificationGrid}>
        {verifiedOrPending.map((item) => (
          <VerificationCard
            key={item.id}
            title={item.guilds[0]}
            status={item.tag}
            image={item.verificationImage ?? item.proofOfValidMembership}
            validThrough={dayjs((item.validThrough ?? item.expirationDate).seconds * 1000).format('DD/MM/YYYY')}
            memberId={item.memberId}
            onAction={() => handleRestartVerification(item.id)}
          />
        ))}
      </Box>

      {/* Key Benefits Section */}
      {verifiable.length > 0 && <StartVerificationCard onStartVerification={() => openModal('guildVerification')} />}


      {/* Verified Member Benefits Section */}
      <Box>
        <Text size="xl" fw={700} c="gray.9" mb="lg">
          Verified member benefits
        </Text>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding={0}
              radius="lg"
              style={{
                backgroundColor: 'white',
                border: 'none',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              {/* Image Section - Same height as EventCard images */}
              <Box style={{ position: 'relative', height: '200px' }}>
                <Image
                  src="https://img7.yna.co.kr/mpic/YH/2022/03/31/MYH20220331019600038_P4.jpg"
                  alt="MovieMaker Magazine"
                  radius="lg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'var(--mantine-radius-lg)',
                  }}
                />
              </Box>

              {/* Content Section */}
              <Stack
                gap="md"
                p="lg"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Text size="lg" fw={700} c="gray.9">
                  50% Discount on FYCit
                </Text>
                <Stack gap="xs">
                  <Group gap="sm" align="flex-start">
                    <ThemeIcon
                      color="gray.4"
                      size={16}
                      radius="xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                    </ThemeIcon>
                    <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                      Lorem Ipsum is simply dummy text of the print.
                    </Text>
                  </Group>
                  <Group gap="sm" align="flex-start">
                    <ThemeIcon
                      color="gray.4"
                      size={16}
                      radius="xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                    </ThemeIcon>
                    <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                      Lorem Ipsum is simply dummy text.
                    </Text>
                  </Group>
                  <Group gap="sm" align="flex-start">
                    <ThemeIcon
                      color="gray.4"
                      size={16}
                      radius="xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                    </ThemeIcon>
                    <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                      Lorem Ipsum is simply dummy text of the print.
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Guild Verification Modal */}
      <GuildVerificationModal
        opened={activeModal === 'guildVerification'}
        onClose={closeModal}
        onNext={handleVerificationModalNext}
        verifiableGuilds={getVerifiableGuilds()}
        notVerifiableGuilds={getNotVerifiableGuilds()}
        currentStep={1}
        selectedGuildForVerification={selectedGuild?.longName ?? ''}
        setSelectedGuildForVerification={handleSelectedGuild}
      />

      {/* Guild Verification Form */}
      {activeModal === 'verificationForm' && selectedGuild && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--mantine-radius-md)',
              padding: '2rem',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <GuildVerificationForm
              selectedGuild={selectedGuild}
              onNext={handleVerificationFormNext}
              onBack={handleVerificationFormBack}
            />
          </div>
        </div>
      )}

      {/* Membership Summary Modal */}
      {activeModal === 'verificationSummary' && submittedMembershipData && (
        <MembershipSummaryModal
          opened={activeModal === 'verificationSummary'}
          onClose={handleModalClose}
          onGoToDashboard={handleSummaryGoToDashboard}
          onContinue={() => { }}
          selectedGuild={selectedGuild}
        />
      )}
    </Stack>
  );
}
