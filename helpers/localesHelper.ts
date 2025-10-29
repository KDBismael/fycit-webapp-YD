import { LocaleNode, LocalesType } from "@/types/collections";


export enum CheckboxState {
    Checked = 'checked',
    Unchecked = 'unchecked',
    Indeterminate = 'indeterminate',
}

/**
 * Returns all selected locale names based on a tapped locale.
 */
export function getSelectedLocales(
    tapped: LocalesType,
    allLocales: LocalesType[]
): string[] {
    const selected: string[] = [];

    if (tapped.subgroup && tapped.subgroup.length > 0) {
        // Case 1: Tapped has a subgroup → select all with same group + subgroup
        selected.push(
            ...allLocales
                .filter(
                    (l) => l.group === tapped.group && l.subgroup === tapped.subgroup
                )
                .map((l) => l.name)
        );
    } else {
        // Case 2: Tapped is just a group (no subgroup) → select all with same group but no subgroup
        selected.push(
            ...allLocales
                .filter(
                    (l) =>
                        l.group === tapped.group &&
                        (!l.subgroup || l.subgroup.length === 0)
                )
                .map((l) => l.name)
        );
    }

    // Always include the tapped one
    selected.push(tapped.name);

    // Deduplicate and return
    return Array.from(new Set(selected));
}

/**
 * Toggles the selection of a set of locales based on a new selection.
 */
export function toggleSelectedLocales(
    newSelection: string[],
    oldSelection: string[],
    allLocales: LocalesType[]
): string[] {
    const selectedSet = new Set(newSelection);
    const oldSelectedSet = new Set(oldSelection);

    const addedItem = Array.from(selectedSet).filter((x) => !oldSelectedSet.has(x));
    const removedItem = Array.from(oldSelectedSet).filter((x) => !selectedSet.has(x));

    let tappedName: string | undefined;
    if (addedItem.length > 0) {
        tappedName = addedItem[0];
    } else if (removedItem.length > 0) {
        tappedName = removedItem[0];
    } else {
        // No change, just return the new selection
        return newSelection;
    }

    const selected = new Set(oldSelectedSet);
    const tapped = allLocales.find((l) => l.name === tappedName);

    if (!tapped) {
        // Tapped locale not found, return as is
        return Array.from(selected);
    }

    if (selected.has(tappedName)) {
        selected.delete(tappedName);
    } else {
        // Add logic
        if (tapped.subgroup && tapped.subgroup.length > 0) {
            // Add all from same group + subgroup
            allLocales
                .filter(
                    (l) => l.group === tapped.group && l.subgroup === tapped.subgroup
                )
                .forEach((l) => selected.add(l.name));
        } else {
            // Add all with same group but no subgroup
            allLocales
                .filter(
                    (l) =>
                        l.group === tapped.group && (!l.subgroup || l.subgroup.length === 0)
                )
                .forEach((l) => selected.add(l.name));
        }
    }

    return Array.from(selected);
}

/**
 * Builds a tree structure from a flat list of locales.
 */
export function buildTree(allLocales: LocalesType[]): LocaleNode[] {
    const grouped: Map<string, Map<string, LocalesType[]>> = new Map();

    // Group by group to subgroup to locales
    for (const l of allLocales) {
        if (!grouped.has(l.group ?? '')) {
            grouped.set(l.group ?? '', new Map());
        }
        const subGroups = grouped.get(l.group ?? '')!;
        const subGroupName =
            l.subgroup && l.subgroup.length > 0 ? l.subgroup : l.name;
        if (!subGroups.has(subGroupName)) {
            subGroups.set(subGroupName, []);
        }
        subGroups.get(subGroupName)!.push(l);
    }

    const tree: LocaleNode[] = [];
    const groupedEntries = Array.from(grouped.entries());

    for (const [groupName, subGroups] of groupedEntries) {
        const groupChildren: LocaleNode[] = [];

        const subGroupEntries = Array.from(subGroups.entries());
        for (const [subGroupName, locales] of subGroupEntries) {
            if (subGroupName !== locales[0].name) {
                // Subgroup node to contain locales
                groupChildren.push({
                    id: '',
                    name: subGroupName,
                    isLeaf: false,
                    children: locales.map((loc) => ({
                        name: loc.name,
                        id: loc.id,
                        children: [],
                        isLeaf: true,
                    })),
                });
            } else {
                // Group without subgroup, add locales directly
                groupChildren.push(
                    ...locales.map((loc) => ({
                        name: loc.name,
                        id: loc.id,
                        children: [],
                        isLeaf: true,
                    }))
                );
            }
        }

        tree.push({
            name: groupName,
            isLeaf: false,
            children: groupChildren,
            id: '',
        });
    }

    return tree;
}

/**
 * Determines the checkbox state for a given node.
 */
export function getNodeState(node: LocaleNode, selected: Set<string>): CheckboxState {
    if (node.isLeaf) {
        return selected.has(node.name)
            ? CheckboxState.Checked
            : CheckboxState.Unchecked;
    }

    const childStates = node.children.map((c) => getNodeState(c, selected));

    const allChecked = childStates.every((s) => s === CheckboxState.Checked);
    const noneChecked = childStates.every((s) => s === CheckboxState.Unchecked);

    if (allChecked) return CheckboxState.Checked;
    if (noneChecked) return CheckboxState.Unchecked;
    return CheckboxState.Indeterminate;
}

/**
 * Toggles the selection of a node and its children.
 */
export function toggleNode(node: LocaleNode, selected: Set<string>): Set<string> {
    const newSelected = new Set(selected);

    if (node.isLeaf) {
        if (newSelected.has(node.name)) {
            newSelected.delete(node.name);
        } else {
            newSelected.add(node.name);
        }
        return newSelected;
    }

    // Get all leaf names under the group or subgroup
    const allLeafNames = _collectLeafNames(node);

    const state = getNodeState(node, selected);

    if (state === CheckboxState.Checked) {
        allLeafNames.forEach((name) => newSelected.delete(name));
    } else {
        allLeafNames.forEach((name) => newSelected.add(name));
    }

    return newSelected;
}

/**
 * Collects all leaf node names recursively.
 */
function _collectLeafNames(node: LocaleNode): string[] {
    if (node.isLeaf) {
        return [node.name];
    }
    return node.children.flatMap(_collectLeafNames);
}