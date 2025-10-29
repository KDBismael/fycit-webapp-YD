import React, { useMemo, useRef } from "react";

// ==== Types ====
export type LocaleNode = {
    name: string;
    children?: LocaleNode[];
};

export type CheckboxState = "checked" | "indeterminate" | "unchecked";

type Props = {
    hint: string;
    tree: LocaleNode[];
    selected: Set<string>;               // selected leaf names (or all names if you prefer)
    onChange: (next: Set<string>) => void;
    className?: string;                  // styling hook
    panelClassName?: string;             // styling hook for the dropdown panel
};

// ==== Helpers for tri-state selection ====
const isLeaf = (n: LocaleNode) => !n.children || n.children.length === 0;

function getAllLeaves(node: LocaleNode): string[] {
    if (isLeaf(node)) return [node.name];
    return (node.children ?? []).flatMap(getAllLeaves);
}

function getNodeState(node: LocaleNode, selected: Set<string>): CheckboxState {
    const leaves = getAllLeaves(node);
    const picked = leaves.filter(l => selected.has(l)).length;
    if (picked === 0) return "unchecked";
    if (picked === leaves.length) return "checked";
    return "indeterminate";
}

function toggleNode(node: LocaleNode, selected: Set<string>): Set<string> {
    const next = new Set(selected);
    const leaves = getAllLeaves(node);
    const state = getNodeState(node, selected);

    if (state === "checked" || state === "indeterminate") {
        leaves.forEach(l => next.delete(l));
    } else {
        leaves.forEach(l => next.add(l));
    }
    return next;
}

// Flat list of current selections (you can choose to only show leaves)
function listSelected(selected: Set<string>) {
    return Array.from(selected).sort((a, b) => a.localeCompare(b));
}

// ==== Component ====
export const LocaleMultiSelectDropdown: React.FC<Props> = ({
    hint,
    tree,
    selected,
    onChange,
    className,
    panelClassName,
}) => {
    const detailsRef = useRef<HTMLDetailsElement | null>(null);
    const chips = useMemo(() => listSelected(selected), [selected]);

    // Close when summary loses focus (optional)
    const onSummaryKeyDown = (e: React.KeyboardEvent<HTMLMapElement>) => {
        if (e.key === "Escape") {
            detailsRef.current && (detailsRef.current.open = false);
            (e.target as HTMLElement).blur();
        }
    };

    // Node row (recursive)
    const NodeRow: React.FC<{ node: LocaleNode; depth: number }> = ({ node, depth }) => {
        const state = getNodeState(node, selected);
        const indeterminate = state === "indeterminate";
        const checked = state === "checked";

        return (
            <>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 8px",
                        paddingLeft: 8 + depth * 20,
                        gap: 8,
                    }}
                    onClick={() => onChange(toggleNode(node, selected))}
                >
                    <input
                        type="checkbox"
                        checked={checked}
                        ref={(el) => {
                            if (el) el.indeterminate = indeterminate;
                        }}
                        onChange={() => onChange(toggleNode(node, selected))}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div
                        style={{
                            fontWeight: node.children?.length ? 700 : 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            flex: 1,
                        }}
                        title={node.name}
                    >
                        {node.name}
                    </div>
                </div>

                {(node.children ?? []).map((c) => (
                    <NodeRow key={c.name} node={c} depth={depth + 1} />
                ))}
            </>
        );
    };

    return (
        <details ref={detailsRef} className={className} data-locale-dropdown>
            <summary
                onKeyDown={onSummaryKeyDown}
                style={{
                    listStyle: "none",
                    cursor: "pointer",
                    userSelect: "none",
                    outline: "none",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "var(--input-bg, #F5F6FC)",    // customize with CSS vars
                        borderRadius: 12,
                        border: "1px solid var(--input-border, transparent)",
                        padding: chips.length === 0 ? "12px 14px" : "8px 14px",
                    }}
                >
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {chips.length === 0 ? (
                            <span
                                style={{
                                    color: "var(--hint-fg, #99999B)",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={hint}
                            >
                                {hint}
                            </span>
                        ) : (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {chips.map((c) => (
                                    <span
                                        key={c}
                                        title={c}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            maxWidth: "100%",
                                            padding: "2px 8px",
                                            borderRadius: 8,
                                            background: "var(--chip-bg, #BAA93E)", // primary
                                            color: "#fff",
                                            fontSize: 12,
                                            lineHeight: "18px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {c}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        aria-hidden
                        focusable={false}
                    >
                        <path
                            d="M7 10l5 5 5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </summary>

            {/* Panel (inside normal flow; style it however you want) */}
            <div
                className={panelClassName}
                style={{
                    marginTop: 8,
                    borderRadius: 12,
                    border: "1px solid var(--dropdown-border, #D3C977)",
                    background: "var(--dropdown-bg, #ECECB8)",
                    maxHeight: 300,
                    overflow: "auto",
                    padding: "8px 0",
                }}
            >
                {tree.map((n) => (
                    <NodeRow key={n.name} node={n} depth={0} />
                ))}
            </div>
        </details>
    );
};
