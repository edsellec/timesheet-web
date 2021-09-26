function TableHeader({ type }) {
	if (type === "Users") {
		return (
			<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					ID
				</div>
				<div className="col-span-5 whitespace-pre text-base text-gray-400">
					Name
				</div>
				<div className="col-span-2 whitespace-pre text-base text-gray-400">
					Team
				</div>
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					Time started
				</div>
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					Hours logged in
				</div>
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					Minutes tardy
				</div>
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					Status
				</div>
			</div>
		);
	} else if (type === "Teams") {
		return (
			<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					No.
				</div>
				<div className="col-span-8 whitespace-pre text-base text-gray-400">
					Team name
				</div>
				<div className="col-span-1 whitespace-pre text-base text-gray-400">
					# of users
				</div>
				<div className="col-span-2 whitespace-pre text-base text-gray-400">
					Date created
				</div>
			</div>
		);
	} else {
		return (
			<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
				<div className="col-span-12 whitespace-pre text-base text-gray-400">
					Missing type
				</div>
			</div>
		);
	}
}

export default TableHeader;
