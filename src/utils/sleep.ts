export const sleep = async (ms: number) => {
  console.log("Timout " + ms / 1000 + " sec...")
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
