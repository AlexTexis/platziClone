export const normalizerData = (data) => {
  let dataNormalized = {}
  data.forEach( element => {
    dataNormalized = {
      ...dataNormalized,
      [element._id] : element
    }
  })
  return dataNormalized
}