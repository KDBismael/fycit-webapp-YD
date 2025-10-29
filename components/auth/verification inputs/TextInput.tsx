import { Stack, Text, TextInput, } from "@mantine/core";


type Props = {
    label: string;
    value: string;
    type: 'text' | 'number';
    onChange: (data: string) => void
    required: boolean;
}

export const VerificationTextInput = (props: Props) => {
    const { label, onChange, type, value, required } = props;

    return <>
        <Stack gap={5}>
            <Text size="sm" fw={500} c="dark">
                {label}
            </Text>
            <TextInput
                required={required}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${label}`.toLowerCase()}
                radius="md"
                size="sm"
                styles={{
                    input: {
                        borderColor: '#E0E0E0',
                        '&:focus': {
                            borderColor: "#A98D34",
                        },
                    },
                }}
            />
        </Stack>
    </>;
}