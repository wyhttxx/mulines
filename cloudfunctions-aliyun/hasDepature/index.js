'use strict';
const db=uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	let {deptCode,arrCode}=event

	let a="CKG"
/* 	if(deptCode===''&arrCode!==''){
		let res=await db.collection('data')
		.aggregate()
		// .match({
		// "deptAirport":'CKG'
		// })
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
	} */

	let res=await db.collection('data')
	.aggregate()
	.match({
		"deptAirport":deptCode
	})
	
	.end()
	
	return {res}

/* 	// if(deptCode===''&arrCode!==''){
		let res=await db.collection('data')
		.where({
			lines:dbCmd.elemMatch({
				arrAirport:dbCmd.eq('HGH')
			})
		})
		.get()
		
		return {res}
	// } */

};
