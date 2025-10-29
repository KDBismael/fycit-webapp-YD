import { Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";


type Props = {
    label: string;
    value: number;//milliseconds
    onChange: (data: Date | undefined) => void
    required: boolean;
}

export const VerificationDateInput = (props: Props) => {
    const { label, onChange, value, required } = props;

    return <>
        <Stack gap={5}>
            <Text size="sm" fw={500} c="dark">
                {label}
            </Text>
            <DatePickerInput
                required={required}
                value={dayjs(value).toDate()}
                minDate={new Date()}
                onChange={(value) => {
                    console.log(value);
                    onChange(value ? dayjs(value).toDate() : undefined)
                }
                }
                placeholder="Choose your validation date"
                radius="md"
                size="sm"
                clearable
                styles={{
                    input: {
                        borderColor: '#E0E0E0',
                        '&:focus': {
                            borderColor: '#A98D34',
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
    </>;
}