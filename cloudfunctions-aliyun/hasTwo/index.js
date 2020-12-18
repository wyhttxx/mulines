'use strict';
const db=uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	let {deptCode,arrCode}=event

	let a="CKG"
	// if(deptCode===''&arrCode!==''){
		let res=await db.collection('data')
		.aggregate()
		.match({
		"deptAirport":deptCode
		})
		.project({
			lines:$.filter({
				input:'$lines',
				as:'item',
				cond:$.eq(['$$item.arrAirport',arrCode])
			})
		})
		.match({
			lines:dbCmd.neq([])
		})
		
		.end()
		
		return {res}
	}