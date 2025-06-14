"use client";

import type { Row } from "@tanstack/react-table";
import {
	ArrowLeftRight,
	FileText,
	MoreHorizontalIcon,
	Pen,
	Trash2,
	ViewIcon,
} from "lucide-react";
import { type JSX, useState } from "react";
import type { ZodObject, z } from "zod";

import { Button } from "../button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../dropdown-menu";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Inferred<T extends ZodObject<any>> = z.infer<T>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export interface DataTableRowActionsProps<T extends ZodObject<any>> {
	row: Row<Inferred<T>>;
	Edit?: (props: { defaults: z.infer<T> }) => JSX.Element;
	View?: (props: { defaults: z.infer<T> }) => JSX.Element;
	Delete?: (props: { defaults: z.infer<T> }) => JSX.Element;
	SendOffer?: (props: { defaults: z.infer<T> }) => JSX.Element;
	Employ?: (props: { defaults: z.infer<T> }) => JSX.Element;
	custom?: {
		onClick: (row: z.infer<T>) => void;
		title: string;
		icon?: JSX.Element;
		condition: (row: z.infer<T>) => boolean;
	}[];
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function DataTableRowActions<T extends ZodObject<any>>({
	row,
	Edit,
	View,
	Delete,
	SendOffer,
	Employ,
	custom,
}: DataTableRowActionsProps<T>) {
	const [dialogs, setDialogs] = useState({
		edit: false,
		view: false,
		sendOffer: false,
		employ: false,
		delete: false,
	});

	const values = row.getVisibleCells().reduce(
		(acc, cell) => {
			acc[cell.column.id] = cell.getValue();
			return acc;
		},
		{} as Record<string, unknown>,
	) as z.infer<T>;

	const toggleDialog = (key: keyof typeof dialogs) =>
		setDialogs((prev) => ({ ...prev, [key]: !prev[key] }));

	const ActionButton = ({
		label,
		icon,
		onClick,
		color = "gray",
		danger = false,
	}: {
		label: string;
		icon?: JSX.Element;
		onClick: () => void;
		color?: string;
		danger?: boolean;
	}) => (
		<Button
			variant="ghost"
			onClick={onClick}
			className={`flex w-full items-center justify-between text-${color}-500 hover:bg-${
				danger ? "primary" : "gray-200"
			} hover:text-${danger ? "white" : "black"} px-2 py-1`}
			aria-label={label}
		>
			<span className="ml-2">{label}</span>
			{icon && icon}
		</Button>
	);

	return (
		<DropdownMenu>
			{Edit && dialogs.edit && <Edit defaults={values} />}
			{View && dialogs.view && <View defaults={values} />}
			{SendOffer && dialogs.sendOffer && <SendOffer defaults={values} />}
			{Employ && dialogs.employ && <Employ defaults={values} />}
			{Delete && dialogs.delete && <Delete defaults={values} />}

			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					aria-label="Open row actions menu"
				>
					<MoreHorizontalIcon />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-[160px]">
				{View && (
					<ActionButton
						label="View"
						icon={<ViewIcon className="w-5 h-5" />}
						onClick={() => toggleDialog("view")}
					/>
				)}

				{Edit && (
					<ActionButton
						label="Edit"
						icon={<Pen className="w-5 h-5" />}
						onClick={() => toggleDialog("edit")}
					/>
				)}

				{SendOffer && (
					<ActionButton
						label="Send Offer"
						icon={<FileText className="w-5 h-5" />}
						onClick={() => toggleDialog("sendOffer")}
					/>
				)}

				{Employ && (
					<ActionButton
						label="Employ"
						icon={<ArrowLeftRight className="w-5 h-5" />}
						onClick={() => toggleDialog("employ")}
					/>
				)}

				{Delete && (
					<ActionButton
						label="Delete"
						icon={<Trash2 className="w-5 h-5" />}
						onClick={() => toggleDialog("delete")}
						danger
					/>
				)}

				{custom
					?.filter((item) => item.condition(values))
					.map(({ title, icon, onClick }) => (
						<ActionButton
							key={title}
							label={title}
							icon={icon}
							onClick={() => onClick(values)}
						/>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
