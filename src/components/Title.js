const Title = ({ cols }) => {
	return (
		<div className="w-full bg-white py-4 border-b">
			<div className="block sm:w-2/3 mx-auto items-center">
				<div className="flex w-full justify-between py-4 items-center">
					{cols.map((item, index) => (
						<div key={index} className="w-auto">
							{item.title()}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Title;
