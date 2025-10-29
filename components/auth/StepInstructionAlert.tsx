import { Alert, Button, Group, Stack } from "@mantine/core";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type InstructionStep = {
    instruction: string;
};

type Props = {
    steps: InstructionStep[];
};

export function StepInstructionAlert({ steps }: Props) {
    const [index, setIndex] = useState(0);
    const total = steps.length;

    const current = steps[index];

    const next = () => setIndex((i) => Math.min(i + 1, total - 1));
    const prev = () => setIndex((i) => Math.max(i - 1, 0));

    return (
        <Alert
            color="yellow"
            variant="light"
            radius="md"
            styles={{
                root: {
                    backgroundColor: '#FDFBEF',
                    border: '1px solid #EDE6D2',
                },
            }}
        >
            <Stack style={{ objectFit: 'contain' }}>
                <ReactMarkdown
                    components={{
                        img: ({ node, ...props }) => (
                            <img
                                {...props}
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    objectFit: "contain",
                                    display: "block",
                                    margin: "10px auto"
                                }}
                                alt={props.alt || ""}
                            />
                        ),
                    }}
                >
                    {current.instruction?.replace(/\\n/g, "\n")}
                </ReactMarkdown>

                <Group mt="md" style={{ display: "flex", justifyContent: 'space-between' }}>
                    {index > 0 && <Button
                        variant="subtle"
                        color="#CBB852"
                        onClick={prev}
                        disabled={index === 0}
                    >
                        Prev
                    </Button>
                    }

                    {index < total - 1 && <Button
                        color="#CBB852"
                        onClick={next}
                        ml={'auto'}
                        disabled={index === total - 1}
                    >
                        {index === total - 1 ? "Next" : "Next"}
                    </Button>
                    }
                </Group>

                {/* <div style={{ textAlign: "center", fontSize: 14, color: "#92400E" }}>
                    Step {index + 1} of {total}
                </div> */}
            </Stack>
        </Alert>
    );
}
