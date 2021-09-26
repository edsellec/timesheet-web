function TableRow({ type, value }) {
	if (type === "Users") {
		return (
			<div className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t hover:bg-gray-100">
				<div className="col-span-1 whitespace-pre text-base">
					{value.id}
				</div>
				<div className="col-span-5 whitespace-pre text-base">
					{value.name}
				</div>
				<div className="col-span-2 whitespace-pre text-base">
					{value.team}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.timeStarted}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.hoursLoggedIn}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.minutesTardy}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.status ? (
						<span className="bg-green-600 text-white py-1 px-2 rounded">
							Active
						</span>
					) : (
						<span className="bg-red-600 text-white py-1 px-2 rounded">
							Inactive
						</span>
					)}
				</div>
			</div>
		);
	} else if (type === "Teams") {
		return (
			<div className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t hover:bg-gray-100">
				<div className="col-span-1 whitespace-pre text-base">
					{value.id}
				</div>
				<div className="col-span-8 whitespace-pre text-base">
					{value.name}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.userCount}
				</div>
				<div className="col-span-2 whitespace-pre text-base">
					{value.dateCreated}
				</div>
			</div>
		);
	} else {
		return (
			<div className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t hover:bg-gray-100">
				<div className="col-span-12 whitespace-pre text-base text-gray-400">
					Missing type
				</div>
			</div>
		);
	}
}

export default TableRow;
