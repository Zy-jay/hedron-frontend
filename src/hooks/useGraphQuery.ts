import { number } from "@lingui/core/cjs/formats"
import { client } from "apollo/client"
import { HDRN_LIQUIDATIONS, HDRN_LIQUIDATIONS_ACTIVE, HDRN_LOANS, HDRN_LOANS_ACTIVE } from "apollo/queries"
import { useEffect, useMemo, useState } from "react"


export async  function getHdrnLoans(first?: number, skip?: number) {

    let result = await client.query({
        query: HDRN_LOANS(first, skip),
        fetchPolicy: 'cache-first',
      }).then(res => res.data.hdrnloans)  
      console.log(result)

  return   result
}

// export async  function getHdrnStatistics() {

//     let result = await client.query({
//         query: STATISTICS,
//         fetchPolicy: 'cache-first',
//       }).then(res => res.data)  
//       console.log(result)
//   return   result
// }





export async  function getHdrnLiquidations(first?: number, skip?: number) {

    let result = await client.query({
        query: HDRN_LIQUIDATIONS(first, skip),
        fetchPolicy: 'cache-first',
      }).then(res => res.data.hdrnliquidations)
      console.log(result)
  
  return   result
}

export async  function getHdrnLoansActive() {

    let result = await client.query({
        query: HDRN_LOANS_ACTIVE(),
        fetchPolicy: 'cache-first',
      }).then(res => res.data.statistics[0]) 
  return   result
}

export async  function getHdrnLiquidationsActive() {

    let result = await client.query({
        query: HDRN_LIQUIDATIONS_ACTIVE(),
        fetchPolicy: 'cache-first',
      }).then(res => res.data.statistics[0])  
  return   result
}