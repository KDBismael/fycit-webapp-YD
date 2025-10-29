import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";

type NotVerifiableModalProps = {
    opened: boolean,
    onClose: () => void;
    onNext: () => void;
}
export default function NotVerifiableModal(props: NotVerifiableModalProps) {
    const { onClose, onNext, opened } = props;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            withCloseButton={false}
            closeOnEscape={false}
            closeOnClickOutside={false}
            centered
            radius="lg"
            size="lg"
            overlayProps={{
                opacity: 0.3,
                blur: 3,
            }}
            styles={{
                content: {
                    padding: "2rem",
                    borderRadius: 16,
                },
            }}
        >
            <Stack align="center" ta="center">
                <Group justify="center" w="100%">
                    <Group gap="sm" justify="center">
                        <Image src="/logo.svg" alt="FYCit Logo" width={32} height={32} />
                    </Group>
                </Group>

                <Title order={3}>We are actively adding new partners</Title>

                <Text c="dimmed" maw={420}>
                    At this time, the guilds you have selected are not yet part of our
                    verification program. We are actively working to include these guilds
                    in a future update.
                </Text>

                <Button
                    mt="lg"
                    color="vegasGold"
                    radius="md"
                    fullWidth={false}
                    onClick={onNext}
                    styles={{
                        root: {
                            backgroundColor: "#CBB852",
                            "&:hover": { backgroundColor: "#b3a23e" },
                            minWidth: 140,
                        },
                    }}
                >
                    Done
                </Button>
            </Stack>
        </Modal>
    );
}
