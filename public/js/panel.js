export default panel = (form => {
    const items = form.querySelectorAll('input,range,select,checkbox');
    return Object.keys(items).reduce((map, i) => {
        map[items[i].getAttribute('name')] = items[i];
        return map;
    }, {});
})(document.getElementsByTagName('form')[0]);
