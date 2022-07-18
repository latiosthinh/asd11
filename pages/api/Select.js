function Select( {obj, cb} ) {
	return (
		<>
			<label className="text-xl mr-5">{ obj.title }</label>
			<select className="text-xl border-solid border-2 border-indigo-600 rounded-sm" onChange={ cb }>
				{ obj.data.map( d => <option key={ d } value={ d }>{ d }</option> ) }
			</select>
		</>
	)
}

export default Select;