export function getShortAddress(address: string){

   return address.substr(0,6)+ "..."+ address.substr(38,41)
}
export {}