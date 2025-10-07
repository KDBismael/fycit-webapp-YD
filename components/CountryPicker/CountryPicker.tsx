import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Menu, UnstyledButton, Text } from '@mantine/core';
import classes from './CountryPicker.module.css';

const data = [
  { label: '🇺🇸 +1', value: '+1', flag: '🇺🇸', country: 'United States' },
  { label: '🇨🇦 +1', value: '+1', flag: '🇨🇦', country: 'Canada' },
  { label: '🇫🇷 +33', value: '+33', flag: '🇫🇷', country: 'France' },
  { label: '🇬🇧 +44', value: '+44', flag: '🇬🇧', country: 'United Kingdom' },
  { label: '🇩🇪 +49', value: '+49', flag: '🇩🇪', country: 'Germany' },
  { label: '🇮🇹 +39', value: '+39', flag: '🇮🇹', country: 'Italy' },
  { label: '🇪🇸 +34', value: '+34', flag: '🇪🇸', country: 'Spain' },
  { label: '🇦🇺 +61', value: '+61', flag: '🇦🇺', country: 'Australia' },
  { label: '🇯🇵 +81', value: '+81', flag: '🇯🇵', country: 'Japan' },
  { label: '🇧🇷 +55', value: '+55', flag: '🇧🇷', country: 'Brazil' },
  { label: '🇮🇳 +91', value: '+91', flag: '🇮🇳', country: 'India' },
  { label: '🇨🇳 +86', value: '+86', flag: '🇨🇳', country: 'China' },
];

interface CountryPickerProps {
  value?: string;
  country?: string;
  onChange?: (value: string, country?: string) => void;
}

export function CountryPicker({ value = '+1', country, onChange }: CountryPickerProps) {
  const [opened, setOpened] = useState(false);
  const selected = data.find(item => item.value === value && (!country || item.country === country)) || data[0];

  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Text size="sm">{item.flag}</Text>}
      onClick={() => onChange?.(item.value, item.country)}
      key={item.flag + item.country}
    >
      <Text size="sm" fw={500}>{item.value}</Text>
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
      position="bottom"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Text size="sm">{selected.flag}</Text>
            <Text size="sm" c="gray.6">{selected.value}</Text>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
