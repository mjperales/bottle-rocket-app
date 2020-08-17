const defaultLists = () => {
    fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
        .then((rsp) => {
            return rsp.json;
        })
        .then((list) => {
            return list;
        })
        .catch((err) => console.error(err));
};

console.log(defaultLists());

const listsReducer = (lists = defaultLists, action) => {
    console.log(lists, action);
    return lists;
};

export default listsReducer;
