import Head from 'next/head'
import React, { useState } from 'react'

export default function Calculator() {
	const [cal, setCal] = useState("");
    const [result, setResult] = useState("");

    const updateCal = (e) => {
        setCal(cal.concat(e.target.name));
    }

    const clear = () => {
        setCal("");
        setResult("");
    }

    const results = () => {
        try {
        setResult(eval(cal).toString());
        }
        catch{
            setResult("Error");
        }
    }

	return (
		<>
		<Head>
			<title>Lottie68</title>
			<meta name="viewport" />
		</Head>
		<div className="bg-gray-800 h-screen w-screen">
			<div className="mx-auto overflow-hidden fixed top-1/2 left-1/2 
					transform -translate-x-1/2 -translate-y-1/2 shadow-lg bg-[#000000] 
					border rounded-lg w-full lg:w-1/2
					pb-5
					">
				<div className="p-5 pb-0 text-white text-right text-3xl break-words">{cal || 0}</div>
				<div className="p-5 text-white text-right text-3xl"><span className="text-orange-500">{result || ''}</span></div>

				<div className="flex flex-wrap gap-y-5 justify-between">
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-[#505050] justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="%" onClick={updateCal}>
							%
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-[#505050] justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="(" onClick={updateCal}>
							(
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-[#505050] justify-center shadow-lg hover:border-gray-500 focus:outline-none" name=")" onClick={updateCal}>
							)
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-orange-500 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="/" onClick={updateCal}>
						÷
						</button>
					</div>

					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="7" onClick={updateCal}>
							7
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="8" onClick={updateCal}>
							8
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="9" onClick={updateCal}>
							9
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-orange-500 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="*" onClick={updateCal}>
						×
						</button>
					</div>
			
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="4" onClick={updateCal}>
						4
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="5" onClick={updateCal}>
						5
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="6" onClick={updateCal}>
						6
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-orange-500 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="-" onClick={updateCal}>
						-
						</button>
					</div>
			
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="1" onClick={updateCal}>
						1
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="2" onClick={updateCal}>
						2
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="3" onClick={updateCal}>
						3
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-orange-500 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="+" onClick={updateCal}>
						+
						</button>
					</div>

					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" onClick={clear}>
						AC
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="0" onClick={updateCal}>
						0
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-gray-800 justify-center shadow-lg hover:border-gray-500 focus:outline-none" name="." onClick={updateCal}>
						.
						</button>
					</div>
				
					<div className="flex-initial w-1/4 justify-center flex items-center text-white text-2xl font-semibold">
						<button className="rounded-full h-20 w-20 flex items-center bg-orange-500 justify-center shadow-lg hover:border-gray-500 focus:outline-none" onClick={results}>
						=
						</button>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}