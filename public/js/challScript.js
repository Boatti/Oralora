
function onChangeFilter() {
    var x = document.getElementById("selectFilter");
    const category = window.location.pathname.split('/').pop();
    fetch(`/challenge/${category}?filter=${x.value}`)
    .then(() => location.reload());
}

function loadingForm() {
    
    let loading = 'loading';
    let loadingSpinner = 'loadingSpinner';
    let spinner = document.getElementById('loading');
    spinner.id = loadingSpinner;
}