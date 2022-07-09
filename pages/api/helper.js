const handleText = text => {
	const strAfterReplace = removeAccents( text.toUpperCase() )
							.replace( /[:;]/gmi, '')
							.replace( /t(\w?)+\d?(?![\S\.\W]+)/gmi, '') // remove tin1, tin2
							.replace( /\n/gmi, ' ' )
							.replace( /(X)[,\s\.]+?(\d+)[KND]?/gmi, '$1$2' )
							.replace( /[,\s\.]+?(\d+)[,\.\s]?[KND]|[,\s\.]+(\d+[,\s\.]+?[KND][,\.\s])/gmi, 'X$1 ' ) // .200k => x200
							.replace( /XX|\*|\×/gmi, 'X' )
							.replace( /K([,\s\.]+?\w)/gmi, '$1' ) // remove lonely 'K'
							.replace( /(\d+)[DNK]/gmi, '$1' ) // remove 'K'
							.replace( /^[\.\s]?[NDK]?[-,\.\s]+/gmi, '' ) // remove currency
							.replace( /XIEN[\.\s]+QUAY[,\s\.]?(\d{1})[,\.\s]/gmi, '..XQ $1' )
							.replace( /XIEN[\.\s]+QUAY/gmi, '..XQ' )
							.replace( /DOI/gmi, '2' )
							.replace( /BA/gmi, '3' )
							.replace( /BON/gmi, '4' )
							.replace( /-/gmi, '..' )
							.replace( /[,\s\.]?TR(I)?(EU)?/gmi, '000' ) // change currency
							.replace( /(\D{2}[\w\s\.]?)(XIEN)\d?(([\.\s]\d)?)[\.\s]/gmi, '..XIEN ' )
							.replace( /X[,\s\.]+XN/gmi, 'XIEN,XN' )
							.replace( /\w+?[\.\s]?CANG|BA/gmi, '..BC' )
							.replace( /X[\.\s,]*?(\d+)/gmi, 'X$1' )
							.replace( /KEP/gmi, 'DE KEP' ) // avoid Lo kep
							.replace( /kep[,\.\s]+lech|kep[,\.\s]+lec|kep[,\.\s]+l/gmi, '..KL' )
							.replace( /\W+[\s\.,]+BO|\D+[\.\s]?BO/gmi, '..DE BO' )
							.replace( /([-\D]+)DE/gmi, '$1..DE' ) // break in safari - iphone
							.replace( /D(\d+?)/gmi, 'DE $1' )
							.replace( /DUOI/gmi, '..DIT ' )

							.replace( /NH?O?[,\s]TO/gmi, '..NHO_TO' )
							.replace( /NH?O?[,\s]NH?O?/gmi, '..NHO_NHO' )
							.replace( /TO?[,\s]NH?O?/gmi, '..TO_NHO' )
							.replace( /TO?[,\s]TO?/gmi, '..TO_TO' )

							.replace( /CHAN[,\s\.]LE/gmi, '..CL' )
							.replace( /CHAN[,\s\.]CHAN/gmi, '..CC' )
							.replace( /LE[,\s\.]CHAN/gmi, '..LL' )
							.replace( /LE[,\s\.]LE/gmi, '..CL' )

							.replace( /LO[,\.\s]?(XIEN|XN)/gmi, '$1' )
							.replace( /L0?[\s\.](\d+)/gmi, '..LO $1' ) //  L0 | L => LO
							.replace( /L[\s\.]?(\d+)/gmi, '..LO $1' ) //  L030 => LO 030
							.replace( /[\.\s]+?\D+$/g, '' ) // remove last word if last word is not a number
							.replace( /[()\\\/]/gmi, '.' )

							// replace everything else
							.replace( /(CHO|CH0|NHE|OK|THUONG|DIEM|GHI|HO)[\s\.]+?/gmi, '' )
	
	return strAfterReplace
}

const replaceAt = ( str, index, replacement ) =>  {
	if ( index >= str.length ) {
		return str.valueOf();
	}

	return str.substring( 0, index ) + replacement + str.substring( index + 1 );
}

const sortNumber = ( num1,num2 ) => {
	return num1 - num2
}

const getIndicesOf = ( keywords, str ) => {
	const keywordsLen = keywords.length;
	if ( keywordsLen === 0 || ! Array.isArray( keywords ) ) {
		return [];
	}

	let indices = [];

	str = str.toLowerCase();

	keywords.forEach( s => {
		s = s.toLowerCase();
		let startIndex = 0, index

		while ( ( index = str.indexOf( s, startIndex ) ) > -1 ) {
			indices.push( index );
			startIndex = index + keywordsLen;
		}
	} )

	const sortIndices = indices.sort( sortNumber )

	return [...new Set( sortIndices )];
}

const detectAndTransform = ( str ) => {
	const X_Index = getIndicesOf( ['X'], str )
	const N_Index = getIndicesOf( ['N'], str )

	if ( X_Index ) {
		for ( let i=0; i<X_Index.length; i++ ) {
			replaceAt( str, X_Index[i], '-' )
		}
	}

	if ( N_Index ) {
		for ( let i=0; i<N_Index.length; i++ ) {
			replaceAt( str, N_Index[i], '' )
		}
	}
}

const removeAccents = str => {
	return str.normalize( 'NFD' )
				.replace( /[\u0300-\u036f]/g, '' )
				.replace( /đ/g, 'd').replace(/Đ/g, 'D' )
}

const hasKeywords = ( arr1, arr2 ) => {
    return arr1.some( item => arr2.includes( item ) )
}

const countOccurrences = ( arr, val ) => arr.reduce( (a, v) => (v === val ? a + 1 : a), 0 )

const calculateXien = ( arr1, arr2 ) => arr1.filter( v => arr2.includes( v ) ).length

function chunk(arr, size = 2) {
    const arrChildren = [];
    for ( let i=0; i<Math.ceil( arr.length / size ); i++ ) {
        arrChildren.push( arr.slice( i * size, ( i + 1 ) * size ) );
    }
    return arrChildren;
}

export { handleText, chunk, hasKeywords, detectAndTransform, getIndicesOf, removeAccents, countOccurrences, calculateXien }