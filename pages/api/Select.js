function Select( {obj, cb} ) {
	return (
		<>
			<label>{ obj.title }</label>
			<select onChange={ cb }>
				{ obj.data.map( d => <option key={ d } value={ d }>{ d }</option> ) }
			</select>
		</>
	)
}

export default Select;