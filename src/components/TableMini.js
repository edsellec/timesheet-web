import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function TableMini({ type, title, data, history }) {
	return (
		<div className="block w-full py-4">
			<div className="whitespace-pre text-lg font-bold">{title}</div>
			<div className="w-full rounded py-5">
				<div className="w-full border rounded">
					<TableHeader type={type} />
					{data.map((value, key) => {
						return <TableRow key={key} type={type} value={value} />;
					})}
					<button
						onClick={() =>
							history.push("/" + type.toLowerCase() + "/")
						}
						className="w-full py-3 px-5 border-t hover:bg-gray-100 hover:underline"
					>
						<div className="whitespace-pre text-base font-bold text-center">
							See more
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}

export default TableMini;
