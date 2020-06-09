const getUserId = (header)=>{
    return header.user_id
};

const getUserName = (header)=>{
    return header.user_name
};


module.exports = {
    getUserId,
    getUserName
}