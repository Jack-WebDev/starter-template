"use client";

import { startCase } from "@repo/utils";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { z } from "zod";

import { Badge } from "../badge";
import {
	Table as NativeTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../native-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import {
	DataTableRowActions,
	type DataTableRowActionsProps,
} from "./DataTableRowActions";

function formatDate(value: unknown): string | null {
	if (!value) return null;
	const date = new Date(value as string);
	return new Intl.DateTimeFormat("en-ZA", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);
}

function getStatusBadge(status: string) {
	return <Badge className={statusLookup[status]}>{status}</Badge>;
}

function getRoleBadge(role: string) {
	return <Badge className={roleLookup[role]}>{role}</Badge>;
}

export function Table<T extends z.AnyZodObject>({
	schema,
	data,
	actions,
	onClick,
}: DataTableProps<T>) {
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const columns = useMemo<ColumnDef<z.infer<T>>[]>(() => {
		const baseCols = Object.keys(schema.shape).map((key) => {
			const column: ColumnDef<z.infer<T>> = {
				id: key,
				accessorKey: key,
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title={startCase(key)} />
				),
				enableSorting: true,
				enableHiding: false,
			};

			if (key.toLowerCase().includes("date") || key === "createdAt") {
				column.cell = ({ row }) => formatDate(row.original[key]);
			}

			if (key.toLowerCase() === "status") {
				column.cell = ({ row }) => getStatusBadge(row.original[key]);
			}

			if (key.toLowerCase() === "role") {
				column.cell = ({ row }) => getRoleBadge(row.original[key]);
			}

			return column;
		});

		if (actions) {
			baseCols.push({
				id: "actions",
				accessorKey: "actions",
				cell: ({ row }) => (
					<DataTableRowActions
						row={row}
						Edit={actions.Edit}
						Delete={actions.Delete}
						View={actions.View}
						SendOffer={actions.SendOffer}
						Employ={actions.Employ}
						custom={actions.custom}
					/>
				),
			});
		}

		return [
			{ id: "select", enableSorting: false, enableHiding: false },
			...baseCols,
		];
	}, [schema, actions]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting, columnVisibility, rowSelection, columnFilters },
		manualPagination: true,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className="space-y-4">
			<div className="rounded-md border bg-card overflow-auto">
				<NativeTable className="w-full overflow-x-auto">
					<TableHeader>
						{table.getHeaderGroups().map((group) => (
							<TableRow key={group.id}>
								{group.headers.map((header) => (
									<TableHead key={header.id} className="text-2xl bg-gray-100">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="group"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={
												cell.column.id !== "actions" && onClick
													? "group-hover:bg-gray-200/10 cursor-pointer"
													: ""
											}
											onClick={() =>
												cell.column.id !== "actions" &&
												onClick?.(row.getValue("id"))
											}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={Object.keys(schema.shape).length}
									className="w-full h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</NativeTable>
			</div>
		</div>
	);
}

export interface DataTableProps<T extends z.AnyZodObject> {
	schema: T;
	data: z.infer<T>[];
	actions?: Pick<
		DataTableRowActionsProps<T>,
		"Edit" | "custom" | "Delete" | "View" | "SendOffer" | "Employ"
	>;
	onClick?: (id: string | number) => void;
}

const statusLookup: Record<string, string> = {
	Open: "bg-green-600 text-white",
	Closed: "bg-primary text-white",
	Cancelled: "bg-red-200 text-black",
	Completed: "bg-green-600 text-white",
	Active: "bg-green-600 text-white",
	Accepted: "bg-green-600 text-white",
	Deleted: "bg-red-500 hover:bg-gray-500 text-white hover:bg-green-400",
};

const roleLookup: Record<string, string> = {
	Admin: "bg-green-200 hover:bg-green-200 text-green-600 hover:bg-secondary",
	SuperAdmin: "bg-green-600 hover:bg-green-600 text-white hover:bg-green-600",
};
