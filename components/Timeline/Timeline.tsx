import React from 'react';
import { Box, Group, Stack, Text } from '@mantine/core';

export interface TimelineStep {
  id: number;
  title?: string;
  description?: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
  currentStep: number;
  brandColor?: string;
  stepActiveColor?: string;
  inactiveColor?: string;
  borderColor?: string;
  lineColor?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({
  steps,
  currentStep,
  brandColor = '#A98D34',
  stepActiveColor = '#D4B75C',
  inactiveColor = '#E0E0E0',
  borderColor = '#B0B0B0',
  lineColor = '#B0B0B0',
  size = 'md',
  showLabels = false,
}) => {
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return { circleSize: 24, fontSize: 'xs', lineWidth: '25%' };
      case 'lg':
        return { circleSize: 40, fontSize: 'md', lineWidth: '35%' };
      default:
        return { circleSize: 32, fontSize: 'sm', lineWidth: '30%' };
    }
  };

  const { circleSize, fontSize, lineWidth } = getSizeConfig();

  return (
    <Group gap="xs" justify="center" w="100%">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {/* Cercle d'Étape */}
            <Box
              style={{
                width: circleSize,
                height: circleSize,
                borderRadius: '50%',
                backgroundColor: step.id <= currentStep ? stepActiveColor : inactiveColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${step.id <= currentStep ? brandColor : borderColor}`,
              }}
            >
              <Text size={fontSize} c={step.id <= currentStep ? 'white' : 'gray.6'} fw={700}>
                {step.id}
              </Text>
            </Box>

            {/* Labels optionnels */}
            {showLabels && (
              <Stack gap={2} align="center">
                {step.title && (
                  <Text size="xs" c="gray.6" ta="center" fw={500}>
                    {step.title}
                  </Text>
                )}
                {step.description && (
                  <Text size="xs" c="gray.5" ta="center">
                    {step.description}
                  </Text>
                )}
              </Stack>
            )}
          </Box>

          {/* Ligne de Séparation */}
          {index < steps.length - 1 && (
            <Box
              style={{
                width: lineWidth,
                height: 2,
                borderTop: `1px dashed ${lineColor}`,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Group>
  );
};
