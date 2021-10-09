const Table = ({ cols, rows }) => {
	return (
		<table className="w-full table-auto text-left">
			<thead className="w-full border">
				<tr>
					{cols.map((headerItem, index) => (
						<th
							key={index}
							className="px-4 py-2 font-normal whitespace-pre text-gray-400"
						>
							{headerItem.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody className="w-full border">
				{rows.map((item, index) => (
					<tr key={index} className="hover:bg-gray-100">
						{cols.map((col, key) => (
							<td
								key={key}
								className="px-4 py-2 font-normal whitespace-pre"
							>
								{col.render(item)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
