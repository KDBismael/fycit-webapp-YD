import { ActionIcon, Box, Group, Image, Stack, Text, } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";


type Props = {
    label: string;
    value: File | null;
    onRemoveFile: () => void;
    handleFileDrop: (files: File[]) => void;
    required: boolean;
}

export const VerificationFIleInput = (props: Props) => {
    const { label, value, onRemoveFile, handleFileDrop, required } = props;


    const renderFilePreview = () => {
        if (!value) {
            return null;
        }

        const imageUrl = URL.createObjectURL(value);
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

    return <>
        <Stack gap={5}>
            <Text size="xs" fw={500} c="dark">
                {label}
            </Text>

            {value ? (
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
                        onClick={onRemoveFile}
                    >
                        <IconX size={14} />
                    </ActionIcon>
                </Box>
            ) : (
                <Dropzone
                    aria-required={required}
                    onDrop={handleFileDrop}
                    onReject={() => { }}
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
                                borderColor: '#A98D34',
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
    </>;
}