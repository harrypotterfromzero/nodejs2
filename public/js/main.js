var currentPage=1;
function loadPage(page){
    currentPage=page;
    $.ajax({
        url:'/user?page='+page,
        type:'GET'
    })
    .then(data=>{
        $('#content').html('');
    
        for(let i=0;i<data.length;i++){
            const element = data[i];
            var item=$(`
                <h3>${element.username}:${element.password}</h3>
            `)
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log('API Loi')
    })
}
function nextPage(){
    currentPage++;
    $.ajax({
        url:'/user?page='+currentPage,
        type:'GET'
    })
    .then(data=>{
        $('#content').html('');
    
        for(let i=0;i<data.length;i++){
            const element = data[i];
            var item=$(`
                <h3>${element.username}:${element.password}</h3>
            `)
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log('API Loi')
    })
    // console.log('ok')
}