const Summary = ({ cols }) => {
	return (
		<div className="flex w-full justify-between space-x-6 py-4">
			{cols.map((item, index) => (
				<div key={index} className="w-full block border rounded p-5">
					<div className="whitespace-pre font-light text-base uppercase">
						{item.title()}
					</div>
					<div className="whitespace-pre text-3xl font-bold">
						{item.value()}
					</div>
				</div>
			))}
		</div>
	);
};

export default Summary;
