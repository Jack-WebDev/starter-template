"use client";

import type { Column } from "@tanstack/react-table";
import { SortAscIcon, SortDescIcon, XIcon } from "lucide-react";

import { Button } from "../button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
	renderFilter?: () => React.ReactNode;
}

const SORT_DIRECTION_ICONS = {
	desc: SortDescIcon,
	asc: SortAscIcon,
} as const;

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
	renderFilter,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort() && !renderFilter) {
		return <div className={className}>{title}</div>;
	}

	const sortDirection = column.getIsSorted() as "asc" | "desc" | false;
	const SortIcon = sortDirection ? SORT_DIRECTION_ICONS[sortDirection] : null;

	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="link"
						size="sm"
						aria-label={`Sort/filter by ${title}`}
						className="text-black -ml-3 h-8 data-[state=open]:bg-accent gap-2 group"
					>
						<span>{title}</span>
						{SortIcon && <SortIcon size={14} />}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="space-y-1">
					{column.getCanSort() && (
						<>
							<DropdownMenuItem
								className="gap-2"
								disabled={sortDirection === "asc"}
								onClick={() => column.toggleSorting(false)}
							>
								<SortAscIcon size={14} />
								Asc
							</DropdownMenuItem>
							<DropdownMenuItem
								className="gap-2"
								disabled={sortDirection === "desc"}
								onClick={() => column.toggleSorting(true)}
							>
								<SortDescIcon size={14} />
								Desc
							</DropdownMenuItem>
							{sortDirection && (
								<DropdownMenuItem
									className="gap-2"
									onClick={() => column.clearSorting()}
								>
									<XIcon size={14} />
									Clear sort
								</DropdownMenuItem>
							)}
						</>
					)}
					{renderFilter && (
						<div className="px-2 pb-2 pt-1 border-t border-muted">
							{renderFilter()}
						</div>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
