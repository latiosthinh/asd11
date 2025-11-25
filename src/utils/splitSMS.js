const splitSMS = str => {
	// identify [900x100]
	const reg = /(?![\.\s]+)?[\d]+([\.\s]+)?x([\.\s]+)?\d+/gmi
	const matches = str.matchAll( reg )

	const res = str.split( reg ).filter( e => e && /\S/.test( e ) && /\w/.test( e ) )

	let i = 0
	for ( const m of matches ) {
		res[i] = ( res[i] + m[0] )
		i += 1
	}

	// remove space from start and end of string
	// convert '..', ' ' => . ( one dot )
	const res2 = res.map( r => r.trim()
								.replace( /^\.+|\.+$/g, '' )
								.trim()
								.replace( /\s+|\.+/g, '.' )
						)

	// if ( no header ) => concat to the previous element
	// res2.forEach( (r, i) => {
	// 	if ( r ) {
			
	// 	}
	// } )

	return res2
}

export default splitSMS