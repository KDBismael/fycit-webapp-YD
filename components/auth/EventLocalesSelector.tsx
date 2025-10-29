'use client';

import { buildTree, getNodeState, toggleNode } from '@/helpers/localesHelper';
import { LocaleNode, LocalesType } from '@/types/collections';
import { Checkbox, Group, MultiSelect, Text } from '@mantine/core';
import React from 'react';

interface LocaleItem {
  value: string;
  label: string;
  level: number; // 0: grand group, 1: sub-group, 2: sub-sub-group
  group?: string; // parent group name for grouping
}

interface EventLocalesSelectorProps {
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  data: LocalesType[];
}

// Convert to MultiSelect data format
// const multiSelectData = localesData.map((locale) => ({
//   value: locale.value,
//   label: locale.label,
// }));

export const EventLocalesSelector: React.FC<EventLocalesSelectorProps> = ({
  value = [],
  onChange,
  error,
  placeholder = 'Select locales',
  data
}) => {
  const localesTree = buildTree(data);

  // Custom onChange handler with cascading selection logic
  const handleChange = (selectedValues: string[]) => {
    const selectedSet = new Set(value);
    const clickedValue = selectedValues.find(v => !value.includes(v)) ||
      value.find(v => !selectedValues.includes(v));

    if (clickedValue) {
      const node = findNode(localesTree, clickedValue);
      if (node) {
        const newSelected = toggleNode(node, selectedSet);
        onChange(Array.from(newSelected));
      }
    }
  };

  // Helper function to find a node in the tree
  const findNode = (nodes: LocaleNode[], name: string): LocaleNode | null => {
    for (const node of nodes) {
      if (node.name === name) return node;
      if (node.children.length > 0) {
        const found = findNode(node.children, name);
        if (found) return found;
      }
    }
    return null;
  };

  // Flatten tree for MultiSelect while maintaining hierarchy information
  const flattenTree = (nodes: LocaleNode[], level: number = 0): any[] => {
    return nodes.flatMap(node => [
      {
        value: node.name,
        label: node.name,
        level,
      },
      ...flattenTree(node.children, level + 1)
    ]);
  };

  const flatData = flattenTree(localesTree);

  return (
    <MultiSelect
      autoComplete='off'
      value={value}
      onChange={handleChange}
      data={flatData}
      placeholder={placeholder}
      error={error}
      radius="md"
      size="md"
      searchable
      clearable
      withCheckIcon={false}
      hidePickedOptions={false}
      nothingFoundMessage="No locale found"
      renderOption={({ option }) => {
        // Cast option to include 'level'
        const typedOption = option as typeof option & { level?: number };
        const node = findNode(localesTree, option.value);
        const state = node ? getNodeState(node, new Set(value)) : 'unchecked';
        const isChecked = state === 'checked';
        const isIndeterminate = state === 'indeterminate';

        return (
          <Group
            gap="sm"
            wrap="nowrap"
            style={{
              paddingLeft: `${(typedOption.level ?? 0) * 20}px`,
            }}
          >
            <Checkbox
              indeterminate={isIndeterminate}
              checked={isChecked}
              onChange={() => { }}
              tabIndex={-1}
              color="green"
            />
            <Text>{option.label}</Text>
          </Group>
        );
      }}
      styles={{
        input: {
          borderColor: 'var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: '#A98D34',
          },
        },
        dropdown: {
          backgroundColor: '#ECECB8',
        },
        option: {
          backgroundColor: 'transparent',
          '&[dataChecked]': {
            backgroundColor: 'rgba(169, 141, 52, 0.1)',
          },
          '&:hover': {
            backgroundColor: 'rgba(169, 141, 52, 0.15)',
          },
        },
        pill: {
          backgroundColor: '#A98D34',
          color: 'white',
          border: 'none',
          '&:hover': {
            backgroundColor: '#A98D34',
          },
        },
        pillsList: {
          flexWrap: 'wrap',
          maxWidth: '100%',
        },
      }}
    />
  );
};
