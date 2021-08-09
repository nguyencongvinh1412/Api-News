module.exports.paperSlice = (data, page, size) => {
    return data.slice( (page-1) * size, page*size);

}