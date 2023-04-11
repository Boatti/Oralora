
function onChangeFilter() {
    var x = document.getElementById("selectFilter");
    const category = window.location.pathname.split('/').pop();
    fetch(`/challenge/${category}?filter=${x.value}`)
    .then(() => location.reload());
}