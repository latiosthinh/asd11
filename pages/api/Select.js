function Select( {obj, cb} ) {
	return (
		<>
			<label className="block text-xl mr-5">{ obj.title }</label>
			<select className="px-3 py-1 text-xl border-solid border border-black rounded-sm" onChange={ cb }>
				{ obj.data.map( d => <option key={ d } value={ d }>{ d }</option> ) }
			</select>
		</>
	)
}

export default Select;